import React from "react";

import Header from "components/Appointment/Header"; 
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

// Transition states
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const SAVING_MESSAGE = 'Saving';
const DELETING_MESSAGE = 'Deleting';
const CONFIRM_DELETE_MESSAGE = 'Are you sure you want to delete?';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onCancel() {
    back();
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    // EMPTY -> CREATE -> SAVING (replace) -> ERROR_SAVE
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(e => transition(ERROR_SAVE, true));
  }

  function onDelete() {
    // SHOW -> CONFIRM (replace) -> DELETING (replace) -> ERROR_DELETE
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(e => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SAVING && <Status message={SAVING_MESSAGE}/>}
      {mode === DELETING && <Status message={DELETING_MESSAGE}/>}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
          interviewer={props.interviewer}
          name={props.student}
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message={CONFIRM_DELETE_MESSAGE} 
          onConfirm={onDelete}
          onCancel={onCancel}
        />
      )}
      {mode === ERROR_SAVE && <Error onClose={onCancel} message={'error saving'}/>}
      {mode === ERROR_DELETE && <Error onClose={onCancel} message={'error deleting'}/>}
    </article>
  );
}