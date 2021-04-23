let quizzObj;

function creatTheQuizzQuestions(startCreationButton){

    quizzObj = document.querySelector('.quizz-creation-screen');
    const startCreationScreen = startCreationButton.parentNode; 
    const title = startCreationScreen.children[0].value;
    const image = startCreationScreen.children[1].value;
    const numberOfQuestions = parseInt(startCreationScreen.children[2].value);
    const numberOfLevels = parseInt(startCreationScreen.children[3].value);
    quizzObj = {title, image, questions: new Array(numberOfQuestions), levels: new Array(numberOfLevels)};
    validationOfBasicInfo(title, image, numberOfQuestions, numberOfLevels);    
}

function validationOfBasicInfo(title, image, numOfQuestions, numOfLevels){

    if(title.length < 20 || title.length>65){
        alert("O titulo deve ter de 20 a 65 caracteres");
    }else if(isURL(image) !== true){
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

    for(let i=0; i < quizzObj.questions.length; i++){        
        questionsContent.innerHTML += 
        `<div class="question-box compacted" id="q"><div class="quizz-creation-instructions"><strong>Pergunta ${i+1}</strong><ion-icon name="create-outline" onclick="boxResizing(this)"></ion-icon></div>
            <input type="text" class="input-quizz-info question-text" placeholder="Texto da pergunta"/>
            <input type="text" class="input-quizz-info question-background" placeholder="Cor de fundo da pergunta"/>
            <div class="quizz-creation-instructions"><strong>Resposta correta</strong></div>
            <input type="text" class="input-quizz-info question-answer" placeholder="Resposta correta"/>
            <input type="text" class="input-quizz-info question-image" placeholder="URL da imagem"/>
            <div class="quizz-creation-instructions"><strong>Respostas incorretas</strong></div>
            <input type="text" class="input-quizz-info question-answer" placeholder="Resposta incorreta 1"/>
            <input type="text" class="input-quizz-info question-image" placeholder="URL da imagem 1"/>
            <input type="text" class="input-quizz-info question-answer" placeholder="Resposta incorreta 2"/>
            <input type="text" class="input-quizz-info question-image" placeholder="URL da imagem 2"/>
            <input type="text" class="input-quizz-info question-answer" placeholder="Resposta incorreta 3"/>
            <input type="text" class="input-quizz-info question-image" placeholder="URL da imagem 3"/>
        </div>`;
    }
}

function boxResizing(element){    

    const dadElement = element.parentNode;
    const boxToResizing = dadElement.parentNode;
    boxToResizing.classList.toggle("compacted");    
}

function getQuestionsInfo() {

    const divQuestions = document.querySelector(".question-creation-screen");   
    const questionInsideDiv = divQuestions.querySelectorAll("#q");
    
    for (let i = 0; i < quizzObj.questions.length; i++) {
        const question = {};
        question.title = questionInsideDiv[i].querySelector('.question-text').value;
        question.color = questionInsideDiv[i].querySelector('.question-background').value;
        const answers =  questionInsideDiv[i].querySelectorAll('.question-answer');
        const images =   questionInsideDiv[i].querySelectorAll('.question-image');
        question.answers = [{ text: answers[0].value, image: images[0].value, isCorrectAnswer: true }];

        for (let j = 1; j < 4; j++) {
            if (answers[j].value !== '') {
                question.answers.push({ text: answers[j].value, image: images[j].value, isCorrectAnswer: false })
            }
        }
        quizzObj.questions[i] = question;
    }
    validationOfQuestions();
}    

function validationOfQuestions(){

    const testLength = quizzObj.questions.map(item => {
        return verifyLength(item);
    });
    const testHex = quizzObj.questions.map(item => {
        return verifyHexadecimalColor(item)
    });
    const testNotNull = quizzObj.questions.map(item => {
        return verifyNotNull(item)
    });
    const testURL = quizzObj.questions.map(item => {
        return verifyImageURL(item)
    });
    const testNoQ = (quizzObj.questions.length >= 2);        
    
    console.log({testLength, testNotNull, testURL, testNoQ, testHex});

    if(testLength.includes(false) || testHex.includes(false) || testNotNull.includes(false) || testURL.includes(false) || !testNoQ){
        alert("Preencha corretamente para continuar");
        return false;
    } else {
        changeToLevelsCreationScreen();
    }    
}

function verifyImageURL(str) {

    let condition = true;
    const urlOfAnswer = str.answers;
    const mapping = urlOfAnswer.map(item => {
        return isURL(item.image);
    })

    if(mapping.includes(false)){
        condition = false;
    }
    return condition;
}

function verifyLength(element){

    const title = element.title;
    const titleLength = title.length;

    if(titleLength < 20){
        alert("O titulo deve conter 20 caracteres no minimo");
        return false;
    }else {
        return true;
    }
}

function verifyHexadecimalColor(element){

    const pattern = /#+([a-fA-F0-9]{6})/    
    if(element.color.match(pattern)){
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

    for(let i=0; i < quizzObj.levels.length; i++){        
        levelsContent.innerHTML += 
        `<div class="question-box compacted" id="l${i}"><div class="quizz-creation-instructions"><strong>Nível ${i+1}</strong><ion-icon name="create-outline" onclick="boxResizing(this)"></ion-icon></div>
            <input type="text" class="input-quizz-info" placeholder="Título do nível"/>
            <input type="text" class="input-quizz-info" placeholder="% de acerto mínima"/>
            <input type="text" class="input-quizz-info" placeholder="URL da imagem do nível"/>
            <input type="text" class="input-quizz-info description-level" placeholder="Descrição do nível"/>`;
    }    
}

function getLevelsInfo(){

    let validation = true;
    let levelZero = 0;

    for(let i=0; i < quizzObj.levels.length; i++){

        let identificator = "l" + i;    
        const levelBox = document.getElementById(identificator);

        const titleOfLevel = levelBox.children[1].value;
        const imageOfLevel = levelBox.children[3].value;
        const descriptionOfLevel = levelBox.children[4].value;
        const minPercentOfHits = parseInt(levelBox.children[2].value);


        const levelObj = {
            title: titleOfLevel,
            image: imageOfLevel,
            text: descriptionOfLevel,
            minValue: minPercentOfHits
        }
        quizzObj.levels[i] = levelObj;  

        console.log(levelObj);

        if(titleOfLevel.length < 10 || minPercentOfHits < 0 || minPercentOfHits > 100 || !isURL(imageOfLevel) || descriptionOfLevel.length < 30){
            console.log({c1: (titleOfLevel.length < 10), c2:  (minPercentOfHits < 0), c3: (minPercentOfHits > 100), c4: (!isURL(imageOfLevel)), c5: (descriptionOfLevel.length < 30)});
            alert("Corrija os dados");
            validation = false;
        }
        if(minPercentOfHits === 0){
            levelZero++;
            console.log({minPercentOfHits, levelZero});
        }   
    }
    if(validation === true && levelZero === 1){
        alert("passou na validação");
        pushArrayOfQuizzToServer();  
    } else {
        alert("Não passou na validação");
    }         
} 

function pushArrayOfQuizzToServer(){
    
    console.log(quizzObj);
    const requisition = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes",quizzObj); 
    requisition.then(response => {
        console.log(response);
    }) 
    requisition.catch(errorServer =>{
        console.log(error);
    })  
    finalQuizzFillOut(); 
}

function finalQuizzFillOut(){

    const imgQuizz = document.querySelector(".img-quizz");
    imgQuizz.innerHTML = "";
    imgQuizz.innerHTML += `<div style="background: linear-gradient(to bottom, transparent, #000)>
    <div class="quizz-description">${quizzObj.title}</div></div>`;
    imgQuizz.style.backgroundImage = `url(${quizzObj.image})`;
    changeToLastScreen()
}

function changeToLastScreen(){

    const pageToHide = document.querySelector(".levels-creation-screen");
    pageToHide.classList.add("hidden");
    const pageToShow = document.querySelector(".last-quizz-screen");
    pageToShow.classList.remove("hidden");
}
function returnToMainMenu(){
    location.reload();    
}
// function enterQuizz(){

// }