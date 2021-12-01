// ============= STYLES =============

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { Line } from "../components/Line"
import { LINES_PER_TX, LINE_PRICE, WALL_ABI, WALL_ADDRESS } from "../core/constants"
import { useWeb3React } from "@web3-react/core";
import { ethers, utils } from "ethers"
import { LineConfig } from "../core/types";
import BN from "bn.js"
import { useSelector } from "react-redux"
import { StoreState } from "../core/slices/editorSlice"
import { sleep, sliceIntoChunks } from "../core/pure"
import { InfoOverlay } from "../components/InfoOverlay"
import { LoadingDots } from "../components/LoadingDots"
import { FlatButton } from "../core/styling"


const PageContainer = styled.div`
display: flex;
flex-direction: column;
margin: auto;
max-width: 1000px;
`

const StatsContainer = styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;
gap: 10px;`

const LinesContainer = styled.div`
display: flex;
flex-direction: column;
`

const MoreDiv = styled.div`
display: flex;
justify-content: center;
cursor: pointer;
color: var(--theme)`

const LoadingDotsContainer = styled.div`
display: flex;
justify-content: center;
`


// ============= LOGIC =============
type LineRequestParams = {
    from_uid: number,
    amount: number
}

type LinesInfo = {
    lines: JSX.Element[],
    startUid: BN,
    endUid: BN
}

const updateLineFilter = {
    address: WALL_ADDRESS,
    topics: [
        utils.id("LineUpdated(int256,string,int256,uint256)"),
        null,
    ]
}

export const LinesPage = () => {
    const { from_uid, amount } = useParams();

    const initRequestParams: LineRequestParams = {
        from_uid: from_uid !== undefined ? Number.parseInt(from_uid) : 0,
        amount: amount !== undefined ? Number.parseInt(amount) : 0
    }

    const { library } = useWeb3React()
    const [linesInfo, setLinesInfo] = useState<LinesInfo>({
        lines: [],
        startUid: new BN(Number.MAX_SAFE_INTEGER),
        endUid: new BN(Number.MIN_SAFE_INTEGER)
    })

    const [requestParams, setRequestParams] = useState<LineRequestParams>(initRequestParams)
    const [isOverlay, setIsOverlay] = useState<boolean>(false)

    const editedLines = useSelector((state: StoreState) => state.editedLines)
    const editedLinesPrices = (editedLines.reduce<number>((prev, current) => prev + current.edits, 0) * LINE_PRICE).toFixed(3)

    useEffect(() => {
        if (library) {
            const wallContract = new ethers.Contract(WALL_ADDRESS, WALL_ABI, library.getSigner())
            wallContract.getLines(requestParams.from_uid, requestParams.amount).then((rawLines: LineConfig[]) => {
                addLines(rawLines)
            })
            wallContract.on('LineUpdated', (uid: BN, str: string, refTo: BN, edits: BN) => {
                replaceLine({ uid: uid, str: str, edits: edits })
            })
        }
    }, [library, requestParams])

    const replaceLine = (cfg: LineConfig) => {
        setLinesInfo(info => {
            let index: number | null = null

            for (let i = 0; i < info.lines.length; i++) {
                if (info.lines[i].props.uid.toNumber() === cfg.uid.toNumber()) {
                    index = i
                    break
                }
            }
            const newLines = [...info.lines]
            if (index !== null)
                newLines[index] = <Line {...cfg} key={info.lines[index].key} />
            return {
                startUid: info.startUid,
                endUid: info.endUid,
                lines: newLines
            }
        })
    }

    const addLines = (newLines: LineConfig[]) => {
        const newStartUid = newLines[0].uid
        const newEndUid = newLines[newLines.length - 1].uid
        setLinesInfo(info => {
            const isFromStart = newStartUid.toNumber() < info.startUid.toNumber()
            const isFromEnd = newEndUid.toNumber() > info.endUid.toNumber()

            if (isFromStart && isFromEnd) {
                return {
                    startUid: newStartUid,
                    endUid: newEndUid,
                    lines: newLines.map((x, i) => <Line {...x} key={info.lines.length + i} />)
                }
            } else if (isFromStart) {
                return {
                    startUid: newStartUid,
                    endUid: info.endUid,
                    lines: [...newLines.map((x, i) => <Line {...x} key={info.lines.length + i} />), ...info.lines]
                }
            } else if (isFromEnd) {
                return {
                    startUid: info.startUid,
                    endUid: newEndUid,
                    lines: [...info.lines, ...newLines.map((x, i) => <Line {...x} key={info.lines.length + i} />)]
                }
            } else {
                return info
            }
        })
    }

    const commitLines = () => {

        if (editedLines.length && library) {
            sleep(2).then(() => setIsOverlay(true))
            const wallContract = new ethers.Contract(WALL_ADDRESS, WALL_ABI, library.getSigner())
            const chunked = sliceIntoChunks(editedLines, LINES_PER_TX)
            chunked.forEach((lines, i) => {
                const strings = lines.map(line => line.str)
                const uids = lines.map(line => line.uid)
                const value = (lines.reduce((prev, line) => prev + line.edits, 0) * LINE_PRICE).toFixed(3)
                const ether = ethers.utils.parseEther(value)
                wallContract.uploadLines(strings, uids, { value: ether }).then(() => {
                    editedLines.map((line) => replaceLine({ uid: new BN(line.uid), str: line.str, edits: new BN(line.edits) }))
                    if (i === chunked.length - 1) sleep(2).then(() => setIsOverlay(false))
                })
            })
        }
    }

    return <PageContainer>
        {linesInfo.lines.length ?
            <StatsContainer>
                <div>Total: {editedLines.length} lines edited -&gt; {editedLinesPrices.toString()} MATIC</div>
                <div>
                    <FlatButton onClick={commitLines}>Commit</FlatButton>
                </div>
            </StatsContainer>
            : ""
        }
        {linesInfo.lines.length ?
            <LinesContainer>
                <MoreDiv onClick={_ => setRequestParams({ from_uid: linesInfo.startUid.toNumber() - 20, amount: 20 })}>load more up...</MoreDiv>
                <br />
                <table>
                    <tbody>
                        {linesInfo.lines}
                    </tbody>
                </table>
                <br />
                <MoreDiv onClick={_ => setRequestParams({ from_uid: linesInfo.endUid.toNumber() + 1, amount: 20 })}>load more down...</MoreDiv>
            </LinesContainer>
            :
            <LoadingDotsContainer><LoadingDots /></LoadingDotsContainer>
        }
        {isOverlay ?
            <InfoOverlay>
                {editedLines.length ?
                    [
                        <span key={0}>Your transactions are being prepared!</span>,
                        <span key={1}>Lines edited: {editedLines.length}</span>,
                        <span key={2}>Total MATIC: {editedLinesPrices.toString()}</span>,
                        <span key={3}>Transactions count: {Math.ceil(editedLines.length / LINES_PER_TX)}</span>
                    ]
                    : <span>Please confirm all transactions.</span>}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                    <LoadingDots />
                </div>
            </InfoOverlay>
            : ''
        }
    </PageContainer>
}