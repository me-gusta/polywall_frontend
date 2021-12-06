import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import { ReactChild } from "react"
import { PageContainer } from "../core/styling"

export const RequireMetamask = ({children}: { children: ReactChild|ReactChild[] }) => {
    const { active, error } = useWeb3React()

    const isDisconnected = !active
    const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError

    const renderElement = isDisconnected ? <span>Connect your Metamask wallet to proceed</span> :
        isUnsupportedChainIdError ? <span>Please switch to the Polygon blockchain</span> : children
    return (
        <PageContainer>{renderElement}</PageContainer>
    )
}