const Rows = 3000;

export const createData = () => {
	const columnLength = Array.from({ length: 20 });
	const dataLength = Array.from({ length: Rows });

	const columns = columnLength.map((_, index) => ({
		id: `column-${index.toString().padStart(4, "0")}`,
		label: `Column ${index.toString().padStart(4, "0")}`,
	}));

	const data = dataLength.map((_, index) =>
		columns.reduce<Record<string, string>>(
			(acc, { id }) => ({
				// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
				...acc,
				[id]: `${id}-${index.toString().padStart(4, "0")}`,
			}),
			{},
		),
	);

	return {
		columns,
		data,
	};
};
