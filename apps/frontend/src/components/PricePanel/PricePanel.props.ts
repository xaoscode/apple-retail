import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from "react";

export interface PricePanelProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	cost: number;
	discountPercentage?: number;
}
