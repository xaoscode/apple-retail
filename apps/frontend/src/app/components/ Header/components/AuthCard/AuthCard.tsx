"use client"
import React, { useContext, useEffect } from 'react';
import { AppContext } from '@/app/context/app.context';
import styles from './AuthCard.module.css';
import { AuthCardProps } from './AuthCard.props';
import { Button } from '@/components/Buttons/Button/Button';
import { Card } from '@/components/Card/Card';
import { Text } from '@/components/Text/Text';
import { AuthForm } from './components/AuthForm/AuthForm';

export function AuthCard({ ...props }: AuthCardProps): JSX.Element {
    const { activeLogin, setActiveLogin, activeReg, setActiveReg } = useContext(AppContext);

    useEffect(() => {
        document.body.style.overflow = activeLogin || activeReg ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeLogin, activeReg]);

    const closeHandler = () => {
        setActiveLogin && setActiveLogin(false);
        setActiveReg && setActiveReg(false);
    };

    function loginToRegister() {
        setActiveLogin && setActiveLogin(!activeLogin);
        setActiveReg && setActiveReg(!activeReg);
    }

    return (
        <>
            { (activeLogin || activeReg) && (
                <div className={ styles['overlay'] } onClick={ closeHandler }></div>
            ) }
            { (activeLogin || activeReg) && (
                <Card className={ styles.card } { ...props }>
                    <Button
                        onClick={ closeHandler }
                        className={ styles.close }
                        size="small"
                        design="borderless"
                        icon="/close.svg"
                    />
                    <div className={ styles.menu } { ...props }>
                        <Text size="1">{ activeLogin ? 'Вход' : 'Регистрация' }</Text>
                        <AuthForm key={ activeReg ? 'register' : 'login' } activeReg={ activeReg } />
                        <div className={ styles.extra }>
                            { activeLogin && (
                                <Button onClick={ loginToRegister } size="small" design="borderless">
                                    Регистрация
                                </Button>
                            ) }
                            { activeReg && (
                                <Button onClick={ loginToRegister } size="small" design="borderless">
                                    Войти
                                </Button>
                            ) }
                            { activeLogin && (
                                <Button size="small" design="borderless">
                                    Забыли пароль?
                                </Button>
                            ) }
                            <Button size="small" design="borderless">
                                Связаться с нами
                            </Button>
                        </div>
                    </div>
                </Card>
            ) }
        </>
    );
}
