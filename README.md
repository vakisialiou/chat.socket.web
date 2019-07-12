
## План действий
- сервер отдает страничку index.html.

- страничка отправляет запрос на соединение c сервером через WS.
- сервер открывает соединение.
- сервер слушает событие WS и отправляет ответ другим пользователям при необходимости используя REDIS PUB/SUB.

- открывает соединение c удаленной БД редис.
- слушает событие REDIS SUB.
- отсылает событие REDIS PUB.



##### Socket commands
1. sending to sender-client only
    ```js
    socket.emit('message', "some message");
    ```

2. sending to all clients, include sender
    ```js
    io.emit('message', "some message");
    ``` 

3. sending to all clients except sender
    ```js
    socket.broadcast.emit('message', "some message");
    ```

4. sending to all clients in 'game' room(channel) except sender
    ```js
    socket.broadcast.to('game').emit('message', 'nice game');
    ```

5. sending to all clients in 'game' room(channel), include sender
    ```js
    io.in('game').emit('message', 'cool game');
    ```

6. sending to sender client, only if they are in 'game' room(channel)
    ```js
    socket.to('game').emit('message', 'enjoy the game');
    ```

7. sending to all clients in namespace 'myNamespace', include sender
    ```js
    io.of('myNamespace').emit('message', 'gg');
    ```

8. sending to individual socketid
    ```js
    socket.broadcast.to(socketid).emit('message', 'for your eyes only');
    ```