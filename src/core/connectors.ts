
import { InjectedConnector } from '@web3-react/injected-connector';
import { LinesState } from './types';


export const injectedConnector = new InjectedConnector({ supportedChainIds: [80001] });