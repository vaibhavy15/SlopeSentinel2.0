function setTab(btn,role){

    document.querySelectorAll(".tab-btn").forEach(b=>{
        b.classList.remove("active")
    })

    btn.classList.add("active")

}