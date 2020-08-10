import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  properties = [];
  propertiesSubscription: Subscription;

  constructor( private propertiesService: PropertiesService) { }

  ngOnInit(): void {
    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      (data: any) => {
        this.properties = data;
      }
    );
    this.propertiesService.emitProperties();
  }

  getSoldValue(index) {
    if (this.properties[index].sold) {
      return 'green';
    } else {
      return 'red';
    }
  }
  
  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }
 
}
