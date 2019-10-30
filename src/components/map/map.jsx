import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
    this.leaflet = this.props.leaflet;
  }

  render() {
    return (
      <section className="cities__map map" ref={this._mapRef}></section>
    );
  }

  componentDidMount() {
    const {coords} = this.props;
    const {city, hotels} = coords;
    const zoom = 12;

    const map = this.leaflet.map(this._mapRef.current, {
      center: Object.values(city),
      zoom,
      zoomControl: false,
      marker: true
    });

    const icon = this.leaflet.icon({
      iconUrl: `/img/pin.svg`,
      iconSize: [30, 30]
    });

    map.setView(Object.values(city), zoom);

    this.leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    hotels.forEach((hotel) => {
      this.leaflet
      .marker(Object.values(hotel), {icon})
      .addTo(map);
    });
  }
}

Map.propTypes = {
  leaflet: PropTypes.object.isRequired,
  coords: PropTypes.exact({
    city: PropTypes.exact({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    hotels: PropTypes.arrayOf(
        PropTypes.exact({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
        })
    ).isRequired
  }).isRequired
};

export default Map;
