'use client'
import { Children, createContext, PropsWithChildren, ReactNode, useState } from "react";

export interface IAppContext {
    activeLogin: boolean
    activeReg: boolean
    setActiveLogin?: (active: boolean) => void
    setActiveReg?: (active: boolean) => void

}

export const AppContext = createContext<IAppContext>({ activeLogin: false, activeReg: false })

export const AppContextProvider = ({ activeLogin, activeReg, children }: PropsWithChildren<IAppContext>): JSX.Element => {
    const [activeStateLogin, setActiveStateLogin] = useState(activeLogin)
    const [activeStateReg, setActiveStateReg] = useState(activeReg)


    const setActiveLogin = (active: boolean) => {
        setActiveStateLogin(active)
    }
    const setActiveReg = (active: boolean) => {
        setActiveStateReg(active)
    }

    return <AppContext.Provider value={ { activeLogin: activeStateLogin, setActiveLogin, activeReg: activeStateReg, setActiveReg } }>
        { children }
    </AppContext.Provider>
}