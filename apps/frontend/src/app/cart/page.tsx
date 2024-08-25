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
        id: "asdfsfsdf",
        category: "phone",
        name: "iPhone 14",
        ram: 6,
        memory: 256,
        img: "/iphone13pro.jpg",
        cost: 55000,
        discountPercentage: 0,
        reviewNum: 1234
    },
    {
        id: "asdffasdfasdfsfsdf",
        category: "phone",
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        img: "/iphone14pro.jpg",
        cost: 55000,
        discountPercentage: 20,
        reviewNum: 345
    },
    {
        id: "asdfsfsdf",
        category: "phone",
        name: "iPhone 14",
        ram: 6,
        memory: 256,
        img: "/iphone13pro.jpg",
        cost: 55000,
        discountPercentage: 0,
        reviewNum: 1234
    },
    {
        id: "asdffasdfasdfsfsdf",
        category: "phone",
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        img: "/iphone14pro.jpg",
        cost: 55000,
        discountPercentage: 20,
        reviewNum: 345
    },
    {
        id: "asdfsfsdf",
        category: "phone",
        name: "iPhone 14",
        ram: 6,
        memory: 256,
        img: "/iphone13pro.jpg",
        cost: 55000,
        discountPercentage: 0,
        reviewNum: 1234
    },
    {
        id: "asdffasdfasdfsfsdf",
        category: "phone",
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        img: "/iphone14pro.jpg",
        cost: 55000,
        discountPercentage: 20,
        reviewNum: 345
    },
    {
        id: "asdfsfsdf",
        category: "phone",
        name: "iPhone 14",
        ram: 6,
        memory: 256,
        img: "/iphone13pro.jpg",
        cost: 55000,
        discountPercentage: 0,
        reviewNum: 1234
    },
    {
        id: "asdffasdfasdfsfsdf",
        category: "phone",
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        img: "/iphone14pro.jpg",
        cost: 55000,
        discountPercentage: 20,
        reviewNum: 345
    },
    {
        id: "asdfsfsdf",
        category: "phone",
        name: "iPhone 14",
        ram: 6,
        memory: 256,
        img: "/iphone13pro.jpg",
        cost: 55000,
        discountPercentage: 0,
        reviewNum: 1234
    },
    {
        id: "asdffasdfasdfsfsdf",
        category: "phone",
        name: "iPhone 15",
        ram: 6,
        memory: 256,
        img: "/iphone14pro.jpg",
        cost: 55000,
        discountPercentage: 20,
        reviewNum: 345
    },
]



export default function Cart() {

    const [products, setProducts] = useState<IProduct[]>(ar)

    return (

        <div className={ styles['cart-wrap'] }>
            <div className={ styles['header-wrap'] }>
                <div className={ styles['header'] }>Корзина</div>
                <div className={ styles['sub-header'] }>{ products.length } товаров</div>
            </div>
            { products &&
                products.map((product: IProduct) => (
                    <Card key={ product.id } className={ styles['product-wrap'] }>
                        <Link href={ "/cart" }>
                            <Image src={ product.img } alt={ "product-img" } width={ 120 } height={ 120 }></Image>
                        </Link>
                        <div className={ styles['product-action'] }>
                            <LinkText>{ product.name }</LinkText>
                            <SwingButtons></SwingButtons>
                            <StockStatus status="available-for-order"></StockStatus>
                        </div>
                    </Card>
                ))
            }
        </div >

    );
}
