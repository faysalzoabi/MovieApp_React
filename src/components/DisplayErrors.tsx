export default function DisplayErrors(props: DisplayErrorsProps) {
	return (
		<>
			<ul className="error">
				{props.errors.map((error) => (
					<li key={error}>{error}</li>
				))}
			</ul>
		</>
	);
}

interface DisplayErrorsProps {
	errors: string[];
}
