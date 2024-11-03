"use client";

import styles from "./Sidebar.module.css";
import { useSidebarContext } from "./components/Context/sidebar.context";
import { Button } from "@/components/Buttons/Button/Button";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLaberl } from "./components/SidebarContent/SidebarContent";
import { SidebarMenu } from "./components/SidebarMenu/SidebarMenu";
import { SidebarMenuProvider } from "./components/SidebarMenu/components/Context/SidebarMenu.context";
import { SidebarMenuItem } from "./components/SidebarMenu/components/SidebarMenuItem/SidebarMenuItem";
import { SidebarMenuTriggerButton } from "./components/SidebarMenu/components/SidebarMenuTriggerButton/SidebarMenuTriggerButton";
import { SidebarMenuContent } from "./components/SidebarMenu/components/SIdebarMenuContent/SidebarMenuContent";
import { SidebarMenuSub } from "./components/SidebarMenu/components/SidebarMenuSub/SidebarMenuSub";
import { SidebarMenuSubItem, SidebarMenuSubItemButton } from "./components/SidebarMenu/components/SidebarMenuSubItem/SidebarMenuSubItem";


export function Sidebar() {
    const { state, status } = useSidebarContext()

    return (

        <div data-state={ status } className={ `${styles.sidebar} ` }>
            <div className={ styles.block } />
            <div className={ styles.hidenblock }>


                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLaberl>Управление продукцией</SidebarGroupLaberl>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuProvider>
                                    <SidebarMenuItem>
                                        <SidebarMenuTriggerButton>Menu</SidebarMenuTriggerButton>
                                        <SidebarMenuContent>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubItemButton>
                                                        iPhone
                                                    </SidebarMenuSubItemButton>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubItemButton>
                                                        iPad
                                                    </SidebarMenuSubItemButton>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubItemButton>
                                                        iPhone
                                                    </SidebarMenuSubItemButton>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        </SidebarMenuContent>
                                    </SidebarMenuItem>
                                </SidebarMenuProvider>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>


            </div>

        </div>

    );
}
