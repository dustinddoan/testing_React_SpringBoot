import React from "react";
import BookContainer from "../BookContainer";
import renderWithRedux from "../../../util/testUtil";
import BookList from "../BookList";
import bookSlice, { getBooksAction } from "../../../module/book/bookSlice";
import { getByTestId, screen } from "@testing-library/react";
import configureStore from 'redux-mock-store';
import axios from "axios";
import { rootReducer } from "../../../module/store";
import reduxThunk from 'redux-thunk'


// import { http, HttpResponse } from 'msw'
// import { setupServer } from 'msw/node'
// import { render, screen, waitFor } from '@testing-library/react'

// import baseUrl from "../../../config"
// import { TextEncoder, TextDecoder } from 'text-encoding';

// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

jest.mock("../BookList", () => {
  return jest.fn(() => <div>mockcomponent</div>);
});

jest.mock('axios');
const middleware = [reduxThunk];
const mockStore = configureStore(middleware);






describe('BookContainer', () => {

  it('should reder without error', async () => {
    const books = [
      {
        id: "1",
        title: "Test Book",
        description: "Test description",
        releaseYear: 2021,
      },
    ];

    const preloadedState = {
      bookReducer: {
        books,
        requestStatus: {
          isPending: false,
          isFulfilled: false,
          isReject: false
        }  
      },
    };

    const { container } = renderWithRedux(<BookContainer />, { preloadedState }, {});

    expect(BookList).toHaveBeenCalled();
    expect(BookList).toHaveBeenCalledWith({ books }, {});
  })

  it('should render with action type', async () => {
    const store = mockStore({})
    const mockData = [
      {
        books: [],
        requestStatus: {
          isPending: true,
          isFulfilled: false,
          isReject: false
        }
      }
    ] 

    axios.get.mockResolvedValue({
      data: mockData
    })

    await store.dispatch(getBooksAction())

    console.log("actions type: ", store.getActions())
    console.log("actions payload: ", store.getActions())
    console.log("state: ", store.getState())
    



    
    renderWithRedux(<BookContainer />, {});

    // console.log("actions: ", actions)

    expect(screen.getByTestId('book-loader')).toBeInTheDocument();



  })

})

