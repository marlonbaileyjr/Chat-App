const form = document.getElementById('reg-form');
form.addEventListener('submit', createRoom);

async function createRoom(e) {
    e.preventDefault();
    const username=sessionStorage.getItem('username');
    const roomName = document.getElementById('Room Name').value;
    const roomPassword = document.getElementById('Room Password').value;
    
    const result = await fetch('/api/create-room',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            roomName, 
            roomPassword,
            username
        })
    }).then(res => res.json());
    
    if(result.status==='ok'){
        alert('Room Created successfully');
        window.location.assign('/index.html');
    }else{
        alert(result.error);
    }
}