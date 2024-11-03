import { DetailedHTMLProps, LiHTMLAttributes, LinkHTMLAttributes, OlHTMLAttributes, ReactNode } from "react";
import styles from "./NavigatorLink.module.css"
import cn from "classnames"
import Link from "next/link";
import { Button } from "@/components/Buttons/Button/Button";
interface NavigatorLinkProps extends DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement> {
    link: string
    children: ReactNode
}

export function NavigatorLink({ children, link, className, ...props }: NavigatorLinkProps): JSX.Element {
    return (
        <Link href={ link } className={ cn(styles.link, className) }>
            <Button size={ "small" } design={ "borderless" }>
                { children }
            </Button>
        </Link>
    )
}