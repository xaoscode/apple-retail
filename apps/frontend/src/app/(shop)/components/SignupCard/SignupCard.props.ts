import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from "react";

export interface SignupCardProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children?: ReactNode;
}
