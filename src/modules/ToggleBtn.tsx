import { useState } from "react";
import styled from "styled-components";

const ToggleButton = styled.div`
    width: 100px;
    height: 40px;
    border: 2px solid black;
    padding: 3px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;

    background-color: ${(props) => props.theme.ItemBgColor};
    color: ${(props) => props.theme.textColor};

    &:hover {
        background-color: ${(props) => props.theme.accentBgColor};
    }
`;

interface theme {
    isTheme: boolean|undefined;
    onToggle: Function;   
}

function ToggleBtn({isTheme, onToggle}: theme){
    const [theme, settheme] = useState("Dark");

    const onClick = () => {
        onToggle();
        if(isTheme === true){
            settheme("Dark");
        } else {
            settheme("Light")
        }
    }

    return (
        <ToggleButton onClick={onClick}>
            {
                theme === "Dark" ? "🌞 SUN" : "🌙 MOON"
            }
        </ToggleButton>
    );
};

export default ToggleBtn;