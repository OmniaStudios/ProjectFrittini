let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


function changeColorNavbar() {
    document.getElementById("navContainer").style.transition = "all 0.5s";
    let colorBefore = document.getElementById("navContainer").style.background
    if (colorBefore == '') {
        colorBefore = "rgb(251, 252, 252)"
    }
    const colorAfter = "rgb(234, 236, 238)"
    const colorDefault = "rgb(251, 252, 252)"
    console.log(colorBefore)
    if (colorDefault != colorBefore) {
        document.getElementById("navContainer").style.background = colorDefault
    } else {
        document.getElementById("navContainer").style.background = colorAfter
    }
}

window.addEventListener('load', (event) => {
    let status = "Chiusi";
    let color = "red";
    let orario = new Date();
    let hours = orario.getHours();
    let minutes = orario.getMinutes();
    let day = orario.getDay();

    console.log(hours + "" + minutes)
    // gestione giorni normali
    if (hours >= 10 && hours < 15 && day != 6) {
        status = "Aperti";
        color = "Green";
        if (hours == 15 && minutes > 30) {
            status = "Chiusi";
            color = "Red";
        }
    }

    if (hours >= 17 && hours < 21 && day != 6) {
        status = "Aperti";
        color = "Green";
    }

    if (hours >= 10 && hours < 21 && day == 6) {
        status = "Aperti";
        color = "Green";
    }

    document.getElementById("status").style.color = color;
    document.getElementById("status").innerText = "Siamo " + status;


});

