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
            <div className={ styles['header1'] }>
                <Text size="3">Хабаровск</Text>

                <div className={ styles['menu'] }>
                    <Button design="borderless" size="small">Акции</Button>
                    <Button design="borderless" size="small">Вакансии</Button>
                    <Button design="borderless" size="small">Доставка</Button>
                    <Button design="borderless" size="small">Покупателям</Button>
                    <Button design="borderless" size="small">Юридическим лицам</Button>
                </div>
                <Text size="3">8-996-683-19-63</Text>

            </div>
            <div className={ cn(className, styles['header2']) }>
                <Image src="/logo.svg" width={ 100 } height={ 100 } alt="logo" />
                <SearchInput></SearchInput>
                <div className={ styles['auth'] }>
                    <button className={ styles["cart-button"] }> <Image className={ styles["cart-icon"] } src="/cart.svg" width={ 32 } height={ 32 } alt="cart" /> </button>
                    <Button design="gray" size="medium">Регистрация</Button>
                    <Button design="filled" size="medium">Вход</Button>
                </div>
            </div>

        </div >
    );
}