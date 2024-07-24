import { SubTextProps } from "./SubText.props";
import styles from "./SubText.module.css"
import cn from "classnames";

export function SubText({ size, children, className, ...props }: SubTextProps): JSX.Element {
    return (

        <div className={
            cn(styles["sub-text"],
                {
                    [styles["t1"]]: size === "1",
                    [styles["t2"]]: size === "2",
                }, className
            ) }>{ children }</div>


    )
}