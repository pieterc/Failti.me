var map;
function initialize() {
var myLatlng = new google.maps.LatLng(50.5,3.0);
var myOptions = {
zoom: 7,
center: myLatlng,
mapTypeId: google.maps.MapTypeId.ROADMAP,
disableDefaultUI: true,
zoomControl: false
}
map = new google.maps.Map(document.getElementById("map"), myOptions);


}