import { Paper, Box, Typography, TextField, Button, ModalRoot } from "@mui/material";
import React, { useEffect } from "react";
import useStyles from "./LoginStyle";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from "../../util/hook";
import { login } from "../../module/user/userSlice";
import { getLoginPromise } from "../../module/user/userSlice";
import { useSnackbar } from 'notistack'
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter valid email')
        .required("Username is required"),
    password: yup
        .string()
        .min(5, 'Password should be minimum of 5 character')
        .required('Password is required')
})



const Login = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const userLoginPromise = useAppSelector(getLoginPromise);
    console.log("status: ", userLoginPromise)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (userLoginPromise === 'failed') {
            enqueueSnackbar('Invalid username or password', { variant: 'error' });
        } else if (userLoginPromise === 'fulfilled') {
            enqueueSnackbar('Logged in successfully!', { variant: 'success' });
            navigate("/");
        }
    }, [enqueueSnackbar, userLoginPromise, navigate])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: values => {
            console.log('click:', values)
            dispatch(login(values))
        }
    })

    return (
        <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <Box className={classes.wrapper}>
                <Paper className={classes.paper}>
                    <Typography variant="h4">Login</Typography>
                    <TextField
                        className={classes.topMargin}
                        name="email"
                        id="email"
                        data-testid="email-testid"
                        label="Enter email address"
                        placeholder="Enter email address"
                        variant="outlined"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        helperText={formik.touched.email && formik.errors.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                    />
                    <TextField
                        className={classes.topMargin}
                        name="password"
                        id="password"
                        data-testid="password-testid"
                        label="Enter password"
                        placeholder="Enter password"
                        variant="outlined"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        helperText={formik.touched.password && formik.errors.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                    />
                    <Button
                        className={classes.topMargin}
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={userLoginPromise==='pending'}
                    >Login</Button>
                </Paper>
            </Box>
        </form>
    )
}

export default Login;