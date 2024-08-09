import { useState } from "react";
import styled from "styled-components";

const ToggleButton = styled.div`
    border: 2px solid black;
    padding: 3px;
    border-radius: 10px;
`;

function ToggleBtn(){
    const [theme, settheme] = useState(false);

    const onToggle = () => {
        settheme(!theme);
    }

    return (
        <ToggleButton onClick={onToggle}>
            {
                theme ? "SUN" : "MOON"
            }
        </ToggleButton>
    );
};

export default ToggleBtn;