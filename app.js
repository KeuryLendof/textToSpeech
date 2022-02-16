const textarea = document.querySelector("textarea"),
btnStart = document.getElementById('start'),
btnStop = document.getElementById('stop');

function textToSpeech() {
    let text = document.getElementById("texto").value;
    
    let voz = new SpeechSynthesisUtterance();
    voz.lang = "es-ES";

    if(text == ""){
        voz.text = "No hay nada que leer";
        voz.volume = 1;
        voz.rate = 1;
        voz.pitch = 1;
    
        window.speechSynthesis.speak(voz);
    }
    
    voz.text = text;
    voz.volume = 1;
    voz.rate = 1;
    voz.pitch = 1;
    
    window.speechSynthesis.speak(voz);
}

textarea.addEventListener("keyup", e =>{

    textarea.style.height = "79px"
    let height = e.target.scrollHeight; 
    textarea.style.height = `${height}px`

})


let recognition = new webkitSpeechRecognition();
recognition.lang = 'es-ES'
recognition.continuous = false; //Esto es si quiere continual grabando o para automatico
recognition.interimResults = true; //transcribir automaticamente

recognition.onresult = (event) =>{
    const results = event.results;
    console.log(results)
}

btnStart.addEventListener('click', () => {
    recognition.start();
})

btnStop.addEventListener('click', () => {
    recognition.abort()
})

    

