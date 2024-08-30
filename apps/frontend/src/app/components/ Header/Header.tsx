"use client"
import { HeaderProps } from "../ Header/Header.props";
import styles from "./Header.module.css";
import cn from "classnames";
import Image from 'next/image'
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { AuthCard } from "../LoginCard/AuthCard";
import Link from "next/link";
import { refreshAccessToken } from "@/app/api/login";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    const logout = async () => {
        const res = await fetch("http://localhost:3000/api/auth/log-out", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
        if (res.ok) {
            console.log('ok')
        }

    }
    return (
        <div { ...props } className={ cn(className, styles['header']) } >
            <Link href={ "/" }>
                <Image src="/logo.svg" width={ 100 } height={ 100 } alt="logo" />
            </Link>
            <SearchInput />
            <div className={ styles['auth'] }>
                <Link href={ "/cart" }>
                    <button className={ styles["cart-button"] }>
                        <Image className={ styles["cart-icon"] } src="/cart.svg" width={ 32 } height={ 32 } alt="cart" />
                    </button>
                </Link>
                <AuthCard />
                <Link href={ "/profile" }>profile</Link>
                <button onClick={ logout }>LogOut</button>
            </div>
        </div>
    );
}