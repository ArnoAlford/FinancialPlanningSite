function toggle401kON() {
    var y = document.getElementById("when401kDIV");
    if (y.style.display === "none") {
    	y.className += ' fade show';
        y.style.display = "block";
    } else {
        y.style.display = "none";
    }
}

function toggle401kOFF() {
    var y = document.getElementById("when401kDIV");
    y.style.display = "none";
}

function toggleIRAON() {
    var z = document.getElementById("whenIRADIV");
    if (z.style.display === "none") {
    	z.className += ' fade show';
        z.style.display = "block";
    } else {
        z.style.display = "none";
    }
}

function toggleIRAOFF() {
    var z = document.getElementById("whenIRADIV");
    z.style.display = "none";
}

function toggleResultsDiv() {
    var a = document.getElementById("mainDiv");
    var c = document.getElementById("resultsDiv");
    c.style.display = "none";
    a.style.display = "block";
    a.className = "animated--fade-in";
}

function chooseRolloverON() {
    var y = document.getElementById("rollIRAor401k");
    if (y.style.display === "none") {
    	y.className += ' fade show';
        y.style.display = "block";
    } else {
        y.style.display = "none";
    }
}

function chooseRolloverOFF() {
    var y = document.getElementById("rollIRAor401k");
    y.style.display = "none";
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
