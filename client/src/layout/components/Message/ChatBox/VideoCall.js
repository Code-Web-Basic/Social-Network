import * as React from 'react';

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function VideoCall() {
    const currentUser = useSelector((state) => state.auth.currentUser.data);
    const { id } = useParams()
    const myMeeting = async (element) => {
        const appID = 920794739;
        const serverSecret = "d7c47156e5569297b5a5a4f1871c3f42";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, id, Date.now().toString(), "Name");
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url: `http://localhost:3050/roomcall/${id}`
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: false,
        });
    }
    //
    return (
        <div>
            <div ref={myMeeting} style={{ width: '100vw', height: '100vh' }} />
        </div>
    );
}

export default VideoCall;