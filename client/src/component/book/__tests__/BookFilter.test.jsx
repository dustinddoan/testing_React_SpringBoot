import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import BookFilter from "../BookFilter";
import { getBooksByTitle } from "../../../module/book/bookSlice";
import renderWithRedux from "../../../util/testUtil";

jest.mock("../../../module/book/bookSlice");

describe('BookFilter', () => { 
    it('should fire getBooksByTitle action on click Search button', () => {
        renderWithRedux(<BookFilter />, {});

        const textField = screen.getByLabelText("Enter book title");

        fireEvent.change(
            textField,
            { target: { value: 'test title' } }
        )

        const searchButton = screen.getByText('search');

        fireEvent.click(searchButton);

        expect(getBooksByTitle).toHaveBeenCalledWith('test title');
        
    })
})