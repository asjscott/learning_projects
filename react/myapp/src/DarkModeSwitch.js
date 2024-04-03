import { useState } from "react"

const DarkModeSwitch = () => {

    const [isDarkMode, setDarkMode] = useState(false);

    const [buttonText, setButtonText] = useState('Dark')

    const toggleDarkMode = () => {
        if (isDarkMode) {
            window.document.documentElement.classList.remove('dark')
            setButtonText('Dark')
        } else {
            window.document.documentElement.classList.add('dark')
            setButtonText('Light')
        }
        setDarkMode(!isDarkMode);
    };

    return (
            <button onClick={toggleDarkMode} className="border-solid border-2 rounded-md hover:text-blue-500 hover:border-blue-500 border-slate-900 p-2 dark:border-slate-50 dark:text-slate-50 dark:hover:text-blue-500 dark:hover:border-blue-500">💡{' '}{buttonText}</button>
    )
}

export default DarkModeSwitch

