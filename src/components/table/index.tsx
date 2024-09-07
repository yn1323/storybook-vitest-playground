import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import type { createData } from "./data";
import type { useTableHook } from "./hook";

type Column = {
	[key: string]: string;
};

type Props = {
	rowData: ReturnType<typeof createData>;
} & ReturnType<typeof useTableHook>;

export const Table = ({ rowData, clickedRow, setClickedRow }: Props) => {
	const columns = useMemo(
		() => createColumns(rowData.columns),
		[rowData.columns],
	);
	const data = useMemo(() => createRows(rowData.data), [rowData.data]);

	const table = useReactTable({
		columns,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		data: data as any,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<table>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th
								key={header.id}
								scope="col"
								className="gap-2 whitespace-nowrap px-3 py-4"
							>
								{flexRender(
									header.column.columnDef.header,
									header.getContext(),
								)}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map((row, index) => (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<tr
						key={row.original.id}
						style={{
							background: index === clickedRow ? "red" : undefined,
							cursor: "pointer",
						}}
						onClick={() => {
							setClickedRow(index);
						}}
					>
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

function createColumns(columns: Props["rowData"]["columns"]) {
	const columnHelper = createColumnHelper<Column>();

	const customColumn = columns.map(({ id, label }) =>
		columnHelper.accessor(id, {
			header: () => label,
		}),
	);

	return customColumn;
}

function createRows(data: Props["rowData"]["data"]) {
	return data;
}
