import { NewsPanelProps } from "./NewsPanel.props";
import styles from "./NewsPanel.module.css";
import { Button } from "@/components/Button/Button";
import Image from "next/image";
import { RefObject, useRef, useState } from "react";
import { IProduct } from '@repo/interfaces';

import { Text } from "@/components/Text/Text";

const ar = [{
    id: "asdfsfsdf",
    category: "phone",
    name: "iPhone 14",
    ram: "6",
    memory: "256",
    image: "/iphone13pro.jpg"
},
{
    id: "asdffasdfasdfsfsdf",
    category: "phone",
    name: "iPhone 15",
    ram: "6",
    memory: "256",
    image: "/iphone14pro.jpg"

}, {
    id: "asdfsfsdf",
    category: "phone",
    name: "iPhone 14",
    ram: "6",
    memory: "256",
    image: "/iphone13pro.jpg"
},
{
    id: "asdffasdfasdfsfsdf",
    category: "phone",
    name: "iPhone 15",
    ram: "6",
    memory: "256",
    image: "/iphone14pro.jpg"

}, {
    id: "asdfsfsdf",
    category: "phone",
    name: "iPhone 14",
    ram: "6",
    memory: "256",
    image: "/iphone13pro.jpg"
},
{
    id: "asdffasdfasdfsfsdf",
    category: "phone",
    name: "iPhone 15",
    ram: "6",
    memory: "256",
    image: "/iphone14pro.jpg"

}, {
    id: "asdfsfsdf",
    category: "phone",
    name: "iPhone 14",
    ram: "6",
    memory: "256",
    image: "/iphone13pro.jpg"
},
{
    id: "asdffasdfasdfsfsdf",
    category: "phone",
    name: "iPhone 15",
    ram: "6",
    memory: "256",
    image: "/iphone14pro.jpg"

},]
export const NewsPanel = ({ ...props }: NewsPanelProps): JSX.Element => {
    const [newsImages, setNewsImages] = useState(ar);

    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollByProductWidth = (direction: number) => {
        if (carouselRef.current) {
            const productElement = carouselRef.current.querySelector(`.${styles.product}`);
            if (productElement instanceof HTMLElement) {
                const productWidth = productElement.offsetWidth;
                carouselRef.current.scrollBy({
                    left: direction * productWidth,
                    behavior: 'smooth',
                });
            }
        }
    };

    const scrollLeft = () => scrollByProductWidth(-1);
    const scrollRight = () => scrollByProductWidth(1);

    return (
        <div className={ styles.carouselContainer }>
            <Button icon="/left-arrow.svg" size="medium" design="borderless" onClick={ scrollLeft } className={ `${styles.scrollButton} ${styles.leftButton}` }></Button>
            <div className={ styles.carousel } ref={ carouselRef }>
                { newsImages.map((product, index) => (
                    <div key={ index } className={ styles.product }>
                        <div className={ styles['action'] }>
                            <Text size={ "3" } >{ product.name }</Text>
                            <Button size="small" design="filled">Купить</Button>
                        </div>
                        <img className={ styles['img'] } src={ product.image } alt={ product.name } />
                    </div>
                )) }
            </div>
            <Button icon="/right-arrow.svg" size="medium" design="borderless" onClick={ scrollRight } className={ `${styles.scrollButton} ${styles.rightButton}` }></Button>
        </div>
    );
};
