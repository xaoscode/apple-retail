import { Button } from "@/components/Button/Button";
import { HeaderProps } from "../ Header/Header.props";
import styles from "./Header.module.css";
import cn from "classnames";
import Image from 'next/image'

import { SearchInput } from "@/components/SearchInput/SearchInput";
import { AuthCard } from "../LoginCard/AuthCard";
export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    return (
        <div { ...props } className={ cn(className, styles['header']) } >
            <Image src="/logo.svg" width={ 100 } height={ 100 } alt="logo" />
            <SearchInput />
            <div className={ styles['auth'] }>
                <button className={ styles["cart-button"] }> <Image className={ styles["cart-icon"] } src="/cart.svg" width={ 32 } height={ 32 } alt="cart" /> </button>
                <AuthCard />
            </div>
        </div>
    );
}