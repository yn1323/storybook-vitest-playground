import { type ReactNode, createContext, useContext } from "react";
import { useTableHook } from "./hook";

const TableContext = createContext<ReturnType<typeof useTableHook> | null>(
	null,
);

export const TableProvider = ({ children }: { children: ReactNode }) => {
	const tableState = useTableHook();

	return (
		<TableContext.Provider value={tableState}>{children}</TableContext.Provider>
	);
};

export const useTableContext = () => {
	const context = useContext(TableContext);
	if (!context) {
		throw new Error("useTableContext must be used within a TableProvider");
	}
	return context;
};
