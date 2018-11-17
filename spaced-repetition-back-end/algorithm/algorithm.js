/***********************************************************************
 * Algorithm to assign next test date based on current card progress.  *
 *                                                                     *
 * Source inspiration:                                                 *
 *   https://github.com/lo-tp/memory-scheduler/blob/master/index.js    *
 **********************************************************************/

/* UPDATES TO IMPLEMENT: enable custom arguments so that users can set
  their own testing intervals, and additional testing difficulties (1-5) vs default (1-3) 
*/

//use this when serving up cards to see which ones are due for study
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const today = Math.round(new Date().getTime() / DAY_IN_MILLISECONDS);

/*may try to convert this to a regular function, need to research if class
  will self destruct or not like a function. otherwise server could get clogged with
  instantiations of SRS.           */
module.exports = class SRS {
  //initialize algorithm class with default arguments
  // testingIntervals [int] | amount of time between study sessions
  // difficultyToNextTestDate [int, 1] | difficulty of question
  //  ^ is how many positions in the []testingIntervals array that you want to move. correct is 1

  constructor(
    testingIntervals = [1, 2, 3, 8, 17],
    difficultyToNextTestDate = [-3, -1, 1]
  ) {
    this.testingIntervals = testingIntervals;
    this.difficultyToNextTestDate = difficultyToNextTestDate;
  }

  get maxProgress() {
    return this.testingIntervals.length;
  }

  get correctScore() {
    return this.difficultyToNextTestDate.length - 1;
  }

  //adding default arguments and checks for null data to remove external algorithm.js calls
  //original algorithm has separate steps for creating an inital record, this will automatically create one

  calculate(s, progressData = {}, now = today) {
    //check if progressData exists, if not then create a new record
    let progress = progressData.progress
      ? progressData.progress
      : this.getInitialRecord().progress;

    // int s | difficulty score, correlates to an element of this.difficultyToNextTestDate array
    //check to see if answer is correct
    const correct = s === this.difficultyToNextTestDate.length - 1;

    //get number of spaces to adjust the index in []testingIntervals
    const newProgress = progress + this.difficultyToNextTestDate[s];

    //set inital date of next test
    let dueDate = now + 1;

    //if answer is correct and the user is not already at the maximum testing interval,
    // then move to the next interval
    if (correct && progress < this.maxProgress) {
      dueDate = now + this.testingIntervals[progress];
    }

    //return a new progressData object with an updated due date and tracking of current progress
    return {
      dueDate,
      progress: newProgress < 0 ? 0 : newProgress
    };
  }

  //updated to use default values, should not require external calls anymore
  getInitialRecord(now = today - 1) {
    return {
      progress: 0,
      dueDate: now
    };
  }

  //if needed for external calls to date
  getToday() {
    return today;
  }
};
