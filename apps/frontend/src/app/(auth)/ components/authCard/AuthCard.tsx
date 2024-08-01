import { AuthCardProps } from "./AuthCard.props";
import styles from "./AuthCard.module.css";

export const AuthCard = ({ ...props }: AuthCardProps): JSX.Element => {
    return <div className={ styles['card'] }  { ...props }>

    </div>
}