var mainlink;
mainlink=location.href;
console.log(mainlink);
function pageRedirect() {
    console.log(mainlink);

    var n=mainlink.search("indexOne")
    console.log("afterReplace");
    var final=mainlink.replace("indexOne","index");
    console.log(final);
    window.location.replace(final);
};
