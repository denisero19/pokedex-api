import React, { useContext } from "react"
import { Button } from "../button/button"
import { ThemeContext, themes } from "../../theme-context/theme-context"

export const ThemeTogglerButton = () => {
     
    const { theme , setTheme } = useContext(ThemeContext)

    return (
           <Button onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)} > {theme === themes.light ? "Light" : "Dark"} </Button>
     )
}
