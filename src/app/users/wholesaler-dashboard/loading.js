'use client'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const Loading = (props) => {

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.open}
        >
            <CircularProgress color="secondary" />
        </Backdrop>
    )
}

export default Loading