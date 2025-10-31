import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import logo from '../../public/logo.png';

const Footer = () => {
    return (
        <div className="mt-16 flex flex-col gap-8 items-center md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg">
            <div className="flex flex-col gap-4 items-center md:items-start">
                <Link href="/" className="flex items-center">
                    <Image src={logo} alt="Logo" width={36} height={36} />
                    <p className="hidden md:block text-md font-medium tracking-wider text-white">TAMNGUYEN</p>
                </Link>
                <p className="text-sm text-gray-400">@ 2025 TAMNGUYEN</p>
                <p className="text-sm text-gray-400">All rights reserved</p>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className="text-sm text-amber-50">Links</p>
                <Link href="/">Homepage</Link>
                <Link href="/">Contact</Link>
                <Link href="/">Terms of service</Link>
                <Link href="/">Privacy Policy</Link>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className="text-sm text-amber-50">Links</p>
                <Link href="/">Homepage</Link>
                <Link href="/">Contact</Link>
                <Link href="/">Terms of service</Link>
                <Link href="/">Privacy Policy</Link>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className="text-sm text-amber-50">Links</p>
                <Link href="/">Homepage</Link>
                <Link href="/">Contact</Link>
                <Link href="/">Terms of service</Link>
                <Link href="/">Privacy Policy</Link>
            </div>
        </div>
    );
};

export default Footer;
