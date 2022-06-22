import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import useStyles from "./styles";
import {GoogleLogin} from "react-google-login"
import {Avatar, Button, Container, Grid, Paper, Typography} from "@material-ui/core";
import {LockOutlined} from "@material-ui/icons";
import Input from "./Input";
import Icon from "./icon";
import {signup, signin} from "../../store/actions/auth";

const initialState = {firstName: "", lastName: "", email: "", password: "", confirmPassword: ""}
const Auth = () => {
   const classes = useStyles()
   const [isSignup, setIsSignup] = useState(true)
   const [showPassword, setShowPassword] = useState(false)
   const [formData, setFormData] = useState(initialState)
   const dispatch = useDispatch()
   const history = useHistory()

   const handleSubmit = (e) => {
      e.preventDefault()
      if (isSignup) {
         dispatch(signup(formData, history))
      } else {
         dispatch(signin(formData, history))
      }
   }
   const handleChange = (e) => {
      e.preventDefault()
      setFormData({...formData, [e.target.name]: e.target.value})
   }

   const googleFailure = (err) => {
      console.log(err)
      console.log("Google sign in unsuccessfully.Try Again")
   }

   const googleSuccess = (res) => {
      const googleData = res.profileObj
      const token = res.tokenId

      try {
         dispatch({type: "AUTH", data: {res, token}})
         history.push("/")
      } catch (err) {
         console.log(err)
      }
   }

   const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup)
      setShowPassword(false)
   }

   const handleShowPassword = () => setShowPassword((prevShowPass) => !prevShowPass)
   return (
      <Container component={"main"} maxWidth={"xs"}>
         <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
               <LockOutlined/>
            </Avatar>
            <Typography variant={"h5"}>{isSignup ? "Sign up" : "Sign in"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                  {isSignup && (
                     <>
                        <Input name="firstName" label={"First Name"} handleChange={handleChange} autoFocus half/>
                        <Input name="lastName" label={"Last Name"} handleChange={handleChange} half/>
                     </>
                  )}
                  <Input name={"email"} label={"Email address"} handleChange={handleChange} type={"email"}/>
                  <Input name={"password"} label={"Password"} handleChange={handleChange}
                         type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                  {isSignup && <Input name={"confirmPassword"} label={"Confirm password"} handleChange={handleChange}
                                      type={"password"}/>}
               </Grid>
               <Button type={"submit"} variant={"contained"} fullWidth color={"primary"} className={classes.submit}>
                  {isSignup ? "Sign up" : "Sign in"}
               </Button>
               <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} render={(renderProps) => (
                  <Button className={classes.googleButton} color={"primary"} fullWidth onClick={renderProps.onClick}
                          disabled={renderProps.disabled} startIcon={<Icon/>} variant={"contained"}> Google Sign
                     In </Button>
               )}
                            onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy={"single_host_origin"}/>
               <Grid container justifyContent={"flex-end"}>
                  <Grid item>
                     <Button onClick={switchMode}>
                        {isSignup ? "Already have an account ? Sign in" : "Don't have an account? Sign up"}
                     </Button>
                  </Grid>
               </Grid>
            </form>
         </Paper>
      </Container>
   )
}

export default Auth;