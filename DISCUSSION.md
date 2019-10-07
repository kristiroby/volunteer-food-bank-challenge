Problem 1 ==================

Ran yarn jest - testBagsStillNeeded failed with message:
Expected value to equal:
      3
Received:
      0
The bug was in line 66 in volunteers_calculator.js:
    var bags was equal to 0 every time because it was this.data[i][2] - this.data[i][2], which subtracts actual_bags from actual_bags every time. it needed to be a 1 instead of a 2 in the first this.data[i][]

Problem 2 =================

I added a header for days of the week and added some days to the food shelf north.txt file. I added a conditional statement in the getResults function to check if there was a day of the week included or not, and output a number or name for the day.

Problem 3 =================

I changed result to an object so I could compare and sort by the number of volunteers needed, mapped the results, and returned the description.

Then I had to update the testResultsWithoutDayName to account for using this.data and for sorting the results in descending order.

Refactoring ===============

Got rid of dayCount function bc it wasn't being used,
Changed data and dayscount to self.data and self.dayscount
Used const and let where i could
Used map instead of for loops where I could

I thought about using a class and dramatically refactoring, but the amount of work that would take compared to the benefit didn't seem worth it.

I thought about putting all the functions in separate files and importing them, but again, the amount of time compared to benefit didn't seem worth it.

