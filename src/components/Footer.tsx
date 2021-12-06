import styled from "styled-components"
import { WALL_ADDRESS } from "../core/constants"
import { NavUl } from "../core/styling"

const FooterContainer = styled.footer`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`

const PolygonLink = styled.a`
&:hover {
    color: var(--polygon)
}
`
const GitHubLink = styled.a`
&:hover {
    .gh1 {
       color: var(--github1);
    }
    .gh2 {
        color: var(--github2);
     }
}
`

export const Footer = () => {

    return (
        <FooterContainer>
            <NavUl>
                <li>
                    <PolygonLink href={`https://polygonscan.com/address/${WALL_ADDRESS}`} target="_blank">PolygonScan</PolygonLink>
                </li>
                <li>
                    <GitHubLink href="#" target="_blank"><span className="gh1">Git</span><span className="gh2">Hub</span></GitHubLink>
                </li>
            </NavUl>
        </FooterContainer>
    )
}