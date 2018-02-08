/*	Vector Class
 *	@desc 	creates a vector object which you can use to help create and manipulate arrows in create.js
 *			in order to add and see vector on the stage you must add vector.container to the stage
 *
 *	@param int $x1 - x1
 *	@param int $y1 - x1
 *	@param int $x2 - x2
 *	@param int $y2 - y2
 *	@param string $color - color of arrow
 */

function vector(x1,y1,x2,y2,color){
	this.x1 = x1;
	this.y1 = y1;
	this.vx;
	this.vy;
	
	this.type = "vector";
	this.color = color;
	this.lineWidth = 4;
	this.container;
	this.label;
	
	this.init = function(x1,y1,x2,y2){
        this.vx = x2 - x1;
        this.vy = y2 - y1;
        
        this.drawVector(this.x1, this.y1, this.x1 + this.vx, this.y1 + this.vy);
    }
    
    
    /*	Init Function
	 *	@desc 	creates and initializes the display object which you can add to the stage
	 *			if no parameters are passed in the object will be drawn with the set parameters
	 *	@param int $x1 - x1
	 *	@param int $y1 - x1
	 *	@param int $x2 - x2
	 *	@param int $y2 - y2
	 */
    this.drawVector = function(x1,y1,x2,y2){
	    
	    if( typeof this.container == "undefined" )
	    	this.container = new createjs.Container();
	    	
	    this.container.removeAllChildren();
	    
		var line = new createjs.Shape();
		var tri = new createjs.Shape();
		
		this.x1 = x1;
		this.y1 = y1; 
		this.vx = x2 - x1;
		this.vy = y2 - y1;
		
		var a;
		var b;
		var c;
		var radius = 10;
		var rangle = Math.atan2(this.vy, this.vx);
		var dangle = Math.degrees( rangle );
		
		c = Math.sqrt( Math.pow(this.vx,2) + Math.pow(this.vy,2) ); // C = sqrt( A^2 + B ^2 ) pythagorean			
		c = c - radius;	// cut radius off of hypotonuse to make room for triangle
		
		a = c * Math.cos(rangle);
		b = c * Math.sin(rangle);
		
		line.graphics.beginStroke(this.color).setStrokeStyle(this.lineWidth).moveTo(0,0).lineTo(a, b);
		tri.graphics.beginFill(this.color).drawPolyStar(a, b, radius, 3, 0.5, dangle);  // x, y, radius, points, pointSize, angle

		
		this.container.x = this.x1;
		this.container.y = this.y1;
		
		if (typeof this.label !== 'undefined')	// updates the label if it exists
			this.updateLabel();
			
		this.container.addChild(tri, line, this.label);
    }
    
    /*	Add Label Function
	 *	@desc 	creates and initializes a label. Automatically adds it to the container
	 *
	 *	@param string $txt - label title 
	 */
    this.addLabel = function(txt){
	    this.label = new createjs.Text(txt, "18px Arial", "#ffffff");
	    this.label.textAlign = "center";
		this.label.shadow = new createjs.Shadow("#000000", 1, 1, 1);
		this.label.x = this.vx / 2;
		this.label.y = this.vy / 2;
		
		this.container.addChild(this.label);
    }
    
    /*	Update Label Function
	 *	@desc 	helper funtion to update the position of the label
	 */
    this.updateLabel = function(){
		this.label.x = this.vx / 2;
		this.label.y = this.vy / 2;
    }
    
    /*	Move To Function
	 *	@desc	shift transition, moves entire object but keep vector the same
	 *
	 *	@param string $x - new x
	 *	@param string $y - new y
	 */
    this.moveTo = function(x,y){
		this.container.x = x;
		this.container.y = y;
		this.x1 = x;
		this.y1 = y;
		if (typeof this.label !== 'undefined')
			this.updateLabel();
    }
    
    /*	Draw To Function
	 *	@desc	manipulates vector, the base x,y stays the same but the pointer is manipluated to the passed x/y
	 *
	 *	@param string $x - new pointer x
	 *	@param string $y - new pointer y
	 */
    this.drawTo = function(x,y){
	    this.vx = x - this.x1;
        this.vy = y - this.y1;
		this.container.removeAllChildren();
	    
	    var line = new createjs.Shape();
		var tri = new createjs.Shape();
	    
	    var a;
		var b;
		var c;
		var radius = 10;
		var rangle = Math.atan2(this.vy, this.vx);
		var dangle = Math.degrees( rangle );
		
		c = Math.sqrt( Math.pow(this.vx,2) + Math.pow(this.vy,2) ); // C = sqrt( A^2 + B ^2 ) pythagorean			
		c = c - radius;	// cut radius off of hypotonuse to make room for triangle
		
		a = c * Math.cos(rangle);
		b = c * Math.sin(rangle);
	    
		line.graphics.beginStroke(this.color).setStrokeStyle(this.lineWidth).moveTo(0,0).lineTo(a, b);
		tri.graphics.beginFill(this.color).drawPolyStar(a, b, radius, 3, 0.5, dangle);  // x, y, radius, points, pointSize, angle
		
		if (typeof this.label !== 'undefined')
			this.updateLabel();
			
		this.container.addChild(line, tri, this.label);
		
    }
	
	this.init(x1,y1,x2,y2);
}