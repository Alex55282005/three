function setTheme() {
    const html = document.querySelector("#root");
        const theme = sessionStorage.getItem("userTheme");
        if (theme == "white") {
            html.classList = "ligthTheme";
        }else if (theme == "dark") {
            html.classList = "darkTheme";
        }
}

export default setTheme;