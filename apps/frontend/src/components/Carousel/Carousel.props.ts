import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { IProduct } from "@repo/interfaces";

export interface CarouselProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	products: IProduct[];
	visable: boolean;
	renderProduct: (product: IProduct, index: number) => JSX.Element;
	background: boolean;
}
