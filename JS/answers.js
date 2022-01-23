
var script = document.createElement("script")
script.src = "https://code.jquery.com/jquery-3.5.1.js"
script.type = "text/javascript"
document.getElementsByTagName("head")[0].appendChild(script)
var num = 0
var percent = 0
function trol() {
    document.getElementById("helo").innerText = (Math.round((parseFloat(document.getElementById("helo").innerText)+0.01)*1000)/1000)
    if(parseFloat(document.getElementById("helo").innerText) > 4) {
        document.getElementById("helo").style.color = "red"
    }
}
var count = setInterval(trol, 10)
let fg = () => clearInterval(count)

function lol() {
    $.post('/answers/realdata', null, function(data, status, xhr) {
        fg()
        num += parseFloat(document.getElementById("helo").innerText)
        var answer;
        for(let i = 0; i < data.Questions.length; i++) {
            if(document.getElementById("sure").textContent == data.Questions[i].Question) {
                answer = data.Questions[i].Answer
                break;
            }
        }

    if(answer.toLowerCase() != document.getElementById("jk").value.trim().toLowerCase()) {
        document.getElementById("alr").innerText = `Incorrect! The answer was ${answer}`
    } else {
        document.getElementById("alr").innerText = `Correct! The answer was indeed ${answer}`
        document.getElementById("wtf").textContent = parseInt(document.getElementById("wtf").textContent)+1
        document.getElementById("nah").textContent = `(${(parseInt(document.getElementById("wtf").textContent)/data.Questions.length)*100}%)`
        percent = (parseInt(document.getElementById("wtf").textContent)/data.Questions.length)*100
    }
        if(data.Questions[data.Questions.length-1].Question == document.getElementById("sure").innerText) {
            document.getElementById("noob").style.display = "none"
            document.getElementById("hpsk").style.display = "none"
            if(parseFloat(percent) < 70) {
            document.getElementById("nah").style.color = "red"
            } 
            const p = document.createElement("p")
            const but = document.createElement("button")
            but.textContent = "Retry"
            but.setAttribute("onclick", "window.location.reload()")
            p.textContent = `You finished this quiz in ${num} seconds`
            if(num > 12) {
                p.style.color = "red"
                p.textContent += " (terrible)"
            }
            fg()
            document.getElementById("fr").appendChild(p)
            document.getElementById("fr").appendChild(but)
            return
        }
    const button = document.getElementById("hpsk")
    document.getElementById("hpsk").style.display = "block"
    button.textContent = "Next"
    button.setAttribute("onclick", "xd()")
    button.setAttribute("id", "hpsk")
    document.getElementById("noob").style.display = "none"
}, 'json')
}

function xd() {
    $.post('/answers/realdata', null, function(data, status, xhr) {
        for(let i = 0; i < data.Questions.length; i++) {
            if(data.Questions[i].Question == document.getElementById("sure").innerText) {
                document.getElementById("sure").innerText = data.Questions[i+1].Question
                break;
            }
        }
        document.getElementById("alr").innerText = ""
        document.getElementById("jk").value = ""
        document.getElementById("noob").style.display = "block"
        document.getElementById("hpsk").style.display = "none"
        document.getElementById("helo").style.color = "white"
        document.getElementById("helo").innerText = 0
        count = setInterval(trol, 10)
    }, 'json')
}