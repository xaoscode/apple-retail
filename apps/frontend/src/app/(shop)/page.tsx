"use server"
import styles from "./page.module.css";
import { NewProductsCarousel } from "./components/Carousels/NewProductsCarousel/NewProductsCarousel";
import { DiscountCarousel } from "./components/Carousels/DiscountCarousel/DiscountCarousel";
import { HistoryCarousel } from "./components/Carousels/HistoryCarousel/HistoryCarousel";



export default async function Home() {


  const NewProducts = await NewProductsCarousel()
  return (
    <main className={ styles.main }>

      <NewProductsCarousel />
      <DiscountCarousel />
      <HistoryCarousel />


    </main >
  );
}
