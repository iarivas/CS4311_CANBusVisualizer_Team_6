import {useParams} from 'react-router-dom'
import { useEffect, useRef, useState} from 'react'
import {
    useNodesState,
    useEdgesState,
    addEdge
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
import EditNodeModal from './modals/EditNodeModal'
import PacketUtils from '../utilities/PacketUtils';

function Visualizer() {
    const projectId = useParams().projectId!

    const api = new APIUtil()
    const nodeUtils = new NodeUtils()
    const packetUtils = new PacketUtils()

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

    // Modal for editing node
    let [editNodeModal, setEditNodeModal] = useState(false)
    const showNodeModal = () => setEditNodeModal(true)
    const hideNodeModal = () => setEditNodeModal(false)

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
        const lastPacket: PacketState | null = packetList.length > 0 ? packetList[packetList.length - 1] : null
        const viewSettings = packetUtils.nextPacketViewSettings(
            packetViewSettings,
            lastPacket
        )

        api.getPackets(viewSettings, projectId)
            .then((response) => {
                const newPackets = response.data
                if (newPackets.length > 0) {
                    // Append to list
                    setPacketList(packetList.concat(newPackets))
                } else {
                    setHasMorePackets(false)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const refreshPackets = () => {
        api.getPackets(packetViewSettings, projectId)
            .then((response) => {
                const newPackets = response.data
                if (newPackets.length > 0) {
                    // Append to list
                    setPacketList(newPackets)
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

    const [nodeDict, setNodeDict] = useState<any>({})
    const [edgeDict, setEdgeDict] = useState<any>({})
    
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const nodesRef = useRef(nodes)
    const edgesRef = useRef(edges)
    const nodeDictRef = useRef(nodeDict)
    const edgeDictRef = useRef(edgeDict)

    const onNodeContextMenu = (event: React.MouseEvent, node: Node) => {
        event.preventDefault()
        showNodeModal()
        console.log('node clicked', node)
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
        console.log('This will run once');
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
            position: {x: 100, y: 0},
            data: {label: 'test'}
          }
        ))
      };
    
    const onConnect = (params: any) => {
        setEdges((eds) => addEdge(params, eds))
    }
    // Other stuff
    
    return (
        <div className='visualizer'>
            <EditNodeModal
                isShow={editNodeModal}
                setHide={hideNodeModal}
            />
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