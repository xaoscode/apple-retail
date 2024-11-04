import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";
import { ComponentPropsWithoutRef, DetailedHTMLProps, ElementRef } from "react";
import styles from "./DropdownComponents.module.css";
import cn from "classnames";
const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
import SignalIcon from "@/../public/signal.svg"
import RadioIcon from "@/../public/radio.svg"

const DropdownMenuSubTrigger = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
        inset?: boolean;
    }
>(({ className, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger ref={ ref } className={ cn(styles.sub__trigger, className) } { ...props }>
        { children }
    </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuContent = forwardRef<ElementRef<typeof DropdownMenuPrimitive.Content>, ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>>(
    ({ className, sideOffset = 4, ...props }, ref) => (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content ref={ ref } sideOffset={ sideOffset } className={ cn(styles.content, className) } { ...props } />
        </DropdownMenuPrimitive.Portal>
    )
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuLabel = forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
        inset?: boolean
    }
>(({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
        ref={ ref }
        className={ cn(
            styles.lable,
            className
        ) }
        { ...props }
    />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName


const DropdownMenuCheckboxItem = forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
        ref={ ref }
        className={ cn(
            styles.checkbox__item,
            className
        ) }
        checked={ checked }
        { ...props }
    >
        <span className={ styles.checkbox__icon }>
            { checked ?
                <DropdownMenuPrimitive.ItemIndicator className={ styles.span__blyat }>
                    <SignalIcon />

                </DropdownMenuPrimitive.ItemIndicator>
                : <RadioIcon /> }

        </span>
        { children }
    </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
    DropdownMenuPrimitive.CheckboxItem.displayName
export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
};
