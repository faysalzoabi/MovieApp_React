import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMapEvent,
} from "react-leaflet";
import type Coordinate from "./coordinate.model";
import { useState } from "react";

export default function Map(props: MapProps) {
	const [coordinates, setCoordinates] = useState(props.coordinates);

	return (
		<MapContainer
			center={[25.098092416322192, 55.190894443344725]}
			zoom={14}
			scrollWheelZoom={true}
			style={{ height: "500px" }}
		>
			<TileLayer
				attribution="React Movie"
				url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<HandleMapClick
				setCoordinate={(coordinates) => {
					setCoordinates([coordinates]);
					if (props.setCoordinate) {
						props.setCoordinate(coordinates);
					}
				}}
			/>

			{coordinates?.map((coordinate) => (
				<Marker
					key={coordinate.lat + coordinate.lng}
					position={[coordinate.lat, coordinate.lng]}
				>
					{coordinate.message ? <Popup>{coordinate.message}</Popup> : undefined}
				</Marker>
			))}
		</MapContainer>
	);
}

interface MapProps {
	coordinates?: Coordinate[];
	setCoordinate?: (coordinate: Coordinate) => void;
}

function HandleMapClick(props: {
	setCoordinate(coordinate: Coordinate): void;
}) {
	useMapEvent("click", (e) => {
		props.setCoordinate({ lat: e.latlng.lat, lng: e.latlng.lng });
	});

	return null;
}
