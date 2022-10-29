import ProjectState from "../projects/new/ProjectState"
import ProjectCardState from "../projects/ProjectCardState"
import PacketViewSettingsState from "../visualizer/modals/PacketViewSettingsState"
import PacketState from "../visualizer/packetContainer/PacketState"
import axios from 'axios'


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

    getProjects(): Array<ProjectCardState> {
        return [
            {id: 1, name: 'Project PBJ'},
            {id: 5, name: 'Project grilled cheese'},
            {id: 6, name: 'Project ham'},
            {id: 9, name: 'Project nutella'},
            {id: 11, name: 'Project ham'},
            {id: 13, name: 'Project chicken'},
        ]
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

    sendPackets(packets: any[], projectId: string) {
        axios.post(
            this.url + '/projects/' + projectId + '/packets',
            packets,
        )
    }

    getNodes(projectId: string) {
        return axios.get(this.url + '/projects/' + projectId + '/nodes')
    }

    updateNodes(projectId: string, nodes: any) {
        return axios.put(this.url + '/projects/' + projectId + '/nodes', nodes)
    }
}

export default APIUtil