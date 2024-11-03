import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import cn from "classnames"
import styles from "./SidebarMenuSubItem.module.css"
import { Button } from "@/components/Buttons/Button/Button";
interface SidebarMenuSubItemProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLLIElement>, HTMLLIElement> {

}
export function SidebarMenuSubItem({ className, ...props }: SidebarMenuSubItemProps) {

    return (
        <li className={ cn(styles["menu-sub-item"], className) } { ...props } />


    )
}

interface SidebarMenuSubItemProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLLIElement>, HTMLLIElement> {

}

interface SidebarMenuSubItemButtonProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}
export function SidebarMenuSubItemButton({ children, className, ...props }: SidebarMenuSubItemButtonProps) {
    return (
        <Button className={ styles.button } size={ "small" } design={ "borderless" }  { ...props } >
            <div className={ styles["button-text"] }>
                { children }
            </div>
        </Button>



    )
}