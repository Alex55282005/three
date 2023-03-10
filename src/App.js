import './App.css';
import { BrowserRouter, Link, Route,Navigate, Routes } from "react-router-dom";
import Main from "./components/main";
import Login from "./pages/login";
import Registr from "./pages/register";
import Return_Password from "./pages/return_password";
import First_screen from "./start_pages/first";
import Second_screen from "./start_pages/second";
import Third_screen from "./start_pages/third";
import Fourth_screen from "./start_pages/fourth";
import Main_Screen from "./pages/mainScreen";
import Create_Question from './plugins/create_question'
import Answer_on_Questions from './plugins/answer_onQuestions';
import Cabinet from './plugins/cabinet';
import Help from './statements/help';
import ProfileSettings from "./plugins/profile_settings"
import ChangeEmail from "./plugins/changeEmail"
import ChangePassword from "./plugins/changePassword"
import ChangeName from "./plugins/changeName"
import FirstStartQuest from "./start_questions/first_question"
import SecondStartQuest from "./start_questions/second_question"
import ThirdStartQuest from "./start_questions/third_question"
import CreatedQuestion from "./plugins/createdQuestion"

function unloadPage() {
  return <Navigate to="/first_start_screen"/>
}


window.onbeforeunload = unloadPage;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path='login' element={<Login />}/>
        <Route path='registr' element={< Registr />}/>
        <Route path='return_password' element={< Return_Password />}/>
        <Route path='first_start_screen' element={< First_screen />}/>
        <Route path='second_start_screen' element={< Second_screen />}/>
        <Route path='third_start_screen' element={< Third_screen />}/>
        <Route path='fourth_start_screen' element={< Fourth_screen />}/>
        <Route path='main_screen' element={< Main_Screen />}/>
        <Route path='answer_on_quest' element={< Answer_on_Questions />}/>
        <Route path='create_quest' element={< Create_Question />}/>
        <Route path='cabinet' element={< Cabinet />}/>
        <Route path='help' element={< Help />}/>
        <Route path='profile' element={< ProfileSettings />}/>
        <Route path='change_email' element={< ChangeEmail />}/>
        <Route path='change_password' element={< ChangePassword />}/>
        <Route path='change_name' element={< ChangeName />}/>
        <Route path='start_question_1' element={< FirstStartQuest />}/>
        <Route path='start_question_2' element={< SecondStartQuest />}/>
        <Route path='start_question_3' element={< ThirdStartQuest />}/>
        <Route path='created_question' element={< CreatedQuestion />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
