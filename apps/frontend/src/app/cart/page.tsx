"use client"
import styles from "./page.module.css";
import { Card } from "@/components/Card/Card";
import { useState } from "react";
import { IProduct } from "@repo/interfaces";
import { Text } from "@/components/Text/Text"
import Image from "next/image";
import { LinkText } from "@/components/LinkText/LinkText";
import Link from "next/link";
import { SwingButtons } from "@/components/Buttons/SwingButtons/SwingButtons";
import { StockStatus } from "@/components/StockStatus/StockStatus";

const ar = [
    {
        id: "asdfgadsfgasdgsfsdf",
        category: "phone",
        name: "iPhone 14",
        ram: 6,
        memory: 256,
        img: "/iphone13pro.jpg",
        cost: 55000,
        discountPercentage: 0,
        reviewNum: 1234,
        quantity: 1
    },
    {
        id: "asdffasdfasdfsffasdfsdf",
        category: "phone",
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        img: "/iphone14pro.jpg",
        cost: 55000,
        discountPercentage: 20,
        reviewNum: 345,
        quantity: 1
    },
    {
        id: "asasdfdfsfsdf",
        category: "phone",
        name: "iPhone 14",
        ram: 6,
        memory: 256,
        img: "/iphone13pro.jpg",
        cost: 55000,
        discountPercentage: 0,
        reviewNum: 1234,
        quantity: 1
    },
    {
        id: "asdffasdfasdfsffdasfsdf",
        category: "phone",
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        img: "/iphone14pro.jpg",
        cost: 55000,
        discountPercentage: 20,
        reviewNum: 345,
        quantity: 1
    },
    {
        id: "asdfdfsfsdf",
        category: "phone",
        name: "iPhone 14",
        ram: 6,
        memory: 256,
        img: "/iphone13pro.jpg",
        cost: 55000,
        discountPercentage: 0,
        reviewNum: 1234,
        quantity: 1
    },
    {
        id: "asdffasdfasdadfhgafsfsdf",
        category: "phone",
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        img: "/iphone14pro.jpg",
        cost: 55000,
        discountPercentage: 20,
        reviewNum: 345,
        quantity: 1
    },
    {
        id: "asdfsgafsdf",
        category: "phone",
        name: "iPhone 14",
        ram: 6,
        memory: 256,
        img: "/iphone13pro.jpg",
        cost: 55000,
        discountPercentage: 0,
        reviewNum: 1234,
        quantity: 1
    },
    {
        id: "asdffasdfasdgsafsfsdf",
        category: "phone",
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        img: "/iphone14pro.jpg",
        cost: 55000,
        discountPercentage: 20,
        reviewNum: 345,
        quantity: 1
    },
    {
        id: "asdfsfsdasgdf",
        category: "phone",
        name: "iPhone 14",
        ram: 6,
        memory: 256,
        img: "/iphone13pro.jpg",
        cost: 55000,
        discountPercentage: 0,
        reviewNum: 1234,
        quantity: 1
    },
    {
        id: "asdffasdfasdfsfdasfsdf",
        category: "phone",
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        img: "/iphone14pro.jpg",
        cost: 55000,
        discountPercentage: 20,
        reviewNum: 345,
        quantity: 1
    },
]



export default function Cart() {
    interface ICartItem extends IProduct {
        quantity: number
    }

    const [products, setProducts] = useState<ICartItem[]>(ar)
    const removeProduct = (productId: string) => {
        setProducts(products.filter(product => product.id !== productId))
    }
    const addProduct = (productId: string) => {
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
                            <Image src={ product.img } alt={ "product-img" } width={ 120 } height={ 120 }></Image>
                        </Link>
                        <div className={ styles['product-action'] }>
                            <LinkText>{ product.name }</LinkText>
                            <SwingButtons onAdd={ () => { addProduct } } count={ product.quantity } onRemove={ () => removeProduct(product.id) }></SwingButtons>
                            <StockStatus status="available-for-order"></StockStatus>
                        </div>
                    </Card>
                ))
            }
        </div >

    );
}
