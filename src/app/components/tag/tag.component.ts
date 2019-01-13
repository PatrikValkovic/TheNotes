import {Component, Input, OnInit} from '@angular/core';
import {FilteringService} from '../../services/filtering.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  @Input() tag: string;
  selected = false;

  constructor(private filter: FilteringService) {
    this.filter.tagsSelectionChanged.subscribe(() => {
      this.selected = this.filter.isTagSelected(this.tag);
    });
  }


  ngOnInit() {
  }

}
