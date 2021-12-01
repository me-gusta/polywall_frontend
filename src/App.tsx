import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { LinesPage } from './routes/LinesPage';
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "./core/connectors";
import { UnsupportedChainIdError } from '@web3-react/core';
import { SimpleTextPage } from "./routes/SimpleTextPage";
import styled from "styled-components";
import { FlatButton } from "./core/styling";
import { WithdrawPage } from "./routes/WithdrawPage";

const Header = styled.nav`
width: 100;
display: flex;
padding: 0 50px;
`

const NavUl = styled.ul`
display: flex;
gap: 30px;
height: 30px;
li {
  display: flex;
  align-items: start;
  list-style: none;
  display: flex;
  align-items: center;
}
`

const PageContainer = styled.div`
width: 100%;
margin: 100px 0`

const Footer = styled.footer`
width: 100%;
margin: auto;
display: flex;
flex-direction: column;
align-items: center;
`

function App() {
  const { active, error, activate } = useWeb3React()

  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError

  return (
    <Router>
      <Header>
        <NavUl>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/wall/-5/30">The Wall</Link>
          </li>
          <li>
            <Link to="/withdraw">Withdraw</Link>
          </li>
          <li>
            {active ?
              <span>Connected</span>
              :
              <FlatButton onClick={() => activate(injectedConnector)}>Connect</FlatButton>
            }
          </li>
        </NavUl>
      </Header>
      <PageContainer>
        <Routes>
          <Route path="/" element={<SimpleTextPage text ="Hello world!" />} />
          <Route path="/withdraw" element={<WithdrawPage />} />
          {active ?
            <Route path="/wall/:from_uid/:amount" element={<LinesPage />} />
            :
            <Route path="/wall/:from_uid/:amount" element={<SimpleTextPage text={isUnsupportedChainIdError ? "Please switch to the Polygon blockchain" : "Connect your Metamask wallet to proceed"} />} />
          }
        </Routes>
      </PageContainer>
      <Footer>
        <NavUl>
          <li>
            <a href="#" target="_blank">PolygonScan</a>
          </li>
          <li>
            <a href="#" target="_blank">GitHub</a>
          </li>
        </NavUl>
      </Footer>
    </Router>
  );
}

export default App;
