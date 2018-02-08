var STAGE_HEIGHT = 500;
var STAGE_WIDTH = 750;

var stage;
var stageMidY;

var time = 0;
var period = 1000;

var wave1;
var wave2;
var wave3;

var waveContainer = new createjs.Container();

var sameDir = false;

var axisContainer = new createjs.Container();
var gridContainer = new createjs.Container();
var graph = new createjs.Container();
var showGraph = true;

/*var k = 80;     // Spring Constant ( N/m )
var A = 200;    // Amplitude
var p;          // phase constant
var period = 8000;*/

function Wave(A, f, p) {
    this.A = A;
    this.f = f;
    this.p = p;
}


/*	Init Function
 *	@desc creates the ui and sets up the stage, and image queue	
 */
function init() {
	initUI(); // added to inizialize ui
	stage = new createjs.Stage("mainCanvas");
    stageMidY = (STAGE_HEIGHT) / 2 - 15;

    drawAxis();
    drawGraph();

	initWaves();
    updateHTML();

    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setInterval(25);
    createjs.Ticker.setFPS(40);
    createjs.Ticker.setPaused(true);

	stage.update();
}

function initWaves() {
    var line = new createjs.Shape();
    line.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,0.75)");
    line.graphics.moveTo(0, stageMidY);
    line.graphics.lineTo(STAGE_WIDTH, stageMidY);

    wave1 = new Wave(100, 5, Math.PI);
    wave2 = new Wave(100, 5, Math.PI);
    wave3 = new Wave(0, 5, Math.PI);
    stage.addChild(wave1.container);

    drawWaves();

    waveContainer.y = stageMidY;
    stage.addChild(line, waveContainer);
    stage.update();
}

function drawWaves() {
    waveContainer.removeAllChildren();

    var x,y,p,t,line,cr,d;

    var x1,y1,l1;
    var x2,y2,l2;
    var x3,y3,l3;

    p = Math.PI * 4;
    cr = STAGE_WIDTH / p;  // y multiplier to meet end x
    t = convertTimeToRadians();
    if(sameDir)
        d = 1;
    else
        d = -1;

    x = 0;
    y1 = 0;
    y2 = 0;
    y3 = 0;

    l1 = new createjs.Shape();
    l1.graphics.setStrokeStyle(2).beginStroke("rgba(255,105,97,0.95)");
    l1.graphics.moveTo(0, 0);

    l2 = new createjs.Shape();
    l2.graphics.setStrokeStyle(2).beginStroke("rgba(97,168,255,0.95");
    l2.graphics.moveTo(0, 0);

    l3 = new createjs.Shape();
    l3.graphics.setStrokeStyle(2).beginStroke("purple");
    l3.graphics.moveTo(0, 0);

    while ( x < p ){

        y1 = ( wave1.A ) * Math.sin( wave1.f * x + t);
        y2 = ( wave2.A ) * Math.cos( wave2.f * x + ( t * d ));
        y3 = y1 + y2;

        l1.graphics.lineTo(x * cr, y1);
        l2.graphics.lineTo(x * cr, y2);
        l3.graphics.lineTo(x * cr, y3);

        y3 += y1;

        x += p / 720;
    }

    l1.graphics.endStroke();
    l2.graphics.endStroke();
    l3.graphics.endStroke();

    waveContainer.addChild(l1, l2, l3);
}

function updateAll() {
    drawWaves();
    updateHTML();
}

function step() {
    time += 10;
    updateAll();
}

function tick(event) {
    if (!createjs.Ticker.getPaused()) {
        time += 10;

       updateAll();
    }

    stage.update(event); // important!!
}

// angular frequency w, is given in radians per second
function calcAngularFrequency() {
    return (2 * Math.PI) / period;
}

function convertTimeToRadians() {
    return time * calcAngularFrequency();
}

function calcPeriod() {
    var pi = Math.PI;

    return 2 * pi * Math.sqrt( object.mass / k );
}

function showGrid(on){
    if(on){
        graph.visible = true;
    }else{
        graph.visible = false;
    }
}

