import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
import getBooksAction from '../bookAction';

jest.mock('axios');
const middleware = [reduxThunk];
const mockStore = configureStore(middleware);

describe('BookActions', () => {
    it('should be able to dispatch success action', async () => {
        const store = mockStore({}); // initial state

        const mockData = [
            {
              id: 1,
              title: 'Test Book',
              description: 'Test description',
              releaseYear: 2021,
            },
          ];
      
        axios.get.mockResolvedValue({ data: mockData });

        await store.dispatch(getBooksAction());

        const actions = store.getActions();


        expect(actions.length).toEqual(1);

        expect(actions[0]).toEqual({
            type: 'BOOK_LIST',
            payload:mockData
        })

    })
})