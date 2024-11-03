"use client"
import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from "react";
import cn from "classnames"
import styles from "./SidebarMenuTriggerButton.module.css"
import { Button } from "@/components/Buttons/Button/Button";
import { useSidebarMenuContext } from "../Context/SidebarMenu.context";
import Image from "next/image";
interface SidebarMenuTriggerButtonProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode
}
export function SidebarMenuTriggerButton({ children, className, ...props }: SidebarMenuTriggerButtonProps) {
    const { manageStatus, status } = useSidebarMenuContext()
    console.log(status)
    return (
        <Button className={ styles.button } size={ "small" } design={ "borderless" } onClick={ () => { manageStatus() } } { ...props } >
            <div className={ styles.wrap }>
                <span>{ children }</span>
                <Image data-status={ status } className={ styles.icon } src={ "/chevron.svg" } alt={ "chevron.svg" } width={ 7 } height={ 7 }></Image>
            </div>
        </Button>



    )
}