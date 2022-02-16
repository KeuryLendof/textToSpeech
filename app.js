const textarea = document.querySelector("textarea");

function textToSpeech() {
    let text = document.getElementById("texto").value;
    
    let voz = new SpeechSynthesisUtterance();
    voz.lang = "es-ES";
    
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


