import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
    },
    topMargin: {
        marginTop: '2rem',
    }
});


export default useStyles;