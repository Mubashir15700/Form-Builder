import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import { getUsers } from "../../api/admin";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await getUsers();
        if (response && response.status === 200) {
          setUsers(response.usersData);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occured: ", error);
      }
    };

    getAllUsers();
  }, []);

  const columns = [
    {
      name: "Username",
      selector: row => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true,
    },
    {
      name: "Forms Created",
      selector: row => row.formsCreated,
      sortable: true,
    },
    {
      name: "Actions",
      cell: row => (
        <button
          className={`bg-blue-500 ${row.formsCreated > 0 && "hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded`}
        >
          {/* Conditionally render the Link component */}
          {row.formsCreated === 0 ? (
            <span className="text-gray-400">View Forms</span>
          ) : (
            <Link to={``} className="btn btn-primary">
              View Forms
            </Link>
          )}
        </button>
      ),
    }
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
    <div>
      <DataTable
        columns={columns}
        data={users}
        customStyles={customStyles}
        responsive
      />
    </div>
  );
};

export default UsersTable;
