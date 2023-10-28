import React from "react";
import PropTypes from 'prop-types';
import { Box } from "@mui/material";
import useStyles from "./BookStyle";

const bookShape = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired
};

const propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape(bookShape)).isRequired
};

const BookList = ({ books }) => {
    // books = [
    //     {
    //         id: "1",
    //         title: "Test Book",
    //         description: "Test description",
    //         releaseYear: 2021,
    //     },
    // ];
    // console.log("BOOKS: ", books)

    const classes = useStyles();
    
    return (
        <Box className={classes.bookList}>
            {books && Array.isArray(books) ?
                books.map((book) =>
                    <div key={book.id}>{book.id}</div>
                )
                : (<div>waiting...</div>)
            }
        </Box>
    );
    
}


BookList.propTypes = propTypes;

export default BookList;