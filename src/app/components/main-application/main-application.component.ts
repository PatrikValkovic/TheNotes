import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {AccountManagementService} from '../../services/account-management.service';
import {Router} from '@angular/router';
import {ConvertService} from '../../services/convert.service';
import {SettingRepositoryService} from '../../services/setting-repository.service';

@Component({
  selector: 'app-main-application',
  templateUrl: './main-application.component.html',
  styleUrls: ['./main-application.component.scss']
})
export class MainApplicationComponent implements OnInit {

  private componentWidth: number;
  showLeftPanel = true;

  constructor(private account: AccountManagementService,
              private router: Router,
              private convert: ConvertService,
              private el: ElementRef,
              private settings: SettingRepositoryService) {
  }

  async ngOnInit() {
    if (!await this.account.isUserLogIn()) {
      return this.router.navigate(['/login']);
    }
    this.componentResize();
  }

  get leftPanelWidth(): number {
    if (!this.showLeftPanel) {
      return 0;
    }

    if (!this.componentWidth || !this.settings.loaded()) {
      return 10;
    }

    const currentWidth = this.componentWidth;
    const widthForRight = currentWidth - 10; // for left panel
    const margin = this.settings.getMargin();
    const width = this.settings.getNoteWidth();
    const widthOfOne = margin + width;
    const widthForNotes = widthForRight - margin;
    const numberOFNotes = Math.floor(widthForNotes / widthOfOne);
    const totalWidth = numberOFNotes * widthOfOne + margin;
    return currentWidth - totalWidth;
  }

  get numberOfNoteColumns(): number {
    if (!this.componentWidth || !this.settings.loaded()) {
      return 3;
    }

    const currentWidth = this.componentWidth;
    const leftWidth = this.leftPanelWidth;
    const noteWidth = this.settings.getMargin() + this.settings.getNoteWidth();
    return Math.floor((currentWidth - leftWidth) / noteWidth);
  }


  @HostListener('window:resize')
  componentResize() {
    const offsetWidth: number = this.el.nativeElement.offsetWidth;
    this.componentWidth = this.convert.pxToEm(offsetWidth);
  }

  toggleMenu() {
    this.showLeftPanel = !this.showLeftPanel;
  }
}
