import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: [
  ]
})
export class ConfirmComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<ConfirmComponent>) { }

  ngOnInit(): void {
  }

  delete(){
    this._dialogRef.close(true);
  }

  close(){
    this._dialogRef.close();
  }

}
