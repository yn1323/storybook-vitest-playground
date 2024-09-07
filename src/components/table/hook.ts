import { useCallback, useState } from "react";
import { createData } from "./data";

export const useTableHook = () => {
	const [data] = useState(createData());

	const [clickedRow, _setClickedRow] = useState(-1);
	const setClickedRow = useCallback((rowIndex: number) => {
		_setClickedRow(rowIndex);
	}, []);

	return {
		data,
		clickedRow,
		setClickedRow,
	};
};
