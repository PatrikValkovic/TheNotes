import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FilteringService} from '../../services/filtering.service';
import {isUndefined} from 'util';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  @Input() tag: string;
  @Input() isSelected: boolean;
  selected = false;

  get asSelected(): boolean {
    return isUndefined(this.isSelected) ? this.selected : this.isSelected;
  }

  constructor(private filter: FilteringService,
              private cdr: ChangeDetectorRef) {
    this.filter.tagsSelectionChanged.subscribe(() => {
      this.selected = this.filter.isTagSelected(this.tag);
      this.cdr.markForCheck();
    });
  }


  ngOnInit() {
  }

}
