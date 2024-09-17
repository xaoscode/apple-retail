"use client"
import { ProfileProps } from "./Profile.props";
import styles from "./Profile.module.css";
import { Card } from "@/components/Card/Card";
import { useContext, useEffect, useState } from "react";
import UserIcon from '../../../../../../public/user.svg'
import { Button } from "@/components/Buttons/Button/Button";
import { AppContext } from "@/app/context/app.context";
import cn from 'classnames'
import { SumbitButton } from "../AuthCard/components/SubmitButton/SumbitButton";
import { logoutAction } from "@/app/components/ Header/components/AuthCard/_data/auth-actions";
import { useSession } from "next-auth/react";

export function Profile({ ...props }: ProfileProps): JSX.Element {
    const [isHovered, setIsHovered] = useState(false);
    const { activeLogin, setActiveLogin, activeReg, setActiveReg } = useContext(AppContext)
    const { update, data, status } = useSession()
    function logout() {
        logoutAction
        update

    }


    return (
        <div
            className={ styles['profile-wrap'] }
            onMouseEnter={ () => setIsHovered(true) }
            onMouseLeave={ () => setIsHovered(false) }
        >
            <div className={ styles['icon-wrap'] }>
                <UserIcon className={ styles['icon'] } />
                <div className={ styles['icon-text'] }>Войти</div>
            </div>
            { isHovered &&
                <Card className={ cn(styles['card'], { [styles['show']]: isHovered }) }>

                    { status === "authenticated" ?
                        <form action={ logoutAction }>
                            <SumbitButton text={ "Выход" }>авыа</SumbitButton>
                        </form> :
                        <div className={ styles['notauthorized'] }>
                            <p className={ styles['text'] }>Добро пожаловать! </p>
                            <Button
                                design="filled"
                                size="medium"
                                type="button"
                                onClick={ () => setActiveLogin && setActiveLogin(!activeLogin) }
                            >
                                Войти
                            </Button>
                            <span className={ styles['separator'] }>или</span>
                            <Button
                                design="outline"
                                size="medium"
                                type="button"
                                onClick={ () => setActiveReg && setActiveReg(!activeReg) }
                            >
                                Регистрация
                            </Button>

                        </div>
                    }



                    <div className={ styles['authorized'] }>
                        <div className={ styles['user-info'] }>
                            <span>Здравствуйте, !</span>
                        </div>

                    </div>

                </Card>
            }

        </div>
    );
};
