import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from "react";

export interface TextProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	children?: ReactNode;
	size: string;
}
