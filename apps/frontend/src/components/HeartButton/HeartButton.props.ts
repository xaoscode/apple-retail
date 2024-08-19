import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface HeartButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	activated: boolean;
}
