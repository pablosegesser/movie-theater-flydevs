import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Divider, Button} from "@material-ui/core";
import {  makeStyles} from '@material-ui/core/styles';



export const DialogDetaills = ({movie, open, close}) => {
    const useStyles = makeStyles((theme) => ({
       
        backGrey:{
           backgroundColor:"#F5F5F5"
        }
    
    
    }));
    const classes = useStyles();
    return (
        <Dialog open={open.open == true && open.id == movie.id} onClose={close}>
                                                <DialogTitle className={classes.backGrey}>
                                                <p><strong>{movie.title+' detaills'}</strong></p>
                                                </DialogTitle>
                                                <Divider/>
                                                <DialogContent>
                                                <p><strong>Overview</strong></p>
                                                <p>{movie.overview}</p>

                                                <p><strong>Released Date</strong></p>
                                                <p>{movie.release_date}</p>
                                                <p><strong>Rating</strong></p>
                                                <p>{movie.vote_average}</p>
                                                </DialogContent>
                                                <Divider/>
                                                <DialogActions>
                                                    <Button variant="contained" color="pirmary" onClick={()=>close}>Close</Button>
                                                </DialogActions>
                                            </Dialog>
    )
}
