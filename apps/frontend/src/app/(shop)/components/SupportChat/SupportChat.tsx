// "use client"
// import { useState, useEffect, FormEvent } from "react";
// import { SupportChatProps } from "./SupportChat.props";
// import styles from "./SupportChat.module.css";
// import { Button } from "@/components/Buttons/Button/Button";
// import { SubText } from "@/components/SubText/SubText";
// import { TextArea } from "@/components/TextArea/TextArea";
// import { IMessage } from "@repo/interfaces";
// import { Text } from "@/components/Text/Text";
// import Image from 'next/image'
// import cn from "classnames";

// import { io } from "socket.io-client";
// import { Card } from "@/components/Card/Card";

// export const socket = io("http://localhost:3002");



// interface Message {
//     sender_id: string,
//     message_text: string,
//     timestamp: Date
// }
// const userId = "2a6b5803-21d7-4982-afee-289a847288e7"
// export function SupportChat({ className, ...props }: SupportChatProps): JSX.Element {

//     const [isConnected, setIsConnected] = useState<boolean>(true);
//     const [transport, setTransport] = useState("N/A");
//     const [value, setValue] = useState('');
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [chatHistory, setChatHistory] = useState<Array<IMessage>>([])

//     const [chatActive, setChatActive] = useState(false)

//     // useEffect(() => {
//     //     const roomId = userId;
//     //     if (socket.connected) {
//     //         onConnect();
//     //     }
//     //     function onConnect() {

//     //         socket.emit('joinRoom', roomId);
//     //         setIsConnected(true);
//     //     }
//     //     function onDisconnect() {
//     //         socket.emit('leaveRoom', roomId)
//     //         setIsConnected(false);
//     //         setTransport("N/A");
//     //     }

//     //     socket.on("connect", onConnect);
//     //     socket.on("disconnect", onDisconnect);



//     //     socket.on('joinedRoom', (messages: Array<IMessage>) => {
//     //         console.log("connected")
//     //         setChatHistory((prevHistory) => [...prevHistory, ...messages]);
//     //     });

//     //     socket.on('newMessage', (message: IMessage) => {
//     //         setChatHistory((prevHistory) => [...prevHistory, message]);
//     //     });

//     //     return () => {
//     //         // socket.off('joinedRoom');
//     //         // socket.off('newMessage');
//     //         socket.off("connect", onConnect);
//     //         socket.off("disconnect", onDisconnect);
//     //     };
//     // }, []);



//     function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//         event.preventDefault();
//         const payload = {
//             message: value,
//             senderId: userId,
//         }
//         setIsLoading(true);
//         socket.timeout(1).emit('sendMessage', payload, () => {
//             setIsLoading(false);
//         });
//         setValue('')
//     }

//     function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
//         if (event.key === 'Enter' && !event.shiftKey) {
//             onSubmit(event as unknown as FormEvent<HTMLFormElement>)
//         }
//     }
//     function openChat() {
//         if (chatActive === true) {
//             setChatActive(false)
//         } else {
//             setChatActive(true)
//         }

//     }

//     return (
//         <div className={ cn(className, styles['chat-button']) }>
//             { chatActive &&
//                 <Card className={ styles['modal-chat'] }>

//                     <div className={ styles['header-chat'] }>
//                         <Text size="2">Status: { isConnected ? "connected" : "loading" }</Text>
//                         <Text size="2">AppleRetail</Text>


//                     </div>
//                     { isConnected ? (
//                         <div className={ styles['body-chat'] }>
//                             { chatHistory.map((message, idx) => (
//                                 <div key={ idx } className={ styles['message-chat'] }>
//                                     <Image src="" alt="" className={ styles['message-avatar'] } />
//                                     <div className={ styles['message'] }>
//                                         { message.message_text }
//                                     </div>
//                                 </div>
//                             )) }
//                             <SubText size="1" className={ styles["warning"] }>
//                                 Никому не сообщайте свои персональные данные
//                             </SubText>
//                         </div>
//                     ) : (
//                         <div className={ styles['loading'] }>Loading...</div>
//                     ) }
//                     { isConnected && (
//                         <form onSubmit={ onSubmit } className={ styles['actions-chat'] }>
//                             <Button icon={ "/Paperclip.svg" } size={ "large" } design={ "gray" }></Button>
//                             <TextArea
//                                 onKeyDown={ handleKeyDown }
//                                 placeholder="Write something.."
//                                 className={ styles['textarea'] }

//                             />
//                             <Button
//                                 type="submit"
//                                 disabled={ isLoading }
//                                 icon={ "/PaperPlaneRight.svg" }
//                                 size={ "large" }
//                                 design={ "gray" }>
//                             </Button>
//                         </form>
//                     )
//                     }

//                 </Card>

//             }
//             <button onClick={ openChat } className={ styles["sup-but"] }><Image className={ styles['chat'] } src={ "/chat.svg" } width={ 25 } height={ 25 } alt={ "chat" } /></button>
//         </div>
//     );
// };
