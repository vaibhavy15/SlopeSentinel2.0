function showAuth(){
    document.getElementById("landing").style.display="none";
    document.getElementById("auth").style.display="flex";
}

function showDashboard(){
    document.getElementById("auth").style.display="none";
    document.getElementById("dashboard").style.display="block";
}

function showLanding(){
    document.getElementById("dashboard").style.display="none";
    document.getElementById("landing").style.display="block";
}

function switchPage(page,nav){
    document.querySelectorAll(".page").forEach(p=>{
        p.classList.remove("active")
    })

    document.querySelectorAll(".nav-item").forEach(n=>{
        n.classList.remove("active")
    })

    document.getElementById("page-"+page).classList.add("active")

    if(nav){
        nav.classList.add("active")
    }
}