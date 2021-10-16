import { collection, getDocs } from '@firebase/firestore'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import Chatheads from '../../components/chatheads/Chatheads'
import Conversation from '../../components/conversation/Conversation'
import { db } from '../../firebase'
import './Chatscreen.css';

function Chatscreen({ user, setUser }) {
    let history = useHistory();


    const [chatheads, setChatheads] = useState([]);

    const [receiver, setReceiver] = useState(null);

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) setUser(user);
        else history.push("/");
    }, [history,setUser]);

    React.useEffect(() => {
        if (!user) return;

        (async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            setChatheads(querySnapshot.docs.map((doc) => doc.data()).filter((obj) => obj.uid !== user.uid));
        })();
    }, [user])




    return (
        <div className="chat-screen">
            <div className="half-screen chat-heads">
                <Chatheads items={chatheads} setReceiver={setReceiver} />
            </div>
            <div className="half-screen">
                <Conversation  receiver={receiver} user={user} />
            </div>

        </div>
    )
};

export default Chatscreen
