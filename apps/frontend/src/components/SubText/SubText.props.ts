import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from "react";

export interface SubTextProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	children?: ReactNode;
	size: string;
}
