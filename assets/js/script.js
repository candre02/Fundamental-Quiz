// getting all required element
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const  end_btn = info_box.querySelector(".buttons .end");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

const option_list = document.querySelector(".option_list");

// If start quiz button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo");  // show the info box 
}

// If end button clicked
end_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");  // hide the info box
}

// If Continue button clicked
continue_btn.onclick = () =>{
    info_box.classList.remove("activeInfo");  // hide the info box
    quiz_box.classList.add("activeQuiz");  // show the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(20);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 20;
let widthValue = 0;
let userScore = 0;

const next_btn = document.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const replay_quiz = document.querySelector(".replay");
const quit_quiz = document.querySelector(".quit");

// if replay quiz clicked
replay_quiz.onclick = () =>{
    if (quiz_box > result_box) {
        quiz_box.classList.add("activeQuiz") 
    } else (result_box < quiz_box) 
        result_box.classList.remove("activeResult")
        let que_count = 0;
        let que_numb = 1;
        let timeValue = 20;
        let widthValue = 0;
        let userScore = 0;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left";
}
    






// if Quit quiz clicked
quit_quiz.onclick = ()=>{
    window.location.reload();
}


// If Next button clicked
next_btn.onclick = ()=>{
    console.log("next clicked")
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left";
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions completed");
        showResultBox();
    }
}

// getting questions and options from array
function showQuestions(index) {
    const question_text = document.querySelector(".question_text");
    let question_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option">'+ questions[index].option[0] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].option[1] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].option[2] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].option[3] +'<span></span></div>';
    question_text.innerHTML = question_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }                 
}




function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns === correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is Correct");
    } else {
        answer.classList.add("incorrect");
        console.log("Answer is Wrong");
        
        // if answers is incorrect then automatically selected the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent === correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
            }
        }
    }

    // once user selected disabled all options
    for (let i = 0; i < allOptions.length; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display ="block";
}

function showResultBox() {
    info_box.classList.remove("activeInfo"); // hide the info box
    quiz_box.classList.remove("activeQuiz"); // hide the quiz box
    result_box.classList.add("activeResult"); // show the result box
    const scoreText = result_box.querySelectorAll(".score_text");
    if (userScore > 3) {
        let scoreTag = '<span>and congrats! You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 1) {
        let scoreTag = '<span>and nice, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<span>and sorry, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }


}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent === correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                }
            }
            for (let i = 0; i < allOptions.length; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display ="block";
        }
    }
}
        
function startTimerLine(time) {
    counterLine = setInterval(timer, 39);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_question");
    let totalQuestionCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuestionCountTag;
}

function saveHighScore(){
  // check out .split method to remove the decimal point and first zero
    // checkout toFixed method to show only the first two decimals
    let finalScore = userScore / 5;
    let noDecimalScore = finalScore;
    console.log("finalScore", noDecimalScore)

    let initialsElement = document.getElementById("initials");
    let initials = initialsElement.value;

    if(initials !== ''){
        var highscore = JSON.parse(localStorage.getItem("highscore")) || [];

        let newScore = {
            score: finalScore,
            initials: initials
        }
        highscore.push(newScore)
        localStorage.setItem('highscore', JSON.stringify(highscore))

        initialsElement.setAttribute("class", "hide")
        submitBtn.setAttribute("class", "hide")
        highScoreBtn.removeAttribute("class")

    }
}

function showHighScore(){
    var highscores = JSON.parse(localStorage.getItem("highscore"))

    highscores.forEach(function(score){
        let liTag = document.createElement("li");
        liTag.textContent = score.initials + ": " + score.score;

        const ulElement = document.getElementById("userScores")
        ulElement.append(liTag);
    })
}
let highScoreBtn = document.getElementById("highScoreBtn")
let submitBtn = document.getElementById("submitBtn");
submitBtn.onclick = saveHighScore;
highScoreBtn.onclick = showHighScore;

