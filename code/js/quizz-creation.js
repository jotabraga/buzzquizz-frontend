let quizzTitle;
let quizzPicture;
let numberOfQuestions;
let numberOfLevels;

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
    }else if(urlValidation(picture) !== true){
        alert("A imagem não está no formato de url");
    }else if (numOfQuestions < 3){
        alert("O numero minimo de perguntas é 3");
    }else if (numOfLevels < 2){
        alert("O numero minimo de niveis é 2");
    }else {
        changeToQuestionCreationScreen();
    }
}

function urlValidation(img){
    return true;
    //vou ver como faz pra validar isso ainda hehe
}

function changeToQuestionCreationScreen(){
    const pageInitial = document.querySelector(".quizz-creation-screen");
    pageInitial.classList.add("hidden");
    const pageToCreat = document.querySelector(".question-creation-screen");
    pageToCreat.classList.remove("hidden");
}

function questionsFillOut(questionsAmount){
    const questionsContent = document.querySelector(".fill-out-questions");
    questionsContent.innerHTML = "";
    for(let i=0; i<questionsAmount; i++){

    }
    

}
function boxResizing(element){
    const boxToResizing = element.parentNode;
    boxResizing.classList.toggle("compacted");
}