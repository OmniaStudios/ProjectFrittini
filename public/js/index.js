function changeColorNavbar(){
    document.getElementById("navContainer").style.transition = "all 0.5s";
    let colorBefore = document.getElementById("navContainer").style.background
    if(colorBefore == ''){
        colorBefore = "rgb(245, 245, 245)" 
    }
    const colorAfter = "rgb(21, 21, 30)"
    const colorDefault = "rgb(245, 245, 245)" 
    console.log(colorBefore)
    if(colorDefault != colorBefore)
    {
        document.getElementById("navContainer").style.background= colorDefault
        document.getElementsByClassName("navbar-nav").style.background = colorDefault
    }else{
        document.getElementById("navContainer").style.background= colorAfter
        document.getElementsByClassName("navbar-nav").style.background = colorDefault
    }
}