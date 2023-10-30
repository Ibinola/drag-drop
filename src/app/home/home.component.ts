import { Component, OnInit } from '@angular/core';
import { CdkDrag, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

export interface Components{
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  label: string;
  colSize: number;
  temp?: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  components: Components[] = [];
  content: Components[] = [];
  constructor() { }

  ngOnInit(): void {
    this.components = [ 
      {id: 1, title: 'Heading', imageUrl: '', description: '', label: '', colSize: 12},
      {id: 2, title: 'TextInputField', imageUrl: '', description: '', label: '', colSize: 12 },
      {id: 3, title: 'TextArea', imageUrl: '', description: '', label: '', colSize: 12},
      {id: 4, title: 'Image', imageUrl: '', description: '', label: '', colSize: 6},
      {id: 5, title: 'Button', imageUrl: '', description: '', label: '', colSize: 6},
    ]
  }

  drop(event: any) {
    console.log(event);
    if (event.previousContainer !== event.container) {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    if (event.previousContainer.data) {
      this.components = this.components.filter((f) => !f.temp);
    }
  }

  exited(event: any) {
    console.log('on exit:', event);
    const currentId = event.container.data.findIndex(
      (f: any) => f.id === event.item.dropContainer.data.id
    );
    this.components.splice(currentId + 1, 0, {
      ...event.item.data,
      temp: true,
    });
  }

  entered(event?: any) {
    this.components = this.components.filter((f) => !f.temp);
    console.log(this.components)
  }
}
