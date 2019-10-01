import React from "react";

import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList({interviewers, value, onChange}) {
  const interviewerElems = interviewers.map(interviewer => {
    return <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}interviewer
        selected={interviewer.id === value}
        setInterviewer={(event) => onChange(interviewer.id)}
        avatar={interviewer.avatar}
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