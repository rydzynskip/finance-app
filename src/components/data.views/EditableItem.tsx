import React, { useState } from 'react';

import '../App.css';
import data from "../../data.json"

function Taxes(props: { salary: number; }) {
  const salary = props.salary;

  return (
    <div>
      <div className="Section">
        <header>
          Tax Info
        </header>
        <form>
          <label>
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Taxes;