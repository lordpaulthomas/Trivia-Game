


const quizContainer$ = document.getElementById("quiz");
const resultsContainer$ = document.getElementById("results");
const submitButton$ = document.getElementById("submit");


let count = 120;
const questionArray = [
    {
        question: "Who becomes the Minister for Magic When Cornelius Fudge resigns?",
        answers: {
            a: "Rufus Scrimgeour",
            b: "Professor Umbridge",
            c: "Professor Snape",
            d: "Mr Crouch"
        },
        correctAnswer: 'a'
    },
    {
        question: "How many brothers and sisters does Ron have?",
        answers: {
            a: "2",
            b: "6",
            c: "5",
            d: "8",
        },
        correctAnswer: 'b'
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
            d: 'Artists'
        },
        correctAnswer: 'b'
    },
    {
        question: "What was Fred and George's joke shop's name?",
        answers: {
            a: "Wizard's Tricks",
            b: "Weasley's Wizarding Gadets",
            c: "Weasley's Wizard Wheezes",
            d: 'Cloaks and Jokes'
        },
        correctAnswer: 'c'
    },
    {
        question: "What is the position that Harry Potter played on the Quidditch team?",
        answers: {
            a: 'Beater',
            b: 'Keeper',
            c: 'Chaser',
            d: 'Seeker'
        },
        correctAnswer: 'd'
    },
    {
        question: "What is Hermione Granger's Patronus?",
        answers: {
            a: 'otter',
            b: 'horse',
            c: 'fox',
            d: 'rabbit'
        },
        correctAnswer: 'a'
    },
    {
        question: "What color are Dobby the House Elf's eyes?",
        answers: {
            a: 'Brown',
            b: 'Green',
            c: 'Blue',
            d: 'Black'
        },
        correctAnswer: 'b'
    },
    {
        question: "What spell does Gilderoy Lockhart accidentally cast on himself in Harry Potter and the Chamber of Secrets?",
        answers: {
            a: 'Sectumsempra',
            b: 'Imperio',
            c: 'Expelliarmus',
            d: 'Obliviate'
        },
        correctAnswer: 'd'
    },
    {
        question: "What does Vernon Dursley's company sell?",
        answers: {
            a: 'Drills',
            b: 'Cars',
            c: 'Software',
            d: 'Furniture'
        },
        correctAnswer: 'a'
    }

]

// build Quiz function 
const buildQuiz = () => {
    // empty array to store HTML output
    const output = [];
    // for each question
    questionArray.forEach(
        (currentQuestion, questionNumber) => {
            // store the multiple answer choices
            const answers = [];
            // for every answer 
            for (letter in currentQuestion.answers) {
                // add a radio button
                answers.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            // add this question and multiple choice answers to the HTML output
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join("")} </div>`
            );
        }
    );
    // combine output to a string and display on page
    quizContainer$.innerHTML = output.join("");
}

// show results function

const showResults = () => {
    const answerContainers = quizContainer$.querySelectorAll('.answers');
    let unAnswered = 0;
    let numCorrect = 0;
    let incorrect = [];
    // loop through each question
    questionArray.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = 'input[name=question' + questionNumber + ']:checked';
        const userAnswer = (answerContainer.querySelector(selector) || {} && unAnswered++).value;
        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++
        }
        else {
            incorrect.push(questionArray[questionNumber].question);
        }

    });
    resultsContainer$.innerHTML = `<h3>Correct Answers: ${numCorrect} </h3><h3>Incorrect Answers: ${questionArray.length-numCorrect}</h3><h3>Unanswered Questions: ${unAnswered}</h3>
    <h4>Questions you missed: </h4><h6>   ${incorrect.join("")}   </h6>`
}

// create time interval variable
var intervalID;

// start time interval function
const run = () => {
    intervalID = setInterval(decrement, 1000);
}
// countdown to zero  function
const decrement = () => {
    count--;
    $("#clock").html("<h2>You have " + count + " seconds left!</h2>")

    // this is what happens when time runs out
    if (count === 0) {
        btn$.hide()
        clock$.hide();
        result$.show();
        backdrop$.hide();
        stop();
        showResults();
        audioElement.pause();
    }

}
// stops time interval when quiz is sumbitted
const stop = () => {
    clearInterval(intervalID);
    // reset timer for next quiz
    count = 100;
}

// create audio element
var audioElement = document.createElement("audio");
// attach to mp3 file
audioElement.setAttribute("src", "./assests/images/harry-potter-dubstep-remix.mp3");
// play audio button 
$(".theme-button").on("click", function () {
    audioElement.play();
});
// pause audio button
$(".pause-button").on("click", function () {
    audioElement.pause();
});

// jquery reference variables for displaying on page
btn$ = $('.btn')
btn$.hide();
backdrop$ = $('#backdrop');
result$ = $('#results')
backdrop$.hide();
clock$ = $('#clock');
startGame$ = $('#startGame');
// button to begin quiz
startGame$.html('<p>Click here to start Harry Potter Trivia Game?</p>')
// when start button is clicked
$('#startGame').on("click", function () {
    // start the game
    audioElement.play()
    btn$.show()
    clock$.show()
    result$.hide()
    backdrop$.show();
    buildQuiz();
    // start clock
    run();

})

// when submit button is clicked
submitButton$.addEventListener("click", function () {
    // remove quiz and clock and display results
    btn$.hide();
    clock$.hide();
    result$.show();
    backdrop$.hide();
    stop();
    showResults();
    // stop audio 
    audioElement.pause();
});

