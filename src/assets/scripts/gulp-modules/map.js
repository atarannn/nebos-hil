
// Google map start
function func() {
    const script = document.createElement('script');
    let key = '';
    if (window.location.href.match(/localhost/)) key = '';
    // const key = '';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
    document.getElementsByTagName('head')[0].appendChild(script);
}
// setTimeout(func, 1000);
const maps = document.querySelectorAll('.map');
const options = {
    rootMargin: '0px',
    threshold: 0.1,
};

maps.forEach(image => {
    const callback = (entries, observer) => {
        /* Content excerpted, show below */
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                observer.unobserve(image);
                func();
            }
        });
    };
    const observer = new IntersectionObserver(callback, options);
    const target = image;
    observer.observe(target);
});

// eslint-disable-next-line no-unused-vars
function initMap() {
    const gmarkers1 = [];
    const center = {
        lat: 48.463748,
        lng: 35.061649,
    };

    const choosedCategories = new Set();
    choosedCategories.add('main');
    const filterItems = document.querySelectorAll('[data-marker]');
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
        language: 'en',
        styles: getMapTheme(),
    });
    const filterMarkers = function(category, categoriesArray) {
        gmarkers1.forEach(el => {
            if (categoriesArray.has(el.category) || categoriesArray.size === 1) {
                el.setMap(map);
                el.setAnimation(google.maps.Animation.DROP);
            } else {
                el.setMap(null);
            }
        });
    };
    filterItems.forEach(item => {
        item.addEventListener('click', evt => {
            evt.stopImmediatePropagation();
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                choosedCategories.add(item.dataset.category);
            } else {
                choosedCategories.delete(item.dataset.category);
            }
            filterMarkers('main', choosedCategories);
        });
    });

    // var baseFolder = '/wp-content/themes/centower/assets/images/markers/';
    const baseFolder = './assets/images/markers/';
    let defaultMarkerSize = new google.maps.Size(75, 75);
    // const buildLogoSize = new google.maps.Size(75, 75);
    if (document.documentElement.clientWidth < 1600) {
        var buildLogoSize = new google.maps.Size(60, 60);
    }
    if (document.documentElement.clientWidth < 575) {
        var buildLogoSize = new google.maps.Size(50, 50);
    }
    const markersAdresses = {
        main: `${baseFolder}marker.svg`,
    };
    const markerPopupStyle = `
       style="
       background: #2D2D2D;
       color:#fff;
       padding: 5px 10px;
       font-size: 18px;
       line-height: 22px;"
       `;
    const markersData = [
        {
            // content: `<div ${markerPopupStyle}>Apricot private kindergarten</div>`,
            type: 'main',
            icon: { url: markersAdresses.main, scaledSize: buildLogoSize},
            position: { lat: 48.463748, lng: 35.061649 },
        },
    ];
    /* beautify preserve:end */
    const infowindow = new google.maps.InfoWindow({
        content: '',
        maxWidth: 200,
    });
    markersData.forEach(marker => {
        const category = marker.type;
        const mapMarker = new google.maps.Marker({
            map,
            category,
            zIndex: marker.zIndex || 1,
            icon: marker.icon,
            cursor: 'grap', // курсор при наведении на макркер жк
            position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
        });

        // google.maps.event.addListener(mapMarker, 'click', function() {
        //     infowindow.setContent(marker.content);
        //     infowindow.open(map, mapMarker);
        //     map.panTo(this.getPosition());
        // });

        mapMarker.name = marker.type;
        gmarkers1.push(mapMarker);
    });
}

window.addEventListener('load', () => {
    const legend = document.querySelector('[data-mob-accordeon]');
    if (legend === null) return;
    const legendTitle = legend.querySelector('.map__legend-title');
    legendTitle.addEventListener('click', () => {
        legend.classList.toggle('opened');
    });
    legend.addEventListener('mouseenter', () => {
        if (locoScroll !== undefined) locoScroll.stop();
    });
    legend.addEventListener('mouseleave', () => {
        if (locoScroll !== undefined) locoScroll.start();
    });
});

function getMapTheme() {
    return [
        {
            featureType: 'all',
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [
                {
                    hue: '#FFA800',
                },
                {
                    gamma: 1,
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'all',
            stylers: [
                {
                    hue: '#679714',
                },
                {
                    saturation: 33.4,
                },
                {
                    lightness: -25.4,
                },
                {
                    gamma: 1,
                },
            ],
        },
        {
            featureType: 'poi.business',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'poi.medical',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'poi.school',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'poi.sports_complex',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'all',
            stylers: [
                {
                    hue: '#53FF00',
                },
                {
                    saturation: -73,
                },
                {
                    lightness: 40,
                },
                {
                    gamma: 1,
                },
            ],
        },
        {
            featureType: 'road.arterial',
            elementType: 'all',
            stylers: [
                {
                    hue: '#FBFF00',
                },
                {
                    gamma: 1,
                },
            ],
        },
        {
            featureType: 'road.local',
            elementType: 'all',
            stylers: [
                {
                    hue: '#00FFFD',
                },
                {
                    lightness: 30,
                },
                {
                    gamma: 1,
                },
            ],
        },
        {
            featureType: 'transit.line',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'all',
            stylers: [
                {
                    saturation: 6,
                },
                {
                    lightness: 8,
                },
                {
                    gamma: 1,
                },
                {
                    color: '#caefff',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
                {
                    visibility: 'on',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'labels.text',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
    ];
}
