import {useParams} from 'react-router-dom'
import { useEffect, useRef, useState} from 'react'
import {
    useNodesState,
    useEdgesState,
    addEdge,
    Node
} from 'react-flow-renderer';
import { Menu, Item, useContextMenu } from 'react-contexify';
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
import EditNodeModal from './modals/EditNodeModal'
import "react-contexify/dist/ReactContexify.css";
import ReplayPacketModal from './modals/ReplayPacketModal';
import CustomNodeData from './nodeMap/CustomNodeData';

const MENU_ID = 'packet-context-menu';

function Visualizer() {
    const projectId = useParams().projectId!

    const api = new APIUtil()
    const nodeUtils = new NodeUtils()

    // Modal for changing packet view settings
    let [isShownPacketsModal, setIsShownPacketsModal] = useState(false)
    let packetViewSettings = useRef<PacketViewSettingsState>({
        before: undefined,
        after: undefined,
        node: undefined,
        sort: PacketSort.TIME_DESC
    })
    const showPacketViewSettingsModal = () => setIsShownPacketsModal(true)
    const hidePacketViewSettingsModal = () => setIsShownPacketsModal(false)

    // Modal for replay packets
    const [isShownReplayPacketsModal, setIsShownReplayPacketsModal] = useState<boolean>(false)
    const [packetsToReplay, setPacketsToReplay] = useState<PacketState[]>([])
    const clearPacketsToReplay = () => {
        setPacketsToReplay([])
    }

    const replayPackets = (packets: PacketState[]) => {
        api.sendPackets(packets, projectId, true)
            .catch((error) => console.log(error))
    }

    // Packet context menu
    const packetInFocus = useRef<PacketState>()
    const { show } = useContextMenu({
        id: MENU_ID,
    });
    
    function handleContextMenu(event: any){
        event.preventDefault();
        show(event, {
            props: {
                key: 'value'
            }
        })
      }

    const onEditPacket = () => {
        console.log('TODO: Implement edit packet')
        console.log(packetInFocus.current)
    }
    const onAddToQueuePacket = () => {
        setPacketsToReplay(packetsToReplay.concat(packetInFocus.current!))
    }

    // Modal for editing node
    let [editNodeModal, setEditNodeModal] = useState(false)
    const showNodeModal = () => setEditNodeModal(true)
    const hideNodeModal = () => setEditNodeModal(false)

    // Packet retrieval and infinite list
    const packetPage = useRef(1)
    let [packetList, setPacketList]: Array<any> = useState([])
    let [hasMorePackets, setHasMorePackets] = useState(true)
    const renderPackets = packetList.map((packet: PacketState) => {
        return (
            <tr
                key={packet._id}
                onContextMenu={(event) => {
                    packetInFocus.current = packet
                    handleContextMenu(event)
                }}
            >
                <td>{packet.timestamp}</td>
                <td>{packet.nodeId}</td>
                <td>{packet.type}</td>
                <td>{packet.data}</td>
            </tr>
        )
    })
    const fetchPackets = () => {
        api.getPackets(packetViewSettings.current, projectId, packetPage.current, PACKET_PAGE_SIZE)
            .then((response) => {
                const newPackets = response.data
                if (newPackets.length > 0) {
                    // Append to list
                    setPacketList(packetList.concat(newPackets))
                    packetPage.current = packetPage.current + 1
                } else {
                    setHasMorePackets(false)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const refreshPackets = () => {
        packetPage.current = 1
        api.getPackets(packetViewSettings.current, projectId, packetPage.current, PACKET_PAGE_SIZE)
            .then((response) => {
                const newPackets = response.data
                if (newPackets.length > 0) {
                    // Append to list
                    packetPage.current = packetPage.current + 1
                    setPacketList(newPackets)
                    setHasMorePackets(true)
                } else {
                    setHasMorePackets(false)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        let elem = document.getElementById('packet-table')
        elem?.scrollTo(0, 0)
    }

    // Modal for packet view
    const onPacketViewModalApply = (newPacketViewSettings: PacketViewSettingsState) => {
        packetViewSettings.current.before = newPacketViewSettings.before
        packetViewSettings.current.after = newPacketViewSettings.after
        packetViewSettings.current.node = newPacketViewSettings.node
        packetViewSettings.current.sort = newPacketViewSettings.sort
        packetPage.current = 1
        setHasMorePackets(true)
        setPacketList([])
    }
    
    const onPlay = (play: boolean) => {
        api.gatherTraffic(play, projectId)
    }

    // Node map
    const initialNodes: any[] = [
 
    ];
    const initialEdges: any[] = [
        
    ]

    const [nodeDict, setNodeDict] = useState<any>({})
    const [edgeDict, setEdgeDict] = useState<any>({})

    const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const nodesRef = useRef(nodes)
    const edgesRef = useRef(edges)
    const nodeDictRef = useRef(nodeDict)
    const edgeDictRef = useRef(edgeDict)

    const nodeInFocus = useRef<any>()
    const onNodeContextMenu = (event: React.MouseEvent, node: Node) => {
        event.preventDefault()
        if(node.data.isBlacklisted){

        }
        else{
            showNodeModal()
            nodeInFocus.current = node
        }    
    }

    const onNodeEditApply = (updatedNode: Node<CustomNodeData>) => {
        setNodes(nodes.map((node) => {
            if (node.id === updatedNode.id) {
                return {
                    ...node,
                    data: {
                        label: updatedNode.data.label,
                        icon: updatedNode.data.icon,
                        isBlacklisted: updatedNode.data.isBlacklisted,
                        flag: updatedNode.data.flag,
                        annotation: updatedNode.data.annotation,
                        notes: updatedNode.data.notes,
                        hidden: updatedNode.data.hidden
                    }
                }
            } else {
                return node
            }
        }))
    }

    const saveNodes = () => {
        const data = nodeUtils.parseToData(nodes, edges, projectId)
        // console.log('JSON sent:')
        // console.log(data)
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
                    nodeDictRef.current[node.id] = true
                    setNodeDict(nodeDictRef.current)
                    if (!node.position) {
                        node.position = {
                            x: idx * 200,
                            y: 0
                        }
                    }
                })

                // Add edges to dict
                newEdges.forEach((edge) => {
                    edgeDictRef.current[edge.id] = true
                    setEdgeDict(edgeDictRef.current)
                })

                setNodes(newNodes)
                setEdges(newEdges)
            })
            .catch(error => console.log(error))
    }

    const getNewNodes = () => {
        api.getNodes(projectId)
            .then(response => {
                const newNodesData = response.data

                const [newNodes, newEdges] = nodeUtils.parseNodesData(newNodesData)
                console.log(nodeDictRef.current)
                console.log(edgeDictRef.current)
                const nodesToAdd: any[] = []
                const edgesToAdd: any[] = []

                newNodes.forEach((node, idx) => {
                    // If node not in dict, add it
                    if (!(node.id in nodeDictRef.current)) {
                        
                        nodeDictRef.current[node.id] = true
                        setNodeDict(nodeDictRef.current)
    
                        node.position = {
                            x: (idx + nodesRef.current.length) * 200,
                            y: 0
                        }

                        nodesToAdd.push(node)
                    }
                })

                newEdges.forEach((edge) => {
                    // If edge not in list, add it
                    if (!(edge.id in edgeDictRef.current)) {
                        edgeDictRef.current[edge.id] = true
                        setEdgeDict(edgeDictRef.current)

                        edgesToAdd.push(edge)
                    }
                })

                // Update lists accordingly
                if (nodesToAdd.length > 0) setNodes(nodesRef.current.concat(nodesToAdd))
                if (edgesToAdd.length > 0) setEdges(edgesRef.current.concat(edgesToAdd))
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {nodesRef.current = nodes}, [nodes])
    useEffect(() => {edgesRef.current = edges}, [edges])
    useEffect(() => {nodeDictRef.current = nodeDict}, [nodeDict])
    useEffect(() => {edgeDictRef.current = edgeDict}, [edgeDict])

    // This will call the API once to get the list of nodes
    // once when going to this screen. Afterwards, it will
    // add new nodes found every 1.5 seconds
    useEffect(() => {
        getNodes()

        const interval = setInterval(() => {
            getNewNodes()
          }, 1500);
          return () => clearInterval(interval);
    }, [])

    // This will call the API to update the node 0.5 seconds
    // after a node is updated. This guarantees that updates
    // to nodes on the backend will not happen more then twice
    // every second.
    useEffect(() => {
        const saveInterval = setTimeout(() => {
            saveNodes()
        }, 500)

        return () => clearInterval(saveInterval)
    }, [nodes, edges])

    const addNode = () => {
        const nodeId = Math.random().toString()
        nodeDictRef.current[nodeId] = true
        setNodeDict(nodeDictRef.current)
        setNodes(nodes.concat(
          {
            id: nodeId,
            type: 'custom',
            position: {x: 100, y: 0},
            data: {
                label: 'test',
                icon: '',
                isBlacklisted: false,
                flag: 'none',
                annotation: '',
                notes: '',
                hidden: false
            },
          }
        ))
      };
    
    const onConnect = (params: any) => {
        setEdges((eds) => addEdge(params, eds))
    }
    // Other stuff
    
    return (
        <div className='visualizer'>
            <Menu id={MENU_ID}>
                <Item onClick={onEditPacket}>Edit</Item>
                <Item onClick={onAddToQueuePacket}>Add to play list</Item>
            </Menu>
            <EditNodeModal
                isShow={editNodeModal}
                setHide={hideNodeModal}
                onApply={onNodeEditApply}
                node={nodeInFocus.current}
            />
            <PacketViewSettingsModal
                isShown={isShownPacketsModal}
                setHide={hidePacketViewSettingsModal}
                packetViewSettings={packetViewSettings}
                onApply={onPacketViewModalApply}
            />
            <ReplayPacketModal
                isShown={isShownReplayPacketsModal}
                onHide={() => setIsShownReplayPacketsModal(false)}
                packets={packetsToReplay}
                replayPackets={replayPackets}
                clear={clearPacketsToReplay}
            />
            <h1 className='visualizer-title'>{projectId}</h1>
            <Menubar
                showPacketViewSettingsModal={showPacketViewSettingsModal}
                hidePacketViewSettingsModal={hidePacketViewSettingsModal}
                showReplayPacketsModal={() => setIsShownReplayPacketsModal(true)}
                onAddNode={addNode}
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
                        onConnect={onConnect}
                        onNodeContextMenu={onNodeContextMenu}
                    />
                    
                </div>
            </div>
        </div>
    )
}

export default Visualizer