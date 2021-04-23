let querier = c => document.querySelector(c);
let querierAll = c => document.querySelectorAll(c);
let querierElement = e => c => e.querySelector(c);
let listen = element => event => f => element.addEventListener(event, f);

let hello = () => console.log("Hello, I'm listening");

var images = querierAll("div.quizz.screen2#q1 div.img"); //=> element
// listen(images[1])("click")(hello);

var fruitList = ["banana","apple","kiwi"];
var moreFruitsList = ["pineapple","orange","watermelon"];

const quizzApi = "https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/";
let handleQuizz = api => id =>
    {let quizz = axios.get(api);
     let showQuizz = showQuizzId(id); 
     quizz.then(showQuizz);
     quizz.catch(errorHandle);
    };

handleQuizz(quizzApi);
var errorHandle = quizz => console.log(quizz);

var showQuizzId = (id) => (quizz) =>{
    handleQuizzData(id)(quizz);
};
let handleQuizzData = id => data => populate(data)(id);

let createMsg = message => document.createTextNode(message);
let appendMsgNode = e => nodeMessage => e.appendChild(nodeMessage);  
let createElement = e => document.createElement(e);
let assignId = e => identity => e.id = `${identity}`;
let assignClass = e => c => e.classList.add(c);
var tupleObj = obj => Object.entries(obj);
var takeDataId = obj => id => obj.data[id];
var takeDataIdServer = obj => id => obj.data.id;
var changeColor = obj => colorValue => {return obj.style.color = colorValue;};
var changeBackground = obj => url =>
    {return obj.style.backgroundImage = `url(${url})`;};
// var populateWith = (e) => (c) => (typeof(c)=== "object" ?
// 				  c.forEach(a => e.appendChild(a.cloneNode(true))) :
//                                   e.appendChild(c.cloneNode(true)));
var populateWith = (e) => (c) => e.appendChild(c.cloneNode(true));

var quizz = querier('.quizzes ul');

// id (number), title(string), image (main),
//question (object) => atomic-quizz(title,color anwser), levels  
let dataFromApiId = bruteAllQuizzes => id => {
    newList = [];
    let dataObj = takeDataId(bruteAllQuizzes)(id);
    console.log(dataObj);
    createTemplate(dataObj)(newList);
    return newList;
};

//id [text, number], title[text, title-text], image [text, []],
//questions [text, [...]]=> atomic-quizzes:{answers,color, title} => answers: [{image, isCorrectAnswer, text-title}],
//levels
var createTemplate = obj => emptyList =>
    {let title = createTitle(obj)('quizz-logo');
     emptyList.push(title);
     let container = createQuizzes(obj)('quizzes');
     emptyList.push(container);
     let quizz = createQuizz(obj);
     emptyList.push(quizz);
     let score = createScore(obj)('score');
     emptyList.push(score);
    };

var createTitle = obj => titleClass => {
    let div = createClassElement('div')(titleClass);
    let h1 = createContentElement('h1')(obj.title);
    populateWith(div)(h1);
    changeBackground(div)(obj.image);
    return div;
};

var createQuizzes = obj => titleClass => {
    let div = createClassElement('div')(titleClass);
    addClass(div)('screen2');
    let ul = createElement('ul');
    populateWith(div)(ul);
    return div;
};

var createQuizzTitle = question => li => {
    let h1 = createContentElement('h1')(question.title);
    changeColor(h1)(question.color);
    populateWith(li)(h1);	
};

var createBodyContainer = question => li => i =>{
    let div = createClassElement('div')('quizz');
    addClass(div)('screen2');
    assignId(div)(`atomic-quizz${i}`);
    createImageContainer(question)(div)(i);
    populateWith(li)(div);
};

var random = max => Math.floor((Math.random() * max));
var populateImages = container => anwser => {
    let div = createClassElement('div')('img');
    (anwser.isCorretAnswer === "true" ?
     assignId(div)(fruitList[random(3)]) :
     assignId(div)(moreFruitsList[random(3)]));
    let img = createImg(anwser.image);
    let h2 = createContentElement('h2')(anwser.text);
    populateWith(div)(img);
    populateWith(div)(h2);
    populateWith(container)(div);
};

var createQuizz = obj => {
    let newList = [];
    obj.questions.forEach((q, i) =>{
        let li = createElement('li');
        createQuizzTitle(q)(li);
        createBodyContainer(q)(li)(i);
        newList.push(li);
    });
    return newList;
};

let createImageContainer = q => container => i => {
    let newList=[];
    q.answers.forEach(a =>{
        populateImages(container)(a);
        newList.push(container);
    });
    return newList;
};

var createScore = obj => titleClass => {
    let newList = [];

    obj.levels.forEach((l,i) =>{
        let div = createClassElement('div')(titleClass);
        let h1 = createContentElement('h1')(l.title);
        addClass(div)('hidde-page');
        assignId(div)(`level${i}`);
        assignId(div)(l.minValue);
        populateWith(div)(h1);

        let div2 = createClassElement('div')(`result${i}`);
        addClass(div2)('screen2');
        addClass(div2)('quizz');
        populateImagesScore(div2)(l);
        populateWith(div)(div2);

        let button1 = createContentClassElement('button')('Restart Quizz')('restart');
        let button2 = createContentClassElement('button')('Return Home')('home');
        let div3 = createClassElement('div')('buttons');
        populateWith(div3)(button1);
        populateWith(div3)(button2);
        populateWith(div)(div3);

        newList.push(div);
    });
    return newList;
};

