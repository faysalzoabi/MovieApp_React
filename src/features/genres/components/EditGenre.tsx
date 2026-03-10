import { useNavigate, useParams } from "react-router";
import type CreateGenre from "../models/CreateGenre.model";
import type { SubmitHandler } from "react-hook-form";
import GenreForm from "./GenreForm";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import apiClient from "../../../api/apiClient";
import type Genre from "../models/Genre.model";
import extractErrors from "../../../utils/extractErrors";
import type { AxiosError } from "axios";

export default function EditGenre() {
	const [model, setModel] = useState<CreateGenre | undefined>(undefined);
	const { id } = useParams();
	const [errors, setErrors] = useState<string[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchGenre() {
			const response = await apiClient.get<Genre>(`/genres/${id}`);
			setModel(response.data);
		}

		fetchGenre();
	}, [id]);

	const onSubmit: SubmitHandler<CreateGenre> = async (data) => {
		try {
			await apiClient.put(`/genres/${id}`, data);
			navigate("/genres");
		} catch (err) {
			const errors = extractErrors(err as AxiosError);
			setErrors(errors);
		}
	};
	return (
		<>
			<h3>Edit Genre:</h3>
			{model ? (
				<GenreForm errors={errors} onSubmit={onSubmit} model={model} />
			) : (
				<Loading />
			)}
		</>
	);
}
