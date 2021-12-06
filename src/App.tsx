import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { LinesPage } from './routes/LinesPage';
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "./core/connectors";
import styled from "styled-components";
import { FlatButton, NavUl, PageContainer } from "./core/styling";
import { WithdrawPage } from "./routes/WithdrawPage";
import { RequireMetamask } from "./components/RequireMetamask";
import { Footer } from "./components/Footer";
import { IndexPage } from "./routes/IndexPage";
import { GotToPage } from "./routes/GoToPage";

const Header = styled.nav`
width: 100;
display: flex;
padding: 0 50px;
`




function App() {
  const { active, activate } = useWeb3React()


  return (
    <Router>
      <Header>
        <NavUl>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/wall/0/30">Wall</Link>
          </li>
          <li>
            <Link to="/goto">Go To Line</Link>
          </li>
          <li>
            <Link to="/withdraw">Withdraw</Link>
          </li>
          <li>
            {active ?
              <span style={{ color: 'var(--disabled)' }}>Connected</span>
              :
              <FlatButton onClick={() => activate(injectedConnector)}>Connect</FlatButton>
            }
          </li>
        </NavUl>
      </Header>
      <PageContainer>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/goto" element={<GotToPage />} />
          <Route path="/withdraw" element={<RequireMetamask><WithdrawPage /></RequireMetamask>} />
          <Route path="/wall/:from_uid/:amount" element={<RequireMetamask><LinesPage /></RequireMetamask>} />


        </Routes>
      </PageContainer>
      <Footer />
    </Router>
  );
}

export default App;
