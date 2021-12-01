import styled from "styled-components";

export const FlatButton = styled.button`
background: transparent;
border: 1px solid var(--main-text);
color: var(--main-text);
font-size: var(--font-size);
cursor: pointer;
&:hover{
    color: var(--theme);
    border: 1px solid var(--theme);
}
&:active {
    background: var(--main-text);
}`

export const PageContainer = styled.div`
display: flex;
flex-direction: column;
margin: 50px auto;
max-width: 1000px;
text-align: center;
`