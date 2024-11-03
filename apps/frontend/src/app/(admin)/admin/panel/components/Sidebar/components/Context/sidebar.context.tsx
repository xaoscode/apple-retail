'use client'
import { createContext, PropsWithChildren, useContext, useState } from "react"
import styles from "./sidebar.context.module.css"

export interface ISidebarContext {
    status: "expanded" | "collapsed"
    state: boolean
    toogleSidebar: () => void
}

export const SidebarContext = createContext<ISidebarContext | null>(null)

export const useSidebarContext = () => {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.")
    }
    return context
}

export const SidebarProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const [stateBar, setState] = useState(true);

    const toogleSidebar = () => {
        setState(!stateBar)
    }
    const status = stateBar ? "expanded" : "collapsed";
    return <SidebarContext.Provider value={ { status, state: stateBar, toogleSidebar } }>
        <div data-state={ status } className={ styles.wrap }  >
            { children }
        </div>
    </SidebarContext.Provider >
}