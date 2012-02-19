var map = null;
var beginStationName = null;
var beginStationMarker = null;
var endStatinoName = null;
var endStationMarker = null;
var selectedOnMap = false;
var startStationChanged = false;

/**
 * Initialize the map.
 */
function initialize() {
	// Create an array of styles.
	var failTimeStyles = [
	                      	  {
	                    	    stylers: [
	                    	      { visibility: "simplified" },
	                    	      { saturation: -79 }
	                    	    ]
	                    	  },{
	                    	    featureType: "administrative.country",
	                    	    stylers: [
	                    	      { saturation: 40 }
	                    	    ]
	                    	  },{
	                    	    featureType: "administrative.province",
	                    	    stylers: [
	                    	      { visibility: "simplified" }
	                    	    ]
	                    	  },{
	                    	    featureType: "administrative.locality",
	                    	    stylers: [
	                    	      { visibility: "simplified" }
	                    	    ]
	                    	  },{
	                    	    featureType: "administrative.neighborhood",
	                    	    stylers: [
	                    	      { visibility: "off" }
	                    	    ]
	                    	  },{
	                    	    featureType: "administrative.land_parcel",
	                    	    stylers: [
	                    	      { visibility: "off" }
	                    	    ]
	                    	  },{
	                    	    featureType: "landscape",
	                    	    stylers: [
	                    	      { visibility: "off" }
	                    	    ]
	                    	  },{
	                    	    featureType: "poi",
	                    	    stylers: [
	                    	      { visibility: "off" }
	                    	    ]
	                    	  },{
	                    	    featureType: "road",
	                    	    stylers: [
	                    	      { visibility: "off" }
	                    	    ]
	                    	  },{
	                    	    featureType: "road.highway",
	                    	    stylers: [
	                    	      { visibility: "simplified" }
	                    	    ]
	                    	  },{
	                    			featureType: "transit.line",
	                    			stylers: [
	                    				{ hue: "#ff0000" },
	                    				{ saturation: 100 },
	                    				{ gamma: 1 },
	                    				{ lightness: -50 }
	                    		]
	                    	   },{
	                    	    featureType: "transit.station.rail",
	                    	    stylers: [
	                    	      { hue: "#0000ff" },
	                    	      { saturation: 100 },
	                    	      { visibility: "on" }
	                    	    ]
	                    	  },{
	                    	    featureType: "water",
	                    	    stylers: [
	                    	      { visibility: "simplified" }
	                    	    ]
	                    	  }
	                    	];
	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.
	var failTimeStyling = new google.maps.StyledMapType(failTimeStyles, {name: "Fail Time"});
	
	var myOptions = {
		center : new google.maps.LatLng(50.84547, 4.35711),
		zoom : 7,
		disableDefaultUI: true,
		panControl: true,
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		overviewMapControl: false,
		mapTypeControlOptions: {
	    	mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'failTimeStyling']
	    }
	};
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	
	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('failTimeStyling', failTimeStyling);
	map.setMapTypeId('failTimeStyling');
	// Create a div to hold the control.
	var failTimeControlDiv = document.createElement('div');
	// Call the FailTimeController() constructor passing in this div.
	var failTimeControl = new FailTimeController(failTimeControlDiv, map);
	// Insert the control into the map at a designated control position.
	failTimeControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(failTimeControlDiv);
	
	// Load all NMBS stations
	var layer = new google.maps.FusionTablesLayer({
		query: {
			select: 'LatLng',
			from: '2710936'
		},
		suppressInfoWindows: true
	});

	layer.setMap(map);

	google.maps.event.addListener(layer, 'click', function(event) {
		selectedOnMap = true;
		var stationSelected = event.row.Station.value;
		placeStationMarker(stationSelected, event.latLng);
		var stationCoord = '' + event.latLng.Qa.toFixed(5) + '-' + event.latLng.Ra.toFixed(5);
		if (isStartSelection()) {
			dijit.byId('selectStart').set('displayedValue', stationSelected);
		} else {
			dijit.byId('selectEnd').set('displayedValue', stationSelected);
		}
	});

	google.maps.event.addListener(map, 'tilesloaded', function(event) {
		loadController();
	});
}

/**
 * Check whether the user is currently selecting the start station or the end station.
 */
function isStartSelection(){
	return (getCheckedValue(document.getElementsByName('selectStationType')) == 'start');
}

function onSelectStartStation() {
	if (dijit.byId('selectStart').isValid() && dijit.byId('selectStart').get('value') != "") {
		startStationChanged = true;
		if (!selectedOnMap) {
			var startStationCoord = dijit.byId('selectStart').get('value');
			var splitCoordinates = startStationCoord.split('-');
			var lat = splitCoordinates[0];
			var lng = splitCoordinates[1];
			var coordinate = new google.maps.LatLng(lat, lng);
			placeStationMarker(dijit.byId('selectStart').getDisplayedValue(), coordinate);
			if (isStartSelection()) {
				toggleChecked(document.getElementsByName('selectStationType'));
			}
		} else {
			selectedOnMap = false;
	        toggleChecked(document.getElementsByName('selectStationType'));
		}
		startStationChanged = false;
	}
}

