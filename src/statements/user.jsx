export default  function User(response){

    const userEmail = response.email;
    const userName = response.name;
    const userPassword = response.password;
    const userId = response.id;
    const userTheme = response.theme;


    sessionStorage.setItem('userEmail', userEmail);
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('userPassword', userPassword);
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('userTheme', userTheme);
    


}