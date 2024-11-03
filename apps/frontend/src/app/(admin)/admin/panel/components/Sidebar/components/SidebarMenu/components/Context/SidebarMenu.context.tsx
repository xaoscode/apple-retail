import { createContext, PropsWithChildren, useContext, useState } from "react";




export interface ISidebarMenuContext {
    status: "collapsed" | "expanded"
    state: boolean
    manageStatus: () => void
}

export const SidebarMenuContext = createContext<ISidebarMenuContext | null>(null)
export const useSidebarMenuContext = () => {
    const context = useContext(SidebarMenuContext)
    if (!context) {
        throw new Error("useSidebarMenu must be used within a SidebarMenuProvider.")
    }
    return context
}
export function SidebarMenuProvider({ children, ...props }: PropsWithChildren) {
    const [menuStatus, setMenuStatus] = useState<ISidebarMenuContext["state"]>(false)

    const manageStatus = () => {
        setMenuStatus(!menuStatus)
    }
    const status = menuStatus ? "expanded" : "collapsed";


    return <SidebarMenuContext.Provider value={ { status, state: menuStatus, manageStatus } }>
        { children }
    </SidebarMenuContext.Provider>
}