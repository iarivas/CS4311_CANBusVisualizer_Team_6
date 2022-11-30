import {useParams} from 'react-router-dom'
import { useEffect, useRef, useState} from 'react'
import {
    useNodesState,
    useEdgesState,
    addEdge,
    Node,
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
import EditPacketModal from './modals/EditPacketModal';
import CustomNodeData from './nodeMap/CustomNodeData';
import HideNodesModal from './modals/HideNodesModal';
import ProjectState from '../projects/new/ProjectState';
import ImportImageModal from './modals/ImportImageModal';

const MENU_ID = 'packet-context-menu';

function Visualizer() {
    const projectId = useParams().projectId!

    const api = new APIUtil()
    const nodeUtils = new NodeUtils()
    let [project,setProject] = useState<ProjectState|undefined>(undefined)
    // Modal for changing packet view settings
    let [isShownPacketsModal, setIsShownPacketsModal] = useState(false)

    //Modal for importing images for nodes
    let [isShownImportImageModal, setIsShownImportImageModal] = useState(false)

    let packetViewSettings = useRef<PacketViewSettingsState>({
        before: undefined,
        after: undefined,
        node: undefined,
        sort: PacketSort.TIME_DESC
    })

    const showPacketViewSettingsModal = () => setIsShownPacketsModal(true)
    const hidePacketViewSettingsModal = () => setIsShownPacketsModal(false)

    const showImportImageModal = () => setIsShownImportImageModal(true)
    const hideImportImageModal = () => setIsShownImportImageModal(false)
    const [imageOptions, setImageOptions] =  useState([]);

    const getImageOptions = () => {
        api.getImages().then((response) => {
             setImageOptions(response.data)})
    }
    


    // Modal for replay packets
    const [isShownReplayPacketsModal, setIsShownReplayPacketsModal] = useState<boolean>(false)
    const [packetsToReplay, setPacketsToReplay] = useState<PacketState[]>([])
    const clearPacketsToReplay = () => {
        setPacketsToReplay([])
    }

    const sendPackets = (packetsToSend: PacketState[]) => {
        api.sendPackets(packetsToSend, projectId, false)
            .catch((error) => console.log(error))
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
        setIsShownEditPacketModal(true)
    }

    const [isShownEditPacketsModal, setIsShownEditPacketModal] = useState(false)
    const hideEditPacketModal = () => {
        setIsShownEditPacketModal(false)
    }


    const onAddToQueuePacket = () => {
        setPacketsToReplay(packetsToReplay.concat(packetInFocus.current!))
    }

    // Modal for editing node
    let [editNodeModal, setEditNodeModal] = useState(false)
    const showNodeModal = () => setEditNodeModal(true)
    const hideNodeModal = () => setEditNodeModal(false)

    // Modal for hiding nodes
    const [isShownHideNodeModal, setIsShownHideNodeModal] = useState(false)
    const onHideNodesApply = (selected: string[]) => {
        const nodeHiddenSet = new Set()
        selected.forEach((id) => nodeHiddenSet.add(id))

        setNodes(nodes.map((node) => {
            return {...node, hidden: nodeHiddenSet.has(node.id), data: {...node.data, hidden: nodeHiddenSet.has(node.id)}}
        }))
        setEdges(edges.map((edge) => {
            return {...edge, hidden: nodeHiddenSet.has(edge.source) || nodeHiddenSet.has(edge.target)}
        }))
    }

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
        nodeInFocus.current = node
        showNodeModal()
    }

    const onNodeEditApply = (updatedNode: Node<CustomNodeData>) => {
        setNodes(nodes.map((node) => {
            if (node.id === updatedNode.id) {
                return {
                    ...node,
                    hidden: updatedNode.data.hidden,
                    data: {
                        label: updatedNode.data.label,
                        icon: updatedNode.data.icon,
                        isBlacklisted: updatedNode.data.isBlacklisted,
                        flag: updatedNode.data.flag,
                        annotation: updatedNode.data.annotation,
                        hidden: updatedNode.data.hidden
                    }
                }
            } else {
                return node
            }
        }))
        setEdges(edges.map((edge) => {
            if (edge.source === updatedNode.id || edge.target === updatedNode.id) {
                return {
                    ...edge,
                    hidden: updatedNode.data.hidden
                }
            } else {
                return edge
            }
        }))

        setEditNodeModal(false)
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
                        if (idx%2 === 0){
                            node.position = {
                                x: idx * 200,
                                y: 200
                            }
                        }
                        else{
                            node.position = {
                                x: (idx-1) * 200,
                                y: 0
                            }
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
                const nodesToAdd: any[] = []
                const edgesToAdd: any[] = []

                const hiddenNodes = new Set()
                nodesRef.current.forEach((node) => {
                    if (node.hidden) {
                        hiddenNodes.add(node.id)
                    }
                });

                newNodes.forEach((node, idx) => {
                    // If node not in dict, add it
                    if (!(node.id in nodeDictRef.current)) {
                        
                        nodeDictRef.current[node.id] = true
                        setNodeDict(nodeDictRef.current)
    
                        if (idx%2 === 0){
                            node.position = {
                                x: idx * 200,
                                y: 200
                            }
                        }
                        else{
                            node.position = {
                                x: (idx-1) * 200,
                                y: 0
                            }
                        }

                        nodesToAdd.push(node)
                    }
                })

                newEdges.forEach((edge) => {
                    // If edge not in list, add it
                    if (!(edge.id in edgeDictRef.current)) {
                        // Add hidden property
                        if (hiddenNodes.has(edge.source) || hiddenNodes.has(edge.target)) {
                            edge.hidden = true
                        }

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
    useEffect(() => {
        api.getProject(projectId).then((response)=>{
            const projectInfo = response.data
            setProject(projectInfo)
    })
    }, [])

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

    const onOpenAddNodeModal = () => {
        getImageOptions()
        nodeInFocus.current = undefined
        setEditNodeModal(true)
    };

    const onNodeCreateApply = (createdNode: Node<CustomNodeData>) => {
        const newNodeData = nodeUtils.parseToData([createdNode], [], projectId)
        api.createNode(projectId, newNodeData[0])
            .then(() => {
                setEditNodeModal(false)
                setNodes(nodes.concat({
                    ...createdNode,
                    position: {x: 0, y: 400}
                }))
            })
            .catch((error) => {
                console.log(error)
                alert('There was an issue in the server. Could not create the node')
            })
    }
    
    const onConnect = (params: any) => {
        edgeDictRef.current[params.source + '->' + params.target] = true
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
                imageOptions={imageOptions}
                isShow={editNodeModal}
                setHide={hideNodeModal}
                onApply={nodeInFocus.current ? onNodeEditApply : onNodeCreateApply}
                node={nodeInFocus.current}
            />
            <PacketViewSettingsModal
                isShown={isShownPacketsModal}
                setHide={hidePacketViewSettingsModal}
                packetViewSettings={packetViewSettings}
                onApply={onPacketViewModalApply}
            />
            <HideNodesModal
                isShown={isShownHideNodeModal}
                onHide={() => setIsShownHideNodeModal(false)}
                nodes={nodes}
                onApply={onHideNodesApply}
            />
            <ReplayPacketModal
                isShown={isShownReplayPacketsModal}
                onHide={() => setIsShownReplayPacketsModal(false)}
                packets={packetsToReplay}
                replayPackets={replayPackets}
                clear={clearPacketsToReplay}
            />
            <EditPacketModal
                isShown={isShownEditPacketsModal}
                onHide={hideEditPacketModal}
                packetInFocus={packetInFocus.current}
                sendPackets={sendPackets}
            />
            <ImportImageModal
                isShown={isShownImportImageModal}
                onHide={hideImportImageModal}
            />
            


            <h1 className='visualizer-title'>{project?.eventName}</h1>
            <Menubar
                getImageOptions={getImageOptions()}
                showPacketViewSettingsModal={showPacketViewSettingsModal}
                hidePacketViewSettingsModal={hidePacketViewSettingsModal}
                showReplayPacketsModal={() => setIsShownReplayPacketsModal(true)}
                onAddNode={onOpenAddNodeModal}
                showHideNodeModal={() => setIsShownHideNodeModal(true)}
                showImportImageModal={showImportImageModal}
                hideImportImageModal={hideImportImageModal}
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