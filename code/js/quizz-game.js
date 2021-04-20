let querier = c => document.querySelector(c);
let querierAll = c => document.querySelectorAll(c);
let listen = element => event => f => element.addEventListener(event, f);

let hello = () => console.log("Hello, I'm listening");

var images = querierAll("div.quizz.screen2#q1 div.img"); //=> element
// listen(images[1])("click")(hello);

const cards = document.querySelectorAll("div.quizz.screen2#q1 div.img");

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
    const children = Array.from(this.parentElement.children);
    children.forEach((card) => toggleOpacity(card));
    untoggleOpacity(this);
    deactivateListeners(children);
};
