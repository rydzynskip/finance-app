import { fv } from 'financial';
import React, { useState } from 'react';

import '../App.css';
import data from "../../data.json"

function Expenses() {
  return (
    <div>
      <div className="Section">
        <header>
          Expense Info
        </header>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="Section">
        <header>
          Leftover Info
        </header>
        <form>
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

export default Expenses;