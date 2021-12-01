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
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "./core/slices/editorSlice";
import { PlaceholderPage } from "./routes/PlaceholderPage";
import styled from "styled-components";
import { FlatButton } from "./core/styling";
import { IndexPage } from "./routes/IndexPage";

const Navigation = styled.nav`
width: 100;
display: flex;
& ul {
  display: flex;
  gap: 10px;
  li {
    list-style: none;
    display: flex;
    align-items: center;
  }
}
`


function App() {
  const { active, error, activate } = useWeb3React()

  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError

  return (
    <Router>
      <Navigation>
        <ul>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/wall/-5/30">PolyWall</Link>
          </li>
          <li>
            <a href="#" target="_blank">GitHub</a>
          </li>
          <li>
            {active ? 
              <span>Connected</span>
            : 
            <FlatButton onClick={() => activate(injectedConnector)}>Connect</FlatButton> 
            }
          </li>
        </ul>
      </Navigation>
      <Routes>
      <Route path="/" element={<IndexPage />} />
        {active ?
          <Route path="/wall/:from_uid/:amount" element={<LinesPage />} />
          : 
          <Route path="/wall/:from_uid/:amount" element={<PlaceholderPage text={isUnsupportedChainIdError ? "Please switch to the Polygon blockchain" : "Connect your Metamask wallet to proceed"} />} />
        }
      </Routes>
    </Router>
  );
}

export default App;
