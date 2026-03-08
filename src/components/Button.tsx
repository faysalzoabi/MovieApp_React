import type React from "react";

export default function Button(props: ButtonProps) {
	return (
		<button
			onClick={props.onClick}
			type={props.type ?? "button"}
			disabled={props.disabled ?? false}
			className={props.className ?? "btn btn-primary"}
		>
			{props.children}
		</button>
	);
}

interface ButtonProps {
	children: React.ReactNode;
	onClick?(): void;
	type?: "button" | "submit";
	disabled?: boolean;
	className?: string;
}
