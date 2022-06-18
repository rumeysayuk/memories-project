import React, {useState} from 'react';
import useStyles from "./styles";
import {GoogleLogin} from "react-google-login"
import {Avatar, Button, Container, Grid, Icon, Paper, Typography} from "@material-ui/core";
import {LockOutlined} from "@material-ui/icons";
import Input from "./Input";

const Auth = () => {
   const classes = useStyles()
   const [isSignup, setIsSignup] = useState(true)
   const [showPassword, setShowPassword] = useState(false)
   const handleSubmit = () => {
   }
   const handleChange = () => {

   }
   const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup)
      handleShowPassword(false)
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
               <GoogleLogin clientId={"GOOGLE ID"} render={(renderProps) => (
                  <Button className={classes.googleButton} color={"primary"} fullWidth onClick={renderProps.onClick}
                          disabled={renderProps.disabled} startIcon={<Icon/>} variant={"contained"}> Google Sign In </Button>
               )}/>
               <Button type={"submit"} variant={"contained"} fullWidth color={"primary"} className={classes.submit}>
                  {isSignup ? "Sign up" : "Sign in"}
               </Button>
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