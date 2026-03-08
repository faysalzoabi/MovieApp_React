import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type ActorCreation from "../models/ActorCreation";
import ActorForm from "./ActorForm";
import Loading from "../../../components/Loading";
import type { SubmitHandler } from "react-hook-form";

export default function EditActor() {
	const { id } = useParams();
	const [model, setModel] = useState<ActorCreation | undefined>();

	useEffect(() => {
		const timerId = setTimeout(() => {
			setModel({
				name: "Faysal",
				dateOfBirth: "2022-11-23",
				picture:
					"https://upload.wikimedia.org/wikipedia/commons/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
			});
		}, 1000);

		return () => clearTimeout(timerId);
	}, []);

	const onSubmit: SubmitHandler<ActorCreation> = async (data) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		console.log(data);
	};

	return (
		<>
			<h3>Edit Actor</h3>
			{model ? <ActorForm onSubmit={onSubmit} model={model} /> : <Loading />}
		</>
	);
}
