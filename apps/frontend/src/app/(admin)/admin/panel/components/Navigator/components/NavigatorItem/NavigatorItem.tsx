import { DetailedHTMLProps, LiHTMLAttributes } from "react";
import cn from "classnames"
import styles from "./NavigatorItem.module.css"
interface NavigatorItemProps extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {

}

export function NavigatorItem({ className, ...props }: NavigatorItemProps) {


    return (
        <li className={ cn(styles.li, className) } { ...props } />
    )
}