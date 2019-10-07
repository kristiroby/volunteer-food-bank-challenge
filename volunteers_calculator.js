#!/usr/bin/env node

const fs = require("fs");

const VolunteersCalculator = module.exports = function(){
  return {
    bagsStillNeeded: null,
    bagsStockedPerVolunteer: null,
    volunteersNeeded: null,
    daysCount: null,
    data: null,
    results: null,

    processFile: function(f, done) {
      const self = this;
      fs.readFile(f, 'utf8', function (err,data) {
        const lines = data.split('\n');
        this.volunteerData = lines.map(line => line.split(','))
        self.daysCount = (this.volunteerData.length-1);
        self.data = this.volunteerData.splice(1);
        done(self.daysCount, self.data);
      });
      
    },
    getVolunteersNeeded: function() {
      if (this.volunteersNeeded !== null) {
        return this.volunteersNeeded;
      }
      const volunteersNeeded = [];
      for(let j = 0; j < this.daysCount; j++) {
        const v = (this.getBagsStillNeeded()[j]/this.getBagsStockedPerVolunteer()[j])
        volunteersNeeded.push(v.toFixed(2));
      };
      return volunteersNeeded;
    },

    getResults: function(volunteers) {
      const results = [];
      for(let i = 0; i< volunteers.length; i++) { 
        // determine whether input from txt file has day of the week
        const dayOfWeek = this.data[i].length === 4 ? this.data[i][3] : `day ${i}` 
        // create object to push into results and allow sorting by number of volunteers
        let result = { 
          v: volunteers[i],
          description: `${volunteers[i]} additional volunteers are needed on ${dayOfWeek}`
        }
        results.push(result)
      }
      // sort in descending order using compare function 
      results.sort((a, b) => b.v - a.v)
      // store volunteers needed and day or day of the week in new variable
      let printDescriptions = results.map(result => result.description)
      return printDescriptions;
    },

    getBagsStillNeeded: function() {
      if (this.bagsStillNeeded !== null) {
        return this.bagsStillNeeded;
      }

      this.bagsStillNeeded = [];
      for(let i = 0; i < this.daysCount; i++) {
        const bags = (this.data[i][1]- this.data[i][2]);
        this.bagsStillNeeded.push(bags);
      };
      return this.bagsStillNeeded
    },

    getBagsStockedPerVolunteer: function() {
      if (this.bagsStockedPerVolunteer !== null) {
        return this.bagsStockedPerVolunteer;
      }

      this.bagsStockedPerVolunteer = [];
      for(let i = 0; i < this.daysCount; i++) {
        let bagsStocked = this.data[i][2];
        let volunteers = this.data[i][0];
        this.bagsStockedPerVolunteer.push((bagsStocked/volunteers));
      };
      return this.bagsStockedPerVolunteer;
    }
  }
}

if (require.main === module) {
  const calculator = new VolunteersCalculator();
  const readAndPrint = function(arg) {
    calculator.processFile(arg, function() {
      const volunteers = calculator.getVolunteersNeeded();
  // call getResults function here and log results
      const results = calculator.getResults(volunteers);
      console.log(results)
    });
  }

  if (process.argv.length === 3) {
    readAndPrint(process.argv[2]);
  } else {
    console.log("Please follow the README instructions to run the program.");
  }
}
