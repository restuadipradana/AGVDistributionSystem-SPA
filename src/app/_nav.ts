import { INavData } from '@coreui/angular';
import { Injectable } from "@angular/core";

export const navItems: INavData[] = [
  //{
  //  name: '1. Kanban',
  //  url: '/kanban',
  //  icon: 'icon-pie-chart'
  //},
  //{
  //  name: '2. Generate QR Code',
  //  url: '/generate/generate',
  //  icon: 'icon-pie-chart',
  //  children: [
  //    {
  //      name: '2.1. Generate QR',
  //      url: '/generate/generate',
  //      icon: 'icon-puzzle'
  //    },
  //    {
  //      name: '2.2 Status',
  //      url: '/generate/status',
  //      icon: 'icon-puzzle'
  //    }
  //  ]
  //},
  //{
  //  name: '3. Scan',
  //  url: '/scan',
  //  icon: 'icon-puzzle',
  //  children: [
  //    {
  //      name: '3.1. Scan Ready',
  //      url: '/scan/scan-ready',
  //      icon: 'icon-puzzle'
  //    },
  //    {
  //      name: '3.2 Scan AGV',
  //      url: '/scan/scan-agv',
  //      icon: 'icon-puzzle'
  //    }
  //  ]
  //},
  //{
  //  name: '4. User Management',
  //  url: '/user',
  //  icon: 'icon-puzzle',
  //  children: [
  //    {
  //      name: '4.1. Authorization',
  //      url: '/user/authorization',
  //      icon: 'icon-puzzle'
  //    }
  //  ]
  //},
];

@Injectable({
  providedIn: "root", // <- ADD THIS
})

export class NavItem {
  navItems: INavData[] = [];
  hasKanban: boolean;
  hasGenerateQR: boolean;
  hasScan: boolean;
  hasUserManageent: boolean;
  constructor() {}

  getNav(user: any) {
    if( user == null) return [];

    this.navItems = [];
    this.hasKanban = true;
    this.hasGenerateQR = false;
    this.hasScan = false;
    this.hasUserManageent = false;

    const navItemKanban = {
      name: '1. Kanban',
      url: '/kanban',
      icon: 'icon-graph',
    };

    const navItemGenerateQR = {
      name: '2. Generate QR Code',
      url: '/generate/generate',
      icon: 'icon-grid',
      children: [],
    };

    const navItemScan = {
      name: '3. Scan',
      url: '/scan',
      icon: 'icon-frame',
      children: [],
    };

    const navItemUserManagement = {
      name: '4. User Management',
      url: '/user',
      icon: 'icon-user',
      children: [],
    };

    if(user != null) {
      user.role.forEach((element) => {
        if (element === "admin") {
          const children21 = {
            name: '2.1. Generate QR',
            url: '/generate/generate',
          };
          const children22 = {
            name: '2.2 Status',
            url: '/generate/status',
          };
          const children31 = {
            name: '3.1. Scan Ready',
            url: '/scan/scan-ready',
          };

          this.hasGenerateQR = true;
          this.hasScan = true;
          navItemGenerateQR.children.push(children21);
          navItemGenerateQR.children.push(children22);
          navItemScan.children.push(children31);
        }

        if (element === "agv") {
          const children32 = {
            name: '3.2 Scan AGV',
            url: '/scan/scan-agv',
          };
          this.hasScan = true;
          navItemScan.children.push(children32);
        }

        if (element === "autho") {
          const children41 = {
            name: '4.1. Authorization',
            url: '/user/authorization',
          };
          this.hasUserManageent = true;
          navItemUserManagement.children.push(children41);
        }
      });
    }

    if (this.hasKanban) {
      this.navItems.push(navItemKanban);
    }
    if (this.hasGenerateQR) {
      this.navItems.push(navItemGenerateQR);
    }
    if (this.hasScan) {
      this.navItems.push(navItemScan);
    }
    if (this.hasUserManageent) {
      this.navItems.push(navItemUserManagement);
    }

    return this.navItems;
  }

}