function updateHTML() {
    document.getElementById("time").innerHTML = (time / 1000).toFixed(2);
    document.getElementById("rads").innerHTML = convertTimeToRadians().toFixed(2);

    document.getElementById("a1").innerHTML = (wave1.A / 100);
    document.getElementById("f1").innerHTML = wave1.f;

    document.getElementById("a2").innerHTML = (wave2.A / 100);
    document.getElementById("f2").innerHTML = wave2.f;
}


function range_handleUpdate(id, val) {
    if (id === "range-1") { // velocity
        time = 0;
        period = parseInt(val) * 1000;
    }
    if (id === "range-2") { // freq 1
        time = 0;
        wave1.f = parseInt(val);
    }

    if(id === "range-3"){ // freq 2
        time = 0;
        wave2.f = parseInt(val);
    }

    drawWaves();
    updateHTML();
}

/*	Switch Handler (UI)
 *	@desc used to handle the switches created in the main.html file. Each switch element is give a unique id "switch-'#'"
 *
 *	@param string $id - the id of the clicked html element
 *	@param boolean $on - whether the switch is on (true) or off (false)
 */
function switch_handleClick(id, on){
    //console.log("id: " + id + ", on: " + on);
    if(id == "switch-1")
        showGrid(on);
}


function reset() {
    createjs.Ticker.setPaused(true);
    time = 0;
    updateAll();

    document.getElementById("img-play").src = "img/play.png";

    pr = document.getElementById("range-1");
    fr1 = document.getElementById("range-2");
    fr2 = document.getElementById("range-3");

    handleRange(pr, 2);
    handleRange(fr1, 5);
    handleRange(fr2, 5);
}

function rewind() {
    createjs.Ticker.setPaused(true);
    time = 0;
    updateAll();

    document.getElementById("img-play").src = "img/play.png";
}

function play(){
    if(createjs.Ticker.getPaused()){
        createjs.Ticker.setPaused(false);
        document.getElementById("img-play").src = "img/pause.png";
    }else{
        createjs.Ticker.setPaused(true);
        document.getElementById("img-play").src = "img/play.png";
    }
}

function toggleDir(el) {
    if(sameDir){
        sameDir = false;
    }else{
        sameDir = true;
    }
    toggleActiveClass(el);
}

function toggleInfo(el){

    el_data = document.getElementById("data");
    var className = el_data.className;
    if(className.includes("hidden")){
        className = className.replace(" hidden", "");
    }else{
        className += " hidden";
    }

    el_data.className = className;
    toggleActiveClass(el);

}

function toggleActiveClass(el){
    if( !hasClass(el, "active") )
        el.className += " active";
    else
        el.classList.remove("active");
}

function drawGraph(){

    var centreX, centreY, yStep, xStep, line;

    yStep = 25;
    xStep = (STAGE_WIDTH / 2) / 8;
    centreY = stageMidY;
    centreX = STAGE_WIDTH / 2;

    gridContainer.alpha = 0.15;

    line = new createjs.Shape();
    line.graphics.setStrokeStyle(2).beginStroke("black");

    for(var i = 0; i < (STAGE_HEIGHT / 2); i += yStep){

        line.graphics.moveTo(0, centreY - i);
        line.graphics.lineTo(STAGE_WIDTH, centreY - i);

        line.graphics.moveTo(0, centreY + i);
        line.graphics.lineTo(STAGE_WIDTH, centreY+ i);

    }

    for(var i = 0; i < (STAGE_WIDTH / 2); i += xStep){

        line.graphics.moveTo(centreX - i, 0);
        line.graphics.lineTo(centreX - i, STAGE_HEIGHT);

        line.graphics.moveTo(centreX + i, 0);
        line.graphics.lineTo(centreX + i, STAGE_HEIGHT);

    }


    line.graphics.endStroke();
    gridContainer.addChild(line);
    graph.addChild(gridContainer);
    stage.addChild(graph);
    stage.update();
}

