import React from "react";

import "components/InterviewerListItem.scss";
import classnames from 'classnames';

export default function InterviewerListItem({id, name, avatar, selected, setInterviewer}) {
  let interviewerClass = classnames(
    "interviewers__item",
    {
      "interviewers__item--selected": selected,
    }
  );

  return (
    <li onClick={() => setInterviewer(id)} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}