import React, { useState } from 'react';
import { HeartButtonProps } from "./HeartButton.props";
import styles from "./HeartButton.module.css";
import cn from "classnames";
import Image from "next/image";

import HeartIcon from "../../../public/heart.svg";
import CheckIcon from "../../../public/check.svg";

export function HeartButton({ activated, className, ...props }: HeartButtonProps): JSX.Element {
    const [isActivated, setIsActivated] = useState(activated);
    const [showCheck, setShowCheck] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleClick = () => {
        if (isDisabled) return;

        setIsDisabled(true);
        setShowCheck(!showCheck);

        setTimeout(() => {
            setShowCheck(!showCheck);
            setIsActivated(!isActivated);
            setIsDisabled(false);
        }, 300);
    };

    return (
        <button
            { ...props }
            className={ cn(styles['button'], { [styles.activated]: isActivated, [styles.disabled]: isDisabled }, className) }
            onClick={ handleClick }
            disabled={ isDisabled }
        >
            { showCheck ? (
                <CheckIcon className={ cn(styles['icon'], { [styles.activated]: isActivated }) } />
            ) : (
                <HeartIcon className={ cn(styles['icon']) } />
            ) }
        </button>
    );
}
