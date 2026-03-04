
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Modern Language", correct: false },
            { text: "Hyper Transfer Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which language is used to style web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "Which method is used to loop through arrays in JavaScript?",
        answers: [
            { text: "map()", correct: true },
            { text: "push()", correct: false },
            { text: "split()", correct: false },
            { text: "join()", correct: false }
        ]
    },
    {
        question: "Which keyword can be used to declare a variable in JavaScript?",
        answers: [
            { text: "let", correct: false },
            { text: "var", correct: false },
            { text: "const", correct: false },
            { text: "All of the above", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answersBtn = document.getElementById("answers");
const next = document.getElementById("next");
const result = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    next.innerHTML = "Next";
    next.disabled = true;
    result.style.display = "none";
    showQuestion();
}

// showQuestion----------------------------------------------------------------------
function showQuestion() {
    answersBtn.innerHTML = "";
    answered = false;
    next.disabled = true;
    result.style.display = "none";

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + `. ` + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersBtn.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    updateProgress();
}

// for next --------------------------------------------------------------------
next.addEventListener("click", () => {
    if (!answered && currentQuestionIndex < questions.length - 1) {
        alert("Please select an answer first!");
        return;
    }

    currentQuestionIndex += 1;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else if (currentQuestionIndex === questions.length) {
        next.innerHTML = "Play again";
        next.disabled = false;
        result.innerHTML = `Your result is: ${score} / ${questions.length}`;
        result.style.display = "block";
        answersBtn.innerHTML = "";
        questionElement.innerHTML = "";

        const oldProgress = document.querySelector('.question-progress');
        if (oldProgress) {
            oldProgress.remove();
        }
    }
    else {
        result.innerHTML = "";
        startQuiz();
    }
});

//select Answer------------------------------------------------------------------
function selectAnswer(e) {
    if (answered) return;

    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";

    if (isCorrect) {
        score += 1;
    }

    const answersBtns = document.querySelectorAll(".btn");

    Array.from(answersBtns).forEach(answer => {
        let isCorrect = answer.dataset.correct;
        if (isCorrect) {
            answer.classList.add("correct");
        }
        else {
            answer.classList.add("incorrect");
        }
        answer.disabled = true;
    });

    answered = true;
    next.disabled = false;
}
//update Progress------------------------------------------------------------------
function updateProgress() {
    const oldProgress = document.querySelector('.question-progress');
    if (oldProgress) {
        oldProgress.remove();
    }

    const progress = document.createElement('div');
    progress.className = 'question-progress';
    progress.innerHTML = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    const answersDiv = document.getElementById('answers');
    const quizElement = document.getElementById('quiz');
    const nextButton = document.getElementById('next');

    if (answersDiv && answersDiv.nextSibling) {
        answersDiv.parentNode.insertBefore(progress, answersDiv.nextSibling);
    } else if (quizElement && nextButton) {
        quizElement.insertBefore(progress, nextButton);
    }
}

// Run--------------------------------------------------------------------------------
startQuiz();