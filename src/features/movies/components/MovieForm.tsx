import { useForm, type SubmitHandler } from "react-hook-form";
import type MovieCreation from "../models/movie.model";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectImage from "../../../components/SelectImage/SelectImage";
import Button from "../../../components/Button";
import { NavLink } from "react-router";
import MultipleSelection from "../../../components/MultipleSelection/MultipleSelection";

export default function MovieForm(props: MovieFormProps) {
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

	const currentImageUrl: string | undefined = props.model?.poster
		? (props.model.poster as string)
		: undefined;

	return (
		<>
			<form onSubmit={handleSubmit(props.onSubmit)}>
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
						selected={[]}
						nonSelected={[]}
						onChange={() => {}}
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
}

const validationRules = yup.object({
	title: yup.string().required("The title is required"),
	releaseDate: yup.string().required("The release date is required"),
});
