import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

const UsersContent = () => {
  const columns = [
    {
      name: "Username",
      selector: row => row.title,
      sortable: true,
    },
    {
      name: "Email",
      selector: row => row.year,
      sortable: true,
    },
    {
      name: "Forms Created",
      selector: row => row.year,
      sortable: true,
    },
    {
      name: "Actions",
      // width: "220px",
      cell: row => (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to={``} className="btn btn-primary">
            View
          </Link>
        </button>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
        backgroundColor: "#020617",
        color: "#fff"
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "#111",
        color: "#fff"
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  return (
    <div className="">
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        responsive
      />
    </div>
  );
};

export default UsersContent;
