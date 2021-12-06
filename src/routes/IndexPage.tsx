import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { getRandomInt } from "../core/pure"
import { PageContainer } from "../core/styling"


const IndexH1 = styled.h1`
font-family: Blox, sans-serif;
font-size: 200px;
font-weight: 100;
color: var(--theme);
margin: 0;
margin-bottom: 40px
`

const Colored = styled.span`
font-family: Blox, sans-serif;
color: var(--theme2);`

const UnColored = styled.span`
font-family: Blox, sans-serif;
color: var(--theme);`

type Vector = {
    x: number,
    y: number
}

const areEqual = (a: Vector, b: Vector) => a.x === b.x && a.y === b.y

const getRandomVector = (maxVal: number, prevVector: Vector = {x: -1, y: -1}): Vector => {
    var newVector: Vector = prevVector

    while (areEqual(newVector, prevVector) || newVector.x === newVector.y) {
        newVector = {
            x: getRandomInt(maxVal),
            y: getRandomInt(maxVal)
        }
    }
    return newVector
}

export const IndexPage = () => {

    const title = Array.from('PolyWall')
    const [colorLetters, setColoredLetters] = useState<Vector>(getRandomVector(title.length - 1))

    const changeColors = () => {
        console.log('aga');
        setColoredLetters(getRandomVector(title.length, colorLetters))
    }

    useEffect(() => {
        setInterval(changeColors, 700)
    }, [6])

    console.log(colorLetters);
    

    const renderTitle = title.map((val: string, i: number) => {
        if (i === colorLetters.x || i === colorLetters.y)
            return <Colored key={i}>{val}</Colored>
        return <UnColored key={i}>{val}</UnColored>
    })



    return (
        <PageContainer>
            <IndexH1>{renderTitle}</IndexH1>
            <Link to="/wall/0/30">Click here to enter the PolyWall</Link>
        </PageContainer>
    )
}