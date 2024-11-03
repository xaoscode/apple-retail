import { IProduct } from "@repo/interfaces"
import Image from "next/image"
import styles from "./HistoryCarousel.module.css";
import { getProducts } from "@/app/(shop)/api/products";
import EmblaCarousel from "@/components/EmblaCarousel/EmblaCarousel";
import { CartButton } from "@/components/Buttons/CartButton/CartButton";
import { PricePanel } from "@/components/PricePanel/PricePanel";
import { Rating } from "@/components/Rating/Rating";
import Link from "next/link";
import TrashIcon from "@/../public/trash.svg"
import { API } from "@/app/api";


export async function HistoryCarousel() {
    const products: IProduct[] = await getProducts()
    const hueducts = products.map((product: IProduct, index: number) => (
        <div key={ product.id } className={ styles["product-history"] }>
            <div className={ styles['action-wrap-history'] }>

                <Image width={ 160 } height={ 160 } src={ `${API.productImage.get}${product.titleImg}.jpg` } alt={ product.name } />
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
    ))
    return (
        <div className={ styles.background }>
            <EmblaCarousel slides={ hueducts } />

        </div>
    )
}