import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
    useNodesState,
    useEdgesState,
} from 'react-flow-renderer';
import PacketContainer from './packetContainer'
import NodeMap from './nodeMap'
import { PacketSortOptions as PacketSort, PACKET_PAGE_SIZE} from '../common/Constants'
import PacketViewSettingsModal from './modals/PacketViewSettingsModal'
import PacketViewSettingsState from './modals/PacketViewSettingsState'
import Menubar from '../components/Menubar';
import APIUtil from '../utilities/APIutils'
import PacketState from './packetContainer/PacketState'
import NodeUtils from '../utilities/NodeUtils';
import './index.css'
import './modals/index.css'

function Visualizer() {
    const projectId = useParams().projectId!

    const api = new APIUtil()
    const nodeUtils = new NodeUtils()

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

    // Node map
    const initialNodes: any[] = [
        // { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
        // { id: '2', data: { label: 'Node 2' }, position: { x: 400, y: 100 } },
        // { id: '3', data: { label: 'Node 3' }, position: { x: 150, y: 100 } },
        // { id: '4', data: { label: 'Node 4' }, position: { x: 0, y: 200 } },
    ];

    const initialEdges: any[] = [
        // {id: 'e1-2', source: '1', target: '2'}
    ]

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const saveNodes = () => {
        const data = nodeUtils.parseToData(nodes, edges)
        console.log('JSON sent:')
        console.log(data)
        api.updateNodes(projectId, data)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    }
    
    const getNodes = () => {
        api.getNodes(projectId)
            .then(response => {
                const newNodesData = response.data
                console.log(newNodesData)
                const [newNodes, newEdges] = nodeUtils.parseNodesData(newNodesData)
                
                // Add default values to nodes with no position or data
                newNodes.forEach((node, idx) => {
                    if (!node.data) {
                        node.data = {
                            'label': node.id,
                        }
                    }

                    if (!node.position) {
                        node.position = {
                            x: idx * 200,
                            y: 0
                        }
                    }
                })

                setNodes(newNodes)
                setEdges(newEdges)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getNodes()
    }, [])

    useEffect(() => {
        const saveInterval = setTimeout(() => {
            saveNodes()
        }, 500)

        return () => clearInterval(saveInterval)
    }, [nodes])
    
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
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Visualizer