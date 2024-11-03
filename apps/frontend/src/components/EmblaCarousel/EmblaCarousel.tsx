"use client"
import React, { Children } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {

    usePrevNextButtons
} from './components/EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import styles from "./EmblaCarousel.module.css"
import { IProduct } from '@repo/interfaces'
import Image from "next/image"
import AutoScroll from 'embla-carousel-auto-scroll'
type PropType = {
    slides: JSX.Element[]
    options?: EmblaOptionsType
}

export function EmblaCarousel({ slides, ...props }: PropType): JSX.Element {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })


    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <section className={ styles.embla }>
            <button
                onClick={ onPrevButtonClick }
                className={ `${styles.scrollButton} ${styles.leftButton}` }
            >
                <Image width={ 25 } height={ 25 } src="/left-arrow.svg" alt="left-arrow" />

            </button>
            <div className={ styles.embla__viewport } ref={ emblaRef }>

                <div className={ styles.embla__container }>
                    { Children.map(slides, (child: JSX.Element, index: number) => (
                        <div className={ styles.embla__slide } key={ index }>

                            { child }

                        </div>
                    )) }
                </div>

            </div>
            <button
                onClick={ onNextButtonClick }
                className={ `${styles.scrollButton} ${styles.rightButton}` }
            >
                <Image width={ 25 } height={ 25 } src="/right-arrow.svg" alt="right-arrow" />
            </button>

        </section>
    )
}

export default EmblaCarousel
