import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css"
import cn from "classnames";

export function Button({ size, design, children, icon, className, ...props }: ButtonProps): JSX.Element {
    return (

        <button
            { ...props }
            className={ cn(
                styles["button"],
                {
                    [styles["small"]]: size === 'small',
                    [styles["medium"]]: size === 'medium',
                    [styles["large"]]: size === 'large',
                },
                {
                    [styles["borderless"]]: design === 'borderless',
                    [styles["gray"]]: design === 'gray',
                    [styles["outline"]]: design === 'outline',
                    [styles["filled"]]: design === 'filled',
                },
                className,
                {
                    [styles["no-child-small"]]: size === 'small' && !children,
                    [styles["no-child-medium"]]: size === 'medium' && !children,
                    [styles["no-child-large"]]: size === 'large' && !children,
                }
            ) }

        >
            <div className={ styles["positions"] }>
                { icon && <img src={ icon } alt="icon" className={ styles['icon'] } /> }
                { children }
            </div>


        </button>

    )
}