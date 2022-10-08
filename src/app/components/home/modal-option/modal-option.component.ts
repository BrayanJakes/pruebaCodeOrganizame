import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-option',
  templateUrl: './modal-option.component.html',
  styleUrls: ['./modal-option.component.scss']
})
export class ModalOptionComponent implements OnInit {

  titleInfoData = '';
  InfoData: any = {}

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
