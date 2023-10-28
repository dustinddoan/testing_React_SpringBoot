import getBooksService from "./bookService";

const getBooksAction = () => async (dispatch) => {
    try {
        // booksSerive return a Promise, it will halt the excution until get
        // data from server
        // console.log("Helloooooooooooooooooooooooo");

        const books = await getBooksService();
        // const books = await axios.get(`${baseUrl}/api/v1/books`)

        // reduxThunk provide dispatch method accept object with type and payload

        // once call dispatch with type, all reducers will be notified and the one who 
        // matching type will execute and change state corresponding to that
        // dispatch object as an action
        // console.log('books: ', books.data);
        dispatch({
            type: 'BOOK_LIST',
            payload: books.data
        })
    } catch (error) {
        console.log("FAIL at action")
    }
}

export default getBooksAction;