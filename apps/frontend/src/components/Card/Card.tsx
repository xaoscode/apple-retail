import { CardProps } from "./Card.props";
import style from './Card.module.css'
import cn from "classnames"


export const Card = ({ className, children, ...props }: CardProps) => {

    return (
        <div { ...props } className={ cn(className, style['card']) }>
            { children }
        </div>
    )
}