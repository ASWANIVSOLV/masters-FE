import { Component,ViewChild,EventEmitter,ElementRef, Output } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/service/notification.service';
import {  MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, tap, switchMap, finalize, takeUntil, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { masterService } from '../master.service'
import { ShareService } from '../share.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

export interface Emplistss {
  id: string;
  full_name: string;
}
export interface bsdata{
  id:string;
  name:string;
}
export interface ccdata{
  id:string;
  name:string;
}
@Component({
  selector: 'app-bscc-mapping',
  templateUrl: './bscc-mapping.component.html',
  styleUrl: './bscc-mapping.component.scss'
})
export class BsccMappingComponent {
  CCBSForm:FormGroup |any;
  isLoading:boolean=false;
  employeeList:any=[];
  employeetypelist:any=[];
  empid:any;
  has_next:boolean=false;
  has_previous:boolean=false;
  currentpage:number=1;
  bsdatalist:any=[];
  has_bsnxt:boolean=false;
  has_bspre:boolean=false;
  has_bspage:number=1;
  ccdatalist:any=[];
  @ViewChild('bsinfo') matbsdata:MatAutocomplete;
  @ViewChild('bsInput') bsinput:ElementRef;
  @ViewChild('ccinfo') matccdata:MatAutocomplete;
  @ViewChild('ccInput') ccinput:ElementRef;
  @ViewChild('emp') matempAutocomplete: MatAutocomplete;
  @ViewChild('empInput') empInput:any;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;
  @Output() onCancel = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private shareService: ShareService,private dataService: masterService, private toastr:ToastrService,private notification: NotificationService,  private SpinnerService: NgxSpinnerService) { }
  ngOnInit(): void {
    this.CCBSForm=this.fb.group({
      'employee_id':new FormControl(''),
      'employeetype':new FormControl(''),
      'bsname':new FormControl(''),
      'ccname':new FormControl('')
    })
    let empkeyvalue: String = "";
    this.getemployeeFK(empkeyvalue);
    this.CCBSForm.get('employee_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')
        }),
        switchMap(value => this.dataService.getemployeeFKdd(value, 1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.employeeList = datas;

  });

  }
  getemployeeFK(empkeyvalue){
    this.SpinnerService.show();
    this.dataService.getemployeeFK(empkeyvalue)
        .subscribe((results: any[]) => {
          this.SpinnerService.hide();
          let datas = results["data"];
          this.employeeList = datas;
          let datapagination = results["pagination"];
          if (this.employeeList.length >= 0) {
            this.has_next = datapagination.has_next;
            this.has_previous = datapagination.has_previous;
            this.currentpage = datapagination.index;
          }
          console.log("employeeList", datas)
        },(error) => {
          this.SpinnerService.hide();
        })
  }
  autocompleteempScroll() {
    setTimeout(() => {
      if (
        this.matempAutocomplete &&
        this.autocompleteTrigger &&
        this.matempAutocomplete.panel
      ) {
        fromEvent(this.matempAutocomplete.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matempAutocomplete.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matempAutocomplete.panel.nativeElement.scrollTop;
            const scrollHeight = this.matempAutocomplete.panel.nativeElement.scrollHeight;
            const elementHeight = this.matempAutocomplete.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_next === true) {
                this.dataService.getemployeeFKdd(this.empInput.nativeElement.value, this.currentpage + 1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.employeeList = this.employeeList.concat(datas);
                    // console.log("emp", datas)
                    if (this.employeeList.length >= 0) {
                      this.has_next = datapagination.has_next;
                      this.has_previous = datapagination.has_previous;
                      this.currentpage = datapagination.index;
                    }
                  },(error) => {
                    this.SpinnerService.hide();
                  })
              }
            }
          });
      }
    });
  }
  public displayFnemp(emp?: Emplistss): string | undefined {
    console.log('id', emp.id);
    this.empid=emp.id
    console.log('full_name', emp.full_name);
    return emp ? emp.full_name : undefined;
  }
  getbsdatainterface(data?:bsdata):string | undefined{
    return data?data.name:undefined;
  }
  gerccdatainterface(data?:ccdata):string| undefined{
    return data?data.name:undefined;
  }
  getbsdata(){
    let d:any='';
    if(this.CCBSForm.get('bsname').value == null || this.CCBSForm.get('bsname').value=='' || this.CCBSForm.get('bsname').value==undefined){
      d='';
    }
    else{
      d=this.CCBSForm.get('bsname').value;
    }
    this.dataService.getbsdatafilter(d,1).subscribe(data=>{
      this.bsdatalist=data['data'];
    });
  }
  getccdata(){
    if(this.CCBSForm.get('bsname').value.id == null || this.CCBSForm.get('bsname').value=='' || this.CCBSForm.get('bsname').value.id==undefined){
     this.notification.showError('Please select The BS Name');
     return false;
    }
    let d:any=this.CCBSForm.get('bsname').value.id;
    console.log(this.CCBSForm.get('bsname').value.id);
    this.dataService.getccdatafilter(this.CCBSForm.get('bsname').value.id,'',1).subscribe(data=>{
      this.ccdatalist=data['data'];
    });
    this.CCBSForm.get('ccname').valueChanges.
    pipe(
      tap(()=>{
        this.isLoading=true;
      },
      switchMap((value:any)=>this.dataService.getccdatafilter(this.CCBSForm.get('bsname').value.id,'',1).pipe(
        finalize(()=>{
          this.isLoading=false;
        })
      ))
      )
    ).subscribe(data=>{
      this.ccdatalist=data['data'];
    });
  }
  autocompleteScrollbs() {
    setTimeout(() => {
      if (
        this.matbsdata &&
        this.autocompleteTrigger &&
        this.matbsdata.panel
      ) {
        fromEvent(this.matbsdata.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matbsdata.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matbsdata.panel.nativeElement.scrollTop;
            const scrollHeight = this.matbsdata.panel.nativeElement.scrollHeight;
            const elementHeight = this.matbsdata.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_bsnxt === true) {
                this.dataService.getbsdatafilter(this.bsinput.nativeElement.value,this.has_bspage+1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.bsdatalist = this.bsdatalist.concat(datas);
                    if (this.bsdatalist.length >= 0) {
                      this.has_bsnxt = datapagination.has_next;
                      this.has_bspre = datapagination.has_previous;
                      this.has_bspage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  ccbsValue(){
    let emp_id=this.CCBSForm.get('employee_id').value.id;
    let bs_id=this.CCBSForm.get('bsname').value.id;
    let cc_id=this.CCBSForm.get('ccname').value.id;
    if(!emp_id){
      this.notification.showWarning("Please Select Employee Name")
       return false;
    }
    if(!bs_id){
      this.notification.showWarning("Please Select Business Segment")
      return false;

    }
    if(!cc_id){
      this.notification.showWarning("Please Select Cost Center")
      return false;

    }
    let data={
      'id':emp_id,
      'costcentre':bs_id,
      'businesssegment':cc_id
    }
    this.SpinnerService.show()
    this.dataService.BsccMap(data).subscribe(res=>{
      this.SpinnerService.hide()
      if(res['code']){
        this.notification.showError(res['description'])
      }else{
        this.notification.showSuccess(res['message'])
        this.CCBSForm.reset();

      }


    })


  }
  cancelform(){
    this.onCancel.emit()
  }
}
