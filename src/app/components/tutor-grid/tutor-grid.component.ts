import { Component, OnInit, Input } from '@angular/core';
import {TutorInterface } from '../../interfaces/tutor-response';

@Component({
  selector: 'app-tutor-grid',
  templateUrl: './tutor-grid.component.html',
  styleUrls: ['./tutor-grid.component.css']
})
export class TutorGridComponent implements OnInit {

  @Input() tutores!: TutorInterface[];

  constructor() { }

  ngOnInit(): void {
  }

}
