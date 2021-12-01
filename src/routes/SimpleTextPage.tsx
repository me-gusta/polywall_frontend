import styled from "styled-components";

const PageDiv = styled.div`
display: flex;
flex-direction: column;
margin: auto;
max-width: 1000px;
text-align: center;
`

export const SimpleTextPage = ({text}: {text: string}) => {
    return <PageDiv>
        <span>{text}</span>
    </PageDiv>
}