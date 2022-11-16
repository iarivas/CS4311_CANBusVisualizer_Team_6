import ProjectState from "../projects/new/ProjectState"
import PacketViewSettingsState from "../visualizer/modals/PacketViewSettingsState"
import axios from 'axios'
import NodeData from "./NodeData"


class APIUtil {
    url = 'http://localhost:8000'

    createProject(project: ProjectState) {
        return axios.post(this.url + '/projects', project)
            .then(function(response) {
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    gatherTraffic(play: boolean, projectId: string) {
        return axios.put(this.url + '/projects/' + projectId + '/play', {
            play: play
        })
            .then(function(response) {
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    getProjects(isArchived: boolean | undefined) {
        return axios.get(this.url + '/projects', {
            params: {
                isArchived: isArchived
            }
        })
    }

    exportProject( projectId: string, eventName: string) {
        return axios.post(this.url +'/projects/' + projectId + '/Export',{
            params: {
                eventName: eventName
            }

        })

    }

    editProjectInfo(projectId: string, projectInfo: ProjectState){
        return axios.put(this.url +'/projects/' + projectId + '/', projectInfo)
    }

    getPackets(filters: PacketViewSettingsState, projectId: string, page: number, size: number) {
        return axios.get(this.url + '/projects/' + projectId + '/packets', {
            params: {
                size: size,
                node: filters.node,
                before: filters.before,
                after: filters.after,
                sort: filters.sort,
                page: page
            }
        })
    }

    sendPackets(packets: any[], projectId: string, replay: boolean) {
        return axios.post(
            this.url + '/projects/' + projectId + '/packets',
            packets, {
                params: {
                    replay: replay
                }
            }
        )
    }

    getNodes(projectId: string) {
        return axios.get(this.url + '/projects/' + projectId + '/nodes')
    }

    updateNodes(projectId: string, nodes: any) {
        return axios.put(this.url + '/projects/' + projectId + '/nodes', nodes)
    }

    createNode(projectId: string, node: NodeData) {
        return axios.post(this.url + '/projects/' + projectId + '/nodes', node)
    }
}

export default APIUtil