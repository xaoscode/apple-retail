import { SearchInputProps } from "./SearchInput.props";
import styles from "./SearchInput.module.css"
import cn from "classnames";
import { Button } from "../Button/Button";

export function SearchInput({ className, ...props }: SearchInputProps): JSX.Element {
    return (
        <div className={ cn(styles['in'], className) }>
            <div className={ styles["input-wrapper"] }>
                <input className={ styles['input'] } { ...props } />
                <Button className={ styles['button'] } size="small" design="borderless"><img src="/search.svg" alt="search" /></Button>
            </div>
        </div>
    )
}


