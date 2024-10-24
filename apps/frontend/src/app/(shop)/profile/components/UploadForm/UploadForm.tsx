"use client"
import { UploadFormProps } from "./UploadForm.props";
import styles from "./UploadForm.module.css";
import { ChangeEvent, useActionState, useState } from "react";
import { Input } from "@/components/Input/Input";
import Image from 'next/image'
import { uploadAction } from "./_upload_action/upload-action";
import { UPLOAD_INITIAL_STATE } from "./_upload_action/initial-state";

export function UploadForm({ ...props }: UploadFormProps): JSX.Element {
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null); // Состояние для хранения ссылки на изображение
    const [formState, formAction] = useActionState(uploadAction, UPLOAD_INITIAL_STATE);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const selectedFile = files[0];
            setFile(selectedFile);

            // Создаём URL для выбранного файла и устанавливаем в состояние
            const imageUrl = URL.createObjectURL(selectedFile);
            setImagePreview(imageUrl);
        } else {
            setFile(null);
            setImagePreview(null);
        }
    };

    return (
        <form className={ styles['form-wrap'] } action={ formAction }>

            <Input value={ file?.name } className={ styles['input'] } />
            <input name="image" onChange={ handleFileChange } id="actual-btn" type="file" hidden />
            <label className={ styles['label'] } htmlFor="actual-btn"><Image src={ "/upload.svg" } alt={ "upload" } width={ 20 } height={ 20 }></Image></label>
            { imagePreview && (
                <div className={ styles["image-preview"] }>
                    <Image src={ imagePreview } alt="Preview" width={ 300 } height={ 300 } />
                </div>
            ) }

            <button type="submit">Submit</button>
        </form>
    );
};
