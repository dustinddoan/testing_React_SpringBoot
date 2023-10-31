import React from "react";
import { render } from "@testing-library/react";
import BookList from "../BookList";
import BookListItem from "../BookListItem";

jest.mock("../BookListItem", () => {
    return jest.fn(() => <div>MockBookListItem</div>)
})

describe('BookList', () => {
    it('renders without crashing', () => {
        const books = [
            {
                id: "1",
                title: "Test Book",
                description: "Test description 1",
                releaseYear: 2021,
            },
            {
                id: "2",
                title: "Test Book 2",
                description: "Test description 2",
                releaseYear: 2022,
            },
        ];
        render(<BookList books={books}/>);
        expect(BookListItem).toHaveBeenCalled();
        expect(BookListItem.mock.calls).toHaveLength(2);
        expect(BookListItem).toHaveBeenCalledWith({ book: books[0] }, {})
    })
})