import { useState } from "react";
import { createData } from "./data";

export const useTableHook = () => {
	const [data] = useState(createData());

	const [clickedRow, setClickedRow] = useState(-1);

	return {
		data,
		clickedRow,
		setClickedRow,
	};
};
