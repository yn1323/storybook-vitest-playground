import "./App.css";
import { Table } from "./components/table";
import { TableProvider } from "./components/table/context";
import { createData } from "./components/table/data";

function App() {
	// const tableHook = useTableHook();
	return (
		<div>
			<TableProvider>
				<Table rowData={createData()} />
			</TableProvider>
		</div>
	);
}

export default App;
