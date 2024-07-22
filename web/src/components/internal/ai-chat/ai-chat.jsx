import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import { getAiModel } from "../../../services/gemini";

const AiChat = () => {
    const aiModel = getAiModel()
    const [messages, setMessages] = useState([])
    const parsePrompt = async (prompt)=>{
        const response = await aiModel.generateContent(prompt).then(response=>{
            setMessages([...messages, {
                text: response.response.text(),
                sentTime: '...',
                sender: 'ai',
                direction: 'incoming'                        
            }])
        })
    }
    return (
        <div style={{ position: "relative", height: "80vh" }} className="mx-6 text-2xl">
            <div className="bg-white border border-t-0 px-4 py-3 border-gray-300 mb-2 flex justify-between">
                <div>
                    <FontAwesomeIcon icon="fa-solid fa-robot" size="md" color="#60a5fa"/>
                    {/* <span className="ml-3">bot</span> */}
                </div>
                <button className="text-base bg-gray-300 px-4 rounded-full" onClick={()=>{setMessages([])}}>
                    clear chat
                    <FontAwesomeIcon icon="fa-solid fa-cancel" size="" color="gray" className="ml-2"/>
                </button>
            </div>
            <MainContainer>
                <ChatContainer>
                    <MessageList style={{ backgroundColor: 'white'}}>
                        {messages.map(message=>{
                            return(
                                <Message
                                    model={{
                                        message: message.text,
                                        sentTime: message.sentTime,
                                        sender: message.sender,
                                        direction: message.direction
                                    }}
                                />
                            )
                        })}
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={async (prompt)=>{
                        setMessages([...messages, {
                            text: prompt,
                            sentTime: '...',
                            sender: 'me',
                            direction: 'outgoing'                        
                        }])
                        await parsePrompt(prompt)
                    }}/>
                </ChatContainer>
            </MainContainer>
        </div>
    )
}

export default AiChat