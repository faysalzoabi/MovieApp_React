import type MovieCreation from "../models/movie.model";
import { type SubmitHandler } from "react-hook-form";

import MovieForm from "./MovieForm";

export default function CreateMovie() {
	const onSubmit: SubmitHandler<MovieCreation> = async (data) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		console.log(data);
	};
	return (
		<>
			<h3>Create Movies</h3>
			<MovieForm onSubmit={onSubmit} />
		</>
	);
}
