import axios from "axios";
import {registration} from "./registr_process"

const hive_api = "https://63b84c216f4d5660c6d2bbc6.mockapi.io/hive/users";

function postApi(userEmail, userName, userPassword) {
    axios.post(hive_api, {
        email : registration(userEmail.value),
        nickname: userName.value,
        password: userPassword.value
      })
      console.log(registration(userEmail.value));
      
}

postApi();