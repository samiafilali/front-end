import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';


import { NgbdJobGridSortableHeader } from './grid-sortable.directive';
import { jobGridModel } from './grid.model';
import { JobGridService } from './grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [JobGridService, DecimalPipe]
})

/**
 * Grid Component
 */
export class GridComponent implements OnInit {

  modalRef?: BsModalRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  public isCollapsed: boolean = true;
  submitted: boolean = false;
  // Table data
  content?: any;
  grids?: any;
  jobGrid!: Observable<jobGridModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdJobGridSortableHeader) headers!: QueryList<NgbdJobGridSortableHeader>;

  constructor(public service: JobGridService, private formBuilder: UntypedFormBuilder,private modalService: BsModalService) {
    this.jobGrid = service.jobGrid$;
    this.total = service.total$;
  }

  ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Compte rendu' }, { label: 'Compte rendu', active: true }];
   /**
   * fetches data
   */
    this.jobGrid.subscribe(x => {
     this.content = this.grids;
     this.grids =  Object.assign([], x);   
   });
  }

  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }


}
