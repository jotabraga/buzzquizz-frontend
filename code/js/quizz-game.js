let querier = c => document.querySelector(c);
let querierAll = c => document.querySelectorAll(c);
let querierElement = e => c => e.querySelector(c);
let listen = element => event => f => element.addEventListener(event, f);

let hello = () => console.log("Hello, I'm listening");

var images = querierAll("div.quizz.screen2#q1 div.img"); //=> element
// listen(images[1])("click")(hello);

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

var restartPage = () => location.reload();
var showHome = () => alert("TODO: toggle visibility to home layout");
