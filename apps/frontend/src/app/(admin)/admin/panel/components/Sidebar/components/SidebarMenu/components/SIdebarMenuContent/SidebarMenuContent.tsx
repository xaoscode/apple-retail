import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import cn from "classnames"
import styles from "./SidebarMenuContent.module.css"
import { useSidebarMenuContext } from "../Context/SidebarMenu.context";
interface SidebarMenuContentProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}
export function SidebarMenuContent({ className, ...props }: SidebarMenuContentProps) {
    const { status } = useSidebarMenuContext()
    return (
        <div data-status={ status } className={ cn(styles["menu-content"], className) } { ...props } />


    )
}