function onSelectEndStation() {
	if (dijit.byId('selectEnd').isValid() && dijit.byId('selectEnd').get('value') != "") {
		if (!selectedOnMap) {
			var endStationCoord = dijit.byId('selectEnd').get('value');
			var splitCoordinates = endStationCoord.split('-');
			var lat = splitCoordinates[0];
			var lng = splitCoordinates[1];
			var coordinate = new google.maps.LatLng(lat, lng);
			placeStationMarker(dijit.byId('selectEnd').getDisplayedValue(), coordinate);
			if (!isStartSelection()) {
				toggleChecked(document.getElementsByName('selectStationType'));
			}
		} else {
			selectedOnMap = false;
	        toggleChecked(document.getElementsByName('selectStationType'));
		}
	}
}

function placeStationMarker(stationName, latLng) {
	if (selectedOnMap && isStartSelection() || startStationChanged) {
		if (beginStationMarker == null) {
			beginStationMarker = createStationMarker(latLng, 'img/marker-start.png');
		} else {
			if (dijit.byId('selectStart').get('displayedValue') == stationName && selectedOnMap) {
				toggleBounce(beginStationMarker);
			} else {
				//new selected begin station
				beginStationMarker.setAnimation(google.maps.Animation.BOUNCE);
			}
		}
		beginStationMarker.setPosition(latLng);
		beginStationMarker.setTitle(stationName);
	} else {
		if (endStationMarker == null) {
			endStationMarker = createStationMarker(latLng, 'img/marker-end.png');
		} else {
			if (dijit.byId('selectEnd').get('displayedValue') == stationName && selectedOnMap) {
				toggleBounce(endStationMarker);
			} else {
				//new selected end station
				endStationMarker.setAnimation(google.maps.Animation.BOUNCE);
			}
		} 
		endStationMarker.setPosition(latLng);
		endStationMarker.setTitle(stationName);
	}
	//Center map
	map.setCenter(latLng);
}

/**
 * Returns a new station marker object
 * @param latLng the location specification
 * @param iconUrl String indicating the path to icon png image (20x34px). 
 */
function createStationMarker(latLng, iconUrl) {
	// Origins, anchor positions and coordinates of the marker
	// increase in the X direction to the right and in
	// the Y direction down.
	var image = new google.maps.MarkerImage(iconUrl,
					// This marker is 20 pixels wide by 34 pixels tall.
					new google.maps.Size(20, 34),
					// The origin for this image is 0,0.
					new google.maps.Point(0,0),
					// The anchor for this image is the base of the flagpole at 10,32.
					new google.maps.Point(10, 32));
	var shadow = new google.maps.MarkerImage('img/marker-shadow.png',
		      // The shadow image is larger in the horizontal dimension
		      // while the position and offset are the same as for the main image.
		      new google.maps.Size(37, 34),
		      new google.maps.Point(0,0),
		      new google.maps.Point(10, 32));
	var marker = new google.maps.Marker({
	      position: latLng,
	      icon: image,
	      shadow: shadow, 
	      animation: google.maps.Animation.BOUNCE,
	      map: map
	  });
	google.maps.event.addListener(marker, 'click', function(event) {
		toggleBounce(marker);
	});
	return marker;
}

/**
 * Toggle bounce animation of a map marker.
 */
function toggleBounce(marker) {
	if (marker.getAnimation() != null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

/**
 * Return the value of the selected radio button.
 */
function getCheckedValue(radioObj) {
	if (!radioObj) {
		return "";
	}
	var radioLength = radioObj.length;
	if (radioLength == undefined) {
		if (radioObj.checked) {
			return radioObj.value;
		} else {
			return "";
		}
	}
	for (var i = 0; i < radioLength; i++) {
		if (radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}

function toggleChecked(radioObj) {
	if (radioObj) {
		if (radioObj[0].checked) {
			radioObj[0].checked='';
			radioObj[1].checked='checked';
		} else {
			radioObj[0].checked='checked';
			radioObj[1].checked='';
		}
		var tmp = $("#selectStationType");
		tmp.button("destroy");
		tmp.buttonset();
	}
}

/**
 * FailTime controller constructor.
 * @param controlDiv
 * 			attach our control UI to this controlDiv.
 * @param map
 			the map instance for this controller.
 */
function FailTimeController(controlDiv, map) {
 	// We set up a variable for the 'this' keyword since we're adding event
	// listeners later and 'this' will be out of scope.
	var control = this;
	
	// Set the home property upon construction.
	control.state_ = 1;
  
	// Set CSS styles for the div containing the control
	// Setting padding to 5 px will offset the control
	// from the edge of the map.
	controlDiv.style.padding = '5px';

	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Selecteer begin- of eindpunt.';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior.
	var controlText = document.createElement('div');
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '12px';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = "<div id=\"selectStationType\">"
								+ "<input type=\"radio\" id=\"start\" name=\"selectStationType\" value=\"start\" checked=\"checked\" /><label for=\"start\">Van</label>"
								+ "<input type=\"radio\" id=\"end\" name=\"selectStationType\" value=\"end\" /><label for=\"end\">Naar</label>"
							+"</div>";
	controlUI.appendChild(controlText);
}

function loadController() {
	$("#selectStationType").buttonset();
}
