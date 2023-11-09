import React from "react";
import BookContainer from "../BookContainer";
import renderWithRedux from "../../../util/testUtil";
import BookList from "../BookList";
import bookReducer, {
  getBooksAction,
  INITIAL_BOOK_REDUCER_STATE,
} from "../../../module/book/bookSlice";
import setupStore from "../../../util/store";
import axios from "axios";
import reduxThunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { screen, render } from "@testing-library/react";
import { getBooks } from "../../../module/book/bookSlice";
import { Provider } from "react-redux";


jest.mock("axios");
const middleware = [reduxThunk];

jest.mock("../BookList", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));




const books = [
  {
    id: "1",
    title: "Test Book 1",
    description: "Test description",
    releaseYear: 2021,
  },
];



const mockStore = configureStore(middleware);

// console.log("STORE TEST: ", store.getState())
describe("BookContainer", () => {
  beforeEach(() => {
    jest.resetModules();
  });


  it('should render without error', () => {
    const preloadedState = {
      bookReducer: {
        books: [
          {
            id: '1',
            title: 'Test Book 1',
            description: 'Test description',
            releaseYear: 2021,
          },
        ],
        requestStatus: 'succeeded',
      }
    }

    const store = mockStore(preloadedState);


    BookList.mockImplementation(() => {
      // console.log("STORE: ", store.getState())
      const requestStatus = store.getState().bookReducer.requestStatus
      return (requestStatus === 'succeeded') ?
        (< div data-testid="book-list" books={books} > mockcomponent</div >)
        :
        <></>

    });

    renderWithRedux(<BookContainer />, { store })
    // console.log("Received value:", BookList.mock.calls[0]);

    expect(screen.getByTestId("book-list")).toBeInTheDocument();


    expect(BookList).toHaveBeenCalledWith(
      {
        books: [
          {
            id: '1',
            title: 'Test Book 1',
            description: 'Test description',
            releaseYear: 2021,
          },
        ],
        "data-testid": "book-list",
      }, {}
    );



  })

  it('should show error message if failed to fetch data', () => {
    const preloadedState = {
      bookReducer: {
        books: [],
        requestStatus: 'failed',
        error: "Failed to get data"
      }
    }

    const store = mockStore(preloadedState);


    BookList.mockImplementation(() => {
      // console.log("STORE: ", store.getState())
      const requestStatus = store.getState().bookReducer.requestStatus
      return (requestStatus === 'failed') ?
        (<div data-testid="book-error-message">Error fetching data</div>)
        :
        <></>

    });

    renderWithRedux(<BookContainer />, { store })
    // console.log("Received value:", BookList.mock.calls[0]);

    expect(screen.getByTestId("book-error-message")).toBeInTheDocument();
    expect(screen.getByText("Error fetching data")).toBeInTheDocument();
  })


});



