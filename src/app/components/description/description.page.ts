import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
  description = null;
  constructor(private navParams:NavParams,private popoverController:PopoverController) { }

  ngOnInit() {
    this.description = this.navParams.get('description');
  }
  closePopover(){
    this.popoverController.dismiss();
  }
}
