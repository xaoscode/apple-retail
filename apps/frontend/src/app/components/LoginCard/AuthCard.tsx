'use client'
import { AuthCardProps } from "./AuthCard.props";
import styles from "./AuthCard.module.css";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Text } from "@/components/Text/Text";


export const AuthCard = ({ ...props }: AuthCardProps): JSX.Element => {

    const [activeCard, setActiveCard] = useState(false)
    function openCard() {
        if (activeCard === true) {
            setActiveCard(false)
        } else {
            setActiveCard(true)
        }
    }
    return (<div>
        { activeCard && <div className={ styles['card'] }>
            <Button onClick={ openCard } className={ styles['close'] } size="small" design="borderless" icon="/close.svg"></Button>

            <div className={ styles['menu'] }  { ...props }>
                <form className={ styles['form'] } action="">
                    <Text size={ "1" }>Вход</Text>
                    <Input placeholder="Email"></Input>
                    <Input placeholder="Пароль"></Input>
                    <Button design="filled" size="large">Войти</Button>
                </form>
                <div className={ styles['extra'] }>
                    <Button size="small" design="borderless">Регистрация</Button>
                    <Button size="small" design="borderless">Забыли пароль?</Button>
                    <Button size="small" design="borderless">Связаться с нами</Button>
                </div>
            </div>
        </div>

        }
        <Button className={ styles['button'] } onClick={ openCard } design="filled" size="medium">Вход</Button>
    </div>
    )
}