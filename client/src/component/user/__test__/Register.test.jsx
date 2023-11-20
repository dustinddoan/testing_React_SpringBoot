import renderWithRedux from "../../../util/testUtil";
import Login from "../Login";
import { INITAL_USER_REDUCER_STATE } from "../../../module/user/userSlice";
import { fireEvent, screen, render, act, waitFor } from "@testing-library/react";
import thunk from "redux-thunk";
import configMockStore from 'redux-mock-store'
import { register } from "../../../module/user/userSlice";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import Register from "../Register";

jest.mock("../../../module/user/userSlice");

const middleware = [thunk]
const mockStore = configMockStore(middleware);
const preloadedState = {
    user: null,
    token: window.localStorage.getItem('bookstore-token'),
    promise: null,
    registerPromise: null,
    error: null
}

const store = mockStore(preloadedState)

describe('Register', () => {
    it('should exist register field', () => {
        renderWithRedux(<Register />, { store });
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
        expect(screen.getByLabelText('Your name')).toBeInTheDocument();
    })

    it('should show require error message', async() => {
        renderWithRedux(<Register />, { store })
        
        fireEvent.submit(screen.getByText('Register'))
        expect(await screen.findByText('Name is required')).toBeInTheDocument()
        expect(await screen.findByText('Email is required')).toBeInTheDocument()
        expect(await screen.findByText('Password is required')).toBeInTheDocument()
    })

    it('should call register action when valid info entered', async() => {
        renderWithRedux(<Register />, { store });

        register.mockImplementation(() => (dispatch) => { })
        
        const nameInput = screen.getByPlaceholderText('Name');
        fireEvent.change(nameInput, { target: { value: 'Dustin' } })

        const usernameInput = screen.getByPlaceholderText('Enter email address');
        fireEvent.change(usernameInput, { target: { value: 'dustin@gmail.com' } })

        const passwordInput = screen.getByPlaceholderText('Enter password');
        fireEvent.change(passwordInput, { target: { value: 'dunglay' } })

        fireEvent.submit(screen.getByText('Register'))


        await waitFor(() => {
            expect(register).toHaveBeenCalledWith(
                {
                    name: 'Dustin',
                    email: 'dustin@gmail.com',
                    password: 'dunglay'
                }
            )
        }, {timeout: 1000})
    })
})