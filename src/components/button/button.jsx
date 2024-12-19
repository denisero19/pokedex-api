import React, { useContext } from "react"
import { ThemeContext } from "../../theme-context/theme-context"
import { ButtonToggle } from "./buttonStyle"

export const Button = (props) => {
    const { theme } = useContext(ThemeContext)

    return (
        <ButtonToggle {...props}
        style={{ color: theme.color, backgroundColor: theme.background }}    
        />
    )
}