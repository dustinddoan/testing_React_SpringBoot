import userReducer, {login, INITAL_USER_REDUCER_STATE } from "../userSlice";

describe('userReducer', () => {
    it("should return the initial state", () => {
        const newState = userReducer(
            INITAL_USER_REDUCER_STATE,
            login.fulfilled({token: "123456"})
        )

        expect(newState.token).toEqual({ token: "123456" });
    })
})