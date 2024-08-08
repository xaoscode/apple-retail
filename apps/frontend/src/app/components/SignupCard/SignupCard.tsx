import { SignupCardProps } from "./SignupCard.props";
import styles from "./AuthCard.module.css";

export const SignupCard = ({ ...props }: SignupCardProps): JSX.Element => {
    return <div className={ styles['card'] }  { ...props }>

    </div>
}