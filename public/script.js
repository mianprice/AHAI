//rating plug-in
$('.container').rating();

//map setup
var map;

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: new google.maps.LatLng(center.lat, center.lon),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var styles = {
			 default: null,
			 hide: [
				 {
					 featureType: 'poi',
					 stylers: [{visibility: 'off'}]
				 }
			 ]
		 };

	map.setOptions({styles: styles['hide']});

	var infowindow = new google.maps.InfoWindow({});

	var marker, i;

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				map.setCenter(marker.getPosition());
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
}
