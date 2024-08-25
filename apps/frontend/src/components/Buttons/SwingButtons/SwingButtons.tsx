import React, { useState } from 'react';
import { SwingButtonsProps } from "./SwingButtons.props";
import styles from "./SwingButtons.module.css";
import cn from "classnames";

import { Button } from '../Button/Button';

export function SwingButtons({ ...props }: SwingButtonsProps): JSX.Element {
    const [count, setCount] = useState<number>(0)

    const change = (num: number) => {
        if (count + num >= 0) {
            setCount(count + num);
        }
    };
    return (
        <div className={ styles['swing-wrap'] } { ...props }>
            <Button onClick={ () => change(-1) } size={ 'medium' } design={ 'borderless' } icon='/minus.svg'></Button>
            <div>{ count }</div>
            <Button onClick={ () => change(1) } size={ 'medium' } design={ 'borderless' } icon='/plus.svg'></Button>
        </div>
    )
}
