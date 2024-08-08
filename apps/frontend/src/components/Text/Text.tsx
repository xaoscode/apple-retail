import { TextProps } from "./Text.props";
import styles from "./Text.module.css"
import cn from "classnames";

export function Text({ size, children, className, ...props }: TextProps): JSX.Element {
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