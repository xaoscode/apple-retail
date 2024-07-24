import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css"
import cn from "classnames";

export function Header({ size, children, className, ...props }: HeaderProps): JSX.Element {
    return (

        <div className={
            cn(styles["header"],
                {
                    [styles["h1"]]: size === "1",
                    [styles["h2"]]: size === "2",
                    [styles["h3"]]: size === "3",
                }
            ) }>{ children }</div>


    )
}