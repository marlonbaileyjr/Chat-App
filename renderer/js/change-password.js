const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser);

async function registerUser(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    
    const result = await fetch('/api/change-password',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newPassword: password, 
            token: localStorage.getItem('token')
        })
    }).then(res => res.json());
    
    if(result.status==='ok'){
        alert('Password Changed Successfully');
        window.location.assign('/index.html');
    }else{
        alert(result.error);
    }
}