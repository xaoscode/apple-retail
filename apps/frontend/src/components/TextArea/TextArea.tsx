"use client"
import Image from 'next/image'
import { TextAreaProps } from "./TextArea.props";
import styles from "./TextArea.module.css"
import cn from "classnames";
import { useEffect, useRef, useState } from "react";

export function TextArea({ error, value, onChange, className, ...props }: TextAreaProps): JSX.Element {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [textareaHeight, setTextareaHeight] = useState('auto');


    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { current } = textareaRef;
        if (current) {
            current.style.height = 'auto';
            current.style.height = `${current.scrollHeight - 30}px`;
            setTextareaHeight(`${current.scrollHeight - 30}px`);


            if (current.value.trim() === '') {
                current.style.height = 'auto';
                setTextareaHeight('auto');
            }
        }
        if (onChange) {
            onChange(event);
        }
    };

    useEffect(() => {
        const { current } = textareaRef;
        if (current) {
            current.style.height = 'auto';
            current.style.height = `${current.scrollHeight - 30}px`;
        }
    }, [value]);

    return (
        <div className={ className }>
            <div className={ cn(styles["input-wrapper"]) }>
                <textarea
                    ref={ textareaRef }
                    className={ cn(styles["input"], { [styles["error"]]: error }) }
                    style={ { height: textareaHeight } }
                    onChange={ handleChange }

                    value={ value }
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
}


