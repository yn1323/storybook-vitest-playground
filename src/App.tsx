import "./App.css";
import { Table } from "./components/table";
import { useTableHook } from "./components/table/hook";

function App() {
	const tableHook = useTableHook();
	return (
		<div>
			<Table rowData={tableHook.data} {...tableHook} />
		</div>
	);
}

export default App;
