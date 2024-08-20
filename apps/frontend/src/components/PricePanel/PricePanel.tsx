import { PricePanelProps } from "./PricePanel.props";
import styles from "./PricePanel.module.css"
import cn from "classnames";


export function PricePanel({ cost, discountPercentage, className, ...props }: PricePanelProps): JSX.Element {
    const calcDiscount = (cost: number, percentage: number): number => {
        return cost - (cost * percentage / 100)
    }

    return (
        <div { ...props } className={ styles['price-panel'] }>
            <div className={ styles["cost-wrap"] }>
                <div className={ styles["cost-text"] } >{ cost } ₽</div>
                { discountPercentage && discountPercentage > 0 && <div className={ styles["cost-with-discount-text"] }>
                    { calcDiscount(cost, discountPercentage) } ₽
                </div> }
            </div>
        </ div>
    )
}