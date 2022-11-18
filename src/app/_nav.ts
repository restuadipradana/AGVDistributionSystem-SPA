import { INavData } from '@coreui/angular';
import { Injectable } from "@angular/core";

export const navItems: INavData[] = [];

@Injectable({
  providedIn: "root", // <- ADD THIS
})

/*
export class NavItemX {
  navItems: INavData[] = [];
  hasKanban: boolean;
  hasGenerateQR: boolean;
  hasScan: boolean;
  hasUserManageent: boolean;
  constructor() {}

  getNav(user: any) {

    this.navItems = [];
    if( user == null) return [
      {
        name: '1. Kanban',
        url: '/kanban',
        icon: 'icon-graph',
      }
    ];


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
            class: "menu-margin",
          };
          const children22 = {
            name: '2.2 Status',
            url: '/generate/status',
            class: "menu-margin",
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
*/

export class NavItem {
  navItems: INavData[] = [];
  hasSettings: boolean;

  constructor() {}

  getNav(user: any) {

    this.navItems = [];
    this.hasSettings = false;

    if( user == null) return [    ];



    const navItemSettings = {
      name: '0. Settings',
      url: '/settings',
      icon: 'icon-equalizer',
      children: [],
    };

    const navItemMaintain = {
      name: '1. Maintain',
      url: '/maintain',
      icon: 'icon-note',
      children: [],
    };

    const navItemTransaction = {
      name: '2. Transaction',
      url: '/transaction',
      icon: 'icon-loop',
      children: [],
    };

    const navItemKanban = {
      name: '3. Kanban',
      url: '/kanban',
      icon: 'icon-graph',
      children: [],
    };

    const navItemReport = {
      name: '4. Report',
      url: '/report',
      icon: 'icon-chart',
      children: [],
    };

    const navItemQuery = {
      name: '5. Query',
      url: '/query',
      icon: 'icon-magnifier',
      children: [],
    };

    if(user != null) {
      user.role.forEach((element) => {
        if (element === "admin") {
          const children51 = {
            name: '5.1. Generate QR',
            url: '/generate/generate',
            class: "menu-margin",
          };
          const children52 = {
            name: '5.2 Status',
            url: '/generate/status',
            class: "menu-margin",
          };
          const children21 = {
            name: '2.1. Scan Ready',
            url: '/scan/scan-ready',
            class: "menu-margin",
          };
          const kanban = {
            name: '3.1. Building Kanban',
            url: '/kanban',
            class: "menu-margin",
          }
          navItemQuery.children.push(children51);
          navItemQuery.children.push(children52);
          navItemTransaction.children.push(children21);
          navItemKanban.children.push(kanban);
        }

        if (element === "agv") {
          const children22 = {
            name: '2.2 Scan Dispatch',
            url: '/scan/scan-agv',
            class: "menu-margin",
          };
          navItemTransaction.children.push(children22);
        }

        if (element === "autho") {
          const children01 = {
            name: '0.1. User Auth',
            url: '/user/authorization',
            class: "menu-margin",
          };
          navItemSettings.children.push(children01);
          this.hasSettings = true;
        }

        if (element === "admin-shc") {
          const children53 = {
            name: '5.3. Generate QR V2',
            url: '/generate/generate-v2',
            class: "menu-margin",
          };
          navItemQuery.children.push(children53);
        }
      });
    }

    if(this.hasSettings){
      this.navItems.push(navItemSettings);
    }
    this.navItems.push(navItemMaintain);
    this.navItems.push(navItemTransaction);
    this.navItems.push(navItemKanban);
    this.navItems.push(navItemReport);
    this.navItems.push(navItemQuery);

    return this.navItems;
  }

}
