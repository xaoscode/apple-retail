"use client"
import { ApiErrors } from "@/app/(shop)/components/ Header/components/AuthCard/components/ApiError/ApiError";
import { SumbitButton } from "@/components/Buttons/SubmitButton/SumbitButton";
import { Input } from "@/components/Input/Input";
import styles from './page.module.css'
import Image from "next/image"
import { useActionState, useState } from "react";
import { loginAdminAction } from "./_admin_auth_actions/auth-actions";
import { INITIAL_STATE } from "./_admin_auth_actions/initital-state";
import { Text } from '@/components/Text/Text';

export default function Login() {
    const [formState, formAction] = useActionState(loginAdminAction, INITIAL_STATE);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <div className={ styles.wrapper }>
            <Text size={ "1" }>Авторизация</Text>
            <form className={ styles.form } action={ formAction }>
                <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    error={ formState?.zodErrors?.email }
                />
                <div className={ styles['password-wrap'] }>
                    <Input
                        placeholder="Пароль"
                        name="password"
                        type={ isPasswordVisible ? 'text' : 'password' }
                        error={ formState?.zodErrors?.password }
                    />
                    <button
                        type="button"
                        className={ styles['button-eye'] }
                        onClick={ () => setIsPasswordVisible(!isPasswordVisible) }
                    >
                        <Image
                            src={ isPasswordVisible ? '/open-eye.svg' : '/close-eye.svg' }
                            alt="eye"
                            width={ 24 }
                            height={ 24 }
                        />
                    </button>
                </div>
                <SumbitButton text={ 'Войти' } />
                <ApiErrors error={ formState?.apiErrors } />
            </form>
        </div>
    )
}