import styled from "@emotion/styled";
import React from "react";
import {SelectionBox} from "./SelectionBox";
import {DashedBox} from "./DashedBox";
import {Insertion} from "./Insertion";

const AuxToolsWidgetStyled = styled('div')({
    transform: 'perspective(1px) translate3d(0, 0, 0)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 10
})
export const AuxToolsWidget = () => {
    return <AuxToolsWidgetStyled className={`aux-tools`}>
        <Insertion/>
        <DashedBox/>
        <SelectionBox/>
    </AuxToolsWidgetStyled>
}