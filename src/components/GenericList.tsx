import Loading from "./Loading";

export default function GenericList<T>(props: GenericListProps<T>) {
	if (!props.list) {
		return <>{props.loadingUI || <Loading />}</>;
	}
	if (props.list.length === 0) {
		return <>{props.emptyListUI || "No items to display."}</>;
	}
	return <>{props.children}</>;
}

interface GenericListProps<T> {
	list: T[] | undefined;
	children: React.ReactNode;
	loadingUI?: React.ReactNode;
	emptyListUI?: React.ReactNode;
}
