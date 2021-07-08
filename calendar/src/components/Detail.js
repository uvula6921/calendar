import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Grid, Button, Text } from "./Styles";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as calendarActions } from "../redux/modules/calendar";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    minWidth: "600px",
    minHeight: "800px",
  },
}));

const Edit = ({ open, handleClose, modal_list }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid
              flex_direction="column"
              justify_contents="space-around"
              height="800px"
              font_size="2"
            >
              <Text type="contents">날짜: {modal_list.datetime}</Text>
              <Text type="contents">일정 내용: {modal_list.contents}</Text>
              <div>
                <Button
                  margin="0 40px"
                  onClick={() => {
                    dispatch(calendarActions.deleteTodoFB(modal_list));
                    handleClose();
                  }}
                >
                  스케쥴 삭제
                </Button>
                <Button
                  onClick={() => {
                    dispatch(calendarActions.completeTodoFB(modal_list));
                    handleClose();
                  }}
                >
                  {modal_list.completed
                    ? "스케쥴 완료 해제하기"
                    : "스케쥴 완료하기"}
                </Button>
              </div>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Edit;
