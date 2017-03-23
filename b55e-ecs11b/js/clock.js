(function ($, Propeller, window, undefined) {

	this.Clock = function () {

		this.currentAngle = null;
		
		this.minPropeller = null;
		this.minDirection = true;
		this.minAngles = [];
		
		this.hrPropeller = null;
		this.hrDirection = true;
		this.hrAngles = [];
		
		this.spinFirstTime = true;
		this.spinFlag01 = false;
		this.spinFlag02 = false;
		this.spinFlag03 = false;
		this.spinFlag03 = false;
		this.onetime = false;
		this.lastSpinCount = 0;
		this.spinAngles = [];

		this.evt = $.Event('dragStopped');
		//this.evt.state = state;

		var defaults = {
			minSelector: '.minutes-hand',
			minStep: 10,
			minAngle: 0,

			hrSelector: '.hours-hand',
			hrStep: 1,
			hrAngle: 0,

			evaluate: false,
			spins: 0
		}

		if (arguments[0] && typeof arguments[0] === 'object') {
			this.options = extendDefaults(defaults, arguments[0]);
		}

		this.init();
	}

	Clock.prototype.init = function () {
	
		propellerInit(this);
	
	};

	Clock.prototype.resetHands = function () {

        this.hrPropeller.unbind();
        this.minPropeller.unbind();

        this.minPropeller.angle = 10;
        this.hrPropeller.angle = 0;
        this.lastSpinCount = 0;
        this.options.spins = 0;

        this.hrPropeller.bind();
        this.minPropeller.bind();  
	};

	Clock.prototype.getResults = function () {
		return {
			minAngle: this.minPropeller.angle,
			hrAngle: this.hrPropeller.angle,
			spins: this.options.spins
		}	
	};

	Clock.prototype.unbindAll = function () {
       
        this.hrPropeller.unbind();
        this.minPropeller.unbind();
	};
	
	Clock.prototype.bindAll = function () {
       
        this.hrPropeller.bind();
        this.minPropeller.bind();
	};

	function propellerInit(self) {

		var clock = self;
		var options = self.options;

		clock.minPropeller = new Propeller(options.minSelector, {
			angle: options.minAngle,
			step: options.minStep,

			onDragStop: function () {

				if (clock.options.evaluate) {
					$(clock).trigger(clock.evt);
				}

				dragStops(clock);
			},
			onRotate: function () {
				isRotating(clock);
			},
		});

		clock.hrPropeller = new Propeller(options.hrSelector, {
			angle: options.hrAngle,
			step: options.hrStep
		});

		clock.hrPropeller.unbind();

		sethr(clock);

		clock.minAngles.unshift(options.minAngle);
		clock.hrAngles.unshift(options.hrAngle);
	};

	function dragStops(self) {
		
		var clock = self;

	}

	function isRotating(self) {
		
		var clock = self;
		var options = self.options;

		options.spins = spinCount(clock);
		clock.minDirection = getMinDirection(clock);
		clock.hrDirection = getHrDirection(clock);

		//console.log('Minute Direction: ' + clock.minDirection  + ' , Hour Direction: ' + clock.hrDirection +  ' , spinCount: ' + options.spins);

		if ( clock.minDirection && clock.minPropeller.angle < 0 ) {
			
			clock.unbindAll();
			clock.minPropeller.angle = options.minAngle;
			clock.hrPropeller.angle = options.hrAngle;
			clock.bindAll();
		}

		hrRotation(clock);
	}

	function getMinDirection(self) {

		var clock = self;
		var angle = clock.minPropeller.angle;

		if ( Math.abs( angle === 0 || angle === 360 ) && !clock.minDirection ) { angle = 360; }
		if ( Math.abs( angle === 0 || angle === 360 ) && clock.minDirection ) { angle = 0; }
		if ( ( angle === -10 ) ) { angle = 350; }

		clock.minAngles.unshift(angle)

		if ( clock.minAngles.length >= 2 ) {
			
			if (clock.minAngles.length > 2) {
				
				clock.minAngles.pop();
			}

			var zeroCCW = clock.minAngles[0] === 360 && clock.minAngles[1] === 10;
			var zeroCW = clock.minAngles[0] === 0 && clock.minAngles[1] === 350;
			var anglesAreEqual = clock.minAngles[0] === clock.minAngles[1];
			var lastAngleGreater = clock.minAngles[0] > clock.minAngles[1];
			var lastAngleLess = clock.minAngles[0] < clock.minAngles[1];
			
			if ( !anglesAreEqual ) {

				if ( ( lastAngleGreater || zeroCW ) && !zeroCCW ) {
					
					//console.log('CW');
					return true;
					
				} else if( ( lastAngleLess || zeroCCW ) && !zeroCW ) {

					//console.log('CCW');
					return false;
				}
			} else {

				return clock.minDirection;
			}
		}
	};

	function getHrDirection(self) {

		var clock = self;
		var angle = clock.hrPropeller.angle;

		if ( Math.abs( angle === 0 || angle === 360 ) && !clock.minDirection ) { angle = 360; }
		if ( Math.abs( angle === 0 || angle === 360 ) && clock.minDirection ) { angle = 0; }
	
		clock.hrAngles.unshift(angle);

		//console.log(clock.hrAngles);

		if ( clock.hrAngles.length >= 3 ) {
			
			if (clock.hrAngles.length > 3) {
				
				clock.hrAngles.pop();
			}
		
			var anglesAreEqual = clock.hrAngles[0] === clock.hrAngles[1] || (clock.hrAngles[0] === 0  && clock.hrAngles[1] === 360) || (clock.hrAngles[0] === 360  && clock.hrAngles[1] === 0) ;
			var lastAngleGreater = clock.hrAngles[0] > clock.hrAngles[1];
			var lastAngleLess = clock.hrAngles[0] < clock.hrAngles[1];
			var angleLess = clock.hrAngles[1] >= clock.hrAngles[2];

			if ( !anglesAreEqual ) {

				if ( lastAngleGreater) {
					
					//console.log('CW');
					return true;
				
				} else if( angleLess ) {

					//console.log('CCW');
					return false;
				}
			} else {

				return clock.minDirection;
			}
		}	
	};

	function hrRotation(self) {

		var clock = self;
		var options = clock.options;

		var spins = options.spins;
		var mins = Math.abs( Math.round ( ( clock.minPropeller.angle % 360 ) ) );

		var noSpins = ( spins === 0 && mins === 0 );
		var sameDirection = (clock.minDirection === clock.hrDirection);

		if ( mins !== 0 && sameDirection) {

			clock.hrPropeller.angle = Math.round( ( ( mins * 0.08333 ) + ( spins * 30 ) ) );
		}
	};

	function sethr (self) {

		var clock = self;
		var options = clock.options;

		var spins = options.spins;
		var mins = Math.abs( Math.round ( ( clock.minPropeller.angle % 360 ) ) );

		var noSpins = ( spins === 0 && mins === 0 );
		var sameDirection = (clock.minDirection === clock.hrDirection);
		
		clock.hrPropeller.angle = Math.round( ( ( mins * 0.08333 ) + ( spins * 30 ) ) );
	};

	function hasDuplicates(array) {

		var valuesSoFar = [];

		for (var i = 0; i < array.length; ++i) {
			
			var value = array[i];
			
			if (valuesSoFar.indexOf(value) !== -1) {
				return true;
			}
			valuesSoFar.push(value);
		}
		return false;
	};

	function spinCount(self) {

		var clock = self;
		var options = clock.options;
		var angle = clock.minPropeller.angle;
		var borderAngles = [];

		var borderConditionA = $.inArray( 0, clock.spinAngles) > -1 || $.inArray( -0, clock.spinAngles) > -1;
		var borderConditionB = $.inArray( 360, clock.spinAngles) > -1 || $.inArray( -360, clock.spinAngles) > -1;

		clock.spinAngles.unshift(angle);

		if ( clock.spinAngles.length === 4 ) { 
		
			clock.spinAngles.pop(); 
		
			if ( borderConditionA || borderConditionB ) {

				borderAngles = clock.spinAngles;
			}
		}

		if ( options.spins === undefined ) { options.spins = 0; }

		if ( Math.abs(angle % 360) === 0 && clock.minDirection && !clock.spinFlag02 ) {
			
			clock.spinFlag01 = true;   
			clock.spinFlag02 = true;                      

		} else if ( Math.abs(angle % 360) === 0 && !clock.minDirection && !clock.spinFlag02 ) {
		
			clock.spinFlag01 = false;   
			clock.spinFlag02 = true;                      
		
		} else {

			clock.spinFlag02 = false;
		}

		if ( clock.spinFlag02 && !clock.spinFlag03 ) {

			if ( clock.spinFlag01 ) {

				return ( options.spins + 1 );

			} else if ( !clock.spinFlag01 ) {

				return ( options.spins - 1 );
			}
		} else {

			return options.spins;
		}
	};

	function extendDefaults(source, properties) {

		var property;

		for (property in properties) { if (properties.hasOwnProperty(property)) { source[property] = properties[property]; } }

		return source;
	};

})(jQuery, Propeller, window);