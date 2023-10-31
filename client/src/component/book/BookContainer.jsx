import { Box } from "@mui/material";
import React, { useEffect } from "react";

import BookFilter from "./BookFilter";
import useStyles from "./BookStyle";
import BookList from "./BookList";
import { useDispatch, useSelector } from "react-redux";

import { selectBooks, getBooksAction, selecteBookStatus } from "../../module/book/bookSlice";
import { useAppDispatch, useAppSelector } from "../../util/hook";

const BookContainer = () => {
    // const dispatch = useDispatch();
    // const books = useSelector(selectBooks);
    // const booksStatus = useSelector(selecteBookStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBooksAction());
    }, [dispatch]);


    const books = useAppSelector(selectBooks);
    const booksStatus = useAppSelector(selecteBookStatus);

    

    // useSelector(state => {
    //     console.log("state: ", state)
    // })


    // console.log("BOOKS: ", books)

    const classes = useStyles();
    return (
        <Box className={classes.bookContainer}>
            <BookFilter />
            <Box className={classes.bookList}>
                <BookList books={books}/>
            </Box>
        </Box>
    )
}

export default BookContainer;