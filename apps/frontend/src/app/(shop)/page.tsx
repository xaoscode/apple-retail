'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/Buttons/Button/Button";
import { Text } from '@/components/Text/Text'
import { Rating } from "@/components/Rating/Rating";
import { Category, IProduct } from "@repo/interfaces/src/lib/product.interface";
import { HeartButton } from "@/components/Buttons/HeartButton/HeartButton";
import { CartButton } from "@/components/Buttons/CartButton/CartButton";
import { PricePanel } from "@/components/PricePanel/PricePanel";
import Link from "next/link";
import TrashIcon from "../../../public/trash.svg"
import { Carousel } from "@/components/Carousel/Carousel";

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
    rating: 4
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
    rating: 4
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
    rating: 4
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
    rating: 4
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
    rating: 4
  },
]


export default function Home() {

  const calcDiscount = (price: number, percentage: number): number => {
    return price - (price * percentage / 100)
  }
  return (
    <main className={ styles.main }>
      <Carousel background={ false } products={ ar } visable={ true } renderProduct={ function (product: IProduct, index: number): JSX.Element {
        return <div className={ styles['product-news'] }>
          <Image width={ 300 } height={ 300 } src={ product.titleImg } alt={ product.name } />

        </div>
      } }>

      </Carousel>

      <Carousel background={ true } products={ ar } visable={ true } renderProduct={ function (product: IProduct, index: number): JSX.Element {
        return <div className={ styles["product-with-discount"] }>

          <Text size={ "3" }>Скидка</Text>
          <div className={ styles["description-text"] }>Смартфон { product.name }, { product.memory }Гб, [{ product.ram }гб] </div>
          <div className={ styles["price-wrap"] }>
            <div className={ styles["price-text"] } >{ product.price } ₽</div>
            <div className={ styles["price-with-discount-text"] }>
              { calcDiscount(product.price, product.discount) } ₽
            </div>
          </div>
          <div className={ styles["action-wrap"] }>
            <div className={ styles["action"] }>
              <Button className={ styles.button } size="medium" design="outline">Подробнее</Button>
              <HeartButton activated={ false }></HeartButton>
            </div>
            <Image width={ 120 } height={ 120 } src={ product.titleImg } alt={ product.name } />
          </div>
        </div>
      } } />

      < Carousel background={ false } products={ ar } visable={ true } renderProduct={
        function (product: IProduct, index: number): JSX.Element {
          return <div className={ styles["product-history"] }>
            <div className={ styles['action-wrap-history'] }>
              <div className={ styles["offer"] }>
              </div>
              <Image width={ 160 } height={ 160 } src={ product.titleImg } alt={ product.name } />
              <button className={ styles['trash-button'] }>
                <TrashIcon></TrashIcon>
              </button>
            </div>
            <p className={ styles.text }>Смартфон iPhone 14, 256Гб, [32гб]  </p>
            <Link className={ styles.link } href={ "/cart" }>
              <Rating reviewNum={ product.reviewNum } rating={ product.rating } isEditable={ false } />
            </Link>
            <div className={ styles['actions'] }>
              <PricePanel price={ product.price } discountPercentage={ product.discount }></PricePanel>
              <CartButton activated={ false }></CartButton>
            </div>

          </div>
        }
      } />
    </main >
  );
}
