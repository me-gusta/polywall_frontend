import { useWeb3React } from "@web3-react/core"
import { BigNumber, ethers } from "ethers"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { WALL_ABI, WALL_ADDRESS } from "../core/constants"
import { FlatButton, PageContainer } from "../core/styling"


const WithdrawPageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
`


export const WithdrawPage = () => {

    const { library, account } = useWeb3React()
    const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))

    useEffect(() => {
        if (library && account) {
            const wallContract = new ethers.Contract(WALL_ADDRESS, WALL_ABI, library.getSigner())
            wallContract.pendingMatic(account).then((blnc: BigNumber) => setBalance(blnc))
        }
    }, [library, account])

    const withdraw = () => {
        if (library && account) {
            const wallContract = new ethers.Contract(WALL_ADDRESS, WALL_ABI, library.getSigner())
            wallContract.withdraw().then(() => setBalance(BigNumber.from(0)))
        }
    }


    return (
        <PageContainer>
            <WithdrawPageContainer>
                <span>Avalible for withdrawal: {ethers.utils.formatEther(balance)} MATIC</span>
                <FlatButton onClick={withdraw}>withdraw</FlatButton>
            </WithdrawPageContainer>
        </PageContainer>
    )
}