import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-building-view',
  templateUrl: './building-view.component.html',
  styleUrls: ['./building-view.component.css']
})
export class BuildingViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showLine(buildingNumber){
    this.router.navigate(['/kanban/building/'+buildingNumber]);
  }

}
