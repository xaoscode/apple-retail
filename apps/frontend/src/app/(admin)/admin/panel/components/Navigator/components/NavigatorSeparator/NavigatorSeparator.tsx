import { DetailedHTMLProps, LiHTMLAttributes, ReactNode } from "react";
import cn from "classnames"
import styles from "./NavigatorSeparator.module.css"
import Image from "next/image";
interface NavigatorItemProps extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    children?: ReactNode
}
export function NavigatorSeparator({ children, className, ...props }: NavigatorItemProps) {


    return (
        <li className={ cn(styles.li, className) }  { ...props }>
            { children ?? <Image src={ "/chevron.svg" } alt={ "chevron.svg" } width={ 10 } height={ 10 }></Image> }
        </li>
    )
}