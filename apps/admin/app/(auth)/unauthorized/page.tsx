'use client';

import { useAuth } from '@clerk/nextjs';
import React from 'react';

const UnauthorizedPage = () => {
    const { signOut } = useAuth();
    return (
        <div className="">
            <h1 className="">You do not have an access</h1>
            <button onClick={() => signOut()} className="">
                Sign out
            </button>
        </div>
    );
};

export default UnauthorizedPage;
