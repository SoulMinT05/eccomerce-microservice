import { cn } from '@/lib/utils';
import React from 'react';

const CustomButton = ({ disabled, isRounded }: { disabled: boolean; isRounded: boolean }) => {
    return (
        // <button className={`text-sm ${disabled ? 'bg-gray-300' : 'bg-blue-500'} ${isRounded && 'rounded-full'}, p-4`}>
        //     Custom Button,
        // </button>
        <button className={cn('text-sm', disabled ? 'bg-gray-300' : 'bg-blue-500', isRounded && 'rounded-full', 'p-4')}>
            Custom Button
        </button>
    );
};

export default CustomButton;
