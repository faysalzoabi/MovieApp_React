import GenericList from "../../../components/GenericList";
import type Movie from "../models";
import DisplayMovie from "./DisplayMovie";
import styles from "./MoviesList.module.css";

export default function MovieSList({ movies }: MovieSListProps) {
	return (
		<GenericList list={movies}>
			<div className={styles.div}>
				{movies?.map((movie) => (
					<DisplayMovie key={movie.id} movie={movie} />
				))}
			</div>
		</GenericList>
	);
}

interface MovieSListProps {
	movies?: Movie[];
}
