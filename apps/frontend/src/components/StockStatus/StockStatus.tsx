import React from 'react';
import { StockStatusProps } from "./StockStatus.props";
import styles from "./StockStatus.module.css";
import cn from "classnames";

export function StockStatus({ status, className, ...props }: StockStatusProps): JSX.Element {
    let statusText: string;
    let statusClass: string;

    switch (status) {
        case 'in-stock':
            statusText = 'В наличии';
            statusClass = styles.inStock;
            break;
        case 'available-for-order':
            statusText = 'Возможен заказ';
            statusClass = styles.availableForOrder;
            break;
        case 'out-of-stock':
            statusText = 'Нет в наличии';
            statusClass = styles.outOfStock;
            break;
        case 'coming-soon':
            statusText = 'Скоро будет';
            statusClass = styles.comingSoon;
            break;
        default:
            statusText = '';
            statusClass = '';
    }

    return (
        <div className={ cn(styles.stockStatus, statusClass, className) } { ...props }>
            { statusText }
        </div>
    );
}
