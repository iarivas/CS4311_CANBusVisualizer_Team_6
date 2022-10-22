import { PACKET_PAGE_SIZE } from "../common/Constants"
import PacketViewSettingsState from "../visualizer/modals/PacketViewSettingsState"
import PacketState from "../visualizer/packetContainer/PacketState"
import { PacketSortOptions as PacketSort } from "../common/Constants"

class PacketUtils {
    nextPacketViewSettings(packetViewSettings: PacketViewSettingsState, lastPacket: PacketState | null): PacketViewSettingsState {
        if (packetViewSettings.sort === PacketSort.ID_ASC) {
            return {
                size: PACKET_PAGE_SIZE,
                before: packetViewSettings.before,
                after: packetViewSettings.after,
                node: packetViewSettings.node,
                sort: PacketSort.ID_ASC,
            }
        } else if (packetViewSettings.sort === PacketSort.ID_DESC) {
            return {
                size: PACKET_PAGE_SIZE,
                before: packetViewSettings.before,
                after: packetViewSettings.after,
                node: packetViewSettings.node,
                sort: PacketSort.ID_DESC,
            }

        } else if (packetViewSettings.sort === PacketSort.TIME_ASC) {
            let after: string | undefined
            if (lastPacket && packetViewSettings) {
                after = lastPacket.timestamp > packetViewSettings.after! ? lastPacket.timestamp : packetViewSettings.after
            } else if (lastPacket) {
                after = lastPacket.timestamp
            } else if (packetViewSettings) {
                after = packetViewSettings.after
            }
            return {
                size: PACKET_PAGE_SIZE,
                before: packetViewSettings.before,
                after: packetViewSettings.after,
                node: packetViewSettings.node,
                sort: PacketSort.TIME_ASC
            }
        } else { // packetViewSettings.sort === PacketSort.TIME_DESC
            let before: string | undefined
            if (lastPacket && packetViewSettings) {
                before = lastPacket.timestamp < packetViewSettings.before! ? lastPacket.timestamp : packetViewSettings.before
            } else if (lastPacket) {
                before = lastPacket.timestamp
            } else if (packetViewSettings) {
                before = packetViewSettings.before
            }
            return {
                size: PACKET_PAGE_SIZE,
                before: packetViewSettings.before,
                after: packetViewSettings.after,
                node: packetViewSettings.node,
                sort: PacketSort.TIME_DESC
            }
        }
    }
}

export default PacketUtils