import React from "react";

import "components/Button.scss";
import classnames from 'classnames';

export default function Button(props) {
   // let buttonClass = "button";
 
   // if (props.confirm) {
   //   buttonClass += " button--confirm";
   // }
 
   // if (props.danger) {
   //   buttonClass += " button--danger";
   // }

   /* refactor with classnames */
   // let buttonClass = classnames({
   //    'button': true,
   //    'button--confirm': props.confirm && true,
   //    'button--danger': props.danger && true
   // });

   /* sample solution */
   let buttonClass = classnames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });
 
   return (
     <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
 }
