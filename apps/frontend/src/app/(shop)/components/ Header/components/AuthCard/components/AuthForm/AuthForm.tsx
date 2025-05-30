'use client'
import React, { DetailedHTMLProps, HtmlHTMLAttributes, useActionState, useState } from 'react';
import { loginUserAction, registerUserAction } from '@/app/(shop)/components/ Header/components/AuthCard/_auth_actions/auth-actions';
import styles from './AuthForm.module.css';
import { Input } from '@/components/Input/Input';
import Image from 'next/image';
import { ApiErrors } from '../ApiError/ApiError';
import { SumbitButton } from '../../../../../../../../components/Buttons/SubmitButton/SumbitButton';
import { INITIAL_STATE } from '../../_auth_actions/initital-state';

interface AuthFormProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    activeReg: boolean;
}

export function AuthForm({ activeReg }: AuthFormProps): JSX.Element {
    const [formState, formAction] = useActionState(
        activeReg ? registerUserAction : loginUserAction,
        INITIAL_STATE
    );
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    if (formState.data === 'ok') {
        window.location.reload();
    }

    return (
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
            <SumbitButton text={ activeReg ? 'Зарегистрироваться' : 'Войти' } />
            <ApiErrors error={ formState?.apiErrors } />
        </form>
    );
}
