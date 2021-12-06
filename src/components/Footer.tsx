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
const GitHubLink = styled.span`
.gh1:hover {
    color: var(--github1);
}
.gh2:hover {
    color: var(--github1);
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
                    <GitHubLink>
                        <a className="gh1" href="https://github.com/me-gusta/polywall_frontend" target="_blank">Git</a>
                        <a className="gh2" href="https://github.com/me-gusta/polywall_contracts" target="_blank">Hub</a>
                    </GitHubLink>
                </li>
            </NavUl>
        </FooterContainer>
    )
}