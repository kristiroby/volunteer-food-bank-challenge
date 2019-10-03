Ran yarn jest - testBagsStillNeeded failed
Expected value to equal:
      3
Received:
      0

line 66 in volunteers_calculator.js:
    var bags was equal to 0 every time because it was this.data[i][2] - this.data[i][2], which subtracts actual_bags from actual_bags every time. it needed to be a 1 instead of a 2 in the first this.data[i][]