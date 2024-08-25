"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/Buttons/Button/Button";
import { Text } from '@/components/Text/Text'
import { Carousel } from "../components/Carousel/Carousel";
import { Rating } from "@/components/Rating/Rating";
import { IProduct } from "@repo/interfaces";
import { HeartButton } from "@/components/Buttons/HeartButton/HeartButton";
import { useState } from "react";
import { CartButton } from "@/components/Buttons/CartButton/CartButton";
import { PricePanel } from "@/components/PricePanel/PricePanel";
import Link from "next/link";
import TrashIcon from "../../public/trash.svg"

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


export default function Home() {
  const [rating, setRating] = useState<number>(4)

  const calcDiscount = (cost: number, percentage: number): number => {
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
          <div className={ styles["description-text"] }>Смартфон { product.name }, { product.memory }Гб, [{ product.ram }гб] </div>
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

      < Carousel background={ false } products={ ar } visable={ true } renderProduct={
        function (product: IProduct, index: number): JSX.Element {
          return <div className={ styles["product-history"] }>
            <div className={ styles['action-wrap-history'] }>
              <div className={ styles["offer"] }>
              </div>
              <Image width={ 160 } height={ 160 } src={ product.img } alt={ product.name } />
              <button className={ styles['trash-button'] }>
                <TrashIcon></TrashIcon>
              </button>
            </div>
            <p className={ styles.text }>Смартфон iPhone 14, 256Гб, [32гб]  </p>
            <Link className={ styles.link } href={ "/cart" }>
              <Rating reviewNum={ product.reviewNum } rating={ rating } isEditable={ false } setRating={ setRating } />
            </Link>
            <div className={ styles['actions'] }>
              <PricePanel cost={ product.cost } discountPercentage={ product.discountPercentage }></PricePanel>
              <CartButton activated={ false }></CartButton>
            </div>

          </div>
        }
      } />
    </main >
  );
}
