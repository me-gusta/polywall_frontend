import styled from "styled-components";

export const FlatButton = styled.button`
background: transparent;
border: 1px solid var(--main-text);
color: var(--main-text);
padding: 5px 15px;
cursor: pointer;
&:hover{
    color: var(--theme);
    border: 1px solid var(--theme);
}
&:active {
    background: var(--main-text);
}`
