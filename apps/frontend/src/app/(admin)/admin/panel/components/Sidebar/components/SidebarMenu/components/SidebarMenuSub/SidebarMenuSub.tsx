import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import cn from "classnames"
import styles from "./SidebarMenuSub.module.css"
interface SidebarMenuSubProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLUListElement>, HTMLUListElement> {

}
export function SidebarMenuSub({ className, ...props }: SidebarMenuSubProps) {

    return (
        <ul className={ cn(styles["menu-sub"], className) } { ...props } />


    )
}
