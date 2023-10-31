import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    bookContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    bookFilter: {
        width: '20%',
        height: '500px'
    },
    bookList: {
        width: '80%'
    },
    bookFilterPaper: {
        width: '100%',
        height: '100%'
    },
    bookListItemPaper: {
        padding: "10px",
        display: "flex",
        width: "80%"
    },
    bookImage: {
        width: "180px",
        height: "200px"
    }
});

export default useStyles;

