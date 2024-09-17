"use client"
import { Button } from "@/components/Buttons/Button/Button";
import { SubmitButtonProps } from "./SubmitButton.props";
import { useFormStatus } from "react-dom";
import styles from './SubmitButotn.module.css'
import LoadingIcon from '../../../../../../../../public/loading.svg'
import Image from 'next/image'
function Loader({ text }: { text: string | undefined }) {
    return (
        <div className={ styles['loader-wrap'] }>
            <div className={ styles['loader'] }></div>
            { text }
        </div>
    )
}

export function SumbitButton({ loadingText, loading, text }: SubmitButtonProps): JSX.Element {
    const status = useFormStatus()

    return (
        <>
            <Button disabled={ status.pending || loading } type="submit" size={ "large" } design={ "filled" }>
                { status.pending || loading ? <Loader text={ loadingText }></Loader> : text }
            </Button>
        </>
    )
}