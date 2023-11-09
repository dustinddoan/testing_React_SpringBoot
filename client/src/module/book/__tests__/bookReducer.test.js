import bookReducer, { getBooks, INITIAL_BOOK_REDUCER_STATE } from "../bookSlice";

describe("bookReducer", () => {
  it("should return correct new state", () => {
    const mockData = [
      {
        id: 1,
        title: "Test Book",
        description: "Test description",
        releaseYear: 2021,
      },
    ];

    const newState = bookReducer(
      INITIAL_BOOK_REDUCER_STATE,
      getBooks.fulfilled(mockData)
    );

    // console.log("----DUSTIN newState: ", newState);

    expect(newState.books).toEqual(mockData);
    expect(newState.requestStatus).toEqual('succeeded');
  });


  it("should return handle reject state correctly", () => {

    const newState = bookReducer(
      INITIAL_BOOK_REDUCER_STATE,
      getBooks.rejected(new Error())
    );

    // console.log("----DUSTIN newState: ", newState);

    
    expect(newState.requestStatus).toEqual('failed');
  });
});
