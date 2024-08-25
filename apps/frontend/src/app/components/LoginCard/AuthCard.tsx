'use client'
import { AuthCardProps } from "./AuthCard.props";
import styles from "./AuthCard.module.css";
import { useReducer, useState } from "react";
import { Button } from "@/components/Buttons/Button/Button";
import { Input } from "@/components/Input/Input";
import { Text } from "@/components/Text/Text";
import { Card } from "@/components/Card/Card";
import { formReducer, INITIAL_STATE } from "./auth.reducer";
import { login } from "@/app/api/login";

export function AuthCard({ ...props }: AuthCardProps): JSX.Element {
    const [activeCard, setActiveCard] = useState(false);
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { errors, isFormValid } = formState

    const openCard = () => {
        setActiveCard(prevState => !prevState);
        if (activeCard) {
            dispatchForm({ type: "CLEAR" });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatchForm({ type: "UPDATE_FIELD", field: name as "email" | "password", value });
        dispatchForm({ type: "VALIDATE_FORM" });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid) {

            // Здесь можно выполнить логику отправки данных на сервер
            dispatchForm({ type: "CLEAR" });
            setActiveCard(false);
        }
    };

    return (
        <>
            { activeCard && (
                <Card className={ styles.card } { ...props }>
                    <Button
                        onClick={ openCard }
                        className={ styles.close }
                        size="small"
                        design="borderless"
                        icon="/close.svg"
                    />
                    <div className={ styles.menu } { ...props }>
                        <form className={ styles.form } onSubmit={ handleSubmit }>
                            <Text size="1">Вход</Text>
                            <Input
                                placeholder="Email"
                                name="email"
                                value={ formState.email }
                                onChange={ handleInputChange }
                                error={ errors.email }
                            />
                            <Input
                                placeholder="Пароль"
                                name="password"
                                type="password"
                                value={ formState.password }
                                onChange={ handleInputChange }
                                error={ errors.password }
                            />
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
                    </div>
                </Card>
            ) }
            <Button
                className={ styles.button }
                onClick={ openCard }
                design="filled"
                size="medium"
            >
                Вход
            </Button>
        </>
    );
};
