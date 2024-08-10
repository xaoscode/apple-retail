"use client"
import React, { useRef, useState, useEffect } from 'react';
import { SearchInputProps } from "./SearchInput.props";
import styles from "./SearchInput.module.css";
import cn from "classnames";
import { Button } from "../Button/Button";
import { SubText } from '../SubText/SubText';

export function SearchInput({ className, ...props }: SearchInputProps): JSX.Element {
    const [historyVisible, setHistoryVisible] = useState(false);
    const [searchHistory, setSearchHistory] = useState<string[]>(["apple", "banana", "orange", 'cucumber']);
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
    return (
        <div ref={ wrapperRef } className={ styles["input-wrapper"] }>
            <form action="" className={ styles["input-wrapper"] }>
                <input
                    className={ cn({
                        [styles['input-base']]: !historyVisible, // Базовые стили всегда применяются
                        [styles['input']]: historyVisible,
                    }) }
                    { ...props }
                    onFocus={ handleFocus }
                    onChange={ inputChange }
                />
                <Button className={ styles['button'] } size="small" design="borderless">
                    <img src="/search.svg" alt="search" />
                </Button>
            </form>
            { historyVisible && (
                <div className={ styles['history'] }>
                    <div className={ styles['history-action'] }>
                        <SubText size='2'>История поиска</SubText>
                        <Button onClick={ clearHistory } size='small' design='borderless'>Очистить историю</Button>
                    </div>
                    { searchHistory.map((item, index) => (
                        <div
                            key={ index }
                            tabIndex={ 0 }
                            className={ styles['history-item'] }
                            onClick={ () => handleHistoryClick(item) }
                        >
                            { item }
                        </div>
                    )) }
                </div>
            ) }
        </div>
    );
}
