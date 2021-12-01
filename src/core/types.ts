
import BN from "bn.js";

export type LineConfig = {
    uid: BN,
    str: string,
    edits: BN
}



export type LinesState = {
    editedLines: LineConfig[]
}