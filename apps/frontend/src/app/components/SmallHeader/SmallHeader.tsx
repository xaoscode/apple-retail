import { Button } from "@/components/Button/Button";
import styles from "./SmallHeader.module.css";
import cn from "classnames";
import Image from 'next/image'
import { Text } from '@/components/Text/Text'
import { SmallHeaderProps } from "./SmallHeader.props";
export const SmallHeader = ({ className, ...props }: SmallHeaderProps): JSX.Element => {
    return (
        <div { ...props } className={ cn(className, styles['small-header']) } >

            <Text size="3">Хабаровск</Text>
            <div className={ styles['menu'] }>
                <Button design="borderless" size="small">Акции</Button>
                <Button design="borderless" size="small">Вакансии</Button>
                <Button design="borderless" size="small">Доставка</Button>
                <Button design="borderless" size="small">Покупателям</Button>
                <Button design="borderless" size="small">Юридическим лицам</Button>
            </div>
            <Text size="3">8-996-683-19-63</Text>

        </div>
    );
}