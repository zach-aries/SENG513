function toggleNavMenu(menuID) {
    var el = document.getElementById(menuID);
    toggleClassName(el, "closed");
}

function toggleClassName(el, className){
    if( !hasClass(el, className) )
        el.className += " " + className;
    else
        el.classList.remove(className);
}

window.addEventListener('scroll', function(){
    var scrollY = window.scrollY;
    var nav = document.getElementById("nav-top");

    if(scrollY > 60){
        if(!hasClass(nav,"min")){
            nav.className += " min";
        }
    } else {
        if(hasClass(nav,"min")){
            nav.classList.remove("min")
        }
    }

    console.log(scrollY);
});

/* Has Class Function
 * @desc checks to see if element has specific class
 *
 * @param obj $element - element to check
 * @param string $cls - class to check
 */
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}