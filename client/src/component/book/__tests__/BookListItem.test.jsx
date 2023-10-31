import React from "react";
import { render, screen } from "@testing-library/react";
import BookListItem from "../BookListItem";

describe('BookListItem', () => {
    it('should render without error', () => {
        const book = {
            id: "1",
            title: "Test Book",
            description: "Test description 1",
            releaseYear: 2021,
        }

        render(<BookListItem book={book} />)
        // there are more than one "Test Book" in the document
        // getAllByText return array with all match
        expect(screen.getAllByText("Test Book")[0]).toBeInTheDocument();
        expect(screen.getByText("Test description 1")).toBeInTheDocument();
        expect(screen.getByText("2021")).toBeInTheDocument();
    })
   
})