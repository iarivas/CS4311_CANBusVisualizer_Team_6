import React from "react";
import { toPng } from "html-to-image";
import { Button } from "react-bootstrap";

export function downloadImage({
    dataUrl
}: any){
    const a = document.createElement('a')
    a.setAttribute('download', 'nodeMap.png')
    a.setAttribute('href', dataUrl)
    a.click()
}
export function downloadButton(){
    const onClick = () => {
        var map = document.querySelector('.react-flow') as HTMLElement
        toPng(map, {
            filter: (Node) => {
                if(
                    Node?.classList?.contains('react-flow__minimap') ||
                    Node?.classList?.contains('react-flow__controls')
                ) {
                    return false
                }
                return true
            },
        }).then(downloadImage);
    };
    return (
        <Button className="download-btn" onClick={onClick}>
            Download Map
        </Button>
    );
}