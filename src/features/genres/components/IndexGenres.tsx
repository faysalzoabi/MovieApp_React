import { useEffect } from "react";
import { NavLink } from "react-router";
import apiClient from "../../../api/apiClient";

export default function IndexGenres() {
	useEffect(() => {
		const loadGenres = async () => {
			const response = await apiClient.get(`/genres`);
			console.log(response.data);
		};
		loadGenres();
	}, []);
	return (
		<>
			<h3>Genres</h3>
			<NavLink className="btn btn-primary" to="/genres/create">
				Create Genre
			</NavLink>
		</>
	);
}
