import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface StockStatusProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	status: string;
}
