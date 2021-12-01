import styled from "styled-components";

const IndexPageContainer = styled.div`
display: flex;
flex-direction: column;
margin: auto;
max-width: 1000px;
text-align: center;
`

export const IndexPage = () => {
    return <IndexPageContainer>
        <p>Hello world!</p>
    </IndexPageContainer>
}