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

let addClass = e => c => e.classList.add(c);
let removeClass = e => c => e.classList.remove(c);
let lastNode = node => node.lastElementChild;

function selectCard(e) {
    const children = Array.from(this.parentElement.children);
    children.forEach((card) => {
        card.classList.remove("opaque");
        // console.log(lastNode(card));
        if (card.lastElementChild) {
            addClass(card)("hidden");
            addClass(lastNode(card))("hidden-name");
        }
    });
    addClass(this)("opaque");
    removeClass(this)("hidden");
    removeClass(lastNode(this))("hidden-name");
};
