import React from "react";
import { login } from "../userSlice";
import configMockStore from 'redux-mock-store'
import thunk from "redux-thunk";
import axios from "axios";


jest.mock("axios")
const middleware = [thunk]
const mockStore = configMockStore(middleware)


describe('login Action', () => {
    beforeEach(() => {
        axios.post.mockImplementation(() => {
            return Promise.resolve({
                data: {
                    token: '123456'
                }
            })
        })
    })

    it('should able to dispatch and save to lcoalstorage', async () => {
        const store = mockStore();
        
        await store.dispatch(login({email: 'email', password: 'password'}))

        const actions = store.getActions();
        // console.log("actions: ", actions)

        expect(actions.length).toEqual(2);
        expect(actions[1].payload).toEqual({
            token: '123456'
        })
        expect(window.localStorage.getItem('bookstore-token')).toEqual('123456')
    })
})