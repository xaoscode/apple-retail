import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import cn from "classnames"
import styles from "./SidebarMenuItem.module.css"
interface SidebarMenuItemProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLLIElement>, HTMLLIElement> {

}
export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {

    return (
        <li className={ cn(styles["menu-item"], className) } { ...props } />


    )
}