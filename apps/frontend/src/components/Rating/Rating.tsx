'use client'
import styles from "./Rating.module.css";
import { RatingProps } from "./Rating.props";
import { useEffect, useState, KeyboardEvent } from "react";
import cn from "classnames"
import StarIcon from '../../../public/star.svg'


export const Rating = ({ reviewNum, isEditable = false, rating, setRating, ...props }: RatingProps): JSX.Element => {
    const [ratingArray, setRatingArrray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(() => {
        constructRating(rating)
    }, [rating])

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((rate: JSX.Element, i: number) => {
            return (
                <span key={ i } className={ cn(styles.star, {
                    [styles.filled]: i < currentRating,
                    [styles.editable]: isEditable
                }) }
                    onMouseEnter={ () => onHover(i + 1) }
                    onMouseLeave={ () => onHover(rating) }
                    onClick={ () => onClick(i + 1) }>
                    <StarIcon className={ styles['icon'] }
                    // tabIndex={ isEditable ? 0 : -1 }
                    // onKeyDown={ (e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e) }
                    />
                </span>
            )
        })
        setRatingArrray(updatedArray)
    }

    const onHover = (i: number) => {
        if (!isEditable) {
            return;
        }
        constructRating(i)
    }
    const onClick = (i: number) => {
        if (!isEditable || !setRating) {
            return;
        }
        setRating(i)
    }
    const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
        if (e.code != 'Space' || !setRating) {
            return;
        }
        setRating(i)

    }

    const formatReviewNum = (reviewNum: number | undefined) => {
        if (!reviewNum) {
            return
        }
        if (reviewNum > 999) {
            return parseFloat((reviewNum / 100).toFixed(1));
        }
        return reviewNum
    }

    return (
        <div { ...props } className={ styles['rating'] }  >
            { ratingArray.map((r, i) => (<span className={ styles['a'] } key={ i } >{ r }</span>)) }
            <div className={ styles['review-num'] }>{ formatReviewNum(reviewNum) }</div>
        </div >
    )
}