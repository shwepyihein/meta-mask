import React from "react"
import { twMerge } from "tailwind-merge"

/* eslint-disable-next-line */
export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string
  block?: boolean
  disabled?: boolean
  variant?: "small" | "big"
}

export function Button({
  children = "Button",
  className,
  block,
  disabled,
  variant = "big",
  ...props
}: ButtonProps) {
  const buttonStyleClass =
    "flex justify-center items-center shadow-base text-white bg-gray-300 rounded-full ml-3 text-xs"
  const variantStyle = {
    small: "px-[17px] py-[9px]",
    big: "px-[25px] py-[13px]",
  }
  return (
    <button
      {...props}
      disabled={disabled}
      className={twMerge(className, buttonStyleClass, variantStyle[variant])}
    >
      {children}
    </button>
  )
}

export default Button
