import { useEffect } from 'react'
import L from 'leaflet'

const Map = () => {
  useEffect(() => {
    // Inicializa el mapa en el uso de Leaflet
    const map = L.map('map').setView([-12.091445, -77.071465], 17); // Coordenadas y nivel de zoom inicial

    // Añade los tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Añade un marcador en el mapa
    L.marker([-12.091445, -77.071465]).addTo(map)
      .bindPopup('MARGOT')
      .openPopup();

		return () => {
			map.remove(); // Elimina el mapa
		};

  }, [])

  return (
    <div
      className="mb-3 rounded-lg shadow-xl z-0"
      id="map"
      style={{ height: '300px', width: '85%' }}
    ></div>
  )
}

export default Map
