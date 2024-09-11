'use client'
import React, { useState } from 'react';
import { CartButtonProps } from "./CartButton.props";
import styles from "./CartButton.module.css";
import cn from "classnames";
import CartIcon from "../../../../public/cartButton.svg";
import CheckIcon from "../../../../public/check.svg";

export function CartButton({ activated, className, ...props }: CartButtonProps): JSX.Element {
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
                <CartIcon className={ cn(styles['icon']) } />
            ) }
        </button>
    );
}
