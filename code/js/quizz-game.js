let querier = c => document.querySelector(c);
let querierAll = c => document.querySelectorAll(c);
let listen = element => event => f => element.addEventListener(event, f);

let hello = () => console.log("Hello, I'm listening");

var images = querierAll("div.quizz.screen2#q1 div.img"); //=> element
// listen(images[1])("click")(hello);

const cards = document.querySelectorAll("div.quizz.screen2#q1 div.img");

cards.forEach((card) => {
    card.addEventListener("click", productSelect);
});


function productSelect(e) {
    const children = Array.from(this.parentElement.children);
    console.log(children);

    children.forEach((card) => {
        card.classList.remove("opaque");
        if (card.lastElementChild) {
            card.classList.add("hidden");
        }
    });

    this.classList.add("opaque");
    this.classList.remove("hidden");
};
// listen(images[0])("click")(productSelect);
