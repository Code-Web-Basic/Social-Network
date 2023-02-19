import { Tag } from "phosphor-react";

function Tagged() {
    return (<div style={{ width: '100%', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ borderRadius: '50%', border: '1px solid black', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Tag size={32} />
        </div>
        <div style={{ fontSize: '10px', padding: '10px 0 0 0' }}>
            <h1>Ảnh có mặt bạn</h1>
        </div>
        <div style={{ fontSize: '10px', maxWidth: '250px', textAlign: 'center', padding: '10px 0 0 0' }}>
            <p>Khi mọi người gắn thẻ bạn trong ảnh, ảnh sẽ xuất hiện tại đây.</p>
        </div>
    </div>);
}

export default Tagged;