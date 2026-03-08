import * as yup from "yup";
import firstLetterUppercase from "../../../validations/firstLetterUppercase";
import type TheaterCreation from "../models/TheaterCreation.model";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../../components/Button";
import { NavLink } from "react-router";
import Map from "../../../components/Map/Map";
import type Coordinate from "../../../components/Map/coordinate.model";

export default function TheaterForm(props: TheaterFormProps) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = useForm<TheaterCreation>({
		resolver: yupResolver(validationRule),
		mode: "onChange",
		defaultValues: props.model ?? { name: "" },
	});

	function transformCoordinates(): Coordinate[] | undefined {
		if (props.model) {
			const response: Coordinate = {
				lat: props.model.latitude,
				lng: props.model.longitude,
			};
			return [response];
		}

		return undefined;
	}

	return (
		<>
			<form onSubmit={handleSubmit(props.onSubmit)}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						id="name"
						autoComplete="off"
						className="form-control"
						{...register("name")}
					/>
					{errors.name && <p className="error">{errors.name.message}</p>}
				</div>

				<div className="mt-4">
					<Map
						coordinates={transformCoordinates()}
						setCoordinate={(coordinate) => {
							setValue("latitude", coordinate.lat, {
								shouldValidate: true,
							});

							setValue("longitude", coordinate.lng, {
								shouldValidate: true,
							});
						}}
					/>
				</div>

				<div className="mt-2">
					<Button type="submit" disabled={!isValid || isSubmitting}>
						{isSubmitting ? "Submitting...." : "Submitt"}
					</Button>
					<NavLink className="btn btn-secondary ms-2" to="/theaters">
						Cancel
					</NavLink>
				</div>
			</form>
		</>
	);
}

interface TheaterFormProps {
	model?: TheaterCreation;
	onSubmit: SubmitHandler<TheaterCreation>;
}

const validationRule = yup.object({
	name: yup
		.string()
		.required("The name is required")
		.test(firstLetterUppercase()),
	latitude: yup.number().required(),
	longitude: yup.number().required(),
});