function drawAxis(){
    var xCentre, yCentre, yStep, xStep;

    yStep = 25;
    xStep = (STAGE_WIDTH / 2) / 8;

    xCentre = STAGE_WIDTH/2;
    yCentre = stageMidY;


    var x = new createjs.Shape();
    x.graphics.beginStroke("black").setStrokeStyle(2).moveTo(0,yCentre).lineTo(STAGE_WIDTH,yCentre);

    var xLines = new createjs.Shape();
    xLines.graphics.beginStroke("black").setStrokeStyle(1);

    var y = new createjs.Shape();
    y.graphics.beginStroke("black").setStrokeStyle(2).moveTo(xCentre,0).lineTo(xCentre,STAGE_HEIGHT);

    var yLines = new createjs.Shape();
    yLines.graphics.beginStroke("black").setStrokeStyle(1);

    var xStart = 1/8;
    for (var i=xStep; i < ( STAGE_WIDTH / 2); i+= xStep) {
        var label = new createjs.Text(fractionConverter(xStart) + "\u03C0", "10px Arial");

        label.x = (xCentre + i) + 13;
        label.y = yCentre - 13;
        label.textBaseline = "top";
        label.textAlign = "center";

        var label2 = new createjs.Text("-" + fractionConverter(xStart) + "\u03C0", "10px Arial");

        label2.x = (xCentre - i) + 13;
        label2.y = yCentre - 13;
        label2.textBaseline = "top";
        label2.textAlign = "center";

        xStart += 1/8;

        yLines.graphics.moveTo(xCentre - i,yCentre - 4);
        yLines.graphics.lineTo(xCentre - i,yCentre - 4);

        yLines.graphics.moveTo(xCentre + i,yCentre - 4);
        yLines.graphics.lineTo(xCentre + i,yCentre - 4);

        axisContainer.addChild(label,label2);
    }


    var yStart = 0;
    for (var i=0; i < ( STAGE_HEIGHT / 2); i+= yStep) {
        var label = new createjs.Text(yStart, "10px Arial");

        label.x = xCentre + 13;
        label.y = (yCentre - i) - 13;
        label.textBaseline = "top";
        label.textAlign = "center";

        var label2 = new createjs.Text(yStart, "10px Arial");

        label2.x = xCentre + 13;
        label2.y = (yCentre + i) - 13;
        label2.textBaseline = "top";
        label2.textAlign = "center";

        yStart += yStep / 100;



        yLines.graphics.moveTo(xCentre - 4, yCentre - i);
        yLines.graphics.lineTo(xCentre + 4, yCentre - i);

        yLines.graphics.moveTo(xCentre - 4, yCentre + i);
        yLines.graphics.lineTo(xCentre + 4, yCentre + i);

        label.scaleY = 1; 		// flips stage along x axis so that as you go up the y increases instead of the opposite effect.
        label.scaleX = 1;

        axisContainer.addChild(label, label2);
    }

    axisContainer.alpha = 0.5;
    axisContainer.addChild(x,y, xLines, yLines);
    graph.addChild(axisContainer);
    stage.update();
}

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

Math.radians = function (degrees) {
	return degrees * ( Math.PI / 180);
}

function fractionConverter(number) {
    var fraction = number - Math.floor(number);
    var precision = Math.pow(10, /\d*$/.exec(new String(number))[0].length);
    var getGreatestCommonDivisor = function(fraction, precision) {
        if (!precision)
            return fraction;
        return getGreatestCommonDivisor(precision, fraction % precision);
    }
    var greatestCommonDivisor = getGreatestCommonDivisor(Math.round(fraction * precision), precision);
    var denominator = precision / getGreatestCommonDivisor(Math.round(fraction * precision), precision);
    var numerator = Math.round(fraction * precision) / greatestCommonDivisor;

    function reduce (numer,denom) {
        for (var i = 2; i >= 9; i++) {
            if ((numer%i===0) && (denom%i)===0) {
                numerator=numer/i;
                denominator=denom/i;
                reduce(numerator,denominator);
            };
        };
    }
    reduce(numerator,denominator);
    return numerator + "/" + denominator;
}
