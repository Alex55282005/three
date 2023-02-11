import "../styles/switchThemeBtn.css" ;
import axios from "axios";

export default function SwitchThemeBtn() {
    return (
        <input type="checkbox" name="" id="switch" onClick={switchBack}/>
    );
}


const html = document.querySelector("#root");
function switchBack() {
    const user = sessionStorage.getItem("userId");
    if (html.className !== "darkTheme") {
        html.className = "darkTheme";
        sessionStorage.removeItem("userTheme");
        sessionStorage.setItem("userTheme", "dark");
        axios.put("https://63e3df33c919fe386c110a58.mockapi.io/users/" + user, {"theme" : "dark"}).then((response) => {
        }).catch();

    }else if (html.className == "darkTheme") {
        html.className = "ligthTheme";
        sessionStorage.removeItem("userTheme");
        sessionStorage.setItem("userTheme", "ligthTheme");
        axios.put("https://63e3df33c919fe386c110a58.mockapi.io/users/" + user, {"theme" : "white"}).then((response) => {
        }).catch();
    }
    
}