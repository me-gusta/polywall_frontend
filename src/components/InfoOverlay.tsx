import { ReactNode } from "react"
import styled from "styled-components"

const InfoOverlayElem = styled.div`
z-index: 3;
position: absolute;
width: 100%;
height: 100%;
left: 0;
top: 0;
background: rgba(255,255,255,0.1);
display: flex;
justify-content: center;
align-items: center;
`

const OverlayContainer = styled.div`
display: flex;
justify-content: center;
gap: 5px;
// align-items: center;
flex-direction: column;
background: var(--main-text);
color: var(--main-bg);
min-width: 300px;
padding: 10px;
`

export const InfoOverlay = ({ children }: { children: ReactNode | ReactNode[] }) => {
    return <InfoOverlayElem>
        <OverlayContainer>
            {children}
        </OverlayContainer>
    </InfoOverlayElem>
}