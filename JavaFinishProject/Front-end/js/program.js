$(function() {

    if (!isLogin()) {
        // redirect to login page
        window.location.replace("http://127.0.0.1:5500/html/login/loginform.html");
        return;
    }

    $(".header").load("./common/header.html", function() {
        document.getElementById("header-fullname").innerHTML = storage.getItem("FULL_NAME");
    });
    $(".sidebar").load("./common/sidebar.html", function() {
        document.getElementById("sidebar-lastname").innerHTML = 'Hello ' + (storage.getItem("LAST_NAME").length > 3 ? storage.getItem("LAST_NAME").substring(0, 2) + "..." : storage.getItem("LAST_NAME")) + "!";
    });
    $(".main").load("./home/homePage.html", function() {
        document.getElementById("line-2").innerHTML = 'HELLO ' + storage.getItem("LAST_NAME").toUpperCase() + "!";
    });
    $(".footer").load("./common/footer.html");
});

function isLogin() {
    if (storage.getItem("ID")) {
        return true;
    }
    return false;
}

function logout() {
    storage.removeItem("ID");
    storage.removeItem("FULL_NAME");
    storage.removeItem("FIRST_NAME");
    storage.removeItem("LAST_NAME");
    storage.removeItem("ROLE");
    storage.removeItem("USERNAME");
    storage.removeItem("PASSWORD");

    // redirect to login page
    window.location.replace("http://127.0.0.1:5500/html/login/loginform.html");

}

function showSuccessSnackBar(snackbarMessage) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerHTML = snackbarMessage;

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
}