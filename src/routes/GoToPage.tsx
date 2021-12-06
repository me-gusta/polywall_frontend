import { useState } from "react"
import styled from "styled-components"
import { FlatButton } from "../core/styling"
import { useNavigate } from "react-router-dom";

const GoToContainer = styled.div`
display: flex;
flex-direction: column;
gap: 10px;`

const GoToInput = styled.input`
background: none;
border: none;
border-bottom: 1px solid var(--main-text);
outline: 0;
color: var(--main-text)
`

export const GotToPage = () => {
    const [lineNumber, setLineNumber] = useState('');
    const navigate = useNavigate()

    return (
        <GoToContainer>
            <span>Enter the line number</span>
            <GoToInput type="number" value={lineNumber} onInput={(e: any) => setLineNumber(e.target.value)} placeholder={"•".repeat(50)}/>
            <FlatButton onClick={() => lineNumber && Number.parseInt(lineNumber) >= 0 ? navigate(`/wall/${lineNumber}/30`) : () => {}}>Go</FlatButton>
        </GoToContainer>
    )
}
