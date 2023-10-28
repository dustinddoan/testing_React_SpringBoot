import bookReducer, {INITIAL_BOOK_REDUCER_STATE} from "../bookReducer";

describe('bookReducer', () => {
    it('should return correct new state', () => {

        const mockData = [
            {
              id: 1,
              title: 'Test Book',
              description: 'Test description',
              releaseYear: 2021,
            }
        ]
        

        const mockAction = {
            type: 'BOOK_LIST',
            payload: mockData
        }

        const newState = bookReducer(INITIAL_BOOK_REDUCER_STATE, mockAction);
        // console.log("----DUSTIN: ", newState);
        // console.log("----DUSTIN: ", mockData);

        expect(newState.books).toEqual(mockData);

    });
});