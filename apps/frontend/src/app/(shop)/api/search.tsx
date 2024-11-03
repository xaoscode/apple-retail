import { NextResponse } from "next/server";

export async function searchProducts(query: string | null) {
    const res = await fetch(`http://localhost:3000/api/products/search?q=${query}`, {
        method: "GET",

    })
    return res.json()
}
