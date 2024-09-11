"use client"
import { AuthCardProps } from "./AuthCard.props";
import styles from "./AuthCard.module.css";
import { useContext, useEffect, useReducer, useState } from "react";
import { Button } from "@/components/Buttons/Button/Button";
import { Input } from "@/components/Input/Input";
import { Text } from "@/components/Text/Text";
import { Card } from "@/components/Card/Card";
import { formReducer, INITIAL_STATE } from "./auth.reducer";
import Image from "next/image";
import { signIn } from "@/auth";
import { login } from "../../../../../lib/func";
import { AppContext } from "@/app/context/app.context";

export function AuthCard({ ...props }: AuthCardProps): JSX.Element {
    const { active, setActive } = useContext(AppContext)
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [activeCard, setActiveCard] = useState<boolean>(false);
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { errors, isFormValid } = formState
    useEffect(() => {
        setActiveCard(active)
    }, [active])



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatchForm({ type: "UPDATE_FIELD", field: name as "email" | "password", value });
        dispatchForm({ type: "VALIDATE_FORM" });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid) {
            await signIn("credentials", formState)

        }
    };

    return (

        <>
            { activeCard &&
                <Card className={ styles.card } { ...props }>
                    <Button
                        onClick={ () => setActive && setActive(!activeCard) }
                        className={ styles.close }
                        size="small"
                        design="borderless"
                        icon="/close.svg"
                    />
                    <div className={ styles.menu } { ...props }>
                        <Text size="1">Вход</Text>
                        <form className={ styles.form } action={ (formState) => login(formState) }>
                            <Input
                                placeholder="Email"
                                name="email"
                                type="email"
                                value={ formState.email }
                                onChange={ handleInputChange }
                                error={ errors.email }
                            />
                            <div className={ styles['password-wrap'] }>
                                <Input
                                    placeholder="Пароль"
                                    name="password"
                                    type={ isPasswordVisible ? 'text' : 'password' }
                                    value={ formState.password }
                                    onChange={ handleInputChange }
                                    error={ errors.password }
                                />
                                <button type="button" className={ styles['button-eye'] } onClick={ () => setIsPasswordVisible(!isPasswordVisible) }>
                                    { !errors.password && (isPasswordVisible ?
                                        <Image src={ "/open-eye.svg" } alt={ "close-eye" } width={ 24 } height={ 24 }></Image> :
                                        <Image src={ "/close-eye.svg" } alt={ "close-eye" } width={ 24 } height={ 24 }></Image>) }
                                </button>
                            </div>
                            <Button
                                design="filled"
                                size="large"
                                type="submit"
                                disabled={ !isFormValid }
                            >
                                Войти
                            </Button>

                        </form>
                        <div className={ styles.extra }>
                            <Button size="small" design="borderless">Регистрация</Button>
                            <Button size="small" design="borderless">Забыли пароль?</Button>
                            <Button size="small" design="borderless">Связаться с нами</Button>
                        </div>
                    </div >
                </Card >
            }



        </>
    );
};
