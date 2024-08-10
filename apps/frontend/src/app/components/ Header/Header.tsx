import { Button } from "@/components/Button/Button";
import { HeaderProps } from "../ Header/Header.props";
import styles from "./Header.module.css";
import cn from "classnames";
import Image from 'next/image'
import { Text } from '@/components/Text/Text'

import { SearchInput } from "@/components/SearchInput/SearchInput";
export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    return (
        <div { ...props } className={ cn(className, styles['header']) } >



            <div className={ cn(className, styles['header2']) }>
                <Image src="/logo.svg" width={ 100 } height={ 100 } alt="logo" />

                <SearchInput />
                <div className={ styles['auth'] }>
                    <button className={ styles["cart-button"] }> <Image className={ styles["cart-icon"] } src="/cart.svg" width={ 32 } height={ 32 } alt="cart" /> </button>
                    <Button design="gray" size="medium">Регистрация</Button>
                    <Button design="filled" size="medium">Вход</Button>
                </div>
            </div>

        </div >
    );
}