import { ChangeEvent, DetailedHTMLProps, KeyboardEvent, TextareaHTMLAttributes } from "react";

export interface TextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	error?: string;
	value?: string;
}
