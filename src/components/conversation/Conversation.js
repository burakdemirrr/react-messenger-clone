import { doc, getDoc, onSnapshot, setDoc, updateDoc } from '@firebase/firestore';
import React, { useRef, useState } from 'react'
import { db } from '../../firebase';
import "./Conversation.css"
function Conversation({ receiver, user}) {

    const [conversationid,setConversationid]=useState(null);
    const currentMessage=useRef(null);

    const [messages,setMessages]=useState([]);

    const sendMessage = async () => {
        const myMessage={
            message:currentMessage.current.value,
            uid:user.uid,
        };


        const conversationRef=doc(db,"conversations",conversationid);

        const docSnap =await getDoc(conversationRef);

        if(docSnap.exists()){
            const docData=docSnap.data();
            await updateDoc(conversationRef,{
                messages:[...docData.messages,myMessage],
            });
        }
        else{
            await setDoc(doc(db,"conversations",conversationid),{
                messages:[myMessage],
            })
        }

        currentMessage.current.value="";
    }


    React.useEffect(() => {
        if (!receiver || !user) return;
        
        let myConvId;

        if (receiver.uid > user.uid) myConvId = receiver.uid + user.uid;
        else myConvId = user.uid + receiver.uid;
        setConversationid(myConvId);

    }, [receiver,user]); 

    React.useEffect(()=>{
        if(!conversationid) return;

        const unsub=onSnapshot(
            doc(db,"conversations",conversationid),
            (doc)=>{
                const currentData=doc.data();

                if(currentData?.messages.length > 0) setMessages(currentData.messages);
                else setMessages([]);
            }

        )
    },[conversationid]);
    

    return (
        <div>
            {receiver ? (
                <div>
                    <p>Conversation with {receiver.email}</p>

                    <div className="conversation-message">
                        {messages.map((obj,i)=>(
                            <div 
                            key={i}
                            className="message-container"
                            style={{justifyContent:obj.uid===user.uid && 'flex-end'}}
                            
                            >
                                <div className="message-bubble">{obj.message}   </div>

                            </div>
                        ))}

                        <div className="input-container">
                            <div className="input-messages">
                                <input placeholder="Hi.." ref={currentMessage}/>
                            </div> 
                            <button onClick={sendMessage}>Send</button> 
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Pick someone to talk.</p>
                </div>
            )}
        </div>
    )
}

export default Conversation
