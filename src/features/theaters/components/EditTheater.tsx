import { useParams } from "react-router";
import type TheaterCreation from "../models/TheaterCreation.model";
import { useEffect, useState } from "react";
import TheaterForm from "./TheaterForm";
import Loading from "../../../components/Loading";
import type { SubmitHandler } from "react-hook-form";

export default function EditTheater() {
	const { id } = useParams();
	const [model, setModel] = useState<TheaterCreation | undefined>(undefined);

	useEffect(() => {
		const timeerId = setTimeout(() => {
			setModel({
				name: "Sambil " + id,
				latitude: 25.098222369997064,
				longitude: 55.19556999206544,
			});
		}, 1000);

		return () => clearTimeout(timeerId);
	}, [id]);

	const onSubmit: SubmitHandler<TheaterCreation> = async (data) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		console.log(data);
	};

	return (
		<>
			<h3>Edit Theater </h3>
			{model ? <TheaterForm model={model} onSubmit={onSubmit} /> : <Loading />}
		</>
	);
}
