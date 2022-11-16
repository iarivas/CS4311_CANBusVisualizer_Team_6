interface ProjectState {
    _id: string | undefined
    eventName: string,
    baudRate: number,
    initials: string,
    dbcFile: string | null,
    blacklistFile: string | null,
    archive: boolean,
}

export default ProjectState