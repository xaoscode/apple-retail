import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface CartButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	activated: boolean;
}
