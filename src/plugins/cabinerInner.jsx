import setTheme from "../statements/setTheme";
import axios from "axios";
import { useEffect,useState } from "react";
import deleteQuestion from "./deleteQuestion"

function CabinetInner() {
    const [arrayOfQuestions, setArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userId = sessionStorage.getItem("userId");
        axios.get("https://63e3df33c919fe386c110a58.mockapi.io/users/" + userId).then((response) => {
            const userQuestions = response.data.questions;
            const container = document.querySelector("#container");
            if (userQuestions.length == 0) {
                container.className = "containerNull";
            }else if (userQuestions.length > 0 && userQuestions.length < 4) {
                container.className = "containerNull";
                const questions = userQuestions.map(item => {
                    return item;
                });
                setArray(questions);
            }else if(userQuestions.length >= 4){
                const questions = userQuestions.map(item => {
                    return item;
                });
                setArray(questions);
            }
            
            
        }).catch();
        };
        fetchData();
    }, []);
    
    function deleteBlockAct(e) {
        const delteId = e.target.id; 
        console.log(e.target.id);
        const deleteQuestionBlck = document.getElementById(delteId);
        deleteQuestionBlck.classList = "deleteQuestionBlckAct";
    }
    function closeDeleteBlock(e) {
        const delteId = e.target.id; 
        const deleteQuestionBlck = document.getElementById(delteId);
        deleteQuestionBlck.classList = "deleteQuestionBlck";
    }
    

    return(
        arrayOfQuestions.map((item) => (
            <div className="questionTemplate">
                     <div id={item.id} className="deleteQuestionBlck">
                         <svg width="6%" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="deleteQuestionBlckBackBtnLight">
 <path d="M2 2.97559L41.9993 42.9756" stroke="#CA5E06" stroke-width="4" stroke-linecap="round"/>
 <path d="M42 2.97559L2.00071 42.9756" stroke="#CA5E06" stroke-width="4" stroke-linecap="round"/>
                         </svg>
                         <svg id={item.id} width="5%" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="deleteQuestionBlckBackBtnDark" onClick={closeDeleteBlock}>
 <path d="M2 2L41.9993 42" stroke="#F2EDE8" stroke-width="4" stroke-linecap="round"/>
 <path d="M42 2L2.00071 42" stroke="#F2EDE8" stroke-width="4" stroke-linecap="round"/>
                         </svg>

                         <div className="deleteQuestionBlckBody">
                             <p className="deleteText" id={item.id} onClick={deleteQuestion}>УДАЛИТЬ ВОПРОС</p>
                             <p className="questionID">{item.id}</p>
                             <svg width="15px" viewBox="0 0 36 43" fill="none" xmlns="http://www.w3.org/2000/svg" className="rubishIconLight">
 <path d="M34.2 7.97559H28.62C28.2022 6.00056 27.0969 4.22594 25.4903 2.95084C23.8836 1.67574 21.874 0.978131 19.8 0.975586H16.2C14.126 0.978131 12.1164 1.67574 10.5097 2.95084C8.90312 4.22594 7.79777 6.00056 7.38 7.97559H1.8C1.32261 7.97559 0.864773 8.15996 0.527208 8.48815C0.189642 8.81634 0 9.26146 0 9.72559C0 10.1897 0.189642 10.6348 0.527208 10.963C0.864773 11.2912 1.32261 11.4756 1.8 11.4756H3.6V34.2256C3.60286 36.5454 4.55199 38.7694 6.2392 40.4097C7.9264 42.05 10.2139 42.9728 12.6 42.9756H23.4C25.7861 42.9728 28.0736 42.05 29.7608 40.4097C31.448 38.7694 32.3971 36.5454 32.4 34.2256V11.4756H34.2C34.6774 11.4756 35.1352 11.2912 35.4728 10.963C35.8104 10.6348 36 10.1897 36 9.72559C36 9.26146 35.8104 8.81634 35.4728 8.48815C35.1352 8.15996 34.6774 7.97559 34.2 7.97559ZM16.2 4.47559H19.8C20.9165 4.47691 22.0052 4.81399 22.9169 5.44061C23.8286 6.06723 24.5186 6.9527 24.8922 7.97559H11.1078C11.4814 6.9527 12.1714 6.06723 13.0831 5.44061C13.9948 4.81399 15.0835 4.47691 16.2 4.47559ZM28.8 34.2256C28.8 35.618 28.2311 36.9533 27.2184 37.9379C26.2057 38.9225 24.8322 39.4756 23.4 39.4756H12.6C11.1678 39.4756 9.79432 38.9225 8.78162 37.9379C7.76893 36.9533 7.2 35.618 7.2 34.2256V11.4756H28.8V34.2256Z" fill="#703E0B"/>
 <path d="M14.4 32.4756C14.8774 32.4756 15.3352 32.2912 15.6728 31.963C16.0104 31.6348 16.2 31.1897 16.2 30.7256V20.2256C16.2 19.7615 16.0104 19.3163 15.6728 18.9881C15.3352 18.66 14.8774 18.4756 14.4 18.4756C13.9226 18.4756 13.4648 18.66 13.1272 18.9881C12.7896 19.3163 12.6 19.7615 12.6 20.2256V30.7256C12.6 31.1897 12.7896 31.6348 13.1272 31.963C13.4648 32.2912 13.9226 32.4756 14.4 32.4756Z" fill="#703E0B"/>
 <path d="M21.6 32.4756C22.0774 32.4756 22.5352 32.2912 22.8728 31.963C23.2104 31.6348 23.4 31.1897 23.4 30.7256V20.2256C23.4 19.7615 23.2104 19.3163 22.8728 18.9881C22.5352 18.66 22.0774 18.4756 21.6 18.4756C21.1226 18.4756 20.6648 18.66 20.3272 18.9881C19.9896 19.3163 19.8 19.7615 19.8 20.2256V30.7256C19.8 31.1897 19.9896 31.6348 20.3272 31.963C20.6648 32.2912 21.1226 32.4756 21.6 32.4756Z" fill="#703E0B"/>
                             </svg>
                             <svg width="15px" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="rubishIconDark">
 <path d="M34.2 7H28.62C28.2022 5.02497 27.0969 3.25036 25.4903 1.97526C23.8836 0.700158 21.874 0.00254542 19.8 0H16.2C14.126 0.00254542 12.1164 0.700158 10.5097 1.97526C8.90312 3.25036 7.79777 5.02497 7.38 7H1.8C1.32261 7 0.864773 7.18438 0.527208 7.51256C0.189642 7.84075 0 8.28587 0 8.75C0 9.21413 0.189642 9.65925 0.527208 9.98744C0.864773 10.3156 1.32261 10.5 1.8 10.5H3.6V33.25C3.60286 35.5698 4.55199 37.7938 6.2392 39.4341C7.9264 41.0745 10.2139 41.9972 12.6 42H23.4C25.7861 41.9972 28.0736 41.0745 29.7608 39.4341C31.448 37.7938 32.3971 35.5698 32.4 33.25V10.5H34.2C34.6774 10.5 35.1352 10.3156 35.4728 9.98744C35.8104 9.65925 36 9.21413 36 8.75C36 8.28587 35.8104 7.84075 35.4728 7.51256C35.1352 7.18438 34.6774 7 34.2 7ZM16.2 3.5H19.8C20.9165 3.50132 22.0052 3.83841 22.9169 4.46503C23.8286 5.09164 24.5186 5.97711 24.8922 7H11.1078C11.4814 5.97711 12.1714 5.09164 13.0831 4.46503C13.9948 3.83841 15.0835 3.50132 16.2 3.5ZM28.8 33.25C28.8 34.6424 28.2311 35.9777 27.2184 36.9623C26.2057 37.9469 24.8322 38.5 23.4 38.5H12.6C11.1678 38.5 9.79432 37.9469 8.78162 36.9623C7.76893 35.9777 7.2 34.6424 7.2 33.25V10.5H28.8V33.25Z" fill="#404050"/>
 <path d="M14.4 31.5C14.8774 31.5 15.3352 31.3156 15.6728 30.9874C16.0104 30.6593 16.2 30.2141 16.2 29.75V19.25C16.2 18.7859 16.0104 18.3408 15.6728 18.0126C15.3352 17.6844 14.8774 17.5 14.4 17.5C13.9226 17.5 13.4648 17.6844 13.1272 18.0126C12.7896 18.3408 12.6 18.7859 12.6 19.25V29.75C12.6 30.2141 12.7896 30.6593 13.1272 30.9874C13.4648 31.3156 13.9226 31.5 14.4 31.5Z" fill="#404050"/>
 <path d="M21.6 31.5C22.0774 31.5 22.5352 31.3156 22.8728 30.9874C23.2104 30.6593 23.4 30.2141 23.4 29.75V19.25C23.4 18.7859 23.2104 18.3408 22.8728 18.0126C22.5352 17.6844 22.0774 17.5 21.6 17.5C21.1226 17.5 20.6648 17.6844 20.3272 18.0126C19.9896 18.3408 19.8 18.7859 19.8 19.25V29.75C19.8 30.2141 19.9896 30.6593 20.3272 30.9874C20.6648 31.3156 21.1226 31.5 21.6 31.5Z" fill="#404050"/>
                             </svg>

                         </div>
                     </div>
                     <div className="questionTemplateFrstBlck">
                       <p className="questionData">{item.date}</p>
                     <p id={item.id} class="questionDeleteBtn" onClick={deleteBlockAct}>...</p>
                     </div>
                     <div className="questionTemplateSecndBlck">
                         <p className="questionText">{item.text}</p>
                     </div>
                     <div className="questionTemplateThrdBlck">
                         <p className="questionYes">{item.answerYes}</p>
                         <p className="questionAnswersP">ОТВЕТЫ</p>
                         <p className="questionNo">{item.answerNo}</p>
                     </div>
                 </div>
        ))
    );
} 


export default CabinetInner;