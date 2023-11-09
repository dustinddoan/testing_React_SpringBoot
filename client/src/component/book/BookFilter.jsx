import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import useStyles from "./BookStyle";

const BookFilter = () => {
    const classes = useStyles();
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
                    />
                </Box>
            
                <Button
                    data-testid="book-search-button"
                    variant="Contained"
                    color="primary"
                >
                    Search
                </Button>
            
            </Paper>
        </Box>
    )
}

export default BookFilter;