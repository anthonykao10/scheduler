import React from "react";

import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList({interviewers, interviewer, setInterviewer}) {

  const interviewerElems = interviewers.map(person => {

    
    return <InterviewerListItem 
        name={person.name}
        id={person.id}
        selected={person.id === interviewer}
        setInterviewer={setInterviewer}
        avatar={person.avatar}
      />
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerElems}
      </ul>
    </section>
  );
}