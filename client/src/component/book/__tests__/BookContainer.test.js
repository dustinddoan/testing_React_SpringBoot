// import React from "react";
// import { Provider, useDispatch, useSelector } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import BookContainer from "../BookContainer";
// import renderWithRedux from "../../../util/testUtil";
// // import '@testing-library/jest-dom/extend-expect';
// import BookList from "../BookList";
// import { getBooksAction } from "../../../module/book/bookAction";
// import rootReducer from "../../../module";
// import { render } from "@testing-library/react";
// import App from "../../App";


// jest.mock("../BookList", () => {
//   return jest.fn(() => <div>mockcomponent</div>);
// });

// jest.mock("react-redux", () => ({
//   ...jest.requireActual("react-redux"),
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
// }));

// describe("BookContainer", () => {
//   // mock the action
//   // jest.mock("../../../module/book/bookAction", () => ({
//   //   getBooksAction: jest.fn(),
//   // }));

//   const mockData = [
//     {
//       id: "1",
//       title: "Test Book",
//       description: "Test description",
//       releaseYear: 2021,
//     },
//   ];

//   const initialState = {
//     bookReducer: {
//       books: mockData,
//     },
//   };

//   const mockStore = configureStore({
//     reducer: rootReducer, // Pass the rootReducer here
//     preloadedState: initialState,
//   });

//   let store;

//   beforeEach(() => {
//     store = mockStore;
//   });

//   it("should render without error", async () => {
//     const mockDispatch = jest.fn();

//     useDispatch.mockReturnValue(mockDispatch);

//     useSelector.mockImplementation((selector) => selector(initialState));
//     console.log("HELLO TEST");
//     const { asFragment } = renderWithRedux(<App />, { initialState });
    
//     console.log("TEST container: ", asFragment);
//     // const { container } = render(
//     //   <Provider store={store}>
//     //     <BookContainer />
//     //   </Provider>
//     // );
//     // await waitFor(() => {
//     //   // Add your assertions here
//     //   // For example, check if an element is present in the container
//     //   expect(container.querySelector(".your-selector")).toBeInTheDocument();
//     // });

//     expect(BookList).toHaveBeenCalledWith(
//       expect.objectContaining({
//         data: initialState.bookReducer.books,
//       })
//     );
//   });
// });

import React from "react";
import { render } from "@testing-library/react";
import BookContainer from "../BookContainer";
import renderWithRedux from "../../../util/testUtil";
import BookList from "../BookList";

jest.mock("../BookList", () => {
  return jest.fn(() => <div>mockcomponent</div>);
});

describe('BookContainer', () => {

  
  it('should reder without error', () => {
    const mockInitialBooks = [
      {
        id: "1",
        title: "Test Book",
        description: "Test description",
        releaseYear: 2021,
      },
    ];

    const preloadedState = {
      bookReducer: {
        mockInitialBooks
      },
    };

    const { container } = renderWithRedux(<BookContainer />, {
      preloadedState
    });

    expect(BookList).toHaveBeenCalled();
  })

})

