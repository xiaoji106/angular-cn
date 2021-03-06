import {
  Component,
  ContentChild,
  Input,
  QueryList,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'content-child',
  template: `
  <span class="content-child" *ngIf="active">
    Active
  </span>`
})
export class ContentChildComponent {
  active = false;

  activate() {
    this.active = true;
  }
}

////////////////////

// #docregion content
@Component({
  selector: 'view-child',
  template: `
  <h2 [class.active]=active>
    {{hero.name}}
    <ng-content></ng-content>
  </h2>`,
  styles: ['.active {font-weight: bold; background-color: skyblue;}']
})
export class ViewChildComponent {
  @Input() hero;
  active = false;

  @ContentChild(ContentChildComponent) content;

  activate() {
    this.active = !this.active;
    this.content.activate();
  }
}
// #enddocregion content

////////////////////

// #docregion view
@Component({
  selector: 'hero-queries',
  template: `
    <view-child *ngFor="let hero of heroData" [hero]="hero">
      <content-child></content-child>
    </view-child>
    <button (click)="activate()">{{buttonLabel}} All</button>
  `
})
export class HeroQueriesComponent {
  active = false;
  heroData = [
    {id: 1, name: 'Windstorm'},
    {id: 2, name: 'LaughingGas'}
  ];

  @ViewChildren(ViewChildComponent) views;

  activate() {
    this.active = !this.active;
    this.views.forEach(
      view => view.activate()
    );
  }

  get buttonLabel() {
    return this.active ? 'Deactivate' : 'Activate';
  }
}
// #enddocregion view
