import React, {useContext} from 'react'
import { Grid } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import { logout } from '../helpers/dbFunc';
import { UserContext } from '../context/user';


export default function Header() {
    
    const {user, setUser, authIsDone, setAuthIsDone} = useContext(UserContext)

    const handleClick = () => {
        logout()
        setAuthIsDone(false)
        setUser({
            id: 0,
            username: "",
            email: ""})
    }

    return (
        <Grid item height="100px"  sx={{padding: '20px', color: 'white', backgroundColor: '#274472', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100vw"}}>
            <h3>LOGO</h3> 
            <Link to="/"><h2>Socket Friends</h2></Link>
            {user.username ? 
                <ExitToAppIcon onClick={handleClick}/>:
                <Link to='/login'> <PersonOutlineIcon /></Link> 
            }
        </Grid>
        

    )
}
