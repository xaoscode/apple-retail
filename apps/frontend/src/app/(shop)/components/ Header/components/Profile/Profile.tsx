"use client"
import { ProfileProps } from "./Profile.props";
import styles from "./Profile.module.css";
import { Card } from "@/components/Card/Card";
import { useActionState, useContext, useState } from "react";
import UserIcon from '../../../../../../../public/user.svg'
import { Button } from "@/components/Buttons/Button/Button";
import { AppContext } from "@/app/(shop)/context/app.context";
import cn from 'classnames'
import { SumbitButton } from "../AuthCard/components/SubmitButton/SumbitButton";
import { logoutAction } from "@/app/(shop)/components/ Header/components/AuthCard/_auth_actions/auth-actions";
import { useSession } from "next-auth/react";
import { INITIAL_STATE } from "../AuthCard/_auth_actions/initital-state";
import Image from "next/image"
import DefaultUserIcon from '../../../../../../../public/DefaultUser.svg'

export function Profile({ ...props }: ProfileProps): JSX.Element {
    const [formState, formAction] = useActionState(logoutAction, INITIAL_STATE);
    const [isHovered, setIsHovered] = useState(false);
    const { activeLogin, setActiveLogin, activeReg, setActiveReg } = useContext(AppContext)
    const { update, data, status } = useSession()

    if (formState.data === 'ok') {
        window.location.reload();

    }

    return (
        <div
            className={ styles['profile-wrap'] }
            onMouseEnter={ () => setIsHovered(true) }
            onMouseLeave={ () => setIsHovered(false) }
        >
            { status === "unauthenticated" &&
                <div className={ styles['icon-wrap'] }>
                    <UserIcon className={ styles['icon'] } />
                    <div className={ styles['icon-text'] }>Войти</div>
                </div>
            }
            {
                status === "authenticated" &&
                <div >
                    { data.user.image ?
                        <Image src={ `http://localhost:3000/avatars/${data.user.image}` } alt={ "" } width={ 50 } height={ 50 }></Image>
                        :
                        <DefaultUserIcon className={ styles['default-icon'] } />
                    }

                </div>
            }

            { isHovered &&
                <Card className={ cn(styles['card'], { [styles['show']]: isHovered }) }>

                    { status === "authenticated" ?
                        <form action={ formAction }>
                            <SumbitButton text={ "Выход" }></SumbitButton>
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
