'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';

const formSchema = z.object({
    name: z.string().min(1, { error: 'Name is required' }),
});

const AddCategory = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="mb-4">Add Category</SheetTitle>
                <SheetDescription asChild>
                    <Form {...form}>
                        <form className="space-y-8">
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
                            />{' '}
                            <Button className="w-full" type="submit">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    );
};

export default AddCategory;
