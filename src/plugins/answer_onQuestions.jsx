import { Link, Link as RouterLink } from "react-router-dom";
import "../styles/answerOnQuestions.css" ;
import SwitchThemeBtn from "../statements/switchBtn"
import logo from "../resources/logo.png"
import setTheme from "../statements/setTheme";
import axios from "axios";


function Answer_on_Questions() {
    function loadQuestForAnswering() {
        setTheme();
        const arrayOfQuestions = [];
        axios.get("https://63e3df33c919fe386c110a58.mockapi.io/questions").then((response) => {
            const dataOfQuest = response.data;
            for (let i = 0; i < dataOfQuest.length; i++) {
                arrayOfQuestions.push(dataOfQuest[i]);
            }
            createHtmlOfQuest(arrayOfQuestions);
            
        }).catch();
        
    }
    loadQuestForAnswering();
    let innitNumOfQuest = 0;
    const newArrayOfQuest = [];
    function createHtmlOfQuest(arrayOfQuestions) {
        const textOfQuestP = document.querySelector(".textOfQuest");
        const btnYesVal = document.querySelector("#AnswBtnYesVal");
        const btnNoVal = document.querySelector("#AnswBtnNoVal");
        const idOfQuest = document.querySelector(".idOfQuest");
        let newQuestionData = arrayOfQuestions[innitNumOfQuest];

        textOfQuestP.innerHTML = newQuestionData.text;
        btnYesVal.innerHTML = newQuestionData.answerYes;
        btnNoVal.innerHTML = newQuestionData.answerNo;
        idOfQuest.innerHTML = newQuestionData.id;
        createNewArray(arrayOfQuestions);
        
    
    }
    function createNewArray(arrayOfQuestions) {
        for (let i = 0; i < arrayOfQuestions.length; i++) {
            newArrayOfQuest.push(arrayOfQuestions[i]);
        }
    }

    function nextQuestion() {
        innitNumOfQuest = innitNumOfQuest + 1;
        const blckCont = document.querySelector("#answBtnCont");
        const btnYes = document.querySelector("#AnswBtnYes");
        const btnNo = document.querySelector("#AnswBtnNo");
        const btnYesVal = document.querySelector("#AnswBtnYesVal");
        const btnNoVal = document.querySelector("#AnswBtnNoVal");
        const nextPageBtn = document.querySelector("#nextQuestBtn");

        blckCont.classList = "answBtnCont";
        btnYes.classList = "AnswBtnYes";
        btnNo.classList = "AnswBtnNo";
        btnYesVal.classList = "AnswBtnYesVal";
        btnNoVal.classList = "AnswBtnNoVal";
        nextPageBtn.classList = "nextQuestBtn";

        const textOfQuestP = document.querySelector(".textOfQuest");
        textOfQuestP.innerHTML = "";

        btnYesVal.innerHTML = "";
        btnNoVal.innerHTML = "";

        createNextQuestion(newArrayOfQuest);
    }



    function createNextQuestion(newArrayOfQuest) {
        const textOfQuestP = document.querySelector(".textOfQuest");
        const btnYesVal = document.querySelector("#AnswBtnYesVal");
        const btnNoVal = document.querySelector("#AnswBtnNoVal");
        const idOfQuest = document.querySelector(".idOfQuest");
        let newQuestionData = newArrayOfQuest[innitNumOfQuest];
        const popUp = document.querySelector("#popup-window-quest");


        if (innitNumOfQuest < newArrayOfQuest.length) {
            textOfQuestP.innerHTML = newQuestionData.text;
            btnYesVal.innerHTML = newQuestionData.answerYes;
            btnNoVal.innerHTML = newQuestionData.answerNo;
            idOfQuest.innerHTML = newQuestionData.id;
        }else if (innitNumOfQuest >= newArrayOfQuest.length) {
            popUp.className = "popup-window-quest-opened";
        }
        
    }

    function changeBtn(e) {
        const blckCont = document.querySelector("#answBtnCont");
        const btnYes = document.querySelector("#AnswBtnYes");
        const btnNo = document.querySelector("#AnswBtnNo");
        const btnYesVal = document.querySelector("#AnswBtnYesVal");
        const btnNoVal = document.querySelector("#AnswBtnNoVal");
        const nextPageBtn = document.querySelector("#nextQuestBtn");
        const idOfQuest = document.querySelector(".idOfQuest");

        blckCont.classList = "answBtnContAct";
        btnYes.classList = "AnswBtnYesAct";
        btnNo.classList = "AnswBtnNoAct";
        btnYesVal.classList = "AnswBtnYesValAct";
        btnNoVal.classList = "AnswBtnNoValAct";
        nextPageBtn.classList = "nextQuestBtnAct";
        const userID = sessionStorage.getItem("userId");

        if (e.target.innerHTML == "ДА") {
            axios.get("https://63e3df33c919fe386c110a58.mockapi.io/questions/" + idOfQuest.innerHTML).then((response) => {
                const newResponse = response.data.answerYes +1;
                axios.put("https://63e3df33c919fe386c110a58.mockapi.io/questions/" + idOfQuest.innerHTML, {answerYes : newResponse}).then(() => {
                }).catch();
            }).catch();
            getUserAnswerAmountUp(userID);
        }

        else if (e.target.innerHTML == "НЕТ") {
            axios.get("https://63e3df33c919fe386c110a58.mockapi.io/questions/" + idOfQuest.innerHTML).then((response) => {
                const newResponse = response.data.answerNo +1;
                axios.put("https://63e3df33c919fe386c110a58.mockapi.io/questions/" + idOfQuest.innerHTML, {answerNo : newResponse}).then(() => {
                }).catch();
            }).catch();
            getUserAnswerAmountUp(userID);
        }
    }
    function getUserAnswerAmountUp(userID) {
        axios.get("https://63e3df33c919fe386c110a58.mockapi.io/users/" + userID).then((response) => {
            const newResponse = response.data.answerAmount;
            const newAmount = newResponse +1;
            axios.put("https://63e3df33c919fe386c110a58.mockapi.io/users/" + userID, {answerAmount : newAmount});
        }).catch();
    }
    
    return (
        <div className="container" >
            <div id="popup-window-quest" className="popup-window-quest">
                <div id="pop-wind-cont-quest">
                    <div id="pop-wind-body-quest">
                        <div id="pop-wind-body-quest-second">
                            <h2 id="pop-up-h2">Вопросы закончились, возвращайтесь чуть позже!</h2>
                        </div>

                        <div id="pop-wind-body-quest-third">
                        <Link to={"/main_screen"} component={RouterLink}>
                            <button id="popup-btn">OK</button>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div id="answerFrstBlck">
                <div id="answerFrstBlckLogoBlck">
                    <div id="headerFrstBlckAnswr">
                        <SwitchThemeBtn/>
                        <Link to={"/main_screen"} component={RouterLink} id="linkAnsw">
                            <svg width="5%" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg" id="backBtnAnswer">
<path d="M2 2.05855L43.9993 44.0585" stroke="#CA5E06" stroke-width="4" stroke-linecap="round"/>
<path d="M44 2.05855L2.00075 44.0585" stroke="#CA5E06" stroke-width="4" stroke-linecap="round"/>
                            </svg>
                        </Link>
                    </div>

                    <div id="bodyFirstBlckAnswr">
                        <svg width="50%" viewBox="0 0 264 75" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.51758 74.5371C2.63867 74.0163 1.98763 72.9746 1.56445 71.4121C1.14128 69.8496 0.929688 68.2383 0.929688 66.5781C0.929688 65.7969 1.4668 65.2109 2.54102 64.8203C3.61523 64.4297 4.90104 64.2344 6.39844 64.2344C7.66797 64.2344 8.49805 63.974 8.88867 63.4531C9.2793 62.8997 9.47461 62.1348 9.47461 61.1582V13.9902C9.47461 13.0137 9.2793 12.265 8.88867 11.7441C8.49805 11.1908 7.66797 10.9141 6.39844 10.9141C2.7526 10.9141 0.929688 10.0677 0.929688 8.375C0.929688 6.77995 1.14128 5.21745 1.56445 3.6875C1.98763 2.125 2.63867 1.09961 3.51758 0.611328C8.92122 1.03451 12.8112 1.24609 15.1875 1.24609C18.1497 1.24609 22.1699 1.05078 27.248 0.660156C27.9642 1.18099 28.485 2.22266 28.8105 3.78516C29.1686 5.34766 29.3477 6.97526 29.3477 8.66797C29.3477 9.44922 28.8105 10.0352 27.7363 10.4258C26.6621 10.8164 25.3763 11.0117 23.8789 11.0117C23.1628 11.0117 22.5768 11.1094 22.1211 11.3047C21.6654 11.4674 21.3398 11.7279 21.1445 12.0859C20.9818 12.444 20.8678 12.7695 20.8027 13.0625C20.7702 13.3229 20.7539 13.6973 20.7539 14.1855V30.8359C20.7539 31.5195 21.0632 31.8613 21.6816 31.8613H60.1582C60.7767 31.8613 61.0859 31.5195 61.0859 30.8359V14.0879C61.0859 13.1113 60.8906 12.3626 60.5 11.8418C60.1094 11.2884 59.2793 11.0117 58.0098 11.0117C56.5124 11.0117 55.2266 10.8164 54.1523 10.4258C53.0781 10.0352 52.541 9.44922 52.541 8.66797C52.541 6.97526 52.7526 5.34766 53.1758 3.78516C53.599 2.22266 54.25 1.18099 55.1289 0.660156C60.1419 1.05078 64.0319 1.24609 66.7988 1.24609C69.7611 1.24609 73.7812 1.05078 78.8594 0.660156C79.5755 1.18099 80.0964 2.22266 80.4219 3.78516C80.7799 5.34766 80.959 6.97526 80.959 8.66797C80.959 9.44922 80.4219 10.0352 79.3477 10.4258C78.2734 10.8164 76.9876 11.0117 75.4902 11.0117C74.7741 11.0117 74.1882 11.1094 73.7324 11.3047C73.2767 11.4674 72.9512 11.7279 72.7559 12.0859C72.5931 12.444 72.4792 12.7695 72.4141 13.0625C72.3815 13.3229 72.3652 13.6973 72.3652 14.1855V61.0605C72.3652 61.5488 72.3815 61.9395 72.4141 62.2324C72.4792 62.4928 72.5931 62.8021 72.7559 63.1602C72.9512 63.5182 73.2767 63.7949 73.7324 63.9902C74.1882 64.153 74.7741 64.2344 75.4902 64.2344C76.9876 64.2344 78.2734 64.4297 79.3477 64.8203C80.4219 65.2109 80.959 65.7969 80.959 66.5781C80.959 68.2708 80.7799 69.8984 80.4219 71.4609C80.0964 72.9909 79.5755 74.0163 78.8594 74.5371C74.2044 74.179 70.1842 74 66.7988 74C63.6087 74 59.7188 74.179 55.1289 74.5371C54.25 74.0163 53.599 72.9746 53.1758 71.4121C52.7526 69.8496 52.541 68.2383 52.541 66.5781C52.541 65.7969 53.0781 65.2109 54.1523 64.8203C55.2266 64.4297 56.5124 64.2344 58.0098 64.2344C59.2793 64.2344 60.1094 63.974 60.5 63.4531C60.8906 62.8997 61.0859 62.1348 61.0859 61.1582V40.5039C61.0859 39.8203 60.7767 39.4785 60.1582 39.4785H21.6816C21.0632 39.4785 20.7539 39.8203 20.7539 40.5039V61.0605C20.7539 61.5488 20.7702 61.9395 20.8027 62.2324C20.8678 62.4928 20.9818 62.8021 21.1445 63.1602C21.3398 63.5182 21.6654 63.7949 22.1211 63.9902C22.5768 64.153 23.1628 64.2344 23.8789 64.2344C25.3763 64.2344 26.6621 64.4297 27.7363 64.8203C28.8105 65.2109 29.3477 65.7969 29.3477 66.5781C29.3477 68.2708 29.1686 69.8984 28.8105 71.4609C28.485 72.9909 27.9642 74.0163 27.248 74.5371C22.5931 74.179 18.5729 74 15.1875 74C11.9974 74 8.10742 74.179 3.51758 74.5371ZM89.4551 0.611328C94.8587 1.03451 98.7487 1.24609 101.125 1.24609C103.664 1.24609 107.684 1.03451 113.186 0.611328C113.902 1.13216 114.423 2.1901 114.748 3.78516C115.106 5.34766 115.285 6.97526 115.285 8.66797C115.285 9.44922 114.748 10.0352 113.674 10.4258C112.6 10.8164 111.314 11.0117 109.816 11.0117C109.1 11.0117 108.514 11.1094 108.059 11.3047C107.603 11.4674 107.277 11.7279 107.082 12.0859C106.919 12.444 106.805 12.7695 106.74 13.0625C106.708 13.3229 106.691 13.6973 106.691 14.1855V61.0605C106.691 61.5488 106.708 61.9395 106.74 62.2324C106.805 62.4928 106.919 62.8021 107.082 63.1602C107.277 63.5182 107.603 63.7949 108.059 63.9902C108.514 64.153 109.1 64.2344 109.816 64.2344C111.314 64.2344 112.6 64.4297 113.674 64.8203C114.748 65.2109 115.285 65.7969 115.285 66.5781C115.285 68.2708 115.106 69.8984 114.748 71.4609C114.423 72.9909 113.902 74.0163 113.186 74.5371C108.531 74.179 104.51 74 101.125 74C97.9349 74 94.0449 74.179 89.4551 74.5371C88.5762 74.0163 87.9251 72.9746 87.502 71.4121C87.0788 69.8496 86.8672 68.2383 86.8672 66.5781C86.8672 65.7969 87.4043 65.2109 88.4785 64.8203C89.5527 64.4297 90.8385 64.2344 92.3359 64.2344C93.6055 64.2344 94.4355 63.974 94.8262 63.4531C95.2168 62.8997 95.4121 62.1348 95.4121 61.1582V13.9902C95.4121 13.0137 95.2168 12.265 94.8262 11.7441C94.4355 11.1908 93.6055 10.9141 92.3359 10.9141C88.6901 10.9141 86.8672 10.0677 86.8672 8.375C86.8672 6.77995 87.0788 5.21745 87.502 3.6875C87.9251 2.125 88.5762 1.09961 89.4551 0.611328ZM140.871 13.8438C149.107 37.1836 154.917 53.1829 158.303 61.8418C161.851 53.0527 167.775 37.0534 176.076 13.8438C176.369 13.4206 176.516 12.8184 176.516 12.0371C176.516 11.3861 175.93 10.9792 174.758 10.8164C173.586 10.6536 172.414 10.4583 171.242 10.2305C170.07 10.0026 169.484 9.49805 169.484 8.7168C169.875 4.35482 170.314 1.62044 170.803 0.513672C174.253 0.774089 178.436 0.904297 183.352 0.904297C188.462 0.904297 193.02 0.774089 197.023 0.513672C197.577 0.871745 197.854 1.62044 197.854 2.75977C197.854 4.19206 197.593 6.04753 197.072 8.32617C196.812 9.10742 196.128 9.69336 195.021 10.084C193.915 10.4746 192.678 10.6699 191.311 10.6699C190.074 10.6699 189.146 10.9466 188.527 11.5C187.941 12.0208 187.453 12.7695 187.062 13.7461L167.922 62.1348C167.499 63.209 167.043 64.3809 166.555 65.6504C166.066 66.9199 165.708 67.8802 165.48 68.5312C165.253 69.1497 164.96 69.8496 164.602 70.6309C164.276 71.3796 164.032 71.9167 163.869 72.2422C163.706 72.5352 163.43 72.877 163.039 73.2676C162.681 73.6582 162.372 73.9023 162.111 74C161.883 74.0977 161.493 74.1953 160.939 74.293C160.419 74.4232 159.914 74.4883 159.426 74.4883C158.938 74.5208 158.254 74.5371 157.375 74.5371C156.268 74.5371 155.422 74.5208 154.836 74.4883C154.283 74.4883 153.697 74.3581 153.078 74.0977C152.492 73.8372 152.085 73.6094 151.857 73.4141C151.662 73.2188 151.337 72.7142 150.881 71.9004C150.458 71.0866 150.148 70.3704 149.953 69.752C149.758 69.1335 149.367 68.0267 148.781 66.4316C148.195 64.804 147.658 63.3392 147.17 62.0371L128.713 13.7461C128.322 12.7695 127.834 12.0208 127.248 11.5C126.662 10.9466 125.734 10.6699 124.465 10.6699C123.098 10.6699 121.844 10.4746 120.705 10.084C119.566 9.69336 118.866 9.10742 118.605 8.32617C118.736 6.04753 118.801 4.19206 118.801 2.75977C118.801 1.62044 119.077 0.871745 119.631 0.513672C123.472 0.774089 127.899 0.904297 132.912 0.904297C137.925 0.904297 142.303 0.774089 146.047 0.513672C146.633 1.81576 147.072 4.55013 147.365 8.7168C147.365 9.49805 146.779 10.0026 145.607 10.2305C144.468 10.4583 143.312 10.6536 142.141 10.8164C141.001 10.9792 140.432 11.3861 140.432 12.0371C140.432 12.4928 140.578 13.0951 140.871 13.8438ZM203.811 0.611328C216.831 1.03451 225.588 1.24609 230.08 1.24609C233.173 1.24609 236.379 1.21354 239.699 1.14844C243.02 1.05078 246.145 0.936849 249.074 0.806641C252.004 0.676432 253.778 0.611328 254.396 0.611328C254.95 1.09961 255.959 4.41992 257.424 10.5723C258.921 16.7246 259.67 20.403 259.67 21.6074C259.67 21.8353 259.54 22.1608 259.279 22.584C259.051 22.9746 258.677 23.4141 258.156 23.9023C257.668 24.3581 256.936 24.7487 255.959 25.0742C255.015 25.3997 253.924 25.5625 252.688 25.5625C252.199 25.5625 251.646 24.5208 251.027 22.4375C250.409 20.3542 249.79 17.9453 249.172 15.2109C248.553 12.444 248.114 10.7025 247.854 9.98633C245.477 9.98633 241.506 10.0026 235.939 10.0352C230.406 10.0352 225.995 10.0352 222.707 10.0352C222.219 10.0352 221.844 10.2142 221.584 10.5723C221.324 10.9303 221.161 11.3047 221.096 11.6953C221.063 12.0534 221.047 12.5417 221.047 13.1602V31.5684C222.935 30.9173 225.262 30.3314 228.029 29.8105C230.829 29.2897 233.384 29.0293 235.695 29.0293C237.648 29.0293 239.211 29.5339 240.383 30.543C241.555 31.5195 242.141 33.0983 242.141 35.2793C242.141 37.1022 241.506 38.6322 240.236 39.8691C238.999 41.0736 237.535 41.6758 235.842 41.6758C233.498 38.7135 230.145 37.2324 225.783 37.2324C224.514 37.2324 222.935 37.3464 221.047 37.5742V62.0859C221.047 62.737 221.063 63.2578 221.096 63.6484C221.161 64.0065 221.324 64.3646 221.584 64.7227C221.844 65.0807 222.219 65.2598 222.707 65.2598C226.255 65.2598 231.024 65.276 237.014 65.3086C243.003 65.3086 247.268 65.3086 249.807 65.3086C250.132 64.5273 250.702 62.5905 251.516 59.498C252.329 56.373 253.143 53.6387 253.957 51.2949C254.771 48.9512 255.487 47.7793 256.105 47.7793C257.342 47.7793 258.433 47.9421 259.377 48.2676C260.354 48.5931 261.086 49 261.574 49.4883C262.095 49.944 262.469 50.3835 262.697 50.8066C262.958 51.1973 263.088 51.5065 263.088 51.7344C263.088 53.069 262.193 57.0892 260.402 63.7949C258.645 70.4681 257.456 74.0488 256.838 74.5371C250.816 74.179 241.896 74 230.08 74C219.761 74 211.005 74.179 203.811 74.5371C202.932 74.0163 202.281 72.9746 201.857 71.4121C201.434 69.8496 201.223 68.2383 201.223 66.5781C201.223 65.7969 201.76 65.2109 202.834 64.8203C203.908 64.4297 205.194 64.2344 206.691 64.2344C207.961 64.2344 208.791 63.974 209.182 63.4531C209.572 62.8997 209.768 62.1348 209.768 61.1582V13.9902C209.768 13.0137 209.572 12.265 209.182 11.7441C208.791 11.1908 207.961 10.9141 206.691 10.9141C203.046 10.9141 201.223 10.0677 201.223 8.375C201.223 6.77995 201.434 5.21745 201.857 3.6875C202.281 2.125 202.932 1.09961 203.811 0.611328Z" fill="#CA5E06"/>
                        </svg>
                        <svg width="80%" viewBox="0 0 501 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 1C195.653 1 305.347 1 501 1" stroke="#CA5E06"/>
                        </svg>
                        <img src={logo} id="logoAswerQuest"/>
                    </div>
                </div>
                

                <div id="footerFirstBlckAnswr">
                    <svg width="100%" viewBox="0 0 1125 336" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<g opacity="0.7" filter="url(#filter0_f_60_727)">
<path opacity="0.5" d="M1081.45 161.055C1081.45 161.055 951.98 74.3541 1016.83 51.157C1095.51 23.0159 1081.43 161.06 1081.43 161.06L1081.45 161.055Z" fill="url(#paint0_linear_60_727)"/>
<rect x="976.432" y="182.447" width="181.818" height="144.946" transform="rotate(-25.2766 976.432 182.447)" fill="url(#pattern0)"/>
<path opacity="0.5" d="M1085.91 156.179C1085.91 156.179 1025.3 20.1247 1101.3 24.7699C1195.36 30.5224 1085.92 156.172 1085.92 156.172L1085.91 156.179Z" fill="url(#paint1_linear_60_727)"/>
</g>
<g opacity="0.7" filter="url(#filter1_f_60_727)">
<path opacity="0.5" d="M61.5888 190.401C61.5888 190.401 140.4 136.58 100.554 122.733C52.2071 105.936 61.5959 190.404 61.5959 190.404L61.5888 190.401Z" fill="url(#paint2_linear_60_727)"/>
<rect width="111.361" height="88.777" transform="matrix(-0.908097 -0.41876 -0.41876 0.908097 126.025 202.919)" fill="url(#pattern1)"/>
<path opacity="0.5" d="M58.829 187.439C58.829 187.439 95.1935 103.774 48.6691 107.042C-8.90887 111.088 58.8223 187.435 58.8223 187.435L58.829 187.439Z" fill="url(#paint3_linear_60_727)"/>
</g>
<defs>
<filter id="filter0_f_60_727" x="954.432" y="2.65363" width="270.301" height="332.862" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="11" result="effect1_foregroundBlur_60_727"/>
</filter>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlinkHref="#image0_60_727" transform="scale(0.00699301 0.00877193)"/>
</pattern>
<filter id="filter1_f_60_727" x="-34.2773" y="84.9487" width="182.303" height="220.588" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="11" result="effect1_foregroundBlur_60_727"/>
</filter>
<pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlinkHref="#image0_60_727" transform="scale(0.00699301 0.00877193)"/>
</pattern>
<linearGradient id="paint0_linear_60_727" x1="1099.96" y1="29.7902" x2="976.539" y2="201.964" gradientUnits="userSpaceOnUse">
<stop stop-color="#EAEAFF"/>
<stop offset="1" stop-color="#787888"/>
</linearGradient>
<linearGradient id="paint1_linear_60_727" x1="1141.64" y1="14.8848" x2="1029.25" y2="159.853" gradientUnits="userSpaceOnUse">
<stop stop-color="#EAEAFF"/>
<stop offset="1" stop-color="#787888"/>
</linearGradient>
<linearGradient id="paint2_linear_60_727" x1="49.5218" y1="110.109" x2="126.067" y2="214.872" gradientUnits="userSpaceOnUse">
<stop stop-color="#EAEAFF"/>
<stop offset="1" stop-color="#787888"/>
</linearGradient>
<linearGradient id="paint3_linear_60_727" x1="23.9109" y1="101.212" x2="93.5513" y2="189.374" gradientUnits="userSpaceOnUse">
<stop stop-color="#EAEAFF"/>
<stop offset="1" stop-color="#787888"/>
</linearGradient>
<image id="image0_60_727" width="143" height="114" xlinkHref="data:image/png;base64,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"/>
</defs>
                    </svg>
                </div>
            </div>

            <div id="answerSecndBlck">
                <div className="questionContainer">
                    <p className="textOfQuest"></p>
                    <p className="idOfQuest"></p>
                    <div id="answBtnCont" className="answBtnCont">
                        <button id="AnswBtnYes" className="AnswBtnYes"  onClick={changeBtn}>ДА</button>
                        <button id="AnswBtnNo" className="AnswBtnNo"    onClick={changeBtn}>НЕТ</button>
                        <button id="AnswBtnYesVal"  className="AnswBtnYesVal"></button>
                        <button id="AnswBtnNoVal"   className="AnswBtnNoVal"></button>
                    </div>
                        <button id="nextQuestBtn" className="nextQuestBtn" onClick={nextQuestion}>СЛЕДУЮЩИЙ ВОПРОС</button>   
                </div>
            </div>

            <div id="answerThrdBlck">
                <div>
                    <svg width="100%" viewBox="0 0 1125 420" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M144.839 467.11L207.649 448.84L223.239 385.31L176.009 340.04L113.189 358.31L97.6094 421.84L144.839 467.11Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M144.839 467.11L207.649 448.84L223.239 385.31L176.009 340.04L113.189 358.31L97.6094 421.84L144.839 467.11Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M21.23 435.17L84.04 416.9L99.63 353.37L52.4 308.1L-10.42 326.37L-26 389.9L21.23 435.17Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M21.23 435.17L84.04 416.9L99.63 353.37L52.4 308.1L-10.42 326.37L-26 389.9L21.23 435.17Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M391.201 529.17L454.011 510.9L469.601 447.36L422.371 402.1L359.551 420.37L343.971 483.9L391.201 529.17Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M391.201 529.17L454.011 510.9L469.601 447.36L422.371 402.1L359.551 420.37L343.971 483.9L391.201 529.17Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M355.339 405.89L418.159 387.62L433.749 324.08L386.519 278.82L323.699 297.09L308.109 360.62L355.339 405.89Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M355.339 405.89L418.159 387.62L433.749 324.08L386.519 278.82L323.699 297.09L308.109 360.62L355.339 405.89Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M267.72 497.68L330.53 479.41L346.12 415.88L298.89 370.61L236.07 388.88L220.49 452.42L267.72 497.68Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M267.72 497.68L330.53 479.41L346.12 415.88L298.89 370.61L236.07 388.88L220.49 452.42L267.72 497.68Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M601.701 467.95L664.521 449.68L680.111 386.14L632.881 340.88L570.061 359.15L554.471 422.68L601.701 467.95Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M601.701 467.95L664.521 449.68L680.111 386.14L632.881 340.88L570.061 359.15L554.471 422.68L601.701 467.95Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M565.849 344.67L628.669 326.4L644.249 262.86L597.019 217.6L534.209 235.87L518.619 299.4L565.849 344.67Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M565.849 344.67L628.669 326.4L644.249 262.86L597.019 217.6L534.209 235.87L518.619 299.4L565.849 344.67Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M478.22 436.46L541.04 418.19L556.63 354.66L509.4 309.39L446.58 327.66L430.99 391.2L478.22 436.46Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M478.22 436.46L541.04 418.19L556.63 354.66L509.4 309.39L446.58 327.66L430.99 391.2L478.22 436.46Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M847.32 527.45L910.13 509.18L925.72 445.64L878.49 400.37L815.67 418.64L800.09 482.18L847.32 527.45Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M847.32 527.45L910.13 509.18L925.72 445.64L878.49 400.37L815.67 418.64L800.09 482.18L847.32 527.45Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M812.21 406.73L875.03 388.46L890.61 324.92L843.38 279.66L780.57 297.93L764.98 361.46L812.21 406.73Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M812.21 406.73L875.03 388.46L890.61 324.92L843.38 279.66L780.57 297.93L764.98 361.46L812.21 406.73Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M776.361 283.45L839.171 265.18L854.761 201.64L807.531 156.38L744.711 174.65L729.131 238.18L776.361 283.45Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M776.361 283.45L839.171 265.18L854.761 201.64L807.531 156.38L744.711 174.65L729.131 238.18L776.361 283.45Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M724.3 497.56L787.12 479.29L802.71 415.75L755.48 370.49L692.66 388.76L677.07 452.29L724.3 497.56Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M724.3 497.56L787.12 479.29L802.71 415.75L755.48 370.49L692.66 388.76L677.07 452.29L724.3 497.56Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M652.74 251.51L715.56 233.24L731.15 169.71L683.92 124.44L621.1 142.71L605.51 206.24L652.74 251.51Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M652.74 251.51L715.56 233.24L731.15 169.71L683.92 124.44L621.1 142.71L605.51 206.24L652.74 251.51Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M1057.82 466.23L1120.64 447.96L1136.23 384.42L1089 339.15L1026.18 357.42L1010.59 420.96L1057.82 466.23Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M1057.82 466.23L1120.64 447.96L1136.23 384.42L1089 339.15L1026.18 357.42L1010.59 420.96L1057.82 466.23Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M986.861 222.23L1049.68 203.96L1065.27 140.42L1018.04 95.1602L955.221 113.43L939.631 176.96L986.861 222.23Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M986.861 222.23L1049.68 203.96L1065.27 140.42L1018.04 95.1602L955.221 113.43L939.631 176.96L986.861 222.23Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M934.81 436.34L997.62 418.07L1013.21 354.53L965.98 309.27L903.16 327.54L887.58 391.07L934.81 436.34Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M934.81 436.34L997.62 418.07L1013.21 354.53L965.98 309.27L903.16 327.54L887.58 391.07L934.81 436.34Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M1145.31 375.12L1208.13 356.85L1223.72 293.31L1176.49 248.05L1113.67 266.32L1098.08 329.85L1145.31 375.12Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M1145.31 375.12L1208.13 356.85L1223.72 293.31L1176.49 248.05L1113.67 266.32L1098.08 329.85L1145.31 375.12Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M1109.74 252.8L1172.56 234.53L1188.15 171L1140.92 125.73L1078.1 144L1062.51 207.54L1109.74 252.8Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M1109.74 252.8L1172.56 234.53L1188.15 171L1140.92 125.73L1078.1 144L1062.51 207.54L1109.74 252.8Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
<path d="M1073.76 129.07L1136.57 110.8L1152.16 47.27L1104.93 2L1042.11 20.27L1026.53 83.8L1073.76 129.07Z" stroke="#FFE0BD" stroke-width="2" stroke-miterlimit="10"/>
<path d="M1073.76 129.07L1136.57 110.8L1152.16 47.27L1104.93 2L1042.11 20.27L1026.53 83.8L1073.76 129.07Z" stroke="#FE941C" stroke-width="2" stroke-miterlimit="10"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Answer_on_Questions;