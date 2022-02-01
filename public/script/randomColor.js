$(document).ready(() => {
    $(".blank").css("background-color", "hsla(" + Math.floor(Math.random() * (360)) + ", 75%, 58%, 1)");
    window.localStorage.clear();
});