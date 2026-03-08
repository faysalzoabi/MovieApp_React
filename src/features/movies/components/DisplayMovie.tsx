import { NavLink } from "react-router";
import type Movie from "../models";
import styles from "./DisplayMovie.module.css";

export default function DisplayMovie(props: DisplayMoveProps) {
	const buildLink = () => `/movies/${props.movie.id}`;
	return (
		<div className={styles.div}>
			<NavLink to={buildLink()}>
				<img src={props.movie.poster} alt={props.movie.title} />
			</NavLink>
			<p>
				<NavLink to={buildLink()}>{props.movie.title}</NavLink>
			</p>
		</div>
	);
}

interface DisplayMoveProps {
	movie: Movie;
}
