import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css"
import cn from "classnames";
import Image from "next/image";

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
                { icon &&
                    <Image src={ icon } alt="icon" className={ styles.icon } width={ 32 } height={ 32 } /> }
                { children }
            </div>
        </button>

    )
}