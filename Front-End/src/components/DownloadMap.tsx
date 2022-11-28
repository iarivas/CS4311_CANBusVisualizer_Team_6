import { toPng } from "html-to-image";
import download from "downloadjs";

export function DownloadMap(){
    var map = document.getElementById('download-image') as HTMLElement
    toPng(map, {
        filter: (node) => {
            if(
                node?.classList?.contains('react-flow__minimap') ||
                node?.classList?.contains('react-flow__controls')
            ) {
                return false
            }
            return true
        },
    }).then(function(dataUrl){
        download(dataUrl, 'nodeMap.png')
    });
}
export default DownloadMap