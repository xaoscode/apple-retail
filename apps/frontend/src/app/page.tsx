"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { SubText } from "@/components/SubText/SubText";
import { TextArea } from "@/components/TextArea/TextArea";
import { SupportChat } from "./components/SupportChat/SupportChat";
import { Text } from '@/components/Text/Text'
import { AuthCard } from "./components/LoginCard/AuthCard";
import { Carousel } from "./components/Carousel/Carousel";
import { Rating } from "@/app/components/Rating/Rating";
import { IProduct } from "@repo/interfaces";
import { HeartButton } from "@/components/HeartButton/HeartButton";
import { useState } from "react";
import { Metadata } from "next";
import { trace } from "console";

const ar = [
  {
    id: "asdfsfsdf",
    category: "phone",
    name: "iPhone 14",
    ram: 6,
    memory: 256,
    img: "/iphone13pro.jpg",
    cost: 55000,
    discountPercentage: 20
  },
  {
    id: "asdffasdfasdfsfsdf",
    category: "phone",
    name: "iPhone 15",
    ram: 6,
    memory: 256,
    img: "/iphone14pro.jpg",
    cost: 55000,
    discountPercentage: 20
  },
  {
    id: "asdfsfsdf",
    category: "phone",
    name: "iPhone 14",
    ram: 6,
    memory: 256,
    img: "/iphone13pro.jpg",
    cost: 55000,
    discountPercentage: 20
  },
  {
    id: "asdffasdfasdfsfsdf",
    category: "phone",
    name: "iPhone 15",
    ram: 6,
    memory: 256,
    img: "/iphone14pro.jpg",
    cost: 55000,
    discountPercentage: 20
  },
  {
    id: "asdfsfsdf",
    category: "phone",
    name: "iPhone 14",
    ram: 6,
    memory: 256,
    img: "/iphone13pro.jpg",
    cost: 55000,
    discountPercentage: 20
  },
  {
    id: "asdffasdfasdfsfsdf",
    category: "phone",
    name: "iPhone 15",
    ram: 6,
    memory: 256,
    img: "/iphone14pro.jpg",
    cost: 55000,
    discountPercentage: 20
  },
  {
    id: "asdfsfsdf",
    category: "phone",
    name: "iPhone 14",
    ram: 6,
    memory: 256,
    img: "/iphone13pro.jpg",
    cost: 55000,
    discountPercentage: 20
  },
  {
    id: "asdffasdfasdfsfsdf",
    category: "phone",
    name: "iPhone 15",
    ram: 6,
    memory: 256,
    img: "/iphone14pro.jpg",
    cost: 55000,
    discountPercentage: 20
  }
]


export default function Home() {
  const [rating, setRating] = useState<number>(4)

  function calcDiscount(cost: number, percentage: number): number {
    return cost - (cost * percentage / 100)
  }

  return (
    <main className={ styles.main }>
      <Carousel background={ false } products={ ar } visable={ true } renderProduct={ function (product: IProduct, index: number): JSX.Element {
        return <div className={ styles['product-news'] }>
          <Image width={ 300 } height={ 300 } src={ product.img } alt={ product.name } />

        </div>
      } }>

      </Carousel>

      <Carousel background={ true } products={ ar } visable={ true } renderProduct={ function (product: IProduct, index: number): JSX.Element {
        return <div className={ styles["product-with-discount"] }>

          <Text size={ "3" }>Скидка</Text>
          <p className={ styles["description-text"] }>Смартфон iPhone 14, 256Гб, [32гб] </p>
          <div className={ styles["cost-wrap"] }>
            <div className={ styles["cost-text"] } >{ product.cost } ₽</div>
            <div className={ styles["cost-with-discount-text"] }>
              { calcDiscount(product.cost, product.discountPercentage) } ₽
            </div>
          </div>
          <div className={ styles["action-wrap"] }>
            <div className={ styles["action"] }>
              <Button className={ styles.button } size="medium" design="outline">Подробнее</Button>
              <HeartButton activated={ false }></HeartButton>
            </div>
            <Image width={ 120 } height={ 120 } src={ product.img } alt={ product.name } />
          </div>
        </div>
      } } />

      <Carousel background={ false } products={ ar } visable={ true } renderProduct={ function (product: IProduct, index: number): JSX.Element {
        return <div className={ styles["product-history"] }>
          <div className={ styles['action-wrap-history'] }>
            <div className={ styles["offer"] }>
            </div>
            <Image width={ 160 } height={ 160 } src={ product.img } alt={ product.name } />
            <button className={ styles['trash-button'] }>
              <Image width={ 20 } height={ 20 } src={ "trash.svg" } alt={ "trash" }></Image>
            </button>
          </div>
          <p className={ styles.text }>Смартфон iPhone 14, 256Гб, [32гб]  </p>
          <Rating rating={ rating } isEditable={ true } setRating={ setRating } />

        </div>
      } } />
    </main>
  );
}
