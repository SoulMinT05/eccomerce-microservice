import ProductList from '@/components/ProductList';
import React from 'react';

const ProductsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ category: string; sort: string; search: string }>;
}) => {
    const category = (await searchParams).category;
    const search = (await searchParams).search;
    const sort = (await searchParams).sort;

    // const { category, search, sort } = await searchParams;

    return (
        <div>
            <ProductList category={category} sort={sort} search={search} params="products" />
        </div>
    );
};

export default ProductsPage;
