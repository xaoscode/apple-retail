import { DetailedHTMLProps, LiHTMLAttributes, OlHTMLAttributes } from "react";
import styles from "./NavigatorList.module.css"
import cn from "classnames"
interface NavigatorListProps extends DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement> {
}

export function NavigatorList({ className, ...props }: NavigatorListProps): JSX.Element {
    return (
        <ol className={ cn(styles.ol, className) } { ...props } />

    )
}