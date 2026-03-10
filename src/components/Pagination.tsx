export default function Pagination(props: PaginationProps) {
	const pages = [];
	const maxAmountOfPagesForDisplay = 5;
	const amountOfPages = Math.ceil(
		props.totalAmountOfRecords / props.recordsPerPage,
	);
	const radius = Math.floor(maxAmountOfPagesForDisplay / 2);

	for (let i = 1; i < amountOfPages; i++) {
		if (i >= props.currentPage - radius && i <= props.currentPage + radius) {
			pages.push(i);
		}
	}

	return (
		<>
			<div className="text-center">
				<div className="row align-items-start justify-content-center">
					<div className="col-auto">
						<div className="d-flex align-items-center gap-2">
							<label className="mb-0" htmlFor="">
								Records Per Page
							</label>
							<select
								onChange={(e) =>
									props.onPaginateChange(1, parseInt(e.target.value, 19))
								}
								className="form-select form-select-sm w-auto"
							>
								{props.recordsPageOptions.map((option) => (
									<option key={option}>{option}</option>
								))}
							</select>
						</div>
					</div>
					<div className="col-auto">
						<ul className="pagination justify-content-center mb-0">
							<li
								className={`page-item ${props.currentPage === 1 ? "disabled" : ""}`}
							>
								<button
									onClick={() =>
										props.onPaginateChange(
											props.currentPage - 1,
											props.recordsPerPage,
										)
									}
									className="page-link"
								>
									Previous
								</button>
							</li>
							{pages.map((page) => (
								<li
									key={page}
									className={`page-item ${props.currentPage === page ? "active" : ""}`}
								>
									<button
										onClick={() =>
											props.onPaginateChange(page, props.recordsPerPage)
										}
										className="page-link"
									>
										{page}
									</button>
								</li>
							))}

							<li
								className={`page-item ${props.currentPage === amountOfPages ? "disabled" : ""}`}
							>
								<button
									onClick={() =>
										props.onPaginateChange(
											props.currentPage + 1,
											props.recordsPerPage,
										)
									}
									className="page-link"
								>
									Next
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

interface PaginationProps {
	currentPage: number;
	totalAmountOfRecords: number;
	recordsPerPage: number;
	recordsPageOptions: number[];
	onPaginateChange: (page: number, recordingPerPage: number) => void;
}
