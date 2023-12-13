import styled from "@emotion/styled";
import React, {FC, useEffect, useRef} from "react";
import {observer} from "@formily/react";
import {useOperation} from "../../hooks";
import {useFormDesigner} from "../../hooks";
import {ClosestPosition} from "../../model";
import _ from "lodash";
import {TreeNode} from "../../model";
import {useViewport} from "../../hooks";

const InsertionStyled = styled('div')({
    position: 'absolute',
    boxSizing: 'border-box',
    pointerEvents: 'none',
})

type InsertionProps = {}

export const Insertion: FC<InsertionProps> = observer(({}) => {
    const ref = useRef<HTMLDivElement>()
    const {nodeIdAttrName} = useFormDesigner()
    const operation = useOperation()
    const {dragging, draggingHoverNode, mouseEvent,closestNode,closestPosition,closestNodeRect} = operation
    const viewport = useViewport()

    //计算鼠标与元素的距离
    // const handleComputePointDistance = (rect: DOMRect) => {
    //     if (mouseEvent.clientX <= rect.left && mouseEvent.clientY <= rect.top) { //鼠标在元素左上角
    //         return Math.sqrt(Math.pow(rect.left - mouseEvent.clientX, 2) + Math.pow(rect.top - mouseEvent.clientY, 2));
    //     } else if (mouseEvent.clientX <= rect.left && mouseEvent.clientY >= rect.bottom) { //鼠标在元素左下角
    //         return Math.sqrt(Math.pow(rect.left - mouseEvent.clientX, 2) + Math.pow(mouseEvent.clientY - rect.bottom, 2));
    //     } else if (mouseEvent.clientX >= rect.right && mouseEvent.clientY <= rect.top) {//鼠标在元素右上角
    //         return Math.sqrt(Math.pow(mouseEvent.clientX - rect.right, 2) + Math.pow(rect.top - mouseEvent.clientY, 2));
    //     } else if (mouseEvent.clientX >= rect.right && mouseEvent.clientY >= rect.bottom) {//鼠标在元素右上角
    //         return Math.sqrt(Math.pow(mouseEvent.clientX - rect.right, 2) + Math.pow(mouseEvent.clientY - rect.bottom, 2));
    //     } else if ((mouseEvent.clientX >= rect.left && mouseEvent.clientX <= rect.right) && mouseEvent.clientY <= rect.top) { //上方
    //         return rect.top - mouseEvent.clientY;
    //     } else if ((mouseEvent.clientX >= rect.left && mouseEvent.clientX <= rect.right) && mouseEvent.clientY >= rect.bottom) { //下方
    //         return mouseEvent.clientY - rect.bottom;
    //     } else if (mouseEvent.clientX <= rect.left && (mouseEvent.clientY >= rect.top && mouseEvent.clientY <= rect.bottom)) { //左边
    //         return rect.left - mouseEvent.clientX;
    //     } else if (mouseEvent.clientX >= rect.right && (mouseEvent.clientY >= rect.top && mouseEvent.clientY <= rect.bottom)) { //右边
    //         return mouseEvent.clientX - rect.right;
    //     } else {
    //         return 0;
    //     }
    // }
    //
    // const handleClosestNode = () => {
    //
    //     if (draggingHoverNode?.droppable) { //当前是可拖入节点
    //         if (_.isEmpty(draggingHoverNode.children)) {
    //             return draggingHoverNode;
    //         } else {
    //             let minDistance = Number.MAX_VALUE;
    //             let closestElement = draggingHoverNode;
    //             _.forEach(draggingHoverNode.children, (node: TreeNode) => {
    //                 const rect = viewport.getValidNodeOffsetRect(node)
    //                 const distance = handleComputePointDistance(rect)
    //
    //                 if (distance < minDistance) {
    //                     minDistance = distance
    //                     closestElement = node
    //                 }
    //             })
    //             return closestElement
    //         }
    //     } else {
    //         return draggingHoverNode;
    //     }
    // }
    //
    // const handleClosestPosition = (closestNode: TreeNode) => {
    //     if (closestNode?.droppable) {
    //         return ClosestPosition.INNER
    //     }
    //     const closestRect = viewport.getValidNodeOffsetRect(closestNode)
    //     const point = {
    //         x: mouseEvent.clientX,
    //         y: mouseEvent.clientY
    //     }
    //     console.log("Insertion",closestRect)
    //     console.log("Insertion",point)
    //     const rectCenter = {
    //         x: closestRect.left + closestRect.width / 2,
    //         y: closestRect.top + closestRect.height / 2,
    //     }
    //     if (closestNode.layout == 'vertical') {
    //         if (point.y <= rectCenter.y) {
    //             return ClosestPosition.BEFORE
    //         } else {
    //             return ClosestPosition.AFTER
    //         }
    //     } else {
    //         {
    //             if (point.x <= rectCenter.x) {
    //                 return ClosestPosition.BEFORE
    //             } else {
    //                 return ClosestPosition.AFTER
    //             }
    //         }
    //     }
    // }
    //
    // useEffect(() => {
    //     if (!dragging || !draggingHoverNode || !ref.current) {
    //         return
    //     }
    //
    //     let closestNode = handleClosestNode()
    //     console.log("closestNode", closestNode)
    //     if (closestNode) {
    //         operation.closestNode = closestNode
    //         let closestPosition = handleClosestPosition(closestNode)
    //         operation.closestPosition = closestPosition
    //         const closestRect = viewport.getValidNodeOffsetRect(closestNode)
    //         if (closestPosition == ClosestPosition.BEFORE) {
    //             ref.current.style.height = `2px`
    //             ref.current.style.width = `${closestRect.width}px`
    //             ref.current.style.backgroundColor = `#1890FF`
    //             ref.current.style.transform = `perspective(1px) translate3d(0px, ${closestRect.top}px, 0px)`
    //         } else if (closestPosition == ClosestPosition.AFTER) {
    //             ref.current.style.height = `2px`
    //             ref.current.style.width = `${closestRect.width}px`
    //             ref.current.style.backgroundColor = `#1890FF`
    //             ref.current.style.transform = `perspective(1px) translate3d(0px, ${closestRect.top + closestRect.height}px, 0px)`
    //         }
    //     }
    // }, [dragging, draggingHoverNode, mouseEvent]);

    const handleInsertionStyles = ():React.CSSProperties => {
        const baseStyle: React.CSSProperties = {
        }
        console.log("Insertion closestNode", closestNode)
        console.log("Insertion closestNodeRect", closestNodeRect)
        console.log("Insertion closestPosition", closestPosition)

        if (closestNode) {

            if (closestPosition == ClosestPosition.UPPER) {
                baseStyle.height = `2px`
                baseStyle.width = `${closestNodeRect.width}px`
                baseStyle.backgroundColor = `#1890FF`
                baseStyle.transform = `perspective(1px) translate3d(0px, ${closestNodeRect.top}px, 0px)`
            } else if (closestPosition == ClosestPosition.UNDER) {
                baseStyle.height = `2px`
                baseStyle.width = `${closestNodeRect.width}px`
                baseStyle.backgroundColor = `#1890FF`
                baseStyle.transform = `perspective(1px) translate3d(0px, ${closestNodeRect.top + closestNodeRect.height}px, 0px)`
            }
        }
        return baseStyle
    }

    return <>{
        dragging && draggingHoverNode && <InsertionStyled ref={ref} style={handleInsertionStyles()}></InsertionStyled>
    }</>
})