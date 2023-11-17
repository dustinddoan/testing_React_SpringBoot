import renderWithRedux from "../../../util/testUtil";
import Login from "../Login";
import { INITAL_USER_REDUCER_STATE } from "../../../module/user/userSlice";
import { fireEvent, screen, render, act, waitFor } from "@testing-library/react";
import thunk from "redux-thunk";
import configMockStore from 'redux-mock-store'
import { login } from "../../../module/user/userSlice";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";

jest.mock("../../../module/user/userSlice");

const middleware = [thunk]
const mockStore = configMockStore(middleware);
const preloadedState = {
    token: null,
    promise: 'uninitialized',
    error: null
}

const store = mockStore(preloadedState)

describe('Login', () => {
    it('should show required error message for email and password', async () => {
        
        renderWithRedux(<Login />, {store})
                
        const submitBtn = await screen.findByText('Login');

        fireEvent.submit(submitBtn);
        expect(await screen.findByText('Username is required')).toBeInTheDocument();
        expect(await screen.findByText('Password is required')).toBeInTheDocument();
        expect(1).toEqual(1);
    })

    it('should show email and password invalid error message', async() => {
        renderWithRedux(<Login />, { store })
        const usernameInput = screen.getByPlaceholderText('Enter email address');

        fireEvent.change(usernameInput, {target: {value: 'invalid email'}})


        const passwordInput = screen.getByPlaceholderText('Enter password');

        fireEvent.change(passwordInput, { target: { value: 'wroP' } })

        fireEvent.submit(await screen.findByText('Login'))

        expect(await screen.findByText('Enter valid email')).toBeInTheDocument();
        expect(await screen.findByText('Password should be minimum of 5 character')).toBeInTheDocument();

    })

    it('should call login action when email and password is valid', async() => {
        renderWithRedux(<Login />, { store })

        login.mockImplementation(() => (dispatch) => { })

        const usernameInput = screen.getByPlaceholderText('Enter email address');
        fireEvent.change(usernameInput, { target: { value: 'dustin@gmail.com' } })

        const passwordInput = screen.getByPlaceholderText('Enter password');
        fireEvent.change(passwordInput, { target: { value: 'dunglay' } })

        fireEvent.submit(await screen.findByText('Login'))
        
        await waitFor(() => {
            expect(login).toHaveBeenCalledWith({email: 'dustin@gmail.com', password: 'dunglay'});
        }, {timeout: 1000})

    })
})