import { NewsPanelProps } from "./NewsPanel.props";
import styles from "./NewsPanel.module.css";
import { Button } from "@/components/Button/Button";

export const NewsPanel = ({ ...props }: NewsPanelProps): JSX.Element => {
    return <div className={ styles['news'] }  { ...props }>
        <Button icon="/right-arrow.svg" className={ styles['right-button'] } size="medium" design="borderless"></Button>
        <Button icon="/left-arrow.svg" className={ styles['left-button'] } size="medium" design="borderless"></Button>

    </div>
}