var populateImagesScore = container => anwser => {
    let div = createClassElement('div')('img');
    let img = createImg(anwser.image);
    let div2 = createClassElement('div')('img');
    let h2 = createContentElement('h2')(anwser.text);
    populateWith(div)(img);
    populateWith(div2)(h2);
    populateWith(div)(div2);
    populateWith(container)(div);
};

let spanNodeId = id =>
    {let span = createElement('span');
     assignId(span)(id);
     return span;
    };
let populateNode = node => content => appendMsgNode(node)(createMsg(content));
let createContent = id => content =>
    {let span = spanNodeId(id);
     populateNode(span)(content);
     return span;
    };
let spanNodeClass = c =>
    {let span = createElement('span');
     assignClass(span)(c);
     return span;
    };
let createContentClass = c => content =>
    {let span = spanNodeClass(c);
     populateNode(span)(content);
     return span;
    };

var createContentElement = elementType => content =>
    {let element = createElement(elementType);
     populateNode(element)(content);
     return element;
    };
var createContentClassElement = elementType => content => c =>
    {let element = createContentElement(elementType)(content);
     assignClass(element)(c);
     return element;
    };
var createClassElement = e => c => {
    let element = createElement(e);
    addClass(element)(c);
    return element;
};

let imgUrl = img => url => img.src = url;
let createImg = url =>
    {let imgElement = createElement('img');
     imgUrl(imgElement)(url);
     return imgElement;
    };

let body = querier('body');
const compareLi = createElement('li');
var populate = obj => id =>
    {let listTemplating = dataFromApiId(obj)(id);
     console.log(listTemplating);
     listTemplating.forEach(e =>
         (Array.isArray(e) ?
          (e[0].nodeName === compareLi.nodeName ? 
           e.forEach(e => populateWith(querier('ul'))(e)) :
           e.forEach(e => populateWith(querier('div.quizzes.screen2'))(e))):
          populateWith(body)(e)));
     const cards = querierAll("div.quizz.screen2 div.img");
     activateListeners(cards);
    };

// const cards = document.querySelectorAll("div.quizz.screen2 div.img");

let activateListeners = atomicQuizzDOM => {
    atomicQuizzDOM.forEach((card) => {
        card.addEventListener("click", selectCard);
    });
};

let deactivateListeners = atomicQuizzDOM => {
    atomicQuizzDOM.forEach((card) => {
        card.removeEventListener("click", selectCard);
    });
};

let addClass = e => c => e.classList.add(c);
let removeClass = e => c => e.classList.remove(c);
let lastNode = node => node.lastElementChild;

let toggleOpacity = card => {
    if (lastNode(card) !== null) {
        addClass(card)("hidden-opacity");
        addClass(lastNode(card))("hidden-name");
    }
};

let untoggleOpacity = (e) => {
    addClass(e)("card-border");
    removeClass(e)("hidden-opacity");
    removeClass(lastNode(e))("hidden-name");
};

function selectCard(e) {
    const closestLi = this.closest('li').nextElementSibling;
    const children = Array.from(this.parentElement.children);
    children.forEach((card) => toggleOpacity(card));
    untoggleOpacity(this);
    console.log(this);
    console.log(closestLi);
    deactivateListeners(children);
    allSelectedP(querierAll('.card-border'))(closestLi);
};

var allSelectedP = selected => nextLi => {
    var allLi = querierAll('li');
    (selected.length === allLi.length ?
     resultsLayout() :
     scrollNextElement(nextLi));
};

var scroll = e => e.scrollIntoView({behavior: "smooth"});

var scrollNextElement = e => {
    let scrollNext = () => scroll(e);
    setTimeout(scrollNext, 2000);
};

var resultsLayout = () => {
    var ul = querier('ul');
    let quantityQuizzes = querierAll('.card-border').length;
    const count = whichFruits();
    var level = classify(count)(quantityQuizzes);
    var results = querierAll('div.score')[level];
    setTimeout(hiddeQuizz, 2000, ul, results);
};
var showHome = () => alert("TODO: toggle visibility to home layout");

var whichFruits = () => {
    let count = 0;
    let selected = querierAll('.card-border');
    selected.forEach(e => fruitBelongs(e.id)(count));
    return count;
};

var belongs = element => set => set.includes(element);
var fruitBelongs = fruit => counter =>
    (belongs(fruit)(fruitList) ?
     (counter += 1) :
     "does not belong in fruitList"
    );

var classify = count => quantityQuizzes => {
    let result = [];
    let levels = allRanks();
    let percentageFruits = Math.round(count/quantityQuizzes * 100)/100; 
    levels.forEach((level, i) =>
        ((percentageFruits <= level)?
         (result.push(i)):
         "not this level, still"));
    console.log(result[0]);
    return result[0];
}; 

var allRanks = () => {
    let newList = [];
    let scores = querierAll(".score.hidde-page");
    scores.forEach(score => newList.push(score.id));
    return newList;
};

let hiddeQuizz = (ul,results) => {
    var buttonRestart = querier('.buttons .restart'); 
    var buttonHome = querier('.buttons .home'); 
    addClass(ul)('hidde-page');
    removeClass(results)('hidde-page');
    scroll(results);
    listen(buttonRestart)('click')(restartPage);
    listen(buttonHome)('click')(showHome);
};

var restartPage = () => location.reload();
