function viewHomepage() {
    $(".main").load("./home/homePage.html", function() {
        document.getElementById("line-2").innerHTML = 'HELLO ' + storage.getItem("LAST_NAME").toUpperCase() + "!";
    });
}