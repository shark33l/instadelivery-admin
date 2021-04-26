import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../Auth.js";
import { Box, Card, CardBody, Heading, Text, Form, FormField, TextInput, Button  } from "grommet";
import databaseFunctions from "../databaseFunctions";

const Login = ({ history }) => {

  const [alertError, setAlertError] = useState({error: false, message: ""});
  const [credentials, setCredentials] = React.useState({});

  const { currentUser, setCurrentUser } = useContext(AuthContext);


  const handleLogin = useCallback(
    async (credentials) => {
      // event.preventDefault();
      // const { email, password } = event.target.elements;
      const email = credentials.email;
      const password = credentials.password;

      try {
        databaseFunctions.loginUser({username: email, password:password}, (error, response) => {
          if(!error && response.jwt){
            localStorage.setItem("accessToken", response.jwt);
            setCurrentUser(response.jwt)
            history.push("/");
          } else {
            console.log(error);
            setAlertError({
              error: true,
              message: error
            });
          }
        })
      } catch (error) {
        console.log(error);
        setAlertError({
          error: true,
          message: error
        })
      }
    },
    [history]
  );

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Box background="white" fill align="center" justify="center" pad="xlarge">
      <Heading level="2">Login</Heading>
      {alertError.error &&
      <Box direction="row" align="center" justify="center" fill="horizontal" pad="medium">
        <Card  height="xsmall" width="large" background="#f8d7da" elevation="xsmall">
            <CardBody pad="medium" align="center" justify="center"><Text color="#842029">{alertError.message.toString()}</Text></CardBody>
        </Card>
      </Box>
      }
      <Box width="medium">
        <Form 
          value={credentials}
          onSubmit={({ value }) => { handleLogin(value) }}
          onChange={nextValue => setCredentials(nextValue)}
          defaultValue={{email: "", password: ""}}
          >
          <FormField name="email" htmlFor="email-id" label="Email" required>
            <TextInput id="email-id" name="email" type="email"/>
          </FormField>
          <FormField name="password" htmlFor="password-id" label="Password" required>
            <TextInput id="password-id" name="password" type="password"/>
          </FormField>
          <Box fill="horizontal"  margin={{top: "medium"}} height="medium">
            <Button type="submit" size="large" primary label="Submit" className="button-style"/>
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default withRouter(Login);