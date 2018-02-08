// TO DO
// 		turn into library with object

/*----------------------------------
 |				INIT UI
 -----------------------------------*/
function initUI() {

	// get top bar height and add padding to the top of int-wrp so elements cannot go under.
	var topBarHeight = 0;

	if (document.getElementById("top-bar")) { // make sure top bar exists
		topBarHeight = document.getElementById("top-bar").offsetHeight;
	}

	if (topBarHeight > 0) {
		document.getElementById("int-wrp").style.paddingTop = topBarHeight + "px";
	}
}


/*----------------------------------
 |			   MINIMIZE
 -----------------------------------*/
 
/*	Main Function
 *	@desc checks the state of the element to minimize and either expands or contracts it, format as follows:
 
 	<div id="top-bar" class="ui-body" style="padding: 16px 0 0 !important;">
		<div id="minimize" class="close" onclick="minimize('minimize')"></div>
		<div class="row">
			<div class="col-1-2"></div>
			<div class="col-1-2"></div>
		</div>
	</div>
			
 */
function minimize(id){
	var btn = document.getElementById(id);
	var el = document.getElementById(id).parentElement;
	
	if( hasClass(el, "minimized") && hasClass(btn, "open") ){
		el.classList.remove("minimized");
		btn.className = "close";
	}else{
		el.className += " minimized";
		btn.className = "open";
	}
}

/* Has Class Function
 * @desc checks to see if element has specific class
 *
 * @param obj $element - element to check
 * @param string $cls - class to check
 */
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

/*----------------------------------
 |				RANGE
 -----------------------------------*/

// Implement: 
// function range_handleUpdate(id, value)

// id = html range id
// value = current value
// DEFAULTS:
// value = 50
// min = 0
// max = 100
// step = 1

var _rangeTotal = 0;	// keeps track of total switches for id labeling
var _labelTotal = 0;	// keeps track of total labels for id labeling


var i;

// automatically iterate through elements with class "switch" and initiate
var rangeArray = document.getElementsByClassName("range");
for (i = 0; i < rangeArray.length; i++) {
	initRange(rangeArray.item(i));
}

function initRange(p_elem) {
	var val = (p_elem.getAttribute("data-value") ? p_elem.getAttribute("data-value") : 50); 	// get value or set to 50
	var min = (p_elem.getAttribute("data-min") ? p_elem.getAttribute("data-min") : 0);		// get min or set to 0
	var max = (p_elem.getAttribute("data-max") ? p_elem.getAttribute("data-max") : 100);		// get max or set to 100
	var step = (p_elem.getAttribute("data-step") ? p_elem.getAttribute("data-step") : 1);		// get step or set to 1
	var unit = (p_elem.getAttribute("data-unit") ? p_elem.getAttribute("data-unit") : "");	// get display unit
	var label = (p_elem.getAttribute("data-label") ? p_elem.getAttribute("data-unit") : "true");	// get display unit

	_rangeTotal++;	// track range elements

	var trackBg = document.createElement("div"); // create track background
	trackBg.className = "track-bg";	// set attributes
	p_elem.appendChild(trackBg);

	var track = document.createElement("div");	// create track
	track.className = "track";	// set attributes
	track.style.width = ( ((val - min) / (max - min)) * 100 ) + "%"; // set highlight bar width
	trackBg.appendChild(track);

	var input = document.createElement("input");
	input.setAttribute("onchange", "handleRange(this, this.value)");
	input.setAttribute("oninput", "handleRange(this, this.value)");
	input.setAttribute("id", "range-" + _rangeTotal);	// sets the input values
	input.setAttribute("min", min);
	input.setAttribute("max", max);
	input.setAttribute("step", step);
	input.setAttribute("value", val);
	input.setAttribute("type", "range");
	p_elem.appendChild(input);
	
	if(label == "true"){
		var rangeTxt = document.createElement("p");
		rangeTxt.className = "range-text";
		rangeTxt.innerHTML = val + unit;
		p_elem.appendChild(rangeTxt);
	}
}

// handles a change on the slider
function handleRange(p_obj, p_val) {
	var max = p_obj.getAttribute("max");
	var min = p_obj.getAttribute("min");
	var track = p_obj.parentNode.childNodes[0].childNodes[0];
	var id = p_obj.getAttribute("id");
	var unit = (p_obj.parentNode.getAttribute("data-unit") ? p_obj.parentNode.getAttribute("data-unit") : ""); // get display unit

    // update actual range value;
    p_obj.value = p_val;

	if (track.className == "track") {
		track.style.width = ( ((p_val - min) / (max - min)) * 100 ) + "%"; // set highlight bar width
	}

	var label = (p_obj.parentNode.getAttribute("data-label") ? p_obj.parentNode.getAttribute("data-unit") : "true");	// get display unit
	if(label == "true"){
		var rangeTxt = p_obj.parentNode.childNodes[2];
		if (rangeTxt.className == "range-text") {
			rangeTxt.innerHTML = p_val + unit; // print bar value
		}
	}

	range_handleUpdate(id, p_val); // call handle function
}

/*----------------------------------
 |				SWITCH
 -----------------------------------*/

// Implement: 
// function switch_handleClick(id, on)

// id = html button id
// on = boolean ( switch on or off )

var _switchTotal = 0;	// keeps track of total switches for id labeling

// automatically iterate through elements with class "switch" and initiate
var switchArray = document.getElementsByClassName("switch");
for (i = 0; i < switchArray.length; i++) {
	initSwitch(switchArray.item(i), checked = false);
}

// init function
// defaults switch to off
function initSwitch(p_obj) {

	_switchTotal++;
	var checked;

	var id = "switch-" + _switchTotal;
	p_obj.setAttribute("id", id);
	p_obj.setAttribute("onClick", "updateSwitch('" + id + "')");

	checked = (p_obj.className == "switch on");
	p_obj.className = checked ? "switch on" : "switch off";

	var input = document.createElement("input");
	input.setAttribute("class", "switch-input");
	input.setAttribute("type", "checkbox");
	input.setAttribute("value", checked);
	p_obj.appendChild(input);

	var bg = document.createElement("div");
	bg.className = "switch-bg";
	p_obj.appendChild(bg);

	var knob = document.createElement("div");
	knob.className = "switch-knob";

	p_obj.appendChild(knob);

}

// called when switch is clicked in document
function updateSwitch(p_id) {
	var obj = document.getElementById(p_id);
	var knob = obj.getElementsByClassName("switch-knob")[0];
	var bg = obj.getElementsByClassName("switch-bg")[0];

	if (obj.className == "switch off") {
		obj.className = "switch on";
		switch_handleClick(p_id, true);
	} else {
		obj.className = "switch off";
		switch_handleClick(p_id, false);
	}

}
