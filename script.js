const mapTheme = [
  {
    "featureType": "all",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "weight": "2.00"
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#9c9c9c"
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "color": "#f2f2f2"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
        "saturation": -100
      },
      {
        "lightness": 45
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#7b7b7b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "color": "#46bcec"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#c8d7d4"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#070707"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  }
]

const infos = []

async function getMapPoint() {
  const res = await fetch('./location.json')
  return await res.json();
}

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 25.04021293390082, lng: 121.51196142698754 },
    zoom: 15,
    styles: mapTheme,
  });

  getMapPoint().then(data => data.forEach(createMarker))
}

function createInfoWindowContent(data) {
  return `
    <h2 style="color: #4aa158">
      ${data.name}
    </h2>
    <p class="classify">${data.classify}</p>
    <p>${data.description}</p>
    <p>${data.address}</p>
  `
}


function createMarker(data) {
  console.log(data)
  const marker = new google.maps.Marker({
    position: {
      "lat": data.lat,
      "lng": data.lng
    },
    map,
    title: data.name,
    icon: {
      url: './cross.svg',
      scaledSize: new google.maps.Size(30, 30)
    }
  })

  const infoWindow = new google.maps.InfoWindow({
    content: createInfoWindowContent(data),
    maxWidth: 400,
  });

  infos.push(infoWindow);

  marker.addListener("click", () => {
    infos.forEach((i) => i.close())
    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });
}




