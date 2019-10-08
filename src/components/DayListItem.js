import React from "react";

import "components/DayListItem.scss";
import classnames from 'classnames';

export default function DayListItem(props) {
  let dayClass = classnames(
    "day-list__item",
    {
      "day-list__item--selected": props.selected,
      "day-list__item--full": props.spots === 0
    }
  );

  function formatSpots(spots) {
    switch(spots) {
      case 0:
        return 'no spots remaining';
      case 1:
        return '1 spot remaining';
      case 2:
        return '2 spots remaining'
      default:
        return spots;
    }
  }

  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}