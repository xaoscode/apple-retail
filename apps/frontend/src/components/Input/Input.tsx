import { InputProps } from "./Input.props";
import styles from "./Input.module.css"
import cn from "classnames";
import { Button } from "../Buttons/Button/Button";
import { ForwardedRef, forwardRef } from "react";
import Image from "next/image"

export const Input = forwardRef(({ className, error, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
        <div className={ cn(styles['in'], className) }>

            <div className={ styles["input-wrapper"] }>
                <input ref={ ref } className={ cn(styles['input'], { [styles['error']]: error }) } { ...props } />
                { error &&
                    <Image className={ styles["error-icon"] } src={ "/error.svg" } alt={ "error" } height={ 24 } width={ 24 } />
                }
            </div>
            <div className={ styles['text-error'] }>{ error }</div>

        </div>
    )
})

Input.displayName = 'Input';