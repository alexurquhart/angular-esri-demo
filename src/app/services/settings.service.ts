import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppSettings } from '../interfaces/app-settings';

@Injectable()
export class SettingsService {

  private _settings = new BehaviorSubject<AppSettings>({
    coordinateType: 'mgrs'
  });

  public settings = this._settings.asObservable();

  constructor() { }

  set(newSettings: AppSettings) {
    this._settings.next(newSettings);
  }
}
