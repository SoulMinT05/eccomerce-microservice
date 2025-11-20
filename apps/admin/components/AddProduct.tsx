'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { CategoryType, colors, ProductFormSchema, sizes } from '@repo/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/nextjs';

// const categories = ['T-shirts', 'Shoes', 'Accessories', 'Bags', 'Dresses', 'Jackets', 'Gloves'];

const fetchCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`);
    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }
    const data = await res.json();
    return data;
};

const AddProduct = () => {
    const form = useForm<z.infer<typeof ProductFormSchema>>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            name: '',
            shortDescription: '',
            description: '',
            price: 0,
            categorySlug: '',
            sizes: [],
            colors: [],
            images: {},
        },
    });

    const { data, isPending, error } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const { getToken } = useAuth();

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof ProductFormSchema>) => {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error('Failed to create product');
            }
        },
        onSuccess: () => {
            toast.success('Created product successfully');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <SheetContent>
            <ScrollArea className="h-screen">
                <SheetHeader>
                    <SheetTitle className="mb-4 ">Add Product</SheetTitle>
                    <SheetDescription asChild>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-8">
                                {/* Name */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription>Enter the product name.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Short description */}
                                <FormField
                                    control={form.control}
                                    name="shortDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Short description</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Enter the short description of the product.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Description */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormDescription>Enter the description of the product.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Price */}
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormDescription>Enter the price of the product.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Category */}
                                {data && (
                                    <FormField
                                        control={form.control}
                                        name="categorySlug"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Category</SelectLabel>
                                                                {data.map((cat: CategoryType) => (
                                                                    <SelectItem key={cat.id} value={cat.slug}>
                                                                        {cat.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormDescription>Enter the category for the product.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                {/* Sizes */}
                                <FormField
                                    control={form.control}
                                    name="sizes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sizes</FormLabel>
                                            <FormControl>
                                                <div className="grid grid-cols-3 gap-4 my-2">
                                                    {sizes.map((size) => {
                                                        return (
                                                            <div key={size} className="flex items-center gap-2">
                                                                <Checkbox
                                                                    id="size"
                                                                    checked={field.value?.includes(size)}
                                                                    onCheckedChange={(checked) => {
                                                                        const currentValues = field.value || [];
                                                                        if (checked) {
                                                                            field.onChange([...currentValues, size]);
                                                                        } else {
                                                                            field.onChange(
                                                                                currentValues.filter((v) => v !== size)
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                                <label htmlFor="size" className="text-xs">
                                                                    {size.toUpperCase()}
                                                                </label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                Select the available sizes for the product.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Colors */}
                                <FormField
                                    control={form.control}
                                    name="colors"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Colors</FormLabel>
                                            <FormControl>
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-3 gap-4 my-2">
                                                        {colors.map((color) => {
                                                            return (
                                                                <div key={color} className="flex items-center gap-2">
                                                                    <Checkbox
                                                                        id="color"
                                                                        checked={field.value?.includes(color)}
                                                                        onCheckedChange={(checked) => {
                                                                            const currentValues = field.value || [];
                                                                            if (checked) {
                                                                                field.onChange([
                                                                                    ...currentValues,
                                                                                    color,
                                                                                ]);
                                                                            } else {
                                                                                field.onChange(
                                                                                    currentValues.filter(
                                                                                        (v) => v !== color
                                                                                    )
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                    <label
                                                                        htmlFor="color"
                                                                        className="text-xs flex items-center gap-2 capitalize"
                                                                    >
                                                                        <div
                                                                            className="w-2 h-2 rounded-full"
                                                                            style={{ backgroundColor: color }}
                                                                        />
                                                                        {color}
                                                                    </label>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                Select the available colors for the product.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Images */}
                                <FormField
                                    control={form.control}
                                    name="images"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Images</FormLabel>
                                            <FormControl>
                                                <div className="">
                                                    {form.watch('colors').map((color) => (
                                                        <div key={color} className="mb-4 flex items-center gap-4">
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className="w-4 h-4 rounded-full"
                                                                    style={{ background: color }}
                                                                />
                                                                <span className="text-sm font-medium min-w-20">
                                                                    {color.charAt(0).toUpperCase() + color.slice(1)}:
                                                                </span>
                                                            </div>
                                                            <Input
                                                                onChange={async (e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        try {
                                                                            const formData = new FormData();
                                                                            formData.append('file', file);
                                                                            formData.append(
                                                                                'upload_preset',
                                                                                'ecommerce-microservice'
                                                                            );

                                                                            const res = await fetch(
                                                                                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                                                                                {
                                                                                    method: 'POST',
                                                                                    body: formData,
                                                                                }
                                                                            );
                                                                            const data = await res.json();
                                                                            console.log({ data });

                                                                            if (data.secure_url) {
                                                                                const currentImages =
                                                                                    form.getValues('images') || {};
                                                                                form.setValue('images', {
                                                                                    ...currentImages,
                                                                                    [color]: data.secure_url,
                                                                                });
                                                                            }
                                                                        } catch (error) {
                                                                            console.log(error);
                                                                            toast.error('Upload image failed');
                                                                        }
                                                                    }
                                                                }}
                                                                type="file"
                                                                accept="image/*"
                                                            />
                                                            {field.value?.[color] ? (
                                                                <span className="text-green-600 text-sm">
                                                                    Image selected
                                                                </span>
                                                            ) : (
                                                                <span className="text-red-600 text-sm">
                                                                    Image required
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    disabled={mutation.isPending}
                                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed "
                                    type="submit"
                                >
                                    {mutation.isPending ? 'Submitting...' : 'Submit'}
                                </Button>
                            </form>
                        </Form>
                    </SheetDescription>
                </SheetHeader>
            </ScrollArea>
        </SheetContent>
    );
};

export default AddProduct;
