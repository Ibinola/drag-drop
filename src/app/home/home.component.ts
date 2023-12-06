import { Component, OnInit } from '@angular/core';
import { CdkDrag, copyArrayItem, moveItemInArray, transferArrayItem, CdkDragExit, CdkDragDrop } from '@angular/cdk/drag-drop';

export interface Components{
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  label: string;
  colSize: number;
  temp?: boolean;
}

export interface Layouts {
  columns: {
    colSize: number;
    content: string;
  }[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  components: Components[] = [];
  content: Components[] = [];
  layouts: string[] = []
  transferringItem: string | undefined = undefined;
  isEditing = false;
  constructor() { }

  ngOnInit(): void {
    this.components = [
      {id: 1, title: 'Heading', imageUrl: '', description: '', label: '', colSize: 12},
      {id: 2, title: 'TextInputField', imageUrl: '', description: '', label: '', colSize: 12 },
      {id: 3, title: 'TextArea', imageUrl: '', description: '', label: '', colSize: 12},
      {id: 4, title: 'Image', imageUrl: '', description: '', label: '', colSize: 6},
      {id: 5, title: 'Button', imageUrl: '', description: '', label: '', colSize: 6},
    ]

    this.layouts = ['equalDoubleLayout', 'equalTripleLayout', 'customLayout', 'reversedCustomLayout']

  }

  drop(event: any) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.transferringItem = undefined;
  }



  exited(e: any) {
    this.transferringItem = e.item.data;
  }

  entered() {
    if (this.transferringItem) {

      this.transferringItem = undefined;
    }
  }

}
