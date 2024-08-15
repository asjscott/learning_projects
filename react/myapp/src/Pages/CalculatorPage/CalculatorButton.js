import className from 'classnames'
import { twMerge } from 'tailwind-merge';

export default function CalculatorButton({
    children,
    special,
    number,
    operator,
    zero,
    ...rest
}) {
    const classes = twMerge(className(
        "cursor-pointer w-full py-2 sm:py-3.5 sm:px-4 rounded-full", {
            'text-black bg-slate-300 hover:bg-slate-200': special,
            'bg-neutral-800 text-white hover:bg-neutral-600' : number,
            'text-white bg-amber-500 hover:bg-amber-400': operator,
        }
    ))

    return (
        <div className={ zero ? `col-span-2 w-full` : ""}><button className={classes} {...rest}>{children}</button></div>
    )
}