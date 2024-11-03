"use client"
import { usePathname } from "next/navigation"
import { NavigatorItem } from "./components/NavigatorItem/NavigatorItem"
import { NavigatorLink } from "./components/NavigatorLink/NavigatorLink"
import { NavigatorList } from "./components/NavigatorList/NavigatorList"
import { NavigatorProps } from "./Navigarot.props"
import { Fragment } from "react"
import { NavigatorSeparator } from "./components/NavigatorSeparator/NavigatorSeparator"
import Link from "next/link"

export function Navigator({ ...props }: NavigatorProps): JSX.Element {
    const pathname = usePathname();
    const pathParts = pathname.split('/').filter((part) => part);
    return (
        <nav>
            <NavigatorList>
                <NavigatorItem>
                    <NavigatorLink link={ "/" }>Home</NavigatorLink>
                </NavigatorItem>
                {
                    pathParts.map((part, index) => {
                        const isLast = index === pathParts.length - 1;
                        const href = '/' + pathParts.slice(0, index + 1).join('/');
                        const name = part.charAt(0).toUpperCase() + part.slice(1)
                        return (
                            <Fragment key={ index }>
                                <NavigatorSeparator />
                                <NavigatorItem>
                                    { isLast ? (
                                        <p>{ name }</p>
                                    ) : (
                                        <NavigatorLink link={ href }>
                                            { name }
                                        </NavigatorLink>
                                    ) }
                                </NavigatorItem>
                            </Fragment>
                        )
                    })
                }
            </NavigatorList>
        </nav>
    )
}