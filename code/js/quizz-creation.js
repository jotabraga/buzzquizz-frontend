let quizzTitle;
let quizzPicture;
let numberOfQuestions;
let numberOfLevels;
const questionsObject = {};
const levelsObject = {};

function creatTheQuizzQuestions(startCreationButton){
    const startCreationScreen = startCreationButton.parentNode; 
    quizzTitle = startCreationScreen.children[0].value;
    quizzPicture = startCreationScreen.children[1].value;
    numberOfQuestions = parseInt(startCreationScreen.children[2].value);
    numberOfLevels = parseInt(startCreationScreen.children[3].value);
    validationOfBasicInfo(quizzTitle, quizzPicture, numberOfQuestions, numberOfLevels);
}

function validationOfBasicInfo(title, picture, numOfQuestions, numOfLevels){
    if(title.length < 20 || title.length>65){
        alert("O titulo deve ter de 20 a 65 caracteres");
    }else if(isURL(picture) !== true){
        alert("A imagem não está no formato de url");
    }else if (numOfQuestions < 3){
        alert("O numero minimo de perguntas é 3");
    }else if (numOfLevels < 2){
        alert("O numero minimo de niveis é 2");
    }else {
        changeToQuestionCreationScreen();
    }
}

function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str); 
}

function changeToQuestionCreationScreen(){
    const pageInitial = document.querySelector(".quizz-creation-screen");
    pageInitial.classList.add("hidden");
    const pageToCreat = document.querySelector(".question-creation-screen");
    pageToCreat.classList.remove("hidden");
    questionsFillOut();
}

function questionsFillOut(){
    const questionsContent = document.querySelector(".fill-out-questions");
    questionsContent.innerHTML = "";

    for(let i=0; i < numberOfQuestions; i++){
        
        questionsContent.innerHTML += 
        `<div class="question-box compacted" id="${i}"><div class="quizz-creation-instructions"><strong>Pergunta ${i+1}</strong><ion-icon name="create-outline" onclick="boxResizing(this)"></ion-icon></div>
            <input type="text" class="input-quizz-info" placeholder="Texto da pergunta"/>
            <input type="text" class="input-quizz-info" placeholder="Cor de fundo da pergunta"/>
            <div class="quizz-creation-instructions"><strong>Resposta correta</strong></div>
            <input type="text" class="input-quizz-info" placeholder="Resposta correta"/>
            <input type="text" class="input-quizz-info" placeholder="URL da imagem"/>
            <div class="quizz-creation-instructions"><strong>Respostas incorretas</strong></div>
            <input type="text" class="input-quizz-info" placeholder="Resposta incorreta 1"/>
            <input type="text" class="input-quizz-info" placeholder="URL da imagem 1"/>
            <input type="text" class="input-quizz-info" placeholder="Resposta incorreta 2"/>
            <input type="text" class="input-quizz-info" placeholder="URL da imagem 2"/>
            <input type="text" class="input-quizz-info" placeholder="Resposta incorreta 3"/>
            <input type="text" class="input-quizz-info" placeholder="URL da imagem 3"/></div>`;
    }
}

function boxResizing(element){    

    const dadElement = element.parentNode;
    const boxToResizing = dadElement.parentNode;
    boxToResizing.classList.toggle("compacted");    
}

function getQuestionsInfo(element){
        
    for(let i=0; i < numberOfQuestions; i++){
        const questionBox = document.getElementById(i);
        console.log(questionBox);

    }

}

