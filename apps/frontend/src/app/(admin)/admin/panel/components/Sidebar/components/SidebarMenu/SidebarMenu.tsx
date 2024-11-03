import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import cn from "classnames"
import styles from "./SidebarMenu.module.css"

interface SidebarMenuProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLUListElement>, HTMLUListElement> {

}
export function SidebarMenu({ className, ...props }: SidebarMenuProps) {

    return (
        <ul className={ cn(styles.menu, className) } { ...props } />


    )
}
