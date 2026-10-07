
const questions = [
    {
        question : "Which is largest Animal in World?",
        answers : [
            { text : "Shark" , correct : "false" },
            { text : "Elephant" , correct : "false" },
            { text : "Blue Whale" , correct : "true" },
            { text : "Giraf" , correct : "false" },
        ]
    },{
        question : "CSS property used to change text color?",
        answers : [
            { text : "font" , correct : "false" },
            { text : "color" , correct : "true" },
            { text : "background-color" , correct : "false" },
            { text : "style" , correct : "false" },
        ]
    },{
        question : "HTML tag used for inserting an image?",
        answers : [
            { text : "img" , correct : "true" },
            { text : "background-img" , correct : "false" },
            { text : "pic" , correct : "false" },
            { text : "image" , correct : "false" },
        ]
    },{
        question : "Operator in JavaScript used for strict equality check?",
        answers : [
            { text : "!==" , correct : "false" },
            { text : "==" , correct : "false" },
            { text : "===" , correct : "true" },
            { text : "!=" , correct : "false" },
        ]
    }

];

const questionElement = document.querySelector('#question');
const ansBtn = document.querySelector('#ansBtn');
const nextBtn = document.querySelector('.nextBtn');

let currentQuestionIdx = 0;
let score = 0;

function startQuiz(){
    currentQuestionIdx = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIdx];
    let queestionNo = currentQuestionIdx + 1;
    questionElement.innerHTML = queestionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers =>{
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        ansBtn.appendChild(button);

        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(ansBtn.firstChild){
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selectAnswer(e){
     const selectedBtn = e.target;
     const isCorrect = selectedBtn.dataset.correct === "true";
     if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
     }else{
        selectedBtn.classList.add("incorrect");
     }
     Array.from(ansBtn.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
     });
     nextBtn.style.display = "block";

}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}
function handleNextBtn(){
    currentQuestionIdx++;
    if(currentQuestionIdx < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextBtn.addEventListener("click" , ()=>{
    if(currentQuestionIdx < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
});
startQuiz();