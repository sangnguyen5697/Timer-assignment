import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  title = 'London Clock';
  currentTime = new Date();
  hour = `00`;
  minute = `00`;
  second = `00`;
  timeOfDay = `AM`;

  currentHour = 0;
  currentMinute = 0;
  currentSecond = 0;

  isRunning = false;
  startTimer;

  showHourInput = true;
  showMinuteInput = true;
  showSecondInput = true;

  constructor() {
  }

  ngOnInit(): void {
    this.currentTime = new Date();
    this.currentHour = this.currentTime.getHours();
    this.currentMinute = this.currentTime.getMinutes();
    this.currentSecond = this.currentTime.getSeconds();
    this.startClock();
  }


  startClock(): void {
    if (!this.isRunning) {
      this.showHourInput = true;
      this.showMinuteInput = true;
      this.showSecondInput = true;
      this.isRunning = !this.isRunning;
      this.formatTime();

      this.startTimer = setInterval(() => {
        this.runClock();
        this.formatTime();
      }, 1000);
      console.log('start');
    }
  }

  runClock(): void {
    this.currentSecond++;
  }


  formatTime(): void {
    if (this.currentSecond >= 60) {
      this.currentSecond = 0;
      this.currentMinute++;
    }
    if (this.currentMinute >= 60) {
      this.currentMinute = 0;
      this.currentHour++;
    }
    if (this.currentHour >= 24) {
      this.currentHour = 0;
    }
    this.hour = this.currentHour > 12 ? (this.currentHour - 12).toString() : this.currentHour.toString();
    this.hour = this.currentHour < 10 ? `0` + this.currentHour : this.currentHour.toString();
    this.minute = this.currentMinute < 10 ? `0` + this.currentMinute : this.currentMinute.toString();
    this.second = this.currentSecond < 10 ? `0` + this.currentSecond : this.currentSecond.toString();
    this.timeOfDay = this.currentHour > 12 ? `PM` : `AM`;
  }

  stopClock(choice: number): void {
    if (this.isRunning) {
      this.isRunning = !this.isRunning;
      clearInterval(this.startTimer);
      console.log('stop');

      switch (choice) {
        case 1:
          this.showHourInput = false;
          console.log('hour');
          break;
        case 2:
          this.showMinuteInput = false;
          console.log('minute');

          break;
        default:
          this.showSecondInput = false;
          console.log('second');

          break;
      }
    }
  }
}
