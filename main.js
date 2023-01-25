var score=0;
var timer=0;
var tcheck="";
function clearCanvas(){
    background("white");
}

function setup() {
    canvas=createCanvas(500, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}

function preload() {
    classifier=ml5.imageClassifier('DoodleNet');
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function draw(){
strokeWeight(5);
stroke(0);
if (mouseIsPressed){
line(pmouseX, pmouseY, mouseX, mouseY);
}
timer=timer+1;
    document.getElementById("timer").innerHTML='Timer: ' + timer;
    if(timer>500){
        timer=0;
        tcheck="completed";
    }
    if(tcheck=="completed"){
        clearCanvas();
        tcheck="";
    }
}

function gotResult(error, results) {
    if (error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML='label:'+results[0].label;
    c=Math.round(results[0].confidence*100);
    document.getElementById('confidence').innerHTML='confidence:'+c+'%';
    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
    if(c>=50){
        score=score+1;
        document.getElementById("score").innerHTML='Score: ' + score;
    }
    
}