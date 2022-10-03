import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import 'react-data-table-component-extensions/dist/index.css';
import "styled-components";

export const DataTableComponent = ({ columns, rows }) => {
    const tableData = {
        columns,
        data: rows
    };
    return (
        <DataTableExtensions
            {...tableData}
            export={false}
            print={false}
            filter={false}
        >
            <DataTable
                noHeader
                defaultSortField="id"
                defaultSortAsc={false}
                pagination
                highlightOnHover
                width="auto"
            />
        </DataTableExtensions>
    );
}
