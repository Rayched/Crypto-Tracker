import { useState } from "react";
import styled from "styled-components";

interface ToggleBtn {
    toggle: boolean;
};

const ToggleBox = styled.div<ToggleBtn>`
    width: 52px;
    height: 30px;
    border: 2px solid black;
    border-radius: 25px;
    cursor: pointer;
    background-color: gray;

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease-in-out;
`;

const ToggleCircle = styled.div<ToggleBtn>`
    background-color: white;
    border: 2px solid black;
    border-radius: 30px;
    width: 20px;
    height: 20px;
    position: absolute;
    left: 5%;
    transition: all 0.5s ease-in-out;
    ${(props) => props.toggle ? "transform: translate(22px, 0);" : "none"};
`;

function ToggleBtn(){
    const [isToggle, setToggle] = useState(false);

    const onToggle = () => {
        setToggle(!isToggle);
    }

    return (
        <ToggleBox onClick={onToggle} toggle={isToggle}>
            <ToggleCircle toggle={isToggle}/>
        </ToggleBox>
    );
};

export default ToggleBtn;