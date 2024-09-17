import { HeaderProps } from "../ Header/Header.props";
import styles from "./Header.module.css";
import cn from "classnames";
import Image from 'next/image'
import { SearchInput } from "@/components/SearchInput/SearchInput";
import Link from "next/link";
import { Profile } from "./components/Profile/Profile";
import { AppContextProvider } from "@/app/context/app.context";
import { AuthCard } from "./components/AuthCard/AuthCard";
import { useSession } from "next-auth/react";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    return (
        <div { ...props } className={ cn(className, styles['header']) } >
            <Link href={ "/" }>
                <Image src="/logo.svg" width={ 100 } height={ 100 } alt="logo" />
            </Link>
            <SearchInput />
            <Link href={ "/cart" }>
                <button className={ styles["cart-button"] }>
                    <Image className={ styles["cart-icon"] } src="/cart.svg" width={ 32 } height={ 32 } alt="cart" />
                </button>
            </Link>

            <div className={ styles['auth'] }>
                <AppContextProvider activeLogin={ false } activeReg={ false } >
                    <Profile></Profile>
                    <AuthCard></AuthCard>
                </AppContextProvider>
            </div>
        </div>
    );
}