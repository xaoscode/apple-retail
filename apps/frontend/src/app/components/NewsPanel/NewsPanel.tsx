import { NewsPanelProps } from "./NewsPanel.props";
import styles from "./NewsPanel.module.css";

export const NewsPanel = ({ ...props }: NewsPanelProps): JSX.Element => {
    return <div className={ styles['news'] }  { ...props }>

    </div>
}