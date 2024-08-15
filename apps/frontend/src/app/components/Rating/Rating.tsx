'use client'
import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Text } from "@/components/Text/Text";
import Image from "next/image";
import cn from "classnames"
import StarIcon from '../../../../public/star.svg'


export const Rating = ({ isEditable = false, rating, setRating, ...props }: RatingProps): JSX.Element => {
    const [ratingArray, setRatingArrray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(() => {
        constructRating(rating)
    }, [rating])

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((rate: JSX.Element, i: number) => {
            return (
                <StarIcon key={ i } className={ cn(styles.star, {
                    [styles.filled]: i < currentRating
                }) } />
            )
        })
        setRatingArrray(updatedArray)
    }
    return (
        <div { ...props }>
            { ratingArray.map((r, i) => (<span key={ i }>{ r }</span>)) }
        </div>
    )
}