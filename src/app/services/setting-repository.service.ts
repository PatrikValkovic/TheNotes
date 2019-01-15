import {Injectable} from '@angular/core';
import {DatabaseManagementService} from './database-management.service';

@Injectable({
  providedIn: 'root'
})
export class SettingRepositoryService {

  constructor(private database: DatabaseManagementService) {
    // TODO implemented loading
  }

  loaded(): boolean {
    return true;
  }

  getNoteWidth(): number {
    return 16;
  }

  getMargin(): number {
    return 1;
  }
}
