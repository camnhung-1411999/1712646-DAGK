import { Socket } from 'socket.io';
const taskSocket = (socket: Socket) => {
    socket.on('getTask', () => {
        socket.emit('acceptGetTask', {message: 'accept'});
    });
    socket.on('dndTask', (callback: any) => {
        socket.emit('acceptDndTask', {imessage: 'oke'});
    })
}
export default taskSocket;