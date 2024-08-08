import { AuthCardProps } from "./AuthCard.props";
import styles from "./AuthCard.module.css";

export const AuthCard = ({ children, ...props }: AuthCardProps): JSX.Element => {
    return <div className={ styles['card'] }  { ...props }>
        { children }
    </div>
}