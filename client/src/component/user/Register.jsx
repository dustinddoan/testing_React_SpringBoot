import { Paper, Box, Typography, TextField, Button } from "@mui/material";
import React, { useEffect } from "react";
import useStyles from "./LoginStyle";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from "../../util/hook";
import { login, register } from "../../module/user/userSlice";
import { getLoginPromise } from "../../module/user/userSlice";
import { useSnackbar } from 'notistack'
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
    name: yup
        .string()
        .required('Name is required'),
    email: yup
        .string()
        .email('Enter valid email')
        .required("Email is required"),
    password: yup
        .string()
        .min(5, 'Password should be minimum of 5 character')
        .required('Password is required')
})



const Register = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const user = useAppSelector(getLoginPromise);
    console.log("status: ", user)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        if (user != null && user.registerPromise === 'failed') {
            enqueueSnackbar('Email already exist', { variant: 'error' });
        } else if (user != null && user.registerPromise === 'fulfilled') {
            enqueueSnackbar('Welcome!', { variant: 'success' });
            navigate("/");
        }
    }, [enqueueSnackbar, user, navigate])

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: values => {
            // console.log('click:', values)
            dispatch(register(values))
        }
    })

    return (
        <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <Box className={classes.wrapper}>
                <Paper className={classes.paper}>
                    <Typography variant="h4">Sign Up</Typography>
                    <TextField
                        className={classes.topMargin}
                        name="name"
                        id="register-name"
                        data-testid="name-testid"
                        label="Your name"
                        placeholder="Name"
                        variant="outlined"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        helperText={formik.touched.name && formik.errors.name}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                    />
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
                        disabled={user != null && user.registerPromise === 'pending'}
                    >Register</Button>
                </Paper>
            </Box>
        </form>
    )
}

export default Register;