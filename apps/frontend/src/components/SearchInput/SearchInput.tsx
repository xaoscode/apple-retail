"use client"
import React, { useRef, useState, useEffect, FormEvent } from 'react';
import { SearchInputProps } from "./SearchInput.props";
import styles from "./SearchInput.module.css";
import cn from "classnames";
import { Button } from "../Buttons/Button/Button";
import { SubText } from '../SubText/SubText';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function SearchInput({ className, ...props }: SearchInputProps): JSX.Element {
    const [historyVisible, setHistoryVisible] = useState(false);
    const [searchHistory, setSearchHistory] = useState<string[]>(["apple", "banana", "orange", 'cucumber']);
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const handleFocus = () => {
        if (searchHistory.length) {
            setHistoryVisible(true);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setHistoryVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleHistoryClick = (item: string) => {
        // Здесь можно добавить логику для выбора элемента истории
        console.log(`Выбрано: ${item}`);
        setHistoryVisible(false);
    };

    const clearHistory = () => {
        setSearchHistory([]);
        setHistoryVisible(false);
        console.log(historyVisible);
    };
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        console.log(value)
    }
    const search = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Предотвращает стандартное поведение отправки формы
        const formData = new FormData(event.currentTarget);
        const searchTerm = formData.get('q') as string;

        if (searchTerm) {
            router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };
    return (
        <div ref={ wrapperRef } className={ styles["input-wrapper"] }>
            <form onSubmit={ search } className={ styles["input-wrapper"] }>
                <input
                    name="q"
                    className={ cn({
                        [styles['input-base']]: !historyVisible,
                        [styles['input']]: historyVisible,
                    }) }
                    { ...props }
                    onFocus={ handleFocus }
                    onChange={ inputChange }

                />
                <Button type="submit" className={ styles['button'] } size="medium" design="borderless" icon='/search.svg'></Button>
            </form>
            { historyVisible && (
                <div className={ styles['history'] }>
                    <div className={ styles['history-action'] }>
                        <SubText size='2'>История поиска</SubText>
                        <Button onClick={ clearHistory } size='small' design='borderless'>Очистить историю</Button>
                    </div>
                    { searchHistory.map((item, index) => (
                        <Link href={ `http://localhost:3001/search?q=${item}` }
                            key={ index }
                            tabIndex={ 0 }
                            className={ styles['history-item'] }
                            onClick={ () => handleHistoryClick(item) }>

                            { item }

                        </Link>
                    )) }
                </div>
            ) }
        </div>
    );
}
