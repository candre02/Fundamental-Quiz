// getting all required element
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const  end_btn = info_box.querySelector(".buttons .end");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");

// If start quiz button clicked
start_btn.onclick = () {
    info_box.classList.add("activeInfo");  // show the info box 
}

// If end button clicked
end_btn.onclick = () {
    info_box.classList.remove("activeInfo");  // hide the info box
}

// If Continue button clicked
continue_btn.onclick = () {
    info_box.classList.remove("activeInfo");  // hide the info box
    quiz_box.classList.add("activeQuiz");  // show the quiz box
}