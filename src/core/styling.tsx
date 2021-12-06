import styled from "styled-components";

export const FlatButton = styled.button`
background: transparent;
border: 1px solid var(--main-text);
color: var(--main-text);
font-size: var(--font-size);
cursor: pointer;
padding: 1px 15px;

&:hover{
    color: var(--theme);
    border: 1px solid var(--theme);
}

&:active {
    background: var(--theme2);
}
`

export const PageContainer = styled.div`
display: flex;
flex-direction: column;
margin: 0 auto;
max-width: 1000px;
text-align: center;
`

export const NavUl = styled.ul`
display: flex;
gap: 30px;
height: 30px;
li {
  display: flex;
  align-items: start;
  list-style: none;
  display: flex;
  align-items: center;
  word-spacing: -4px;
}
`
