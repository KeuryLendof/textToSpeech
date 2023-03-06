const textarea = document.querySelector("textarea"),
    btnStart = document.getElementById('start'),
    btnStop = document.getElementById('stop'),
    btnCopy = document.getElementById('copy'),
    btnTrash = document.getElementById('vaciar'),

    selectVoices = document.getElementById('voices'),
    selectRate = document.getElementById('speeds'),
    btnStartReading = document.getElementById('startReading'),
    btnStopReading = document.getElementById('stopReading'),
    btnResetReading = document.getElementById('resumeReading'),
    btnContinueReading = document.getElementById('continueReading'),

    section = document.querySelector("footer"),
    hireBtn = section.querySelector("#hireBtn"),
    popup = section.querySelector(".popup-outer"),
    closeBtn = section.querySelectorAll("#close"),
    textArea = section.querySelector("textarea"),
email = section.querySelector("input");

function textToSpeech() {
    let text = document.getElementById("texto").value;

    btnStartReading.style.display = 'none'
    btnStopReading.style.display = 'flex'
    
    let voz = new SpeechSynthesisUtterance();
    voz.lang = selectVoices.value;

    if(text == ""){
        voz.text = "No hay nada que leer";
        voz.volume = 1;
        voz.rate = 1;
        voz.pitch = 1;

        window.speechSynthesis.speak(voz);
        voz.addEventListener("end", () => {
            btnStartReading.style.display = 'flex'
            btnStopReading.style.display = 'none'
        });
    }
    
    voz.text = text;
    voz.volume = 1;
    voz.rate = selectRate.value;
    voz.pitch = 1.5;

    window.speechSynthesis.speak(voz);
    voz.onend = () => {
        btnStartReading.style.display = 'flex'
        btnStopReading.style.display = 'none'
    };
}

btnStopReading.addEventListener('click',()=>{
    btnStopReading.style.display = 'none'
    btnResetReading.style.display = 'flex'
    btnContinueReading.style.display = 'flex'
    window.speechSynthesis.pause()
})

btnContinueReading.addEventListener('click',()=>{
    window.speechSynthesis.resume()
    btnStopReading.style.display = 'flex'
    btnResetReading.style.display = 'none'
    btnContinueReading.style.display = 'none'
})

btnResetReading.addEventListener('click',()=>{
    window.speechSynthesis.cancel()
    btnStartReading.style.display = 'flex'
    btnStopReading.style.display = 'none'
    btnResetReading.style.display = 'none'
    btnContinueReading.style.display = 'none'
})

textarea.addEventListener("keyup", e =>{

    textarea.style.height = "94px"
    let height = e.target.scrollHeight; 
    textarea.style.height = `${height}px`

})

function controls(evt, component){
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(component).style.display = "flex";
    evt.currentTarget.className += " active";
}

let rec;

btnStart.addEventListener('click', () => {
    rec.start();
    btnStart.style.display = 'none'
    btnStop.style.display = 'flex'
})

if(!("webkitSpeechRecognition" in window)){
    alert("No funciona")
}else{
    let interim_transcript = "";
    rec = new webkitSpeechRecognition();
    rec.lang = "es-AR";
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (event) => {

        for (let i = event.resultIndex; i < event.results.length; ++i) {

            if (event.results[i].isFinal) {
                interim_transcript = event.results[i][0].transcript;
            } else {
                interim_transcript = event.results[i][0].transcript;
            }

        }
        document.getElementById("texto").innerHTML = interim_transcript;
    }
}

btnStop.addEventListener('click', () => {
    rec.abort()
    btnStart.style.display = 'flex'
    btnStop.style.display = 'none'
})

btnCopy.addEventListener('click', ()=>{
    let text = document.getElementById("texto").value;
    navigator.clipboard.writeText(text);
})

btnTrash.addEventListener('click',()=>{
    document.getElementById("texto").value = '';
})


hireBtn.addEventListener("click" , () =>{
    section.classList.add("show");
    popup.style.display = 'block';
});

closeBtn.forEach(cBtn => {
    cBtn.addEventListener("click" , ()=>{
        section.classList.remove("show");
        textArea.value = "";
        popup.style.display = 'none';
    });
});

// let rec;

// if(!("webkitSpeechRecognition" in window)){
//     alert("No funciona")
// }else{
//     rec = new webkitSpeechRecognition();
//     rec.lang = "es-AR";
//     rec.continuous = true;
//     rec.interim = true;
//     rec.addEventListener("result", iniciar)
// }

