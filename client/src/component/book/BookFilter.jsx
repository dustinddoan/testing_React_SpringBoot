import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useStyles from "./BookStyle";
import { getBooksByTitle, selectBooks, selecteRequestStatus } from "../../module/book/bookSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../util/hook";

const BookFilter = () => {
    const classes = useStyles();
    const [searchText, setSearchText] = useState("");
    const dispatch = useAppDispatch();
   

    const handleSearchClick = () => {
         try {
            dispatch(getBooksByTitle(searchText));
         } catch (error) {
            console.log('error here: ')
         }
    }

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    }
    return (
        <Box className={classes.bookFilter}>
            <Paper className={classes.bookFilterPaper}>
                <Typography>Search Book Filter</Typography>
                <Box>
                    <TextField
                        placeholder="Enter book title"
                        id="book-search"
                        data-testid="book-title-input"
                        label="Enter book title"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                </Box>
            
                <Button
                    data-testid="book-search-button"
                    variant="contained"
                    color="primary"
                    onClick={handleSearchClick}
                >
                    Search
                </Button>
            
            </Paper>
        </Box>
    )
}

export default BookFilter;