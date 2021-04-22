let querier = c => document.querySelector(c);
let querierAll = c => document.querySelectorAll(c);
let querierElement = e => c => e.querySelector(c);
let listen = element => event => f => element.addEventListener(event, f);

let hello = () => console.log("Hello, I'm listening");

var images = querierAll("div.quizz.screen2#q1 div.img"); //=> element
// listen(images[1])("click")(hello);

var quizzApi = "https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/";
let handleQuizz = api => id =>
    {let quizz = axios.get(api);
     let showQuizz = showQuizzId(id); 
     quizz.then(showQuizz);
     quizz.catch(errorHandle);
    };

handleQuizz(quizzApi)(0);
var errorHandle = quizz => console.log(quizz);

var showQuizzId = (id)=> (quizz) =>{
    handleQuizzData(id)(quizz);
    toggleQuizzLayout();
};
let handleQuizzData = id => data => populate(data)(id); 
                               // populateWithId(data);
                               // focus();

let createMsg = message => document.createTextNode(message);
let appendMsgNode = e => nodeMessage => e.appendChild(nodeMessage);  
var populateWith = (e) => (c) => e.appendChild(c.cloneNode(true));
let createElement = e => document.createElement(e);
let assignId = e => identity => e.id = `${identity}`;
let assignClass = e => c => e.classList.add(c);

var quizz = querier('.quizzes ul');

// id (number), title(string), image (main),
//question (object) => atomic-quizz(title,color anwser), levels  
let dataFromApiId = bruteAllQuizzes => id => {
    newList = [];
    // console.log(bruteAllQuizzes);
    // console.log(bruteAllQuizzes.data);
    console.log(Object.entries(bruteAllQuizzes.data[id]));
    Object.entries(bruteAllQuizzes.data[id]).forEach(e => {newList.push(createContentClass(e[0])(e[1]));
                                                      console.log(e);
    });
    // quizz = Object.entries(allQuizzes.data);
    return newList;
};
// return the list of all [id, {...data}] <=> type: list of lists

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

let createContentElement = elementType => content =>
    {let element = createElement(elementType);
     populateNode(element)(content);
     return element;
    };
let createContentClassElement = elementType => content => c =>
    {let element = createContentElement(elementType)(content);
     assignClass(element)(c);
     return element;
    };

let imgUrl = img => url => img.src = url;
let createImg = url =>
    {let imgElement = createElement('img');
     imgUrl(imgElement)(url);
     return imgElement;
    };

var populate = obj => id =>
    {let list = dataFromApiId(obj)(id);
     // let list = dataFromApiId(obj);
     // console.log(list);
     list.forEach(e => console.log(e)); // objData
     // let li = createElement('li');
     // assignClass(li)(list[3].textContent);
     // orderAppendMsg(li)(list);
     // chat.appendChild(li);
    };
var populateWithId = obj =>
    {let li = createElement('li');
     let list = mapKeys(obj);
     // assignClass(li)(list[3].textContent);
     // assignId(li)("last");
     // orderAppendMsg(li)(list);
     // chat.appendChild(li);
    };

const cards = document.querySelectorAll("div.quizz.screen2 div.img");

cards.forEach((card) => {
    card.addEventListener("click", selectCard);
});

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
    deactivateListeners(children);
    allSelectedP(querierAll('.card-border'))(closestLi);
};

var allLi = querierAll('li');
var allSelectedP = selected => nextLi =>
    (selected.length === allLi.length ?
     resultsLayout() :
     scrollNextElement(nextLi));

var scroll = e => e.scrollIntoView({behavior: "smooth"});

var scrollNextElement = e => {
    let scrollNext = () => scroll(e);
    setTimeout(scrollNext, 2000);
};

// var
var ul = querier('ul');
var results = querier('.score');
var buttonRestart = querier('.buttons .restart'); 
var buttonHome = querier('.buttons .home'); 
var resultsLayout = () => {
    let hiddeQuizz = () => {addClass(ul)('hidde-page');
                            removeClass(results)('hidde-page');
                            scroll(results);
                            listen(buttonRestart)('click')(restartPage);
                            listen(buttonHome)('click')(showHome);
                           };
    setTimeout(hiddeQuizz, 2000);
};
var showHome = () => alert("TODO: toggle visibility to home layout");

var restartPage = () => location.reload();
