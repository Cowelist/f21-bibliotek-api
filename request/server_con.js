console.log("Server_con.js blir kalt på")
async function Autorisasjon(){ //Sender en req til rout.. for å se om token er valid. Dette gjør den når siden oppdateres eller blir først åpnet
    const response = await fetch('/login');
    if (response.ok){
        loadside();
    }
}

async function login(){
    const brukernavn = document.getElementById("Brukernavn").value;
    const passord = document.getElementById("Passord").value;

    const response = await fetch('/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, //Forteller serveren at du sender json data
        body: JSON.stringify({brukernavn, passord}),
        credentials: "include" //Forteller nettlesern at den skal bruke cookies

    });
    if (response.ok){ //om valid så gjør den en refresh på siden ellers error melding
        location.reload(); 
    }
    else {
        const data = await response.json();
        document.getElementById("Error").innerText = data.message;
    }
}

async function loadside(){ //Fungerer som Autorisasjon bare at den endrer inhold på siden ovenfor å se om brukeren har en token selv om den også ser etter tokens.
    const response = await fetch("/login");
    if(response.ok){
        const data = await response.json();
        document.getElementById("content").innerHTML = data.content;
    }
}

function logout(){
    const time = new Data().toLocaleString();
    document.cookie = `Token er utløpte: ${time}`
}