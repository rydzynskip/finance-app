import { fv } from 'financial';
import React, { useState } from 'react';

import '../App.css';
import data from "../../data.json"
import { State } from '../../data';

type Callback = (input: string, value: number) => void;

function Retirement(props: { state: any; callback: Callback}) {
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('subbed');
  }

  return (
    <div>
      <div className="Section">
        <header>
          Retirement
        </header>
        <form onSubmit={handleSubmit}>
          <label>
            401K Contribution (%):
            <input type="text" name="401k-contribution" value={props.state.editableState.retirement401K.contributionPercent}/>
          </label>
          <br></br>
          <label>Annual Contributions: {props.state.calculatedState.get('contributionAmount')}</label><br></br>
          <label>
            401K Company Match:
            <input type="text" name="401k-company-match" value={props.state.editableState.retirement401K.matchingPercent}/>
          </label>
          <br></br>
          <label>Company Match: {props.state.calculatedState.get('matchingAmount')}</label><br></br>
          <label>Total: {props.state.calculatedState.get('totalAmount')}</label><br></br>
          <label>Tax Reduction: {props.state.calculatedState.get('taxReduction')}</label><br></br>
          <label>Years: {props.state.calculatedState.get('years')} (From age {props.state.editableState.retirement401K.currentAge} to {props.state.editableState.retirement401K.retirementAge})</label><br></br>
          <label>Retirement Value: {props.state.calculatedState.get('finalValue')}</label><br></br>
          <label>Year 1 Value: {props.state.calculatedState.get('yearOneValue')}</label><br></br>
          <input type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
}

export default Retirement;