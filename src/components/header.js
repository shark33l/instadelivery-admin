import React from 'react'
import { Box, Button } from 'grommet';
import { AuthContext } from "../Auth.js";

// CSS Import
import './header.css'

import logo from './instabuylogo.png';

const Header = (props) => {
    const { currentUser, setCurrentUser } = React.useContext(AuthContext);
    return(
        <Box
            tag= 'header'
            direction= 'row'
            align= 'center'
            justify= 'between'
            background= 'white'
            pad= {{ left: 'medium', right: 'small', vertical: 'small' }}
            elevation= 'xsmall'
            style= {{ zIndex: '1' }}
            {...props}
        >
            <div style={{ display: 'flex' }}>
                <img src={logo} className="app-logo" alt="logo" />
                <p style={{fontSize: "18px"}}><span className="app-title">InstaBuy</span> Admin Console</p>
            </div>
            {currentUser &&
                <Button 
                primary 
                hoverIndicator='accent-1' 
                focusIndicator={false} 
                label="logout" 
                className="button-style"
                onClick={()=>{
                    localStorage.removeItem("accessToken");
                    setCurrentUser(null);
                }}
                />
            }
        </Box>
    )
}

export default Header;