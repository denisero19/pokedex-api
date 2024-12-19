import { createContext, useState } from "react";


export const themes = {
    light: {
        background: '#d5f0c1',
        color: "#536493",
       
    },

    dark: {
        background: '#7ed4ad',
        color: "#474e93",
       
    },
};

export const ThemeContext = createContext()

export const ThemeProvider = (props) => {

    const [ theme, setTheme ] = useState(themes.light)

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
        {props.children}
        </ThemeContext.Provider>
    )
}
