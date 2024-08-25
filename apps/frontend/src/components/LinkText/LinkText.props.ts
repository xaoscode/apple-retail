import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from "react";

export interface LinkTextProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	children?: ReactNode;
}
