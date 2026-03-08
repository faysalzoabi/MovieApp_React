import { Typeahead } from "react-bootstrap-typeahead";
import type MovieActors from "../models/MovieActor.model";
import type { Option } from "react-bootstrap-typeahead/types/types";
import { useState } from "react";

export default function TypeAheadActors(props: TypeAheadActorProps) {
	const actors: MovieActors[] = [
		{
			id: 1,
			name: "Tom holland",
			character: "",
			picture:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tom_Holland_during_pro-am_Wentworth_golf_club_2023-2.jpg/1280px-Tom_Holland_during_pro-am_Wentworth_golf_club_2023-2.jpg",
		},
		{
			id: 2,
			name: "Linux Trovald",
			character: "",
			picture:
				"https://upload.wikimedia.org/wikipedia/commons/e/e8/Lc3_2018_%28263682303%29_%28cropped%29.jpeg",
		},
		{
			id: 3,
			name: "Steve Job",
			character: "",
			picture:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/1920px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
		},
	];

	const selection: MovieActors[] = [];

	const [draggedElement, setDraggedElement] = useState<MovieActors | undefined>(
		undefined,
	);

	function handleDragStart(actor: MovieActors) {
		setDraggedElement(actor);
	}

	function handleDragOver(actor: MovieActors) {
		if (!draggedElement || actor.id === draggedElement.id) return;
		const actors = [...props.actors];
		const fromIndex = actors.findIndex((ca) => ca.id === draggedElement.id);
		const toIndex = actors.findIndex((ca) => ca.id === actor.id);

		if (fromIndex !== -1 && toIndex !== -1) {
			[actors[fromIndex], actors[toIndex]] = [
				actors[toIndex],
				actors[fromIndex],
			];
			props.onAdd(actors);
		}
	}

	return (
		<>
			<label>Actors</label>
			<Typeahead
				onChange={(actors: Option[]) => {
					const selectedActor = actors[0] as MovieActors;
					if (
						props.actors.findIndex((item) => item.id === selectedActor.id) ===
						-1
					) {
						selectedActor.character = "";
						props.onAdd([...props.actors, selectedActor]);
					}
				}}
				options={actors}
				filterBy={["name"]}
				labelKey={(option: Option) => {
					const actor = option as MovieActors;
					return actor.name;
				}}
				placeholder="Write name of character"
				minLength={2}
				selected={selection}
				renderMenuItemChildren={(option: Option) => {
					const actor = option as MovieActors;
					return (
						<>
							<img
								src={actor.picture}
								alt="actor's image"
								style={{ height: "64px", width: "64px", marginRight: "10px" }}
							/>
							<span>{actor.name}</span>
						</>
					);
				}}
				flip={true}
			/>
			<ul className="list-group">
				{props.actors.map((actor) => (
					<li
						draggable={true}
						onDragStart={() => handleDragStart(actor)}
						onDragOver={() => handleDragOver(actor)}
						key={actor.id}
						className="list-group-item d-flex align-items-center"
					>
						<div style={{ width: "70px" }}>
							<img
								alt="picture"
								style={{ height: "60px" }}
								src={actor.picture}
							/>
						</div>

						<div style={{ width: "150px", marginLeft: "1rem" }}>
							{actor.name}
						</div>

						<div className="flex-grow-1 mx-3">
							<input
								className="form-control"
								placeholder="Character"
								value={actor.character}
								onChange={(e) =>
									props.onCharacterChange(actor.id, e.currentTarget.value)
								}
							/>
						</div>

						<span
							role="button"
							className="badge text-bg-secondary"
							onClick={() => props.onRemove(actor)}
						>
							X
						</span>
					</li>
				))}
			</ul>
		</>
	);
}

interface TypeAheadActorProps {
	actors: MovieActors[];
	onAdd(actors: MovieActors[]): void;
	onRemove(actors: MovieActors): void;
	onCharacterChange(id: number, character: string): void;
}
