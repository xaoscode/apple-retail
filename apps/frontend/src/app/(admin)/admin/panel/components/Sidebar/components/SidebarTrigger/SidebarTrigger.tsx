'use client'
import { Button } from "@/components/Buttons/Button/Button";
import { useSidebarContext } from "../Context/sidebar.context";
import styles from "./SidebarTrigger.module.css"
export function SidebarTrigger() {
    const { toogleSidebar } = useSidebarContext()

    return (


        <Button className={ styles["sidebar-trigger"] } icon="/sidebar.svg" size={ "medium" } design={ "outline" } onClick={ () => {
            toogleSidebar()
        } } >
        </Button >

    )
}