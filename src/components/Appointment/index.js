import React from "react";

import Header from "components/Appointment/Header"; 
import Show from "components/Appointment/Show"; 
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(e => console.log(e));
  }

  // function onEdit(name, interviewer) {
  //   return {
  //     student: name,
  //     interviewer
  //   };
  // }

  function onDelete() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(e => console.log(e));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
        />}
      {mode === SAVING && <Status message={'Saving'}/>}
      {mode === DELETING && <Status message={'Deleting'}/>}
      {mode === CONFIRM && 
          <Confirm 
            message={'Are you sure you want to delete?'} 
            onConfirm={onDelete}
            onCancel={onCancel}
          />
      }
    </article>
  );
}