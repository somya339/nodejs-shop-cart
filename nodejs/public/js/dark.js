if (localStorage.getItem("toggle")) {
    if (localStorage.getItem("toggle") == 1) {
        document.querySelector("#check").checked = true;
    } else if (localStorage.getItem("toggle") == 0) {
        document.querySelector("#check").checked = false;
    }
}
if (document.querySelector("#check").checked == true) {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../css/dark.css";
    link.type = "text/css";
    let new_link = document.createElement("link");
    new_link.rel = "stylesheet";
    new_link.href = "../css/dark_product.css";
    new_link.type = "text/css";
    let form_link = document.createElement("link");
    new_link.rel = "stylesheet";
    new_link.href = "../css/dark_form.css";
    new_link.type = "text/css";
    document.getElementsByTagName("head")[0].replaceChild(link, document.getElementsByTagName("link")[0]);
    document.getElementsByTagName("head")[0].replaceChild(new_link, document.getElementsByTagName("link")[1]);
    document.getElementsByTagName("head")[0].replaceChild(form_link, document.getElementsByTagName("link")[2]);
    localStorage.setItem("toggle", "1");
} else {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../css/main.css";
    link.type = "text/css";
    let new_link = document.createElement("link");
    new_link.rel = "stylesheet";
    new_link.href = "../css/product.css";
    new_link.type = "text/css";
    let form_link = document.createElement("link");
    new_link.rel = "stylesheet";
    new_link.href = "../css/product.css";
    new_link.type = "text/css";
    document.getElementsByTagName("head")[0].replaceChild(link, document.getElementsByTagName("link")[0]);
    document.getElementsByTagName("head")[0].replaceChild(new_link, document.getElementsByTagName("link")[1]);
    document.getElementsByTagName("head")[0].replaceChild(new_link, document.getElementsByTagName("link")[2]);
    localStorage.setItem("toggle", "0");
}
document.querySelector("#check").addEventListener("click", e => {
    if (document.querySelector("#check").checked == true) {
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "../css/dark.css";
        link.type = "text/css";
        let new_link = document.createElement("link");
        new_link.rel = "stylesheet";
        new_link.href = "../css/dark_product.css";
        new_link.type = "text/css";
        document.getElementsByTagName("head")[0].replaceChild(link, document.getElementsByTagName("link")[0]);
        document.getElementsByTagName("head")[0].replaceChild(new_link, document.getElementsByTagName("link")[1]);
        localStorage.setItem("toggle", "1");
    } else {
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "../css/main.css";
        link.type = "text/css";
        let new_link = document.createElement("link");
        new_link.rel = "stylesheet";
        new_link.href = "../css/product.css";
        new_link.type = "text/css";
        document.getElementsByTagName("head")[0].replaceChild(link, document.getElementsByTagName("link")[0]);
        document.getElementsByTagName("head")[0].replaceChild(new_link, document.getElementsByTagName("link")[1]);
        localStorage.setItem("toggle", "0");
    }
    // count++;
});