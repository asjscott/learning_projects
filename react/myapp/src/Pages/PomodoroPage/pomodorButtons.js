export default function PomodoroButton({children, ...rest}) {
    return (
        <button className="mx-auto w-24 text-xl mb-5 py-3 border rounded-xl hover:bg-slate-400" {...rest}>{children}</button>
    )
}