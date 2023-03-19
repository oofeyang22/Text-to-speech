let textArea= document.querySelector("textarea");
let voiceList= document.querySelector("#voiceList");
let speechBtn= document.querySelector("#convert");

let synth= speechSynthesis;

isSpeaking= true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        console.log(voice)
        let selected= voice.name=== "google US English"? "selected": "";

        let option=`<option value=${voice.name} ${selected}>${voice.name} ${voice.lang}</option>`;

        voiceList.insertAdjacentHTML("beforeend", option);

    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance= new SpeechSynthesisUtterance(text);

    for(let voice of synth.getVoices()){
        if(voice.name=== voiceList.value){
            utterance.voice= voice;
        }
    }
    synth.speak(utterance);
};

speechBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    if(textArea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textArea.value);
        };
        if(textArea.value.length>=80){
            if(isSpeaking){
                synth.resume();
                isSpeaking= false;
                speechBtn.innerText="pause speech";
            }else{
                synth.pause();
                isSpeaking= true;
                speechBtn.innerText="resume speech";

            };
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking= true;
                    speechBtn.innerText="Convert To Speech";
                };
            });
        }else{

            speechBtn.innerText= "Convert To speech";
        };     
    };
    
});