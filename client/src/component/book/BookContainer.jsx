import { Box } from "@mui/material";
import React, { useEffect } from "react";

import BookFilter from "./BookFilter";
import useStyles from "./BookStyle";
import BookList from "./BookList";
import { useDispatch, useSelector } from "react-redux";

import { selectBooks, getBooksAction } from "../../module/book/bookSlice";
// import { useAppDispatch, useAppSelector } from "../../util/hook";

const BookContainer = () => {

    // const dispatch = useDispatch();

    // // dispatch(getBooksAction()); // need to use useEffect to call this one time
    // // dispatch is dependency, when dispatch change, it will get new data

    // useEffect(() => {
    //     dispatch(getBooksAction());
    // }, [dispatch]);
    // console.log("hello");


    // const books = useSelector((state) => {
    //     console.log('State in BookContainer:', state.getState().bookReducer);
    //     return state.bookReducer.books;
    // });
    // const books = [
    //     {
    //         id: "1",
    //         title: "Test Book",
    //         description: "Test description",
    //         releaseYear: 2021,
    //     },
    // ];
    // const books = useSelector(getBooksSelector);
    // console.log('Bookcontainer: ', state);
    // console.log('Bookcontainer: ', books);

    // const dispatch = useAppDispatch();

    // const books = useAppSelector(selectBooks);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getBooksAction());
    }, [dispatch]);

    const books = useSelector(selectBooks);

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