// function iniciar(event){
//     for(i = event.resultIndex; i < event.results.length; i++){
//         document.getElementById("texto").innerHTML = event.results[i][0].transcript;
//     }
// }
    
// rec.start();



// function addPerson(pid, pnombre, pciudad, pcumple, pemail){

//     let newPerson ={
//         id : pid,
//         nombre : pnombre,
//         ciudad : pciudad,
//         cumpleanos : pcumple,
//         email : pemail,
//         petList : []
//     }
//     personas.push(newPerson);
//     localStoragePersonList(personas);
// }

// function getPersonList(){
//     let storeList = localStorage.getItem('localPersonList');
//     if(storeList == null){
//         personas = []
//     }else{
//         personas = JSON.parse(storeList);
//     }
//     return personas;
// }

// function localStoragePersonList(plist){
//     localStorage.setItem('localPersonList', JSON.stringify(plist));
// }

// //Para agregar a la mascota

// function encontrarPerson(pid){
//     let personObj;
//     for (let i = 0; i < personas.length; i++){
//         if (personas[i].id == pid){
//             personObj = personas[i];
//         }
//     }
//     return personObj;
// }

// function addMascota(ppersonObj, ppetNombre, ptype, pgender){
//     let newMascota = {
//         nombre : ppetNombre,
//         tipo : ptype,
//         gender : pgender
//     }
//     let index = personas.indexOf(ppersonObj);
//     ppersonObj.petList.push(newMascota);

//     personas[index] = ppersonObj;
//     localStoragePersonList(personas);
// }






// document.querySelector('#btnGuardarPersona').addEventListener('click', guardarPersona);
// document.querySelector('#btnAsignar').addEventListener('click', agregarMascota);

// imprimirTabla();
// imprimirMascota();

// function guardarPersona(){
//     let gId = document.querySelector('#txtId').value,
//         gNombre = document.querySelector('#txtNombre').value,
//         gCiudad = document.querySelector('#txtCiudad').value,
//         gCumple = document.querySelector('#txtCumpleanos').value,
//         gCorreo = document.querySelector('#txtCorreo').value


//     addPerson(gId, gNombre, gCiudad, gCumple, gCorreo);
//     imprimirTabla();
// }

// function imprimirTabla(){

//     let list = getPersonList(),
//         tbody = document.querySelector('#friendsTable tbody');

//     tbody.innerHTML = '';

//     for(let i = 0; i < list.length; i++){
//         let row = tbody.insertRow(i),
//             idCell = row.insertCell(0),
//             nombreCell = row.insertCell(1),
//             ciudadCell = row.insertCell(2),
//             cumpleCell = row.insertCell(3),
//             correoCell = row.insertCell(4),
//             selectCell = row.insertCell(5);



//         idCell.innerHTML = list[i].id;
//         nombreCell.innerHTML = list[i].nombre;
//         ciudadCell.innerHTML = list[i].ciudad;
//         cumpleCell.innerHTML = list[i].cumpleanos;
//         correoCell.innerHTML = list[i].email;

//         let inputSelect = document.createElement('input');
//         inputSelect.type = 'radio';
//         inputSelect.value = list[i].id;
//         inputSelect.name = 'rbtPerson';
//         selectCell.appendChild(inputSelect);



//         tbody.appendChild(row);
        
//     }
// }

// function agregarMascota(){
//     let gNombre = document.querySelector('#txtMascota').value,
//         gAnimal = document.querySelector('#txtAnimal').value,
//         gGenero = document.querySelector('#txtGenero').value,
//         personId = document.querySelector('#friendsTable tbody input[type=radio]:checked').value;

//     let personObj = encontrarPerson(personId);

//     addMascota(personObj, gNombre, gAnimal, gGenero);
//     imprimirMascota();

// }

// function imprimirMascota(){
//     let list = getPersonList(),
//         tbody = document.querySelector('#animalTable tbody');

//     tbody.innerHTML = '';
//     //lista para recorrer amigos
//     for(let i = 0; i < list.length; i++){
//         //lista para recorrer animales de cada persona
//         for(let j = 0; j < list[i].petList.length; j++){
//             let row = tbody.insertRow(j),
//                 ownerCell = row.insertCell(0),
//                 nombreCell = row.insertCell(1),
//                 tipoCell = row.insertCell(2),
//                 generoCell = row.insertCell(3);

