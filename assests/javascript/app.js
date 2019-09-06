


const quizContainer$ = document.getElementById("quiz");
const resultsContainer$ = document.getElementById("results");
const submitButton$ = document.getElementById("submit");
let count = 120;
const questionArray = [
    {
        question: "Who becomes the Minister for Magic When Cornelius Fudge resigns?",
        answers: {
            a: "Professor McGonagall",
            b: "Professor Umbridge",
            c: "Professor Snape",
            d: "Mr Crouch"
        },
        correctAnswer: 'b'
    },
    {
        question: "How many brother and sisters does Ron have?",
        answers: {
            a: "2",
            b: "10",
            c: "6",
            d: "8",
        },
        correctAnswer: 'c'
    },
    {
        question: "Who was Ginny Weasley's first boyfriend?",
        answers: {
            a: "Dean Thomas",
            b: "Harry Potter",
            c: "Michael Corner",
            d: "Draco Malfoy",
        },
        correctAnswer: 'c'
    },
    {
        question: "What profession are Hermoine Granger's Muggle parents?",
        answers: {
            a: 'Chefs',
            b: 'Dentists',
            c: 'Opticians',
            d: 'Artists',
        },
        correctAnswer: 'b'
    },

]


function buildQuiz() {
    const output = [];

    questionArray.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join("")} </div>`
            );
        }
    );

    quizContainer$.innerHTML = output.join("");
}

// show results function
const showResults = () => {
    const answerContainers = quizContainer$.querySelectorAll('.answers');
    let numCorrect = 0;
    questionArray.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = 'input[name=question' + questionNumber + ']:checked';
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });
    resultsContainer$.innerHTML = `${numCorrect} out of ${questionArray.length}`
}
var intervalID;

const run = () => {
    intervalID = setInterval(decrement, 1000);
}

const decrement = () => {
    count--;
    $("#clock").html("<h2>You have " + count + " seconds left!</h2>")
    if (count === 0) {
        stop();
        showResults;
    }

}

const stop = () => {
    clearInterval(intervalID);
}

var audioElement = document.createElement("audio");
audioElement.setAttribute("src", "./assests/images/harry-potter-dubstep-remix.mp3");
$(".theme-button").on("click", function () {
    audioElement.play();
});

$(".pause-button").on("click", function () {
    audioElement.pause();
});

buildQuiz();
run();

submitButton$.addEventListener("click", showResults);





