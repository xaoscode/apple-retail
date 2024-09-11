'use client'
import { CarouselProps } from "./Carousel.props";
import styles from "./Carousel.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import cn from "classnames"
import { IProduct } from "@repo/interfaces";



export const Carousel = ({ visable, background, renderProduct, products, ...props }: CarouselProps) => {
    enum Direction {
        left = -1,
        rigth = 1
    }
    const carouselRef = useRef<HTMLDivElement>(null);
    const scrollByProductWidth = (direction: Direction) => {
        if (carouselRef.current) {
            const productElement = carouselRef.current.querySelector(`.${styles.product}`);
            if (productElement instanceof HTMLElement) {
                const productWidth = productElement.offsetWidth + 10;
                const scrollPosition = carouselRef.current.scrollLeft;
                const maxScrollPosition = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
                if (direction === Direction.rigth) {
                    if (scrollPosition + 1 > maxScrollPosition) {
                        carouselRef.current.scrollTo({
                            left: 0,
                            behavior: 'smooth',
                        });
                    } else {
                        carouselRef.current.scrollBy({
                            left: direction * productWidth,
                            behavior: 'smooth',
                        });
                    }
                }

                if (direction === Direction.left) {
                    if (scrollPosition === 0) {
                        carouselRef.current.scrollTo({
                            left: maxScrollPosition,
                            behavior: 'smooth',
                        });
                    } else {
                        carouselRef.current.scrollBy({
                            left: direction * productWidth,
                            behavior: 'smooth',
                        });
                    }
                }
                console.log(scrollPosition)

            }
        }
    };


    return (
        visable &&
        <div { ...props } className={ cn(styles.carouselContainer, { [styles.carouselBack]: background }) }>
            <button onClick={ () => scrollByProductWidth(Direction.left) } className={ `${styles.scrollButton} ${styles.leftButton}` } >
                <Image width={ 25 } height={ 25 } src={ "/left-arrow.svg" } alt={ "left-arrow" } />
            </button>
            <div className={ cn(styles.carousel) } ref={ carouselRef }>
                { products.map((product, index) => (
                    <div key={ index } className={ cn(styles.product, { [styles.back]: background }) }  >
                        { renderProduct(product, index) }
                    </div>
                )) }
            </div>
            <button onClick={ () => scrollByProductWidth(Direction.rigth) } className={ `${styles.scrollButton} ${styles.rightButton}` } >
                <Image width={ 25 } height={ 25 } src={ "/right-arrow.svg" } alt={ "right-arrow" } />
            </button>
        </div >
    );
};
