import PacketList from "./PacketList"
import { Button} from "react-bootstrap"
import { ArrowRepeat, PlayFill, PauseFill } from "react-bootstrap-icons"
import './index.css'
import { useState } from "react"

function PacketContainer({fetchData, hasMore, packetList, refresh, onPlay}: any) {
    let [isPlaying, setIsPlaying] = useState(false)

    const stopButton = (
        <Button
            className='rounded-pill'
            variant='success'
            size='sm'
            onClick={() => {
            setIsPlaying(false)
            onPlay(false)
            
        }}>
            <PauseFill/>
            &nbsp;
            Stop
        </Button>
    )

    const playButton = (
        <Button className='rounded-pill' size='sm' variant='light'  onClick={() => {
            setIsPlaying(true)
            onPlay(true)
        }}>
            <PlayFill/> Capture
        </Button>
    )

    return (
        <div className='packet-container rounded'>
            <div className='packet-container-inner'>
                <h3>Packets</h3>
                <div className='packet-action-buttons'>
                    {isPlaying ? stopButton : playButton}
                    &nbsp;
                    <Button className='rounded-pill' size='sm' onClick={refresh}>
                        <ArrowRepeat/> &nbsp; Fetch
                        
                    </Button>
                    
                    
                </div>
            </div>
            <PacketList
                fetchData={fetchData}
                hasMore={hasMore}
                packetList={packetList}
            />
        </div>
    )
}

export default PacketContainer