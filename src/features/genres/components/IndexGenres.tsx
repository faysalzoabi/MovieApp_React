import { NavLink } from "react-router";
import GenericList from "../../../components/GenericList";
import Button from "../../../components/Button";
import Pagination from "../../../components/Pagination";
import Loading from "../../../components/Loading";
import { useGenres } from "../hooks/useGenres";

export default function IndexGenres() {
	const {
		loading,
		page,
		recordsPerPage,
		totalAmountOfRecords,
		setPage,
		setRecordsPerPage,
		genres,
	} = useGenres();

	return (
		<>
			<h3>Genres</h3>
			<div className="mb-2">
				<NavLink className="btn btn-primary" to="/genres/create">
					Create Genre
				</NavLink>
			</div>

			{loading ? (
				<Loading />
			) : (
				<>
					<div className="mb-2">
						<Pagination
							totalAmountOfRecords={totalAmountOfRecords}
							currentPage={page}
							recordsPerPage={recordsPerPage}
							onPaginateChange={(page, recordsPerPage) => {
								setPage(page);
								setRecordsPerPage(recordsPerPage);
							}}
							recordsPageOptions={[5, 20, 50]}
						/>
					</div>

					<GenericList list={genres}>
						<table className="table table-hover align-middle shadow-sm border rounded overflow-hidden">
							<thead className="table-light">
								<tr>
									<th scope="col">Name</th>
									<th scope="col" className="text-end">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{genres?.map((genre) => (
									<tr key={genre.id}>
										<td>{genre.name}</td>
										<td className="text-end">
											<NavLink
												to={`/genres/edit/${genre.id}`}
												className="btn btn-sm btn-outline-primary me-2"
											>
												<i className="bi bi-pencil me-1"></i>Edit
											</NavLink>
											<Button className="btn btn-sm btn-outline-danger me-2">
												<i className="bi bi-trash me-1"></i>Delete
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</GenericList>
				</>
			)}
		</>
	);
}
