import { useEffect, useState } from "react";
import type Movie from "../../movies/models";
import type LandingPageDto from "../models/LandingPageDto";
import MovieSList from "../../movies/components/MoviesList";

export default function LandingPage() {
	const [movies, setMovies] = useState<LandingPageDto>({});

	useEffect(() => {
		const movies: Movie[] = [
			{
				id: 1,
				title: "The Shawshank Redemption",
				poster: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg",
			},
			{
				id: 2,
				title: "The Godfather",
				poster: "https://m.media-amazon.com/images/I/41+eK8zBwQL._AC_.jpg",
			},
		];

		const upcomingReleases: Movie[] = [
			{
				id: 3,
				title: "fast and furious 10",
				poster:
					"https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
			},
			{
				id: 4,
				title: "spider-man",
				poster:
					"https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
			},
		];

		setTimeout(() => {
			setMovies({ inTheaters: movies, upComingReleases: upcomingReleases });
		}, 1000);
	}, []);
	return (
		<>
			<h2>In Theaters</h2>
			<MovieSList movies={movies.inTheaters} />

			<h2>Upcoming Releases</h2>
			<MovieSList movies={movies.upComingReleases} />
		</>
	);
}
