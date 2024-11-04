import { IProduct } from "@repo/interfaces"
import Image from "next/image"
import styles from "./DiscountCarousel.module.css";
import { getProducts } from "@/app/(shop)/api/products";
import EmblaCarousel from "@/components/EmblaCarousel/EmblaCarousel";
import { Text } from '@/components/Text/Text'
import { Button } from "@/components/Buttons/Button/Button";
import { HeartButton } from "@/components/Buttons/HeartButton/HeartButton";
import { API } from "@/app/api";



export async function DiscountCarousel() {

    const calcDiscount = (price: number, percentage: number): number => {
        return price - (price * percentage / 100)
    }
    const products: IProduct[] = await getProducts()
    const hueducts = products.map((product: IProduct, index: number) => (
        <div key={ product.id } className={ styles["product-with-discount"] }>

            <Text size={ "3" }>Скидка</Text>
            <div className={ styles["description-text"] }>Смартфон { product.name }, { product.memory }Гб, [{ product.ram }гб] </div>
            <div className={ styles["price-wrap"] }>
                <div className={ styles["price-text"] } >{ product.price } ₽</div>
                <div className={ styles["price-with-discount-text"] }>
                    { Number(calcDiscount(product.price, product.discount)).toFixed(2) } ₽
                </div>
            </div>
            <div className={ styles["action-wrap"] }>
                <div className={ styles["action"] }>
                    <Button className={ styles.button } size="medium" design="outline">Подробнее</Button>
                    <HeartButton activated={ false }></HeartButton>
                </div>
                <Image width={ 120 } height={ 120 } src={ `${API.productImage.get}${product.titleImg}.jpg` } alt={ `image ${product.titleImg}` } />
            </div>
        </div>
    ))
    return (
        <EmblaCarousel slides={ hueducts } />
    )
}