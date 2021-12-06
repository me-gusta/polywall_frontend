import styled from "styled-components";
import { useEffect, useRef, useState } from 'react'
import { LINE_LENGTH, LINE_PRICE } from '../core/constants';
import { sleep } from '../core/pure';
import { LineConfig } from "../core/types";
import { useDispatch } from "react-redux";
import { addLine, removeLine } from "../core/slices/editorSlice";

// ============= STYLES =============

const LineInput = styled.input`
border: none;
border-bottom: 1px solid transparent;
border-top: 1px solid transparent;
outline: none;
// width: 870px;
background-color: transparent;
&::placeholder {
    color: var(--disabled)
  }
`

const LineItem = styled.tr<{ isEdited: boolean }>`
position: relative;
display: grid;
grid-template-columns: 1fr 10fr;
// width: 100%;
caret-color: var(--theme);
color: ${props => props.isEdited ? 'var(--theme)' : 'var(--main-text)'};
input[type="text"] {
    color: ${props => props.isEdited ? 'var(--theme)' : 'var(--main-text)'};
}
td {
    padding: 0 5px;
}
`

const LineCell = styled.td`
border-left: 1px solid var(--main-text);
border-right: 1px solid var(--main-text);
`

const PriceElem = styled.td<{ isEdited: boolean }>`
position: relative;
display: flex;
justify-content: right;
align-items: center;
font-size: 0.7rem;
white-space: nowrap;
width: 80px;
margin-right: 2px;
&::after {
    position: absolute;
    content: " ";
    width: 0; 
    height: 0; 
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent; 
    border-right: 5px solid ${props => props.isEdited ? 'var(--theme)' : 'var(--main-text)'};;
    right: -2px;
}
`

// ============= LOGIC =============

const focusLine = (uid: number, selectionStart: number) => {
    const links: any[] = Array.from(document.getElementsByClassName("link"))
    for (let i = 0; i < links.length; i++) {
        const element = links[i]
        if (element.dataset.uid === uid.toString()) {
            element.focus()
            sleep(2).then(() => element.setSelectionRange(selectionStart, selectionStart))
        }
    }
}

export const Line = (cfg: LineConfig) => {
    let init_text = cfg.str
    if (cfg.str !== '' && cfg.str.trimEnd() !== '') {
        init_text = cfg.str.trimEnd()
    }
    const dispatch = useDispatch()

    const [text, setText] = useState<string>(init_text)
    const [isEdited, setIsEdited] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setIsEdited(!(text === init_text))
        if (isEdited) {
            dispatch(addLine({
                uid: cfg.uid.toNumber(),
                str: text,
                edits: cfg.edits.toNumber()
            }))
        } else {
            dispatch(removeLine(cfg.uid.toNumber()))
        }
    }, [text, init_text, isEdited, dispatch, cfg.uid, cfg.edits])

    useEffect(() => {
        setText(cfg.str)
    }, [cfg.str])

    const onTyping = (e: any) => {
        const newText = e.target.value
        if (newText.length > LINE_LENGTH) {
            focusLine(cfg.uid.toNumber() + 1, 0);
            return
        }
        setText(newText)
        setIsEdited(newText !== init_text)
    }

    const handeKeys = (e: any) => {
        switch (e.key) {
            case 'Enter':
            case 'ArrowDown': {
                focusLine(cfg.uid.toNumber() + 1, e.target.selectionStart)
                break
            }
            case 'ArrowUp': {
                focusLine(cfg.uid.toNumber() - 1, e.target.selectionStart)
                break
            }
        }
    }
    
    return <LineItem isEdited={isEdited}>
        <PriceElem isEdited={isEdited}>{(cfg.edits.toNumber() * LINE_PRICE ).toFixed(3)} MATIC</PriceElem>
        <LineCell>
            <LineInput
                placeholder={"•".repeat(LINE_LENGTH)}
                size={LINE_LENGTH}
                className="link"
                type="text"
                value={text}
                onChange={e => onTyping(e)}
                data-uid={cfg.uid}
                onKeyDown={e => handeKeys(e)}
                ref={inputRef}
            ></LineInput>
        </LineCell>
    </LineItem>

}