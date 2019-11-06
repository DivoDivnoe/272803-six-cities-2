import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const ICON_SIZE = 30;

class Map extends PureComponent {
  constructor(props) {
    super(props);

    const {leaflet} = this.props;

    this.icon = leaflet.icon({
      iconUrl: `/img/pin.svg`,
      iconSize: [ICON_SIZE, ICON_SIZE]
    });

    this.iconHover = leaflet.icon({
      iconUrl: `/img/pin-active.svg`,
      iconSize: [ICON_SIZE, ICON_SIZE]
    });
  }

  render() {
    return (
      <div id="map" style={{height: `100%`}}></div>
    );
  }

  componentDidMount() {
    this._init();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeHotel !== this.props.activeHotel) {
      const currentMarker = this.markers[this.props.activeHotel];
      this.markers.forEach((item) => item.setIcon(this.icon));

      if (currentMarker) {
        currentMarker.setIcon(this.iconHover);
      }
    }

    if (prevProps.city === this.props.city) {
      return false;
    }

    this.map.remove();
    this._init();

    return true;
  }

  _init() {
    const {coords, leaflet} = this.props;
    const {city, hotels} = coords;
    const {icon, iconHover} = this;

    const map = leaflet.map(`map`, {
      center: Object.values(city),
      zoom: city.zoom,
      zoomControl: false,
      marker: true
    });

    map.setView(Object.values(city), city.zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    this.markers = [];

    hotels.forEach((hotel) => {
      const hotelCoords = [hotel.latitude, hotel.longitude];
      const marker = leaflet.marker(hotelCoords, {icon});

      marker.on(`mouseover`, () => marker.setIcon(iconHover));
      marker.on(`mouseout`, () => marker.setIcon(icon));

      marker.addTo(map);
      this.markers.push(marker);
    });

    this.map = map;
  }
}

Map.propTypes = {
  activeHotel: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
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
