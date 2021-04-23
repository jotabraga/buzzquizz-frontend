let quizzTitle;
let quizzPicture;
let numberOfQuestions;
let numberOfLevels;
const questionsArray = [];
const levelsArray = [];
const answersArray = [];

// let activateListeners = atomicQuizzDOM => {
//     atomicQuizzDOM.forEach((card) => {
//         card.addEventListener("click", selectCard);
//     });
// };
// let querier = e => document.querySelector(e);
let listen = element => event => f => element.addEventListener(event, f);
let hello = () => alert("olá!");
let infoButton = querier('.click-to-continue');


var creatTheQuizzQuestions = (startCreationButton) => {
    let arrayInfo = Array.from(this.parentNode.children);
    newObj = {};
    newObj.title = arrayInfo[0].value;
    newObj.image = arrayInfo[1].value;
    newObj.numberQuestions = parseInt(arrayInfo[2].value);
    newObj.numberLevels = parseInt(arrayInfo[3].value);
    validationBasicInfo(newObj);
};

var validationOfBasicInfo = obj =>
    ((obj.title.length < 20 || obj.title.length > 65) ?
     (alert("O titulo deve ter de 20 a 65 caracteres")) :
     ((isURL(obj.image) !== true) ?
      (alert("A imagem não está no formato de url")):
      ((obj.numberQuestions < 3) ?
       (alert("O numero minimo de perguntas é 3")):
       ((obj.numberLevels < 2) ?
        (alert("O numero minimo de niveis é 2")):
        (changeToQuestionCreationScreen())))));

// (prep ?  true : false)


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
        `<div class="question-box compacted" id="q${i}"><div class="quizz-creation-instructions"><strong>Pergunta ${i+1}</strong><ion-icon name="create-outline" onclick="boxResizing(this)"></ion-icon></div>
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

function getQuestionsInfo(){
            
    for(let i=0; i < numberOfQuestions; i++){

        let identificator = "q" + i;  
        const questionBox = document.getElementById(identificator);
        const answerArray = [];

        for(let i=3; i < 10; i+=2){           

            if(questionBox.children[i] !== null){

                const texts = questionBox.children[i].value;
                const picture = questionBox.children[i+1].value;
                let rightAnswer;
                if(i === 3){
                    rightAnswer = true;
                } else {
                    rightAnswer = false;
                }
                const answer = {
                    text: texts,
                    image: picture,
                    isCorrectAnswer: rightAnswer
                }
                answerArray.push(answer);

            } else {
                break;
            }            
        }
        const titleOf = questionBox.children[1].value;
        const colorOf = questionBox.children[2].value;

        const questionObj = {
            title: titleOf,
            color: colorOf,
            answer: answerArray
        }
        questionsArray.push(questionObj);
    }
        changeToLevelsCreationScreen();
    console.log(questionsArray);
}

function validationOfQuestions(answersArray, questionsArray){

    const testLenght = questionsArray.title.forEach(verifyLenght(questionsArray));
    const testHex = questionsArray.forEach(verifyHexadecimalColor(questionsArray));
    const testNotNull = answerArray.forEach(verifyNotNull(answerArray));
    const testURL = answerArray.forEach(isURL(answerArray.image));
    const testNoQ = answerArray.forEach(verifyNumberOfQuestions(answerArray));

    if(testLenght && testHex && testNotNull && testURL && testNoQ){
        return true;
    } else {
        return false;
    }    
}
function verifyLenght(element){

    const title = element.title;
    const titleLenght = parseInt(title.lenght);

    if(titleLenght < 20){
        alert("O titulo deve conter 20 caracteres no minimo");
        return false;
    }else {
        return true;
    }
}

function verifyHexadecimalColor(element){

    const pattern = /#+([a-fA-F0-9]{6})/

    if(element.colorOf.match(pattern)){
        return true;
    } else {
        alert("Insira uma cor hexadecimal");
        return false;
    }
}

function verifyNotNull(element){

    if(element.text !== null){
        return true;
    } else{
        alert("O texto da resposta não pode estar em branco");
        return false;
    }
}

function verifyNumberOfQuestions(element){

    if(element.length >= 2){
        return true;
    }else {
        alert("O quizz deve conter no minimo 2 questões");
    }
}

function changeToLevelsCreationScreen(){

    const pageToHide = document.querySelector(".question-creation-screen");
    pageToHide.classList.add("hidden");
    const pageToShow = document.querySelector(".levels-creation-screen");
    pageToShow.classList.remove("hidden");
    levelsFillOut();
}

function levelsFillOut(){

    const levelsContent = document.querySelector(".fill-out-levels");
    levelsContent.innerHTML = "";

    for(let i=0; i < numberOfLevels; i++){
        
        levelsContent.innerHTML += 
        `<div class="question-box compacted" id="${i}"><div class="quizz-creation-instructions"><strong>Nível ${i+1}</strong><ion-icon name="create-outline" onclick="boxResizing(this)"></ion-icon></div>
            <input type="text" class="input-quizz-info" placeholder="Título do nível"/>
            <input type="text" class="input-quizz-info" placeholder="% de acerto mínima"/>
            <input type="text" class="input-quizz-info" placeholder="URL da imagem do nível"/>
            <input type="text" class="input-quizz-info description-level" placeholder="Descrição do nível"/>`;
    }    
}

function getLevelsInfo(){

    for(let i=0; i < numberOfLevels; i++){

        let identificator = "l" + i;    
        const levelBox = document.getElementById(identificator);

        const titleOfLevel = levelBox.childen[1].value;
        const imageOfLevel = levelBox.children[3].value;
        const descriptionOfLevel = levelBox.children[4];
        const minPercentOfHits = levelBox.children[2];

        const levelObj = {
            title: titleOfLevel,
            image: imageOfLevel,
            text: descriptionOfLevel,
            minValue: minPercentOfHits
        }

        levelsArray.push(levelObj);      
    } 
    finalQuizzFillOut();
    pushArrayOfQuizzToServer();   
}

function pushArrayOfQuizzToServer(){

    const quizzObj = {
        title: quizzTitle,
        image: quizzPicture,
        questions: questionsArray,
        levels: levelsArray
    }
    console.log(quizzObj);
    const requisition = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes",quizzObj);    
}

function finalQuizzFillOut(){

    const imgQuizz = document.querySelector(".img-quizz");
    imgQuizz.innerHTML += `<div style="background: linear-gradient(to bottom, transparent, #000)>
    <div class="quizz-description">${quizzTitle}</div></div>`;
    imgQuizz.style.backgroundImage = `url(${quizzPicture})`;
    changeToLastScreen()
}

function changeToLastScreen(){

    const pageToHide = document.querySelector(".levels-creation-screen");
    pageToHide.classList.add("hidden");
    const pageToShow = document.querySelector(".last-quizz-screen");
    pageToShow.classList.remove("hidden");
}



