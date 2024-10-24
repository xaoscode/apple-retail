import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from "react";

export interface PricePanelProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	price: number;
	discountPercentage?: number;
}
