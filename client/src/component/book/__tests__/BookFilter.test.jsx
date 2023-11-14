import React from "react";
import BookFilter from "../BookFilter";
import renderWithRedux from "../../../util/testUtil";
import { fireEvent, screen } from "@testing-library/react";
import { getBooksByTitle } from "../../../module/book/bookSlice";
import setupStore from "../../../util/store";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import axios from "axios";

const middleware = [thunk];
const mockStore = configureStore(middleware);
jest.mock("axios");



jest.mock("../../../module/book/bookSlice")
describe('BookFilter', () => {
    it('should fire action', async () => {
        const preloadedState = {
            books: [],
            requestStatus: 'uninitialized',
            error: null
        };

        const store = mockStore(preloadedState)

        renderWithRedux(<BookFilter />, { store })

        getBooksByTitle.mockImplementation(() => (dispatch) => {})

        const fieldText = screen.getByLabelText('Enter book title');
        fireEvent.change(fieldText, { target: { value: 'test title' } })



        const searchButton = screen.getByText('Search');
        fireEvent.click(searchButton);

        expect(1).toEqual(1);
        expect(getBooksByTitle).toHaveBeenCalledWith('test title')
    })
    
})