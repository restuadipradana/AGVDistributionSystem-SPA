import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-line-view',
  templateUrl: './line-view.component.html',
  styleUrls: ['./line-view.component.css']
})
export class LineViewComponent implements OnInit {

  buildingNumber:string="";

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildingNumber = this.route.snapshot.params['building'];
    console.log(this.buildingNumber);

  }

}
