import { LinkTextProps } from "./LinkText.props";
import styles from "./LinkText.module.css"
import cn from "classnames";

export function LinkText({ children, className, ...props }: LinkTextProps): JSX.Element {
    return (

        <div className={ cn(className, styles['text']) } { ...props }>
            { children }
        </div>
    )
}