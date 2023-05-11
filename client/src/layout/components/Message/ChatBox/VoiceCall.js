import * as React from 'react';

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function VoiceCall() {
    const currentUser = useSelector((state) => state.auth.currentUser.data);
    const { id } = useParams()
    const myMeeting = async (element) => {
        const appID = 2010773050;
        const serverSecret = "6d5a42d37b322b11406d9adc96c9fb36";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, id, Date.now().toString(), "Name");
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url: `http://localhost:3050/roomvoice/${id}`
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
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

export default VoiceCall;