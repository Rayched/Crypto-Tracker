import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";

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

function ToggleBtn(){
    const [isDark, setDark] = useRecoilState(isDarkAtom);

    const onToggle = () => setDark(!isDark);

    return (
        <ToggleButton onClick={onToggle}>
            {
                isDark ? "Dark" : "LIGHT"
            }
        </ToggleButton>
    );
};

export default ToggleBtn;