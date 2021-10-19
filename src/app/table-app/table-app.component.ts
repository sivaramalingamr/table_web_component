import {
  Component,
  ElementRef,
  HostListener,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'custom-table-app',
  templateUrl: './table-app.component.html',
  styleUrls: ['./table-app.component.scss'],
})
export class TableAppComponent {
  tableData: any = [];
  headerKey: any = [];
  jsonData: any = [];
  isDataLoad = false;
  @ViewChild('ngxTableScroll')
  ngxTableScroll!: ElementRef;
  @Input() dataSource: any[] = [];
  @Input() limitData = 50;
  noDataFoundMsg: string = 'No Data Found!';
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSource) {
      this.getTableDataValues();
    }
  }

  @HostListener('scroll', ['$event'])
  onScroll(e: Event): void {
    if (this.getYPosition(e)) {
      this.isDataLoad = true;
      const newLimit = this.limitData + 50;
      let x = this.dataSource.splice(this.limitData, newLimit);
      x.forEach((element) => {
        this.tableData.push(element);
      });
      this.isDataLoad = false;
      this.limitData = newLimit;
    }
  }

  getTableDataValues(): void {
    if (this.dataSource && this.dataSource.length > 0) {
      this.tableData = this.dataSource.slice(0, this.limitData);
      Object.keys(this.tableData[0]).forEach((d) => {
        this.headerKey.push(d);
      });
    }
  }

  getYPosition(e: Event): boolean {
    return (
      this.ngxTableScroll.nativeElement.scrollTop >=
      this.ngxTableScroll.nativeElement.scrollHeight -
        (this.ngxTableScroll.nativeElement.clientHeight + 100)
    );
  }
}
