import React, { Component } from "react";
//import toWords from "number-to-words";
import TimeTable from "./schemas/TimeTable.js";
import * as TimeTableData from "./Timetable.json";
import AddCourse from "./components/AddCourse.jsx";
import Entry from "./schemas/Entry";
const ntw = require("number-to-words");

const courses = JSON.parse(JSON.stringify(TimeTableData));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTimeTable: new TimeTable(),
      myCourses: [],
      currentCourse: null
    };
    this.addSection = this.addSection.bind(this);
    this.updateCurrent = this.updateCurrent.bind(this);
    this.checkClash = this.checkClash.bind(this);
  }

  checkClash(hours, days) {
    var day, hour;
    for (day of days) {
      for (hour of hours) {
        if (this.state.myTimeTable[day][ntw.toWords(hour)].courseCode != null) {
          return true;
        }
      }
    }
    return false;
  }

  addSection(input) {
    var courseCode = Object.keys(this.state.currentCourse);
    var day, hour;
    var section = input.target.id;
    var hours = this.state.currentCourse[courseCode].sections[section].sched[0]
      .hours;
    var days = this.state.currentCourse[courseCode].sections[section].sched[0]
      .days;
    var clash = this.checkClash(hours, days);
    if (clash) {
      alert("You got a damn clash!!");
      return;
    }
    var room = this.state.currentCourse[courseCode].sections[section].sched[0]
      .room;
    var temp = this.state.myTimeTable;
    for (day of days) {
      for (hour of hours) {
        var entry = new Entry(
          courseCode,
          this.state.currentCourse[courseCode].name,
          room
        );
        temp[day][ntw.toWords(hour)] = entry;
      }
    }
    var courseTemp = this.setState.myCourses;
    if (!courseTemp || !courseTemp.includes(this.currentCourse)) {
      courseTemp += this.state.currentCourse;
    }
    this.setState({ myTimeTable: temp, myCourses: courseTemp });
  }

  updateCurrent(input) {
    this.setState({ currentCourse: input });
  }

  render() {
    return (
      <div>
        <AddCourse
          allCourses={courses.default}
          myCourses={this.state.myCourses}
          addSection={this.addSection}
          updateCurrent={this.updateCurrent}
        />
      </div>
    );
  }
}
export default App;
