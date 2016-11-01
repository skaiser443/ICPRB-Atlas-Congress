mapboxgl.accessToken = 'pk.eyJ1Ijoic2thaXNlcmljcHJiIiwiYSI6ImNpa2U3cGN1dDAwMnl1cm0yMW94bWNxbDEifQ.pEG_X7fqCAowSN8Xr6rX8g';

var bound = new mapboxgl.LngLatBounds(
    new mapboxgl.LngLat(-81.457, 36.945),
	new mapboxgl.LngLat(-72.49, 41.17)
);
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/skaisericprb/ciuzhaqnl000x2iqvzfqk2zmv',
	center: [-77.975, 39.077],
	maxBounds: bound,
	zoom: 7.45,
	attributionControl: {
		position: 'bottom-right'
	},
	minZoom: [7.0],
});

// ***ADD CHECKBOX TO HIDE SHOW LAYERS*** //

var linkGroup = document.getElementById('link-group');
var layerIds = ['Fed-Leg-Dist-VA', 'Fed-Leg-Dist-VA-bound', 'Fed-Leg-Dist-WV', 'Fed-Leg-Dist-WV-bound', 'Fed-Leg-Dist-PA', 'Fed-Leg-Dist-PA-bound', 'Fed-Leg-Dist-MD', 'Fed-Leg-Dist-MD-bound', 'Fed-Leg-Dist-DC', 'Fed-Leg-Dist-DC-bound'];

var link = document.createElement('input');
	link.type = 'checkbox';
	link.checked = true;
	link.className = 'link-group';
	
    link.onclick = function(e) {
	    for(var index in layerIds) {
	      map.setLayoutProperty(layerIds[index], 'visibility',
	        e.target.checked ? 'visible' : 'none');
	    }	
    };
	
var label = document.createElement('link-group');
	label.textContent = "Federal Legislative Districts";
	linkGroup.appendChild(label);	
	
var layer = document.getElementById('link-group');
	layer.appendChild(link);

// Maryland State House of Reps //
	
var stateIds = ['md-state-house-bound', 'md-state-house'];

var link = document.createElement('input');
	link.type = 'checkbox';
	link.checked = true;
	link.className = 'link-group';
	
    link.onclick = function(e) {
	    for(var index in stateIds) {
	      map.setLayoutProperty(stateIds[index], 'visibility',
	        e.target.checked ? 'visible' : 'none');
	    }	
    };
	
var label = document.createElement('link-group');
	label.textContent = "Maryland Legislative Districts";
	linkGroup.appendChild(label);	
	
var layer = document.getElementById('link-group');
	layer.appendChild(link);

// ADD TOOLTIP //
	
var district_template_string = "<% if (district.state) { %><p><strong>State: </strong><%= district.state %></p><% } %><% if (district.district) {%><p><strong>District: </strong><%= district.district %></p><% } %><% if (district.firstName) {%><p><strong>Representative: </strong><%= district.firstName %> <%= district.lastName %></p><% } %>";
var district_template = _.template(district_template_string, {variable: 'district'});

map.on('style.load', function() {
  map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
	    layers: ['Fed-Leg-Dist-DC', 'Fed-Leg-Dist-MD', 'Fed-Leg-Dist-PA', 'Fed-Leg-Dist-VA', 'Fed-Leg-Dist-WV']
    });
  
    if (!features.length) {
      return;
    }
	  
    var feature = features[0];
    var ttip = new mapboxgl.Popup()
	    .setLngLat(map.unproject(e.point))
        .setHTML(district_template(features[0].properties))
	    .addTo(map);
  });
});
	
map.addControl(new mapboxgl.Geocoder({position: 'top-right'}));
map.addControl(new mapboxgl.Navigation({position: 'top-left'}));

