let geojson = {
  type: 'FeatureCollection',
  features: []
};

let map;

const init = () => {

    initMap();
    addMarkersToMap();
};

const initMap = () => {
    map = new mapboxgl.Map({
        accessToken: 'pk.eyJ1IjoicDF4ZWxvbnMiLCJhIjoiY213Y2Zrd200MDF5ejJ5cHYzNGFscHg3cSJ9.PeOrmQxuD4ZPBW4d5Vum9w',
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-96, 37.8],
        zoom: 3
      });
};

const addMarkersToMap = () => {
    // add markers to map
    for (const feature of geojson.features) {
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        )
        .addTo(map);
    }
};

function loadMarkers(){
  const coffeeShops = [
        {
		latitude:43.084156,
		longitude:-77.67514,
		title:"Artesano Bakery & Cafe"
    },

	{
		latitude:43.083866,
		longitude:-77.66901,
		title:"Beanz"
	},

	{
		latitude:43.082520,
		longitude:-77.67980,
		title:"Starbucks"
	},

	{
		latitude:43.086678,
		longitude:-77.669014,
		title:"The College Grind"
	},

	{
		latitude:43.082634,
		longitude:-77.68004,
		title:"The Cafe & Market at Crossroads"
	},

	{
		latitude:43.08382,
		longitude:-77.674805,
		title:"RITZ Sports Zone"
	},

	{
		latitude:43.086502,
		longitude:-77.66912,
		title:"The Commons"
	},

	{
		latitude:43.08324,
		longitude:-77.68105,
		title:"The Market at Global Village"
	},

	{
		latitude:43.08384,
		longitude:-77.67457,
		title:"Brick City Cafe"
	},

	{
		latitude:43.084904,
		longitude:-77.6676,
		title:"Corner Store"
	},

	{
		latitude:43.08464,
		longitude:-77.680145,
		title:"CTRL ALT DELi"
	},

	{
		latitude:43.08359,
		longitude:-77.66921,
		title:"Gracie's"
	}
    ];
	
	// now convert this data to GeoJSON
    for (let shop of coffeeShops) {
        // empty GEOjson
        const newFeature = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: []
            },
            properties: {
                title: "",
                description: 'A place to get coffee!'
            }
        };

        // add points
        newFeature.geometry.coordinates[0] = shop.longitude;
        newFeature.geometry.coordinates[0] = shop.latitude;
        newFeature.properties.title = shop.title;

        // push to geojson array
        geojson.features.push(newFeature);
    }

    console.log(geojson.features);
}

export {init};