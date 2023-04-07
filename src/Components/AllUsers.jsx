import React, { useEffect, useState } from "react";
import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  makeStyles,
  Button,
} from "@material-ui/core";
import { deleteUser, getallUsers } from "../service/api";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  table: {
    width: "80%",
    margin: "50px 100px 100px 140px",
  },
  thead: {
    "& > *": {
      background: "#000000",
      color: "#FFFFFF",
      fontSize: "16px",
    },
  },
  trow: {
    "& > *": {
      fontSize: "16px",
    },
  },
});


const AllUsers = () => {
  const classes = useStyle();

  const [user, setUser] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await getallUsers();
    // console.log(response);
    setUser(response.data);
  };

  const deleteData = async (id) => {
    console.log(id);
    await deleteUser(id);
    getUsers();
  };


  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow className={classes.thead}>
          <TableCell>STT</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
          <TableCell></TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {user.map((data,index) => (
          <TableRow key={data._id.toString()} className={classes.trow}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{data.role}</TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "0px 20px" }}
                component={Link}
                to={`/edit/${data._id.toString()}`}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: "0px 20px" }}
                onClick={() => deleteData(data._id.toString())}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllUsers;
