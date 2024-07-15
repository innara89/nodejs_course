

let ws;
function connectWebSocket() {
    // create
    ws = new WebSocket('ws//localhost:3006');

    //event handling - open,onnmessage,onclose
    ws.onopen = () => {
        console.log('Connected to the Server');

    };
    ws.onmessage = (event) => {
        const chat = document.getElementById('chat');
        const message = document.createElement('div');
        const reader = new FileReader();
        
        reader.onload = () => {
           message.textContent =reader.result;
           chat.appendChild(message);
        }
        if (event.data instanceof Blob) {
            reader.readAsText(event.data);
        }


    };
    ws.onclose = () => {

    };

}

function sendMessage() {

    if (ws.readyState === WebSocket.OPEN) {
        ws.send(document.getElementById('message').value);
    }
}
connectWebSocket();