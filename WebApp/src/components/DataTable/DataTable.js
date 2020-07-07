import React from "react";
import MaterialTable from "material-table";

export default function DataTable(props) {
  const {
    columns,
    data,
    title,
    onRowAdd,
    onRowUpdate,
    onRowDelete,
    search,
    grouping,
    exportButton,
    paging,
    selection,
    sorting,
    actions,
  } = props;

  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      options={{
        search: search,
        grouping: grouping,
        exportButton: exportButton,
        actionsColumnIndex: -1,
        paging: paging,
        selection: selection,
        sorting: sorting,
      }}
      editable={{
        onRowAdd: onRowAdd,
        onRowUpdate: onRowUpdate,
        onRowDelete: onRowDelete,
      }}
      actions={actions}
    />
  );
}