//             ownerCell.innerHTML = list[i].nombre;
//             nombreCell.innerHTML = list[i].petList[j].nombre;
//             tipoCell.innerHTML = list[i].petList[j].tipo;
//             generoCell.innerHTML = list[i].petList[j].gender;
//         }
//     }
// }

// function addPerson(pid, pnombre, pciudad, pcumple, pemail){

//     let newPerson ={
//         id : pid,
//         nombre : pnombre,
//         ciudad : pciudad,
//         cumpleanos : pcumple,
//         email : pemail,
//         petList : []
//     }
//     personas.push(newPerson);
//     localStoragePersonList(personas);
// }

// function getPersonList(){
//     let storeList = localStorage.getItem('localPersonList');
//     if(storeList == null){
//         personas = []
//     }else{
//         personas = JSON.parse(storeList);
//     }
//     return personas;
// }

// function localStoragePersonList(plist){
//     localStorage.setItem('localPersonList', JSON.stringify(plist));
// }

// //Para agregar a la mascota

// function encontrarPerson(pid){
//     let personObj;
//     for (let i = 0; i < personas.length; i++){
//         if (personas[i].id == pid){
//             personObj = personas[i];
//         }
//     }
//     return personObj;
// }

// function addMascota(ppersonObj, ppetNombre, ptype, pgender){
//     let newMascota = {
//         nombre : ppetNombre,
//         tipo : ptype,
//         gender : pgender
//     }
//     let index = personas.indexOf(ppersonObj);
//     ppersonObj.petList.push(newMascota);

//     personas[index] = ppersonObj;
//     localStoragePersonList(personas);
// }

// function addPerson(pid, pnombre, pciudad, pcumple, pemail){

//     let newPerson ={
//         id : pid,
//         nombre : pnombre,
//         ciudad : pciudad,
//         cumpleanos : pcumple,
//         email : pemail,
//         petList : []
//     }
//     personas.push(newPerson);
//     localStoragePersonList(personas);
// }

// function getPersonList(){
//     let storeList = localStorage.getItem('localPersonList');
//     if(storeList == null){
//         personas = []
//     }else{
//         personas = JSON.parse(storeList);
//     }
//     return personas;
// }

// function localStoragePersonList(plist){
//     localStorage.setItem('localPersonList', JSON.stringify(plist));
// }

// //Para agregar a la mascota

// function encontrarPerson(pid){
//     let personObj;
//     for (let i = 0; i < personas.length; i++){
//         if (personas[i].id == pid){
//             personObj = personas[i];
//         }
//     }
//     return personObj;
// }

// function addMascota(ppersonObj, ppetNombre, ptype, pgender){
//     let newMascota = {
//         nombre : ppetNombre,
//         tipo : ptype,
//         gender : pgender
//     }
//     let index = personas.indexOf(ppersonObj);
//     ppersonObj.petList.push(newMascota);

//     personas[index] = ppersonObj;
//     localStoragePersonList(personas);
// }
// function addPerson(pid, pnombre, pciudad, pcumple, pemail){

//     let newPerson ={
//         id : pid,
//         nombre : pnombre,
//         ciudad : pciudad,
//         cumpleanos : pcumple,
//         email : pemail,
//         petList : []
//     }
//     personas.push(newPerson);
//     localStoragePersonList(personas);
// }

// function getPersonList(){
//     let storeList = localStorage.getItem('localPersonList');
//     if(storeList == null){
//         personas = []
//     }else{
//         personas = JSON.parse(storeList);
//     }
//     return personas;
// }

// function localStoragePersonList(plist){
//     localStorage.setItem('localPersonList', JSON.stringify(plist));
// }

// //Para agregar a la mascota

// function encontrarPerson(pid){
//     let personObj;
//     for (let i = 0; i < personas.length; i++){
//         if (personas[i].id == pid){
//             personObj = personas[i];
//         }
//     }
//     return personObj;
// }

// function addMascota(ppersonObj, ppetNombre, ptype, pgender){
//     let newMascota = {
//         nombre : ppetNombre,
//         tipo : ptype,
//         gender : pgender
//     }
//     let index = personas.indexOf(ppersonObj);
//     ppersonObj.petList.push(newMascota);

//     personas[index] = ppersonObj;
//     localStoragePersonList(personas);
// }
