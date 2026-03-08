import { useForm, type SubmitHandler } from "react-hook-form";
import type MovieCreation from "../models/movie.model";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectImage from "../../../components/SelectImage/SelectImage";
import Button from "../../../components/Button";
import { NavLink } from "react-router";
import MultipleSelection from "../../../components/MultipleSelection/MultipleSelection";
import type Genre from "../../genres/models/Genre.model";
import type MultipleSelectionDTO from "../../../components/MultipleSelection/MultipleSelectionDTO.model";
import { useState } from "react";
import type Theater from "../../theaters/models/Theater.model";

export default function MovieForm(props: MovieFormProps) {
	const [nonSelectedGenres, setNonSelectedGenres] = useState(
		toMultipleSelection(props.nonSelectedGenres),
	);

	const [selectedGenres, setSelectedGenres] = useState(
		toMultipleSelection(props.selectedGenres),
	);

	const [nonSelectedTheaters, setNonSelectedTheaters] = useState(
		toMultipleSelection(props.nonSelectedTheaters),
	);

	const [selectedTheaters, setSelectedTheaters] = useState(
		toMultipleSelection(props.selectedTheaters),
	);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = useForm<MovieCreation>({
		resolver: yupResolver(validationRules),
		mode: "onChange",
		defaultValues: props.model ?? { title: "" },
	});

	function toMultipleSelection(
		array: { id: number; name: string }[],
	): MultipleSelectionDTO[] {
		return array.map((value) => {
			return { key: value.id, description: value.name };
		});
	}

	const currentImageUrl: string | undefined = props.model?.poster
		? (props.model.poster as string)
		: undefined;

	const onSubmit: SubmitHandler<MovieCreation> = (data) => {
		data.genresIds = selectedGenres.map((x) => x.key);
		data.theatersIds = selectedTheaters.map((x) => x.key);
		return props.onSubmit(data);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						id="title"
						autoComplete="off"
						className="form-control"
						{...register("title")}
					/>
					{errors.title && <p className="error">{errors.title.message}</p>}
				</div>

				<div className="form-group">
					<label htmlFor="ReleaseDate">Release Date</label>
					<input
						id="releaseDate"
						type="date"
						autoComplete="off"
						className="form-control"
						{...register("releaseDate")}
					/>
					{errors.releaseDate && (
						<p className="error">{errors.releaseDate.message}</p>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="trailer">Trailer (YouTube)</label>
					<input
						type="text"
						id="trailer"
						autoComplete="off"
						className="form-control"
						{...register("trailer")}
					/>
				</div>

				<SelectImage
					imageURL={currentImageUrl}
					selectedImage={(image) => setValue("poster", image)}
				/>

				<div className="form-group">
					<label htmlFor="">Genres:</label>
					<MultipleSelection
						selected={selectedGenres}
						nonSelected={nonSelectedGenres}
						onChange={(selected, nonSelected) => {
							setSelectedGenres(selected);
							setNonSelectedGenres(nonSelected);
						}}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="">Genres:</label>
					<MultipleSelection
						selected={selectedTheaters}
						nonSelected={nonSelectedTheaters}
						onChange={(selected, nonSelected) => {
							setSelectedTheaters(selected);
							setNonSelectedTheaters(nonSelected);
						}}
					/>
				</div>

				<div className="mt-4">
					<Button type="submit" disabled={!isValid || isSubmitting}>
						{isSubmitting ? "submitting..." : "submit"}
					</Button>
					<NavLink to="/" className="btn btn0-secondary ms-2">
						Cancel
					</NavLink>
				</div>
			</form>
		</>
	);
}

interface MovieFormProps {
	model?: MovieCreation;
	onSubmit: SubmitHandler<MovieCreation>;
	nonSelectedGenres: Genre[];
	selectedGenres: Genre[];
	nonSelectedTheaters: Theater[];
	selectedTheaters: Theater[];
}

const validationRules = yup.object({
	title: yup.string().required("The title is required"),
	releaseDate: yup.string().required("The release date is required"),
});
