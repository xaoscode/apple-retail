import React, { useState } from 'react';
import { SwingButtonsProps } from "./SwingButtons.props";
import styles from "./SwingButtons.module.css";
import cn from "classnames";

import { Button } from '../Button/Button';

export function SwingButtons({ count, onRemove, onAdd, ...props }: SwingButtonsProps): JSX.Element {
    const [coun, setCount] = useState<number>(count)

    const change = (num: number) => {
        if (coun + num > 0) {
            setCount(coun + num);
        } else {
            onRemove()
        }
    };
    return (
        <div className={ styles['swing-wrap'] } { ...props }>
            <Button onClick={ () => change(-1) } size={ 'medium' } design={ 'borderless' } icon='/minus.svg'></Button>
            <div>{ coun }</div>
            <Button onClick={ () => change(1) } size={ 'medium' } design={ 'borderless' } icon='/plus.svg'></Button>
        </div>
    )
}
