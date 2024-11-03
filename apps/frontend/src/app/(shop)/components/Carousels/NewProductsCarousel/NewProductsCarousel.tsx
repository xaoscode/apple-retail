import { IProduct } from "@repo/interfaces"
import Image from "next/image"
import styles from "./NewProductsCarousel.module.css";
import { getProducts } from "@/app/(shop)/api/products";
import EmblaCarousel from "@/components/EmblaCarousel/EmblaCarousel";
import { API } from "@/app/api";



export async function NewProductsCarousel() {
    const products: IProduct[] = await getProducts()
    const hueducts = products.map((product: IProduct, index: number) => (
        <div className={ styles.product } key={ product.id }>
            <Image src={ `${API.productImage.get}${product.titleImg}.jpg` } alt={ "" } width={ 300 } height={ 300 }></Image>
        </div>
    ))
    return (
        <EmblaCarousel slides={ hueducts } />
    )
}