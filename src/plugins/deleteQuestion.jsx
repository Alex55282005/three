import axios from "axios";


function deleteQuestion(e) {
    const questionId = e.target.id;

    const fetchData = async () => {
        const userId = sessionStorage.getItem("userId");
    axios.get("https://63e3df33c919fe386c110a58.mockapi.io/users/" + userId).then((response) => {
        const userQuestions = response.data.questions;
        for (let i = 0; i < userQuestions.length; i++) {
            if (userQuestions[i].id == questionId) {
                userQuestions.splice(i, 1); 
            }
                
        }
        axios.put("https://63e3df33c919fe386c110a58.mockapi.io/users/" + userId, {questions: userQuestions}).then((response) => {
            if (response.statusText == "OK") {
                window.location.reload(false);
            }
        }).catch();

        
    }).catch();
        
    };
    fetchData();
}

export default deleteQuestion;


