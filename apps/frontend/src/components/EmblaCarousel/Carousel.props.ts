import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from "react";
import { IProduct } from "@repo/interfaces";

export interface CarouselProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	visable: boolean;
	background: boolean;
	children: ReactNode
}
