import React from 'react';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "./../CustomButtons/Button.jsx";

import modalStyle from "./../../assets/jss/material-kit-react/modalStyle.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }
    handleClickOpen(modal) {
        var x = [];
        x[modal] = true;
        this.setState(x);
    }
    handleClose(modal) {
        var x = [];
        x[modal] = false;
        this.setState(x);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button
                    color="rose"
                    style={{fontFamily: "'DM Sans', sans-serif"}}
                    round
                    onClick={() => this.handleClickOpen("modal")}>
                    Wait, What's This All About?
        </Button>
                <Dialog
                    classes={{
                        root: classes.center,
                        paper: classes.modal
                    }}
                    open={this.state.modal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.handleClose("modal")}
                    aria-labelledby="modal-slide-title"
                    aria-describedby="modal-slide-description">
                    <DialogTitle
                        id="classic-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}>
                        <IconButton
                            className={classes.modalCloseButton}
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={() => this.handleClose("modal")}>
                            <Close className={classes.modalClose} />
                        </IconButton>
                        <h4 className={classes.modalTitle}>Crack Your Vices!</h4>
                    </DialogTitle>
                    <DialogContent
                        id="modal-slide-description"
                        className={classes.modalBody}>
                        <ul>
                            <li><strong>Name your vice -</strong>  maybe it's eating too many cookies, smoking too many cigarettes, or binging too many TV shows.</li>
                            <li><strong>Choose a better option -</strong> do you want to find a healthy recipe? A local gym? Or let us randomly send you something better to do?</li>
                            <li><strong>Set your weekly consumption limit.</strong> The unit can be up to you - maybe it's single cookies, or whole packages. We don't judge. We're just here to help.</li>
                            <li><strong>How much is your vice costing you?</strong> Tell us how much those cookies cost and we'll tell you how much you could have saved if you didn't eat them!</li>
                        </ul>

                        <p>Once you add a vice, The Vice Cracker will text you every morning to remind you to track it! It's super easy - just hit the "+" button every time you indulge in your vice. Once you hit your weekly limit, The Vice Cracker will send you a suggestion for a Better Option! You can also check your previous suggestions by going to the menu and selecting "Past Notifications".</p>

                        
                    </DialogContent>
                    <DialogActions
                        className={classes.modalFooter + " " + classes.modalFooterCenter}>
                        <Button
                            color="primary"
                            round
                            onClick={() => this.handleClose("modal")}
                        >
                            Got It?
         </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(modalStyle)(Modal);