import { Box, Skeleton } from "@mui/material";
import React, { useEffect } from "react";

import BookFilter from "./BookFilter";
import useStyles from "./BookStyle";
import BookList from "./BookList";
import {useAppDispatch, useAppSelector} from '../../util/hook'
import { getBooks } from "../../module/book/bookSlice";

const BookContainer = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);


    const books = useAppSelector(state => state.book.books)
    const requestStatus = useAppSelector(state => state.book.requestStatus)

  

    // console.log("BOOKS: ", books)
    // console.log("BOOKS STATUS: ", requestStatus)
   

    const classes = useStyles();
    return (
        <Box className={classes.bookContainer}>
            <BookFilter />
            <Box className={classes.bookList}>
                {requestStatus === 'loading' && <Skeleton data-testid="book-loader"/>}
                {requestStatus === 'failed' && (<div data-testid="book-error-message">Error fetching data</div>)}
                {requestStatus === 'succeeded' && <BookList data-testid="book-list" books={books} />}
            </Box>
        </Box>
    )
}

export default BookContainer;