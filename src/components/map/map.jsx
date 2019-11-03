import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const ICON_SIZE = 30;

class Map extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="map" style={{height: `100%`}}></div>
    );
  }

  componentDidMount() {
    this._init();
  }

  componentDidUpdate() {
    this.map.remove();
    this._init();
  }

  _init() {
    const {coords, leaflet} = this.props;
    const {city, hotels} = coords;

    const map = leaflet.map(`map`, {
      center: Object.values(city),
      zoom: city.zoom,
      zoomControl: false,
      marker: true
    });

    const icon = leaflet.icon({
      iconUrl: `/img/pin.svg`,
      iconSize: [ICON_SIZE, ICON_SIZE]
    });

    map.setView(Object.values(city), city.zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    hotels.forEach((hotel) => {
      const hotelCoords = [hotel.latitude, hotel.longitude];

      leaflet
      .marker(hotelCoords, {icon})
      .addTo(map);
    });

    this.map = map;
  }
}

Map.propTypes = {
  leaflet: PropTypes.object.isRequired,
  coords: PropTypes.exact({
    city: PropTypes.exact({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired
    }).isRequired,
    hotels: PropTypes.arrayOf(
        PropTypes.exact({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired
        })
    ).isRequired
  }).isRequired
};

export default Map;
