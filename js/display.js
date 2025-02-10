const buttons = document.querySelectorAll(".select-button")


//select-buttonは一つしか選択出来ない＆選択したら色が変わる
buttons.forEach(button => {
    button.addEventListener("click", function () {
        buttons.forEach(btn => btn.classList.remove("active", "select-button-active"))
        this.classList.add("active")
        this.classList.add("select-button-active")
    })
})



