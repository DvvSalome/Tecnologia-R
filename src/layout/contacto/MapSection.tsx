import Map from '../../components/maps/Map'
import 'leaflet/dist/leaflet.css';


const MapSection = () => {
	const latitude = -12.091445;
	const longitude = -77.071465;

	const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
	return (
		<div className="w-full flex flex-col justify-center items-center gap-3">
			<h2 className="text-4xl font-bold text-white">¡Ubicanos Aqui!</h2>
			<p className="lg:text-2xl text-xl font-bold text-sky-400">JR TACNA 752 STAND 71</p>
			<span className="lg:text-3xl text-2xl text-green-500 font-bold">
				MAGDALENA
			</span>
			<Map />

			<a href={googleMapsUrl} target='_blank' rel='noopener noreferrer' className='mb-10 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-sm hover:bg-blue-600'>
				Abrir en Google Maps
			</a>
		</div>
	)
}

export default MapSection
