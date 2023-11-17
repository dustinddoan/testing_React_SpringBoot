import configureStore from "redux-mock-store";
import reduxThunk from "redux-thunk";
import axios from "axios";
// import getBooksAction from '../bookAction';
import { getBooks, getBooksByTitle } from "../bookSlice";

jest.mock("axios");
const middleware = [reduxThunk];
const mockStore = configureStore(middleware);

describe("BookActions", () => {
  beforeEach(() => {
    axios.get.mockImplementation(() => {
      return Promise.resolve({
        data: [
          {
            id: 1,
            title: "Test Book",
            description: "Test description",
            releaseYear: 2021,
          },
        ],
      });
    });
  });

  it("should be able to dispatch success action", async () => {
    const store = mockStore(); // initial state

    await store.dispatch(getBooks());

    const actions = store.getActions();

    console.log("ACTIONS TEST: ", actions[1])

    expect(actions.length).toEqual(2);


    expect(actions[1].type).toEqual("books/getBooks/fulfilled");
    expect(actions[1].payload).toEqual([
      {
        id: 1,
        title: "Test Book",
        description: "Test description",
        releaseYear: 2021,
      },
    ]);
  });

  it("should able to dispatch bookByTitle action", async () => {
    const store = mockStore();
    await store.dispatch(getBooksByTitle("Test Book"));
    const actions = store.getActions();

    // console.log("ACTIONS TEST: ", actions);
    expect(actions.length).toEqual(2);

    expect(actions[1].type).toEqual("books/getBooksByTitle/fulfilled");
    expect(actions[1].payload).toEqual([
      {
        id: 1,
        title: "Test Book",
        description: "Test description",
        releaseYear: 2021,
      },
    ]);
  });

  it("should able to dispatch error action", async () => {
    const store = mockStore();
    axios.get.mockImplementation(() => {
      throw new Error();
    });

    await store.dispatch(getBooksByTitle("Test Book"));
    const actions = store.getActions();

    // console.log("ACTIONS TEST: ", actions);

    expect(actions.length).toEqual(2);
    expect(actions[1].type).toEqual("books/getBooksByTitle/rejected");
  });
});

