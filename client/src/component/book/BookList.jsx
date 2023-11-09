import React from "react";
import PropTypes from 'prop-types';
import { Box } from "@mui/material";
import useStyles from "./BookStyle";
import BookListItem from "./BookListItem";

const bookShape = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired
};

const propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape(bookShape)).isRequired
};

const BookList = ({books}) => {
    const classes = useStyles();
    
    return (
        <Box className={classes.bookList} ml={5}>
            {books && Array.isArray(books) ?
                books.map((book) =>
                    <BookListItem key={ book.id } book={book} />
                )
                : (<div>waiting...</div>)
            }
        </Box>
    );
    
}


BookList.propTypes = propTypes;

export default BookList;