import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-base',
  template: `
      <div>
          base works!!
      </div>
  `
})
export class BaseComponent implements OnDestroy {
  deviceInfo?:  DeviceInfo;
  isMobile = false;
  destroyed = new Subject();
  constructor(deviceService?: DeviceDetectorService) {
    if(deviceService){
      this.deviceInfo = deviceService.getDeviceInfo();
      this.isMobile = deviceService.isMobile();
    }
  }

  ngOnDestroy() {
    this.destroyed.next(null);
    this.destroyed.complete();
  }

}