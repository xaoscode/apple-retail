"use client"
import styles from "./page.module.css";
import { Card } from "@/components/Card/Card";
import { useState } from "react";
import { Category, IProduct } from "@repo/interfaces/src/lib/product.interface";
import Image from "next/image";
import { LinkText } from "@/components/LinkText/LinkText";
import Link from "next/link";
import { SwingButtons } from "@/components/Buttons/SwingButtons/SwingButtons";
import { StockStatus } from "@/components/StockStatus/StockStatus";

const ar = [
    {
        id: 1,
        category: Category.iPhone,
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        titleImg: "/iphone14pro.jpg",
        price: 55000,
        discount: 20,
        reviewNum: 345,
        rating: 4,
        quantity: 45
    },
    {
        id: 2,
        category: Category.iPhone,
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        titleImg: "/iphone14pro.jpg",
        price: 55000,
        discount: 20,
        reviewNum: 345,
        rating: 4,
        quantity: 45
    },
    {
        id: 3,
        category: Category.iPhone,
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        titleImg: "/iphone14pro.jpg",
        price: 55000,
        discount: 20,
        reviewNum: 345,
        rating: 4,
        quantity: 45
    },
    {
        id: 4,
        category: Category.iPhone,
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        titleImg: "/iphone14pro.jpg",
        price: 55000,
        discount: 20,
        reviewNum: 345,
        rating: 4,
        quantity: 45
    },
    {
        id: 5,
        category: Category.iPhone,
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        titleImg: "/iphone14pro.jpg",
        price: 55000,
        discount: 20,
        reviewNum: 345,
        rating: 4,
        quantity: 45
    },
]



export default function Cart() {
    interface ICartItem extends IProduct {
        quantity: number
    }

    const [products, setProducts] = useState<ICartItem[]>(ar)
    const removeProduct = (productId: number) => {
        setProducts(products.filter(product => product.id !== productId))
    }
    const addProduct = (productId: number) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            )
        );
    }

    const sum = 0;
    const sumWithInitial = products.reduce((acc, product: ICartItem) => acc + product.quantity, sum);


    return (
        <div className={ styles['cart-wrap'] }>
            <div className={ styles['header-wrap'] }>
                <div className={ styles['header'] }>Корзина</div>
                <div className={ styles['sub-header'] }> { sumWithInitial } товаров</div>
            </div>
            { products &&
                products.map((product: ICartItem) => (
                    <Card key={ product.id } className={ styles['product-wrap'] }>
                        <Link href={ "/cart" }>
                            <Image src={ product.titleImg } alt={ "product-img" } width={ 120 } height={ 120 }></Image>
                        </Link>
                        <div className={ styles['product-action'] }>
                            <LinkText>{ product.name }</LinkText>
                            {/* <SwingButtons onAdd={ () => { addProduct } } count={ product.quantity } onRemove={ () => removeProduct(product.id) }></SwingButtons> */ }
                            <StockStatus status="available-for-order"></StockStatus>
                        </div>
                    </Card>
                ))
            }
        </div >

    );
}
