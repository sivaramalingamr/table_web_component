import { Component, ElementRef, HostListener, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'custom-table-app',
  templateUrl: './table-app.component.html',
  styleUrls: ['./table-app.component.scss']
})
export class TableAppComponent implements OnInit {

  tableData: any = [];
  headerKey: any = [];
  jsonData: any = [];
  limitData = 50;
  isDataLoad = false;
  @ViewChild('tableScroll')
  tableScroll!: ElementRef;
  @Input() dataSource: any[];
  noDataFoundMsg: string = 'No Data Found!';
  constructor() { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
  }
  
  ngOnChanges(changes: SimpleChanges){
    if(changes.dataSource){
      this.getTableDataValues();
    }
  }
  
  @HostListener('scroll', ['$event'])
  onScroll(e: Event): void {
    if (this.getYPosition(e)) {
      this.isDataLoad = true;
      const newLimit = this.limitData + 50;
      let x = this.dataSource.splice(this.limitData, newLimit);
      x.forEach(element => {
        this.tableData.push(element);
      });
      this.isDataLoad = false;
      this.limitData = newLimit;
    }
  }

  getTableDataValues(): void {
    if (this.dataSource && this.dataSource.length > 0) {
      this.tableData = this.dataSource.slice(0, this.limitData);
      Object.keys(this.tableData[0]).forEach(d => {
        this.headerKey.push(d);
      });
    } 
  }

  getYPosition(e: Event): boolean {
    return (this.tableScroll.nativeElement.scrollTop) 
    >= 
    (this.tableScroll.nativeElement.scrollHeight 
    - (this.tableScroll.nativeElement.clientHeight + 100));
  }
}
