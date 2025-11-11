//add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink(){
    list.forEach((item)=>{
        item.classList.remove("hovered");
    });
    this.classList.add("hovered");
}

list.forEach(item => item.addEventListener("mouseover",activeLink));

// NOTE: Sidebar toggle logic moved to /static/js/dashboard.js to centralize
// toggle, persistence and accessibility handling.
