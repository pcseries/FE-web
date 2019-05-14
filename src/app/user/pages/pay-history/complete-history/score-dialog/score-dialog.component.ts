import { Component, OnInit, Inject } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductsService } from 'src/app/services/core/products.service';

@Component({
  selector: 'app-score-dialog',
  templateUrl: './score-dialog.component.html',
  styleUrls: ['./score-dialog.component.css'],
  providers: [NgbRatingConfig]
})
export class ScoreDialogComponent implements OnInit {

  currentRate = 0;

  form_rating: FormGroup;

  constructor(
    config: NgbRatingConfig,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ScoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService,
  ) {
    config.max = 5;
  }

  ngOnInit() {


  }

  set_rating(txt: HTMLInputElement) {

    this.form_rating = this.fb.group({
      id_order_history: this.data.id,
      rating: this.currentRate,
      content: txt.value
    });


    console.log('rate=>', this.form_rating.value);

    this.productsService.set_Scoreforproduct(this.form_rating.value).subscribe(
      res => {
        console.log('rate=>', res);
      }, err => {
        console.log('rate=>', err);
      }
    );

    this.dialogRef.close(true);
  }

  on_Cancel() {
    this.dialogRef.close(false);
  }

}
