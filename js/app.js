/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
var sections_length = document.getElementsByTagName("section").length
var sections = []
var links = document.getElementsByClassName("menu__link");
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function fillSections(){
    for(let i=1 ; i<=sections_length; i++){
        var section = document.getElementById("section"+i)
        sections.push(section);
    }
}
function initializeEventListeners(){
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function() {
            goTo(i);
        });
    }
}
function getPosition(section) {
    const rect = section.getBoundingClientRect();
    return {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY
    };
}
function makeActive(current) {
    for(let i=0; i<sections.length;i++){
        if(sections[i]==current){
            links[i].classList.add("active")
        }
        else{
            links[i].classList.remove("active")
        }
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    var nav_bar = document.getElementById("navbar__list")
    for(let i=1 ; i<=sections_length; i++){
        var list_item = document.createElement("li")
        var link = document.createElement("a")
        list_item.innerHTML = "Section "+i
        link.appendChild(list_item)
        list_item.classList.add("menu__link")
        nav_bar.appendChild(link)
    }
}
// Add class 'active' to section when near top of viewport
document.addEventListener("scroll", ()=>{
    let current = ''

    sections.forEach((section)=>{
        const sectionTop =  section.offsetTop;
        const sectionHeight =  section.clientHeight;
        if(pageYOffset > sectionTop){
            current = section
        }
    })

    
    makeActive(current)
    
})
// Scroll to anchor ID using scrollTO event
function goTo(i){
    var {x,y} = getPosition(sections[i])
    for(let j = 0; j<links.length; j++){
        if(j==i){
            links[j].classList.add("active")
        }
        else{
            links[j].classList.remove("active")
        }
    }
    scrollTo(x,y)
    
    //ORR
    // sections[i].scrollIntoView()
}

/**
 * End Main Functions
 * Begin Events
 * 
*/
fillSections()
// Build menu 
buildNav()
// Scroll to section on link click
initializeEventListeners()
// Set sections as active


