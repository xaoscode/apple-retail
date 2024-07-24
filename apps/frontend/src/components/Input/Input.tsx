import { InputProps } from "./Input.props";
import styles from "./Input.module.css"
import cn from "classnames";
import { Button } from "../Button/Button";

export function Input({ error, ...props }: InputProps): JSX.Element {
    return (
        <div>

            <div className={ styles["input-wrapper"] }>
                <input className={ cn(styles.input, { [styles.error]: error }) } { ...props } />
                { error &&
                    <span className={ styles['error-icon'] }>
                        <img src="/errorInput.svg" className={ styles["error-icon"] } />
                    </span> }



            </div>
            <div className={ styles['text-error'] }>{ error }</div>

        </div>
    )
}


