import { NewsPanelProps } from "./NewsPanel.props";
import styles from "./NewsPanel.module.css";
import { Button } from "@/components/Button/Button";
import Image from "next/image";
import { useState } from "react";

export const NewsPanel = ({ ...props }: NewsPanelProps): JSX.Element => {
    const [newsImages, setNewsImages] = useState(["orange", "apple", "banana", "grape", "pineapple"]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const maxVisibleImages = 2;

    const handleNext = () => {
        if (currentIndex < newsImages.length - maxVisibleImages) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className={ styles['news'] } { ...props }>
            <div
                className={ styles['content'] }
                style={ { transform: `translateX(-${currentIndex * 50}%)` } } // 150px - ширина одного элемента
            >
                { newsImages.map((image, idx) => (
                    <div key={ idx } className={ styles['parallelogram'] }>
                        { image }
                    </div>
                )) }
            </div>

            <Button
                icon="/left-arrow.svg"
                className={ styles['left-button'] }
                size="medium"
                design="borderless"
                onClick={ handlePrev }
                disabled={ currentIndex === 0 }
            />
            <Button
                icon="/right-arrow.svg"
                className={ styles['right-button'] }
                size="medium"
                design="borderless"
                onClick={ handleNext }
                disabled={ currentIndex >= newsImages.length - maxVisibleImages }
            />
        </div>
    );
};
