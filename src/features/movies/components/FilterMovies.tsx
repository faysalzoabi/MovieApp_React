import { useForm, type SubmitHandler } from "react-hook-form";
import type FilterMovieDto from "../models/FilterMoviesDTO.model";
import type Genre from "../../genres/models/Genre.model";
import Button from "../../../components/Button";

export default function FilterMovies() {
	const initialValues: FilterMovieDto = {
		title: "",
		genreId: 0,
		inTheaters: false,
		upcomingRelease: false,
	};
	const {
		register,
		reset,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<FilterMovieDto>({ defaultValues: initialValues });

	const onSubmit: SubmitHandler<FilterMovieDto> = async (data) => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		console.log(data);
	};

	const genres: Genre[] = [
		{ id: 1, name: "Action" },
		{ id: 2, name: "Comedy" },
	];

	return (
		<>
			<h3>Filter movies</h3>
			<form
				className="row row-cols-lg-auto g-3 align-items-center"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="col-12">
					<input
						type="text"
						placeholder="Movie title"
						autoComplete="off"
						className="form-control"
						{...register("title")}
					/>
				</div>
				<div className="col-12">
					<select className="form-select" {...register("genreId")}>
						<option value="0">--select a genre--</option>
						{genres.map((genre) => (
							<option key={genre.id} value={genre.id}>
								{genre.name}
							</option>
						))}
					</select>
				</div>

				<div className="col-12">
					<div className="form-check">
						<input
							type="checkbox"
							className="form-check-input"
							{...register("upcomingRelease")}
							id="upcomingRelease"
						/>
						<label htmlFor="upcomingRelease" className="form-check-label">
							Upcoming releases
						</label>
					</div>
				</div>

				<div className="col-12">
					<div className="form-check">
						<input
							type="checkbox"
							className="form-check-input"
							{...register("inTheaters")}
							id="inTheaters"
						/>
						<label htmlFor="inTheaters" className="form-check-label">
							inTheaters
						</label>
					</div>
				</div>
				<div className="col-12">
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "filer..." : "filer"}
					</Button>
					<Button className="btn btn-danger ms-2" onClick={() => reset()}>
						{isSubmitting ? "filer..." : "filer"}
					</Button>
				</div>
			</form>
		</>
	);
}
