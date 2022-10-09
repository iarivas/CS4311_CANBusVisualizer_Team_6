import InfiniteScroll from 'react-infinite-scroller'
import { Table } from "react-bootstrap"

function PacketList({fetchData, hasMore, packetList}: any) {
    return (
        <div className='packet-table rounded' id='packet-table'>
            <InfiniteScroll
                pageStart={0}
                loadMore={fetchData}
                hasMore={hasMore}
                loader={<p>Loading...</p>}
                useWindow={false}
            >
                <Table variant='dark' hover size='sm'>
                    <thead>
                        <tr>
                            <th className='packet-time'>Time</th>
                            <th className='packet-id'>Id</th>
                            <th className='packet-type'>Type</th>
                            <th className='packet-data'>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packetList}
                    </tbody>
                </Table>
            </InfiniteScroll>
        </div>
    )
}

export default PacketList