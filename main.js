objects = [];
status = "";

function preload()
{
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}


function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Identificando objetos!";
    document.getElementById("input").innerHTML = value[i];

}

function modelLoaded()
{
    console.log("modelLoaded");
    status = true;
    objectDetector.detect(video, gotResult);
    
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
    objectDetector.detect(gotResult);
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(objects[i].label == objectName)
    {
        objectDetector.detect(gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = objectName + "Status: Objeto encontrado!";
            document.getElementById("numberOfObjects").innerHTML = "Número de objetos: " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            SpeechSynthesisUtterance("Objeto encontrado").speak;

        }
    }

    else
    {
    document.getElementById("status").innerHTML = objectName + "Status: Objeto  não encontrado!";
 
    }
}