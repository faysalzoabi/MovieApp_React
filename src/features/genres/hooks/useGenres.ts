import { useEffect, useState } from "react";
import type Genre from "../models/Genre.model";
import apiClient from "../../../api/apiClient";

export function useGenres(){
  const [genres, setGenres] = useState<Genre[]>();
	const [recordsPerPage, setRecordsPerPage] = useState(5);
	const [page, setPage] = useState(1);
	const [totalAmountOfRecords, setTotalAmountOfRecords] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadGenres = async () => {
			const response = await apiClient.get(`/genres`, {
				params: { page, recordsPerPage },
			});
			const data = response.data;
			const totalAmountOfRecords = parseInt(
				response.headers["total-records-count"],
				10,
			);
			setTotalAmountOfRecords(totalAmountOfRecords);
			setGenres(data);
			setLoading(false);
		};
		loadGenres();
	}, [page, recordsPerPage]);

  return {loading, page, recordsPerPage, totalAmountOfRecords, setPage, setRecordsPerPage, genres}
}