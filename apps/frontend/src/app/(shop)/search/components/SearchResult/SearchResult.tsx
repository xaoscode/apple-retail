// search/components/SearchResult/SearchResult.tsx
"use server";

import { useEffect, useState } from 'react';
import { searchProducts } from '@/app/(shop)/api/search';
import { IProduct } from '@repo/interfaces';
import { useSearchParams } from 'next/navigation';

interface SearchResultProps {
}

export async function SearchResult({ ...props }: SearchResultProps) {
    const response = await fetch(`http://localhost:3000/api/products/search`, {
        method: "GET",
    });

    const data: IProduct[] = await response.json();

    return (
        <div>
            { data.map((product: IProduct) => (
                <div key={ product.id }>{ product.id }</div>
            )) }
        </div>
    );
}
