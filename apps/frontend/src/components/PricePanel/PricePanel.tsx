import { PricePanelProps } from "./PricePanel.props";
import styles from "./PricePanel.module.css";
import cn from "classnames";

export function PricePanel({ price, discountPercentage, className, ...props }: PricePanelProps): JSX.Element {
    const calcDiscount = (price: number, percentage: number | undefined): string => {
        const numericPrice = Number(price);  // Преобразование в число
        if (percentage && percentage > 0) {
            return (numericPrice - (numericPrice * percentage / 100)).toFixed(2);
        }
        return numericPrice.toFixed(2);
    }

    return (
        <div { ...props } className={ styles['price-panel'] }>
            <div className={ styles["price-wrap"] }>
                <div className={ cn(styles["price-text"], { [styles["color"]]: discountPercentage }) } >
                    { calcDiscount(price, discountPercentage) } ₽
                </div>
                {
                    discountPercentage != undefined && discountPercentage > 0 &&
                    <div className={ styles["price-with-discount-text"] }>
                        { Number(price).toFixed(2) } ₽
                    </div>
                }
            </div>
        </div>
    );
}
