import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import cn from "classnames"
import styles from "./SidebarContent.module.css"

interface SidebarContentProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}
export function SidebarContent({ className, ...props }: SidebarContentProps) {

    return (
        <div className={ cn(styles.content, className) } { ...props } />


    )
}

interface SidebarGroupProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}
export function SidebarGroup({ className, ...props }: SidebarGroupProps) {

    return (
        <div className={ cn(styles.group, className) } { ...props } />


    )
}

interface SidebarGroupLaberlProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}
export function SidebarGroupLaberl({ className, ...props }: SidebarGroupLaberlProps) {

    return (
        <div className={ cn(styles.label, className) } { ...props } />


    )
}

interface SidebarGroupContentProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}
export function SidebarGroupContent({ className, ...props }: SidebarGroupContentProps) {

    return (
        <div className={ cn(styles['group-content'], className) } { ...props } />


    )
}