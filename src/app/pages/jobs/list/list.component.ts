import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { AlerteService } from 'src/app/shared/services/alerte.service';
import { NgbdJobListSortableHeader } from './list-sortable.directive';
import { jobListModel } from './list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  lists?: any;
  alertes$: Observable<any[]>;

  @ViewChildren(NgbdJobListSortableHeader) headers!: QueryList<NgbdJobListSortableHeader>;

  constructor(private alerteService: AlerteService) {
    this.alertes$ = alerteService.getAllAlertes();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Alertes' }, { label: 'Alertes', active: true }];

    this.alertes$.subscribe({
      next: alertes => {
        console.log('Alertes reçues:', alertes);
        this.lists = alertes;
      },
      error: err => {
        console.error('Error fetching alerts:', err);
      }
    });
  }
}