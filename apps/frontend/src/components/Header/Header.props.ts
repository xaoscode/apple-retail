import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from "react";

export interface HeaderProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	children?: ReactNode;
	size: string;
}
