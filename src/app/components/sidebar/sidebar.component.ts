import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'web_asset', class: '' },
    { path: '/perfil' , title: 'Perfis', icon: 'person', class: '' },
    { path: '/cliente' , title: 'Clientes', icon: 'face', class: '' },
    { path: '/concessionaria', title: 'Concessionárias', icon: 'account_balance', class: '' },
    { path: '/empresa', title: 'Empresas', icon: 'domain', class: '' },
    { path: '/unidade', title: 'Unidades', icon: 'location_city', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
