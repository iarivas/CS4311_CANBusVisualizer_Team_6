interface ProjectState {
    eventName: string,
    baudRate: number,
    initials: string,
    dbcFile: string | null,
    blacklistFile: string | null,
}

export default ProjectState