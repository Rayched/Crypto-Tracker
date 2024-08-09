import { useState } from "react";
import styled from "styled-components";

const ToggleButton = styled.div`
    border: 2px solid black;
    padding: 3px;
    border-radius: 10px;
    text-align: center;
`;

function ToggleBtn(){
    const [theme, settheme] = useState("Light");

    const onToggle = () => {
        if(theme === "Light"){
            settheme("Dark");
        } else {
            settheme("Light")
        }
    }

    return (
        <ToggleButton onClick={onToggle}>
            {
                theme === "Light" ? "SUN" : "MOON"
            }
        </ToggleButton>
    );
};

export default ToggleBtn;