function CustomNode({id, data}: any) {
    return (
        <>
            <div className="custom-node__header">
            {data.label}
            </div>
            <div className="custom-node__body">
            </div>
        </>
    )
}

export default CustomNode