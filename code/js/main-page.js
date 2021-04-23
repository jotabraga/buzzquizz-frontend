let initPage = () => allQuizzes(quizzApi)(10);

let allQuizzes = api => number =>
    {let quizz = axios.get(api);
     let captureQuizzes = captureQuizzIds(number);
     quizz.then(captureQuizzes);
     quizz.catch(errorHandle);
    };
var captureQuizzIds = number => quizz =>{
    handleQuizzesDatas(number)(quizz);
};

let handleQuizzesDatas = number => quizzesData => populateAvalible(quizzesData)(number);
var populateAvalible = quizzesData => number => {
    let listOfTemplates = fetchData(quizzesData)(number);
    let quizzesDiv = querier('.quizzes');
    listOfTemplates.forEach(template => populateWith(quizzesDiv)(template));
    const quizzesClickable = querierAll('.quizz');
    const createButton = querier('div.first-quizz-box button');
    activateQuizzListeners(quizzesClickable);
    activateCreateListeners(createButton);
};

let activateQuizzListeners = atomicQuizzDOM => {
    atomicQuizzDOM.forEach((card) => {
        card.addEventListener("click", apiRender);
    });
};

let deactivateQuizzListeners = atomicQuizzDOM => {
    atomicQuizzDOM.forEach((card) => {
        card.removeEventListener("click", apiRender);
    });
};

function apiRender(e) {
    var allQuizzesRendered = Array.from(querierAll('.quizz'));
    var allQuizzesId = idArray(allQuizzesRendered);
    var cardServerId = allQuizzesId.indexOf(`${this.id}`);
    const children = Array.from(this.parentElement.children);
    children.forEach((card) => toggleOpacity(card));
    handleQuizz(quizzApi)(cardServerId);
    untoggleOpacity(this);
    deactivateListeners(children);
    setTimeout(scrollToQuizz, 2000);
};
var id = e => e.id;
var idArray = listElements => listElements.map(id);

let activateCreateListeners = atomicQuizzDOM => {
        atomicQuizzDOM.addEventListener("click", createInterface);
};

let deactivateCreateListeners = atomicQuizzDOM => {
    atomicQuizzDOM.removeEventListener("click", createInterface);
};

function createInterface(e) {
    // console.log(this);
    var startLayout = querier('div.quizz-creation-screen');
    // const parent = this.parentElement;
    // console.log(children);
    // children.forEach((card) => toggleOpacity(card));
    untoggleOpacityCreate(startLayout);
    deactivateCreateListeners(startLayout);
    setTimeout(scrollToCreate, 2000, startLayout);
};
var scrollToCreate = (create) => {
    scroll(create);
};


let toggleOpacityCreate = card => {
    if (lastNode(card) !== null) {
        addClass(card)("hidden");
        // addClass(lastNode(card))("hidden-name");
    }
};

let untoggleOpacityCreate = (e) => {
    // addClass(e)("card-border");
    removeClass(e)("hidden");
    // removeClass(lastNode(e))("hidden-name");
};

var scrollToQuizz = () => {
    const closestUl = querier('div.quizz-logo');
    console.log(querier('div.quizz-logo'));
    scroll(closestUl);
};

var fetchData = quizzesData => number =>{
    let fetchedData = [];
    let dataList = [];
    quizzesData.data.forEach((quizz,i) => ((i<=number) ?
                                           dataList.push(quizz) :
                                           dataList));
    dataList.forEach(dataObj => createTemplateIndex(dataObj)(fetchedData));
    return fetchedData;
};

var createTemplateIndex = obj => emptyList =>
    {let title = createTitleIndex(obj)('quizz');
     emptyList.push(title);
    };

var createTitleIndex = obj => titleClass => {
    console.log(obj.id);
    let div = createClassElement('div')(titleClass);
    assignId(div)(obj.id);
    let div2 = createClassElement('div')('quizz-image');
    let div3 = createContentClassElement('div')(obj.title)('quizz-description');
    changeBackground(div2)(obj.image);
    populateWith(div2)(div3);
    populateWith(div)(div2);
    return div;
};

initPage();
