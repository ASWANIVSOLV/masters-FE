import { Component ,ViewChild,EventEmitter,ElementRef, Output} from '@angular/core';
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
export interface department{
  id:string;
  name:string;
}
export interface subdepartment{
  id:string;
  name:string;

}
@Component({
  selector: 'app-employee-type-mapping',
  templateUrl: './employee-type-mapping.component.html',
  styleUrl: './employee-type-mapping.component.scss'
})
export class EmployeeTypeMappingComponent {
  employeetypeForm:FormGroup |any;
  isLoading:boolean=false;
  employeeList:any=[];
  employeetypelist:any=[];
  empid:any;
  has_next:boolean=false;
  has_previous:boolean=false;
  currentpage:number=1;
  has_deptnxt:boolean=false;
  has_deptpre:boolean=false;
  has_deptpage:number=1;
  subteamdatalist:any=[]
  has_subdeptnxt:boolean=false;
  has_subdeptpre :boolean=false;
  has_subdeptpage:number=1;
  d:any;
  @ViewChild('emp') matempAutocomplete: MatAutocomplete;
  @ViewChild('empInput') empInput:any;
  @ViewChild('subdeptinfo') submatdept:MatAutocomplete;
  @ViewChild('subdeptInput') subdeptInput:ElementRef;
  @ViewChild('deptinfo') matdept:MatAutocomplete;
  @ViewChild('deptInput') deptinput:ElementRef;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;

  @Output() onCancel = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private shareService: ShareService,private dataService: masterService, private toastr:ToastrService,private notification: NotificationService,  private SpinnerService: NgxSpinnerService) { }
  ngOnInit(): void {
    this.employeetypeForm=this.fb.group({
      'employee_id':new FormControl(''),
      'employeetype':new FormControl(''),
      'employeesubteam':new FormControl('')
    })
    let empkeyvalue: String = "";
    this.getemployeeFK(empkeyvalue);
    this.employeetypeForm.get('employee_id').valueChanges
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
  this.employeetypeForm.get('employeetype').valueChanges.
    pipe(
      tap(()=>{
        this.isLoading=true;
      }),
      switchMap((value:any)=>this.dataService.getlistteamdepartment(1,value).pipe(
        finalize(()=>{
          this.isLoading=false;
        })
      )
      )
    ).subscribe(data=>{
      console.log('7');
      this.employeetypelist=data['data'];
      // console.log(this.hierarchylist);
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
getdepartmentdata(){
  let d:any='';
  if(this.employeetypeForm.get('employeetype').value.id == null || this.employeetypeForm.get('employeetype').value=='' || this.employeetypeForm.get('employeetype').value.id==undefined){
    d='';
  }
  else{
    d=this.employeetypeForm.get('employeetype').value;
  }
  this.dataService.getlistteamdepartment(1, d).subscribe(data=>{
    this.employeetypelist=data['data'];
  });
}

  public displayFnemp(emp?: Emplistss): string | undefined {
    console.log('id', emp.id);
    this.empid=emp.id
    console.log('full_name', emp.full_name);
    return emp ? emp.full_name : undefined;
  }
  getdepartmentinterface(data ?:department):string | undefined{
    return data? data.name:undefined;
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
  autocompleteScrolldept() {
    setTimeout(() => {
      if (
        this.matdept &&
        this.autocompleteTrigger &&
        this.matdept.panel
      ) {
        fromEvent(this.matdept.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matdept.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matdept.panel.nativeElement.scrollTop;
            const scrollHeight = this.matdept.panel.nativeElement.scrollHeight;
            const elementHeight = this.matdept.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_deptnxt === true) {
                this.dataService.getlistteamdepartment(this.has_deptpage+1,this.deptinput.nativeElement.value)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.employeetypelist = this.employeetypelist.concat(datas);
                    if (this.employeetypelist.length >= 0) {
                      this.has_deptnxt = datapagination.has_next;
                      this.has_deptpre = datapagination.has_previous;
                      this.has_deptpage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  getsubteamdata(){
    if(this.employeetypeForm.get('employeetype').value.id == null || this.employeetypeForm.get('employeetype').value=='' || this.employeetypeForm.get('employeetype').value.id==undefined){
      this.notification.showError('Please select The Team');
      return false;
     }
     this.dataService.getlistdepartment_data_entity(1,this.employeetypeForm.get('employeetype').value.id).subscribe(data=>{
       this.subteamdatalist=data['data'];
     });
  }
  autocompleteScrollsubdept(){
    setTimeout(() => {
      if (
        this.submatdept &&
        this.autocompleteTrigger &&
        this.submatdept.panel
      ) {
        fromEvent(this.submatdept.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.submatdept.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.submatdept.panel.nativeElement.scrollTop;
            const scrollHeight = this.submatdept.panel.nativeElement.scrollHeight;
            const elementHeight = this.submatdept.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_subdeptnxt === true) {
                this.dataService.getlistdepartment_data_entity(this.has_deptpage+1,this.subdeptInput.nativeElement.value)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.subteamdatalist = this.subteamdatalist.concat(datas);
                    if (this.subteamdatalist.length >= 0) {
                      this.has_subdeptnxt = datapagination.has_next;
                      this.has_subdeptpre = datapagination.has_previous;
                      this.has_subdeptpage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });

  }
  getsubteaminterface(data ?:subdepartment):string | undefined{
    return data? data.name:undefined;
  }
  emptypevalue(){
    let emp_id=this.employeetypeForm.get('employee_id').value.id;
    let emp_type=this.employeetypeForm.get('employeetype').value.id;
    let dept_id=this.employeetypeForm.get('employeesubteam').value.id
    if(!emp_id){
      this.notification.showWarning("Please select Employee Name")
      return false;
    }
    if(!emp_type){
      this.notification.showWarning("Please select Team")
      return false;
    }
    if(!dept_id){
      this.notification.showWarning("Please select Subteam")
      return false;
    }
    let empdata={
      'id':this.employeetypeForm.get('employee_id').value.id,
      'employee_type':this.employeetypeForm.get('employeetype').value.id,
      'department_id':this.employeetypeForm.get('employeesubteam').value.id
    }
    this.SpinnerService.show();
    this.dataService.employeetypeMap(empdata).subscribe(res=>{
      this.SpinnerService.hide()
      if(res['code']){
        this.notification.showError(res['description'])
      }else{
        this.notification.showSuccess(res['message'])
      }
    })
    this.employeetypeForm.reset();

  }
  cancelform(){
    this.onCancel.emit()
  }
}
