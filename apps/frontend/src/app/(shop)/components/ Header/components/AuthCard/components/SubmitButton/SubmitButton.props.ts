import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface SubmitButtonProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	text: string;
	loading?: boolean;
	loadingText?: string;
}
