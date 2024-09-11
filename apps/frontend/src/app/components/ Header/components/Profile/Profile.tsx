"use client"
import { ProfileProps } from "./Profile.props";
import styles from "./Profile.module.css";
import Image from "next/image";
import { Card } from "@/components/Card/Card";
import { useContext, useState } from "react";
import UserIcon from '../../../../../../public/user.svg'
import { auth } from "@/auth";
import { AuthCard } from "../LoginCard/AuthCard";
import { SessionProvider, useSession } from "next-auth/react";
import { Button } from "@/components/Buttons/Button/Button";
import { AppContext } from "@/app/context/app.context";
import { signout } from "@/lib/func";
import { Backend_URL } from "@/lib/Constants";

export function Profile({ ...props }: ProfileProps): JSX.Element {
    const [isHovered, setIsHovered] = useState(false);
    const { active, setActive } = useContext(AppContext)
    const session = useSession()
    function set() {
        setActive && setActive(!active)
    }
    async function logOut() {
        const res = await fetch(`${Backend_URL}/api/auth/log-out`, {
            method: 'POST',
            headers: {
                authorization: `${session.data?.backendTokens.accessToken}`
            }
        })
        if (res.status === 400) {
            signout()
        }

    }
    return (

        <div className={ styles['profile-wrap'] } onMouseEnter={ () => setIsHovered(true) } onMouseLeave={ () => setIsHovered(false) }>
            <div className={ styles['icon-wrap '] }>
                <UserIcon className={ styles['icon'] } />
            </div>
            { isHovered &&
                <Card className={ styles['card'] }>

                    {
                        !session?.data?.backendTokens.accessToken ?
                            <div className={ styles['notauthorized'] }>
                                <Button
                                    design="filled"
                                    size="large"
                                    type="submit"
                                    onClick={ set }
                                >
                                    Войти
                                </Button>
                            </div> :

                            <div className={ styles['authorized'] }>
                                <form action={ logOut }>
                                    <Button design="filled"
                                        size="large"
                                        type="submit">
                                        Выйти
                                    </Button>
                                </form>

                            </div>
                    }
                </Card>

            }
        </div>

    );
};
