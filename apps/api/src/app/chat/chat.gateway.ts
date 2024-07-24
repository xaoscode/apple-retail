import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

const messages = [
  {
    sender_id: '2a6b5803-21d7-4982-afee-289a847288e7',
    message_text: 'asdfasfdasfsaff',
    timestamp: new Date('2024-06-25T08:52:24.025Z'),
  },
  {
    sender_id: '2a6b5803-21d7-4982-afee-289a847288e7',
    message_text: 'asdfasfdasfsaff',
    timestamp: new Date('2024-06-25T08:52:24.025Z'),
  },
  {
    sender_id: '2a6b5803-21d7-4982-afee-289a847288e7',
    message_text: 'asdfasfdasfsaff',
    timestamp: new Date('2024-06-25T08:52:24.025Z'),
  },
  {
    sender_id: '2a6b5803-21d7-4982-afee-289a847288e7',
    message_text: 'asdfasfdasfsaff',
    timestamp: new Date('2024-06-25T08:52:24.025Z'),
  },
  {
    sender_id: '2a6b5803-21d7-4982-afee-289a847288e7',
    message_text: 'asdfasfdasfsaff',
    timestamp: new Date('2024-06-25T08:52:24.025Z'),
  },
  {
    sender_id: '2a6b5803-21d7-4982-afee-289a847288e7',
    message_text: 'asdfasfdasfsaff',
    timestamp: new Date('2024-06-25T08:52:24.025Z'),
  },
];

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit() {
    // initialize logic
    console.log('WebSocket Gateway initialized');
  }

  handleDisconnect(client: Socket) {
    // handle disconnect
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    // handle new connectioncd
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string): void {
    client.join(roomId);
    console.log(`Client ${client.id} joined room: ${roomId}`);
    client.emit('joinedRoom', messages);
  }

  @SubscribeMessage('leaveRoom')
  handleDisconnectRoom(client: Socket, roomId: string): void {
    client.leave(roomId);
    console.log(`Client ${client.id} disconnected room: ${roomId}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    client: Socket,
    payload: {
      message: string;
      senderId: string;
    }
  ): void {
    // console.log(this.server.of('/').adapter.rooms);
    // console.log(this.server.of('/').adapter.sids);
    const { message, senderId } = payload;
    const newMessage = {
      sender_id: senderId,
      message_text: message,
      timestamp: new Date(),
    };
    this.server.to(senderId).emit('newMessage', newMessage); // Send message to all clients in the room
    console.log(`Message sent to room ${senderId}: ${message}`);
  }
}
