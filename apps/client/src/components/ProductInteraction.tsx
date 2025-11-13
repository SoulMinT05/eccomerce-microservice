'use client';
import useCartStore from '@/app/stores/cardStore';
import { ProductType } from '@repo/types';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ProductInteraction = ({
    product,
    selectedSize,
    selectedColor,
}: {
    product: ProductType;
    selectedSize: string;
    selectedColor: string;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { addToCart } = useCartStore();

    const [quantity, setQuantity] = useState(1);

    const handleTypeChange = (type: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(type, value);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleQuantityChange = (type: 'increment' | 'decrement') => {
        if (type === 'increment') {
            setQuantity((prev) => prev + 1);
        } else {
            if (quantity > 1) setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity,
            selectedSize,
            selectedColor,
        });
        toast.success('Add product to cart successfully');
    };

    const handleBuyItem = () => {};
    return (
        <div className="flex flex-col gap-4 mt-4">
            {/* Size */}
            <div className="flex flex-col gap-2 text-xs">
                <span className="text-gray-500">Size</span>
                <div className="flex items-center gap-2">
                    {product.sizes.map((size) => (
                        <div
                            key={size}
                            onClick={() => handleTypeChange('size', size)}
                            className={`cursor-pointer border p-0.5 ${selectedSize === size ? 'border-gray-600' : 'border-gray-300'}`}
                        >
                            <div
                                className={`w-6 h-6 text-center flex items-center justify-center ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
                            >
                                {size.toUpperCase()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Color */}
            <div className="flex flex-col gap-2 text-sm">
                <span className="text-gray-500">Color</span>
                <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                        <div
                            key={color}
                            onClick={() => handleTypeChange('color', color)}
                            className={`cursor-pointer border p-0.5 ${selectedSize === color ? 'border-gray-300' : 'border-white'}`}
                        >
                            <div className={`w-6 h-6`} style={{ backgroundColor: color }} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Quantity */}
            <div className="flex flex-col gap-2 text-sm">
                <span className="text-gray-500">Quantity</span>
                <div className="flex items-center gap-2">
                    <button
                        className="cursor-pointer border border-gray-300 p-1"
                        onClick={() => handleQuantityChange('decrement')}
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="">{quantity}</span>
                    <button
                        className="cursor-pointer border border-gray-300 p-1"
                        onClick={() => handleQuantityChange('increment')}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>
            {/* Buttons */}
            <button
                onClick={handleAddToCart}
                className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center 
                gap-2 text-sm font-medium cursor-pointer"
            >
                <Plus className="w-4 h-4" />
                Add to cart
            </button>
            <button
                className="ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center 
                justify-center gap-2 text-sm font-medium cursor-pointer"
            >
                <ShoppingCart className="w-4 h-4" />
                Buy this item
            </button>
        </div>
    );
};

export default ProductInteraction;
