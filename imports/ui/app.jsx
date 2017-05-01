import React, { Component } from 'react';
import _ from 'lodash';

export default class App extends Component {

  divideAndRound(total, count) {
    let roughSplit = total/count;
    let roundedSplit = Math.round(roughSplit * 100)/100;
    let splitsArray = [];
    let i = count;

    while (i > 0) {
      i--;
      splitsArray.push(roundedSplit)
    }

    return splitsArray
  }

  validate(arr, total, count) {
    let op;
    let operators = {
      "+": function(a, b) { return a + b },
      "-": function(a, b) { return a - b }
    };
    let splitTotal = arr.reduce((a, b) => a + b, 0);

    if (splitTotal !== total) {
      let newSplitsArray = [];
      if (splitTotal > total) {
        console.log('the value is greater');
        op = "-";
      } else {
        console.log('the value is less');
        op = "+";
      }
      arr.forEach((s, i) => {
        let newAmt = arr.reduce((a, b) => a + b, 0);
        newAmt = Math.round(newAmt * 100)/100;
        if (newAmt !== total) {
          s = operators[op](s, .01);
          arr.splice(i, 1, s)
        }
      })
    }
    return arr
  }

  moneySplitter() {
    let total = Number(this.refs.total.value)
    let count = this.refs.count.value

    let roundedSplitArray = this.divideAndRound(total, count)
    console.log('this is roundedSplitArray before validating amounts');
    console.log(roundedSplitArray);

    let validated = this.validate(roundedSplitArray, total, count)
    console.log('these are the split up amounts after validating');
    console.log(validated);
    validated = validated.join(', ')

    alert("these are your split up amounts: " + validated)
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>split the bill</h1>
          <p>enter the total amount and how many people to split evenly</p>
        </header>
        <form className="moneySplitForm">
          <label>total</label>
          <input
            type="number"
            ref="total"
            placeholder="enter the total bill"
          />
          <label>count</label>
          <input
            type="number"
            ref="count"
            placeholder="how many people?"
          />
          <button
            type="submit"
            onClick={this.moneySplitter.bind(this)}
            >
            split it
          </button>
        </form>
      </div>
    );
  }
}
