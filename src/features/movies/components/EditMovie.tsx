import { useParams } from "react-router";
import type MovieCreation from "../models/movie.model";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import MovieForm from "./MovieForm";
import Loading from "../../../components/Loading";
import type Genre from "../../genres/models/Genre.model";
import type Theater from "../../theaters/models/Theater.model";

export default function EditMovie() {
	const { id } = useParams();
	const [model, setModel] = useState<MovieCreation | undefined>(undefined);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setModel({
				title: "",
				releaseDate: "2019-07-03",
				trailer: "my url",
				poster:
					"https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png",
			});
		}, 1000);

		return () => clearTimeout(timerId);
	}, []);

	const onSubmit: SubmitHandler<MovieCreation> = async (data) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		console.log(data);
	};

	const nonSelectedGenres: Genre[] = [{ id: 1, name: "Action" }];
	const selectedGenres: Genre[] = [{ id: 2, name: "Drama" }];

	const nonSelectedTheaters: Theater[] = [
		{ id: 1, name: "Dubai", latitude: 0, longitude: 0 },
	];

	const selectedTheaters: Theater[] = [
		{ id: 2, name: "Sharjah", latitude: 0, longitude: 0 },
	];

	return (
		<div>
			<h3>Edit Movie {id}</h3>
			{model ? (
				<MovieForm
					model={model}
					onSubmit={onSubmit}
					nonSelectedGenres={nonSelectedGenres}
					selectedGenres={selectedGenres}
					selectedTheaters={selectedTheaters}
					nonSelectedTheaters={nonSelectedTheaters}
				/>
			) : (
				<Loading />
			)}
		</div>
	);
}
