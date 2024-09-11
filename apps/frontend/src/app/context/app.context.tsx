'use client'
import { Children, createContext, PropsWithChildren, ReactNode, useState } from "react";

export interface IAppContext {
    active: boolean
    setActive?: (auth: boolean) => void
}

export const AppContext = createContext<IAppContext>({ active: false })

export const AppContextProvider = ({ active, children }: PropsWithChildren<IAppContext>): JSX.Element => {
    const [activeState, setActiveState] = useState<boolean>(active)
    const setActive = (active: boolean) => {
        setActiveState(active)
    }

    return <AppContext.Provider value={ { active: activeState, setActive } }>
        { children }
    </AppContext.Provider>
}