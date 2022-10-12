import {useParams} from 'react-router-dom'
import { useState } from 'react'
import PacketContainer from './packetContainer'
import NodeMap from './nodeMap'
import { PacketSortOptions as PacketSort, PACKET_PAGE_SIZE} from '../common/Constants'
import PacketViewSettingsModal from './modals/PacketViewSettingsModal'
import PacketViewSettingsState from './modals/PacketViewSettingsState'
import Menubar from '../components/Menubar';
import APIUtil from '../utilities/APIutils'
import PacketState from './packetContainer/PacketState'
import './index.css'
import './modals/index.css'

function Visualizer() {
    const projectId = useParams().projectId!

    const api = new APIUtil()

    // Modal for changing packet view settings
    let [isShownPacketsModal, setIsShownPacketsModal] = useState(false)
    let [packetViewSettings, setPacketViewSettings] = useState<PacketViewSettingsState>({
        size: PACKET_PAGE_SIZE,
        before: undefined,
        after: undefined,
        node: undefined,
        sort: PacketSort.TIME_DESC
    })
    const showPacketViewSettingsModal = () => setIsShownPacketsModal(true)
    const hidePacketViewSettingsModal = () => setIsShownPacketsModal(false)

    // Packet retrieval and infinite list
    let [packetList, setPacketList]: Array<any> = useState([])
    let [hasMorePackets, setHasMorePackets] = useState(true)
    const renderPackets = packetList.map((packet: PacketState) => {
        return (
            <tr key={packet._id}>
                <td>{packet.timestamp.toUpperCase()}</td>
                <td>{packet.nodeId.toUpperCase()}</td>
                <td>{packet.type.toUpperCase()}</td>
                <td>{packet.data.toUpperCase()}</td>
            </tr>
        )
    })
    const fetchPackets = () => {
        const lastPacket: PacketState | undefined = packetList.length > 0 ? packetList[packetList.length - 1] : null
        const viewSettings: PacketViewSettingsState = {
            size: packetViewSettings.size,
            before: packetViewSettings.before,
            after: lastPacket ? lastPacket.timestamp : undefined,
            node: packetViewSettings.node,
            sort: packetViewSettings.sort
        }
        api.getPackets(
            viewSettings,
            projectId,
            (response: any) => { // On success
                const newPackets = response.data
                if (newPackets.length > 0) {
                    // Append to list
                    setPacketList(packetList.concat(newPackets))
                } else {
                    setHasMorePackets(false)
                }
            },
            (error: any) => { // On failure
                console.log(error)
                return
            }
        )
    }
    const refreshPackets = () => {
        api.getPackets(
            packetViewSettings,
            projectId,
            (response: any) => { // On success
                const newPackets = response.data
                if (newPackets.length > 0) {
                    // Append to list
                    setPacketList(newPackets)
                } else {
                    setHasMorePackets(false)
                }
            },
            (error: any) => { // On failure
                console.log(error)
                return
            }
        )
        let elem = document.getElementById('packet-table')
        elem?.scrollTo(0, 0)
    }
    const onPlay = (play: boolean) => {
        api.gatherTraffic(play, projectId)
    }

    // Map and nodes
    let [mapState, setMapState] = useState({
        nodeDataArray: [
            { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
            { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
            { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
            { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
        ],
        linkDataArray: [
            { key: -1, from: 0, to: 1 },
            { key: -2, from: 0, to: 2 },
            { key: -3, from: 1, to: 1 },
            { key: -4, from: 2, to: 3 },
            { key: -5, from: 3, to: 0 }
        ],
        modelData: {
            canRelink: true
        },
        selectedKey: null,
        skipsDiagramUpdate: false
    })

    const handleDiagramEvent = (e: go.DiagramEvent) => {
        const name = e.name;
        switch (name) {
          case 'ChangedSelection': {
            const sel = e.subject.first();
            if (sel) {
              setMapState({...mapState, selectedKey: sel.key });
            } else {
              setMapState({...mapState, selectedKey: null });
            }
            break;
          }
          default: break;
        }
    }

    /**
     * Handle GoJS model changes, which output an object of data changes via Model.toIncrementalData.
     * This method should iterates over those changes and update state to keep in sync with the GoJS model.
     * This can be done via setState in React or another preferred state management method.
     * @param obj a JSON-formatted string
     */
    const handleModelChange = (obj: go.IncrementalData) => {
        // const insertedNodeKeys = obj.insertedNodeKeys;
        // const modifiedNodeData = obj.modifiedNodeData;
        // const removedNodeKeys = obj.removedNodeKeys;
        // const insertedLinkKeys = obj.insertedLinkKeys;
        // const modifiedLinkData = obj.modifiedLinkData;
        // const removedLinkKeys = obj.removedLinkKeys;
        // const modifiedModelData = obj.modelData;

        console.log(obj);
    }

    // const handleRelinkChange = (e: any) => {
    //     const target = e.target;
    //     const value = target.checked;
    //     setMapState({...mapState, modelData: { canRelink: value }, skipsDiagramUpdate: false });
    // }
    
    // Other stuff
    
    return (
        <div className='visualizer'>
            <PacketViewSettingsModal
                isShown={isShownPacketsModal}
                setHide={hidePacketViewSettingsModal}
                packetViewSettings={packetViewSettings}
                setPacketViewSettings={setPacketViewSettings}
            />
            <h1 className='visualizer-title'>{projectId}</h1>
            <Menubar
                showPacketViewSettingsModal={showPacketViewSettingsModal}
                hidePacketViewSettingsModal={hidePacketViewSettingsModal}
            />
            <div className='visualizer-content'>
                <div className='packet-container-content'>
                    <PacketContainer
                    fetchData={fetchPackets}
                    hasMore={hasMorePackets}
                    packetList={renderPackets}
                    refresh={refreshPackets}
                    onPlay={onPlay}
                    />
                </div>
                <div className='node-map-container-content'>
                    <NodeMap
                        nodeDataArray={mapState.nodeDataArray}
                        linkDataArray={mapState.linkDataArray}
                        modelData={mapState.modelData}
                        skipsDiagramUpdate={mapState.skipsDiagramUpdate}
                        onDiagramEvent={handleDiagramEvent}
                        onModelChange={handleModelChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Visualizer