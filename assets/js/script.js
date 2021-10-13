// getting all required element
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const  end_btn = info_box.querySelector(".buttons .end");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");

const option_list = document.querySelector(".option_list");

// If start quiz button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo");  // show the info box 
}

// If end button clicked
end_btn.onclick = () => {
    info_box.classList.remove("activeInfo");  // hide the info box
}

// If Continue button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");  // hide the info box
    quiz_box.classList.add("activeQuiz");  // show the quiz box
    showQuestions(0);
    queCounter(1);
}

let que_count = 0;
let que_numb = 1;
let counter;

const next_btn = quiz_box.querySelector(".next_btn");

// If Next button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
    } else {
        console.log("Questions completed");
    }
}

// getting questions and options from array
function showQuestions(index) {
    const question_text = document.querySelector(".question_text");
    let question_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option">'+ questions[index].option[0] +'<span></span></div>';
                     + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    question_text.innerHTML = question_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let index = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }                 
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns === correctAns) {
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect");
        console.log("Answer is Wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        
        // if answers is incorrect the automatically selected the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent === correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    // once user selected disabled all options
    for (let i = 0; i < allOptions.length; i++) {
        option_list.children[i].classList.add("disabled");
    }
}










function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_question");
    let totalQuestionCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuestionCountTag;
}