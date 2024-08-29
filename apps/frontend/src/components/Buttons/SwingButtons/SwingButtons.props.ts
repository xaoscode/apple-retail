import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface SwingButtonsProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	count: number;
	onRemove: () => void;
	onAdd: () => void;
}
