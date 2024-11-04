"use client"
import { DropdownMenuProps } from "./DropdownMenu.props";
import styles from "./DropdownMenu.module.css"
import cn from "classnames";
import { Button } from "../Buttons/Button/Button";
import { ForwardedRef, forwardRef, useState } from "react";
import Image from "next/image"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "./components/DropdownComponents";


enum StateValues {
    news = "Новинки",
    expensive = "Сначала дорогие",
    cheap = "Сначала дешевые",
    discount = "Скидки"
}

export function Dropdown() {
    const [activeItem, setActiveItem] = useState<StateValues | null>(StateValues.news);

    const handleCheckedChange = (item: StateValues) => {
        setActiveItem(activeItem === item ? null : item);
    };

    return (
        <DropdownMenu modal={ false }>
            <DropdownMenuTrigger asChild className={ styles.trigger }>
                <span className={ styles.sort }>
                    Сортировка:
                    <Button size={ "small" } design={ "borderless" }>
                        { activeItem }
                    </Button>
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={ styles.content }>
                <DropdownMenuCheckboxItem
                    checked={ activeItem === StateValues.news }
                    onCheckedChange={ () => handleCheckedChange(StateValues.news) }
                >
                    Новинки
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={ activeItem === StateValues.expensive }
                    onCheckedChange={ () => handleCheckedChange(StateValues.expensive) }
                >
                    Сначала дорогие
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={ activeItem === StateValues.cheap }
                    onCheckedChange={ () => handleCheckedChange(StateValues.cheap) }
                >
                    Сначала дешёвые
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={ activeItem === StateValues.discount }
                    onCheckedChange={ () => handleCheckedChange(StateValues.discount) }
                >
                    Сначала скидки
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
