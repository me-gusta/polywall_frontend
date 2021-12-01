import styled from "styled-components";

const Dots = styled.div`
position: relative;
left: -9999px;
width: 10px;
height: 10px;
border-radius: 5px;
background-color: var(--theme);
color: var(--theme);
box-shadow: 9999px 0 0 -5px var(--theme);
animation: dotPulse 1.5s infinite linear;
animation-delay: .25s;
  
&::before, &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: var(--theme);
    color: var(--theme);
}

&::before {
    box-shadow: 9984px 0 0 -5px var(--theme);
    animation: dotPulseBefore 1.5s infinite linear;
    animation-delay: 0s;
}

&::after {
    box-shadow: 10014px 0 0 -5px var(--theme);
    animation: dotPulseAfter 1.5s infinite linear;
    animation-delay: .5s;
}

@keyframes dotPulseBefore {
    0% {
        box-shadow: 9984px 0 0 -5px var(--theme);
    }
    30% {
        box-shadow: 9984px 0 0 2px var(--theme);
    }
    60%,
    100% {
        box-shadow: 9984px 0 0 -5px var(--theme);
    }
}

@keyframes dotPulse {
    0% {
        box-shadow: 9999px 0 0 -5px var(--theme);
    }
    30% {
        box-shadow: 9999px 0 0 2px var(--theme);
    }
    60%,
    100% {
        box-shadow: 9999px 0 0 -5px var(--theme);
    }
}

@keyframes dotPulseAfter {
    0% {
        box-shadow: 10014px 0 0 -5px var(--theme);
    }
    30% {
        box-shadow: 10014px 0 0 2px var(--theme);
    }
    60%,
    100% {
        box-shadow: 10014px 0 0 -5px var(--theme);
    }
}
`

export const LoadingDots = () => {
    return <Dots/>
}