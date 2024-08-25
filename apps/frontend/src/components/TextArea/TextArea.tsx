"use client"
import Image from 'next/image'
import { TextAreaProps } from "./TextArea.props";
import styles from "./TextArea.module.css"
import cn from "classnames";
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";

export const TextArea = forwardRef(({ error, value, className, ...props }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {


    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = event.target

        if (target) {
            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight - 30}px`;
            if (target.value.trim() === '') {
                target.style.height = 'auto';
            }
        }
    };



    return (
        <div className={ className }>
            <div className={ cn(styles["input-wrapper"]) }>
                <textarea
                    ref={ ref }
                    className={ cn(styles["input"], { [styles["error"]]: error }) }
                    onInput={ handleChange }
                    { ...props }
                    rows={ 1 }
                />
                { error &&
                    <img src="/errorInput.svg" className={ styles["error-icon"] } />
                }
            </div>
            <div className={ styles['text-error'] }>{ error }</div>

        </div>
    )
})


TextArea.displayName = 'TextArea';
