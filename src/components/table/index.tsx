import {
	type Row,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { memo, useEffect, useMemo, useRef } from "react";
import { useTableContext } from "./context";
import type { createData } from "./data";

type Column = {
	[key: string]: string;
};

type Props = {
	rowData: ReturnType<typeof createData>;
};

function useMeasure() {
	const timer = useRef(new Date());

	useEffect(() => {
		console.log("mogemoe");
	}, []);
}

export const Table = memo(({ rowData }: Props) => {
	useMeasure();

	const { clickedRow, setClickedRow } = useTableContext();

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
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<TableRow
						key={index}
						row={row}
						index={index}
						clickedRow={clickedRow}
						setClickedRow={setClickedRow}
					/>
				))}
			</tbody>
		</table>
	);
});

type TableRowProps = {
	row: Row<Column>;
	index: number;
	clickedRow: number;
	setClickedRow: (index: number) => void;
};

const TableRow = memo(
	({ row, index, clickedRow, setClickedRow }: TableRowProps) => {
		return (
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
		);
	},
	(prevProps, nextProps) => {
		// 行がクリックされたか、データが変わっていない場合は再レンダリングしない
		return (
			prevProps.clickedRow === nextProps.clickedRow &&
			prevProps.row === nextProps.row
		);
	},
);

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
