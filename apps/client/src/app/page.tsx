import Image from 'next/image';

import slider from '../../public/featured.png';
import ProductList from '@/components/ProductList';

const Homepage = async ({ searchParams }: { searchParams: Promise<{ category: string }> }) => {
    const category = (await searchParams).category;
    console.log({ category });
    return (
        <div className="">
            <div className="relative aspect-3/1 mb-12">
                <Image src={slider} alt="Featured Product" fill />
            </div>
            <ProductList category={category} params="homepage" />
        </div>
    );
};

export default Homepage;
