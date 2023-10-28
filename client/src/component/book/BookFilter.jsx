import { Box, Paper } from "@mui/material";
import React from "react";
import useStyles from "./BookStyle";

const BookFilter = () => {
    const classes = useStyles();
    return (
        <Box className={classes.bookFilter}>
            <Paper className={classes.bookFilterPaper}>
                Book filter
            </Paper>
        </Box>
    )
}

export default BookFilter;