import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getShowChats } from "~/features/message/messageSlide";
import Inbox from "~/layout/components/Message/Message";

function Message() {
    const dispatch = useDispatch();
    const showchats = async () => {
        const actionResult = await dispatch(getShowChats());
        return actionResult;
    };
    useEffect(() => {
        showchats();
    }, []);
    return (<>
        <Inbox />
    </>);
}
export default Message;
