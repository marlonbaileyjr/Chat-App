const roomLogin=document.getElementById('join-room');
		const loginDiv=document.getElementById('login-div');
        const form = document.getElementById('login');
        form.addEventListener('submit', login);
		

function outputName(username){
    const h2=document.createElement('p');
    h2.innerHTML= `<p>Signed in as <span>${sessionStorage.getItem("username")}</span></p>`;
    document.querySelector('.header').appendChild(h2);
}

if(!localStorage.getItem('recentRooms')){
    const recentRooms = [];
}

function recentRoomsFunc(recentRooms){
    const roomsDropdown= document.getElementById('recentRooms');
    for (const key in recentRooms) {
        const option = document.createElement('option');
        option.value = recentRooms[key];
        option.innerHTML = recentRooms[key];
        roomsDropdown.appendChild(option);
    }
}

function showRoomLogin(){
    roomLogin.style.display='block';
    loginDiv.style.display='none';
    outputName(username);
    const recentRoomsDropdown = JSON.parse(localStorage.getItem('recentRooms'));
    recentRoomsFunc(recentRoomsDropdown);
}

//login
async function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const result = await fetch('/api/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username, 
            password,
        })
    }).then(res => res.json());
    
    if(result.status==='ok'){
        localStorage.setItem('token', result.data);
        sessionStorage.setItem('username',result.username);
        //alert('User logged in successfully');
        
        //login state
        let loggedIn=true
        sessionStorage.setItem('loggedIn',loggedIn);
        var sessionLog=sessionStorage.getItem('loggedIn');
        if (sessionLog=='true'){
            showRoomLogin();
        }
        
        
    }else{
        alert(result.error);
    }
}



const form2 = document.getElementById('joinRoom');
form2.addEventListener('submit', joinRoom);

//join room
async function joinRoom(event) {
    event.preventDefault();
    const roomName = document.getElementById('roomName').value;
    const roomPassword = document.getElementById('roomPassword').value;
    const username = sessionStorage.getItem('username');
    
    const result = await fetch('/api/join-room',{
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
        localStorage.setItem('token', result.data);
        sessionStorage.setItem('roomName',result.roomName);
       // alert('Joined room successfully');

        //push array of recent rooms
        if(!localStorage.getItem('recentRooms')){
        const recentRooms = [];
        }else{
            const recentRooms = JSON.parse(localStorage.getItem('recentRooms'));
            recentRooms.push(result.roomName);
            localStorage.setItem('recentRooms', JSON.stringify(recentRooms));
        }		
        window.location.assign('/chat.html');	
    }else{
        alert(result.error);
    }
}

//select recent rooms
const selectElement = document.querySelector('.recentRooms');
selectElement.addEventListener('change', (event)=>{
    const roomName = document.getElementById('roomName');
    roomName.value = event.target.value;
});