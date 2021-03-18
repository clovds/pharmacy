import React, { useEffect, useState } from "react";
import {
  Button,
  makeStyles,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import {
  addNewCategoryAction,
  deleteCategoryAction,
  editCategoryAction,
  fetchCategoryAction,
  fetchProductAction,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

const CategoriesAdmin = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.product.category);

  const [perPage] = useState(10);
  const [page, setPage] = useState(0);
  const from = page * perPage;
  const to = (page + 1) * perPage;
  const { product_list, loading } = useSelector((state) => state.product);
  const [pageCount, setPageCount] = useState(category.length / perPage);

  const data = category.filter((val, index) => {
    return index >= from && index < to;
  });

  useEffect(() => {
    dispatch(fetchProductAction());
  }, [dispatch]);

  const [product_category, setCategory] = useState("");
  const [idCat, setIdCat] = useState(0);
  const [clicked, setClick] = useState(false);
  const [addClick, setAddClick] = useState(false);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  const [searchWord, setSearch] = useState("");

  const toggle = (id) => {
    let catCheck = product_list.find((val) => val.product_category_id === id);
    if (catCheck) {
      Swal.fire({
        icon: "warning",
        title: "You can't delete this category!",
        text: "There's still some products in this category",
      });
    } else {
      Swal.fire({
        title: `Are you sure to delete this category?`,
        text: "You won't be able to revert this",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, deleted!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteCategoryAction(id));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    }
  };
  const editButton = (id) => {
    setClick(true);
    setIdCat(id);
    console.log(idCat);
    console.log(clicked);
  };
  const saveButton = (id) => {
    if (product_category) {
      dispatch(editCategoryAction({ id, product_category }));
      setClick(false);
    }
  };

  const cancelButton = () => {
    setClick(false);
    setAddClick(false);
  };

  const searchBtn = () => {
    const a = `?search=${searchWord}`;
    dispatch(fetchCategoryAction(a));
  };

  const saveAddBtn = (product_category) => {
    if (product_category) {
      dispatch(addNewCategoryAction(product_category));
      setAddClick(false);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Can't add a blank category",
        text: "You need to fill category name!",
      });
    }
  };
  const [filterCategory, setFilterCategory] = useState("");
  const [openn, setOpenn] = useState(false);

  const handleFilterCategory = (e) => {
    setFilterCategory(e.target.value);
  };
  const handleOpenn = () => {
    setOpenn(true);
  };
  const handleClosee = () => {
    setOpenn(false);
  };

  const renderRow = () => {
    let newCat;
    if (filterCategory) {
      newCat = data.filter((val) => val.product_category_id === filterCategory);
    } else {
      newCat = data;
    }
    return newCat.map((row, index) => (
      <TableRow key={row.product_category_id}>
        <TableCell>{index + 1}</TableCell>
        {clicked && row.product_category_id === idCat && addClick === false ? (
          <>
            <TableCell>
              <TextField
                placeholder="Category Name"
                label="Category Name"
                id="category-name"
                defaultValue={row.product_category}
                size="small"
                onChange={(e) => setCategory(e.target.value)}
              />
            </TableCell>
            <TableCell align="center">
              <Button
                onClick={() => saveButton(row.product_category_id)}
                style={{ backgroundColor: "grey", color: "black" }}
              >
                Save
              </Button>
              <Button
                onClick={() => cancelButton(row.product_category_id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginLeft: "20px",
                }}
              >
                Cancel
              </Button>
            </TableCell>
          </>
        ) : (
          <>
            <TableCell>{row.product_category}</TableCell>
            <TableCell align="center">
              <Button
                onClick={() => editButton(row.product_category_id)}
                style={{ backgroundColor: "grey", color: "black" }}
                disabled={addClick}
              >
                Edit
              </Button>
              <Button
                onClick={() => toggle(row.product_category_id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginLeft: "20px",
                }}
                disabled={addClick}
              >
                Delete
              </Button>
            </TableCell>
          </>
        )}
      </TableRow>
    ));
  };
  const renderNewRow = () => {
    return addClick ? (
      <TableRow>
        <TableCell></TableCell>
        <TableCell>
          <TextField
            placeholder="Category Name"
            label="Category Name"
            id="category-name"
            size="small"
            onChange={(e) => setCategory(e.target.value)}
          />
        </TableCell>
        <TableCell align="center">
          <Button
            onClick={() => saveAddBtn(product_category)}
            style={{ backgroundColor: "grey", color: "black" }}
          >
            Save
          </Button>
          <Button
            onClick={cancelButton}
            style={{
              backgroundColor: "red",
              color: "white",
              marginLeft: "20px",
            }}
          >
            Cancel
          </Button>
        </TableCell>
      </TableRow>
    ) : null;
  };
  useEffect(() => {
    setPageCount(category.length / perPage);
  }, [perPage, category]);

  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
  };

  const renderAll = () => {
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex" }}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderRow()}
                  {renderNewRow()}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "275px",
              paddingTop: "17px",
              maxHeight: "50px",
              position: "fixed",
              left: "78%",
            }}
          >
            <Button
              style={{ backgroundColor: "black", color: "white" }}
              onClick={() => setAddClick(true)}
            >
              Add New Category
            </Button>
            <FormControl style={{ width: "275px" }}>
              <InputLabel id="demo-controlled-open-select-label">
                Filter By Category
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="category"
                open={openn}
                onClose={handleClosee}
                onOpen={handleOpenn}
                onChange={handleFilterCategory}
              >
                <MenuItem value="">All</MenuItem>
                {data.map((val) => (
                  <MenuItem value={val.product_category_id}>
                    {val.product_category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div>
              <TextField
                placeholder="Search..."
                label="Search"
                id="search"
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "275px", paddingBottom: "10px" }}
              />
            </div>
            <Button onClick={searchBtn} style={{ backgroundColor: "teal" }}>
              Search
            </Button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col mx-2">
      <div className="flex flex-wrap">{loading ? null : renderAll()}</div>
      <div className="flex-row align-baseline">
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default CategoriesAdmin;
