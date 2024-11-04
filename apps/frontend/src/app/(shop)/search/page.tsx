import { useSearchParams } from "next/navigation";
import { searchProducts } from "../api/search";
import { SearchResult } from "./components/SearchResult/SearchResult";
import { IProduct } from "@repo/interfaces";
import styles from "./page.module.css"
import Image from "next/image"
import { API } from "@/app/api";
import { Dropdown } from "@/components/DropdownMenu/DropdownMenu";
interface SearchPageProps {
    searchParams: { [key: string]: string | string[] };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = searchParams.q as string;
    const response = await searchProducts(query)


    return (
        <div className={ styles.body }>
            <div className={ styles.result__filter }>
                <Dropdown />
            </div>
            <div>
                <span>Найдено совпадений - { response.length }</span>
            </div>
            { response.map((product: IProduct) => (
                <div className={ styles.product } key={ product.id }>
                    { product.id }
                    <Image src={ `${API.productImage.get}${product.titleImg}.jpg` } alt={ product.titleImg } width={ 200 } height={ 200 }></Image>
                </div>
            )) }
        </div>
    )
}