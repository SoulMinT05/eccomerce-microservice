'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { CategoryFormSchema } from '@repo/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/nextjs';

const AddCategory = () => {
    const form = useForm<z.infer<typeof CategoryFormSchema>>({
        resolver: zodResolver(CategoryFormSchema),
        defaultValues: {
            name: '',
            slug: '',
        },
    });

    const { getToken } = useAuth();

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof CategoryFormSchema>) => {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error('Failed to create category');
            }
        },
        onSuccess: () => {
            toast.success('Created category successfully');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="mb-4">Add Category</SheetTitle>
                <SheetDescription asChild>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>Enter category name.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category slug</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>Enter category slug.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />{' '}
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
        </SheetContent>
    );
};

export default AddCategory;
