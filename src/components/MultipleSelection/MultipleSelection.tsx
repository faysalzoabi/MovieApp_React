import type MultipleSelection from "./MultipleSelection.model";
import styles from "./MultipleSelection.module.css";
export default function MultipleSelection(props: MultipleSelectionProps) {
	return (
		<div className={styles.multipleSelectors}>
			<ul className={styles.list}>
				{props.nonSelected.map((item) => (
					<li key={item.key}>{item.description}</li>
				))}
			</ul>
			<div className={styles.buttons}>
				<button type="button">{">>"}</button>
				<button type="button">{"<<"}</button>
			</div>
			<ul className={styles.list}>
				{props.selected.map((item) => (
					<li key={item.key}>{item.description}</li>
				))}
			</ul>
		</div>
	);
}

interface MultipleSelectionProps {
	selected: MultipleSelection[];
	nonSelected: MultipleSelection[];
	onChange(
		selected: MultipleSelection[],
		nonSelected: MultipleSelection[],
	): void;
}
