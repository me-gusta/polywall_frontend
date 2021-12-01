import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type LineStored = {
    uid: number,
    str: string,
    edits: number
}

export type StoreState = {
    editedLines: LineStored[]
}

export const editorSlice = createSlice({
    name: 'editor',
    initialState: {
        editedLines: [],
    },
    reducers: {
        addLine: (state: StoreState, action: PayloadAction<LineStored>) => {
            for (let i = 0; i < state.editedLines.length; i++) {
                if (state.editedLines[i].uid === action.payload.uid) {
                    state.editedLines[i].str = action.payload.str
                    return
                }
            }
            state.editedLines.push(action.payload)
        },
        removeLine: (state: StoreState, action: PayloadAction<number>) => {
            let removeIndex: number | null = null
            for (let i = 0; i < state.editedLines.length; i++) {
                if (state.editedLines[i].uid === action.payload) {
                    removeIndex = i
                    break
                }
            }
            removeIndex !== null && state.editedLines.splice(removeIndex, 1)
        }
    },
})


export const { addLine, removeLine } = editorSlice.actions

export default editorSlice.reducer