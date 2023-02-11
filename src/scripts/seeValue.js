function seeValue() {
    const text = document.querySelector("#enter_question_inpt");
    const label = document.querySelector("#quantity_of_symbols");

    label.value = text.length;
}

export default seeValue;