import { PricePanelProps } from "./PricePanel.props";
import styles from "./PricePanel.module.css"
import cn from "classnames";


export function PricePanel({ cost, discountPercentage, className, ...props }: PricePanelProps): JSX.Element {
    const calcDiscount = (cost: number, percentage: number | undefined): number => {
        if (percentage && percentage > 0) {
            return cost - (cost * percentage / 100)
        }
        return cost
    }

    return (
        <div { ...props } className={ styles['price-panel'] }>
            <div className={ styles["cost-wrap"] }>
                <div className={ cn(styles["cost-text"], { [styles["color"]]: discountPercentage }) } >{ calcDiscount(cost, discountPercentage) } ₽</div>
                {
                    discountPercentage != undefined && discountPercentage > 0 &&
                    <div className={ styles["cost-with-discount-text"] }>
                        { cost } ₽
                    </div>
                }
            </div>
        </ div>
    )
}