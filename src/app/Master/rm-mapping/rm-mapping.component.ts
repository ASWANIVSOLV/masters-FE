import { Component , ElementRef, OnInit, Output, ViewChild,EventEmitter} from '@angular/core';
import { FormGroup,FormArray,FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { masterService } from '../master.service';

import { NotificationService } from 'src/app/service/notification.service';

import { fromEvent } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rm-mapping',
  
  templateUrl: './rm-mapping.component.html',
  styleUrl: './rm-mapping.component.scss'
})
export class RmMappingComponent {
  isLoading:boolean=false;
  rmcreateForm:FormGroup;
  rmlist:any=[];
  functional_head_list:any=[];
  has_rmnxt:boolean=false; 
  has_rmpre :boolean=false;
  has_rmpage:number=1;
  has_functionheadnxt :boolean=false;
  has_functionheadpre :boolean=false;
  has_functionheadpage:number=1;
  empid:any;
  employeeList:any=[];
  has_next:boolean=false;
  has_previous:boolean=false;
  currentpage :number=1;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;
  @ViewChild('rminfo') matrm:MatAutocomplete;
  @ViewChild('functionalheadinput') functionalheadinput:ElementRef;
  @ViewChild('functionalheadinfo') matfunctionalhead:MatAutocomplete;
  @ViewChild('rminput') rminput:ElementRef;
  @ViewChild('emp') matempAutocomplete: MatAutocomplete;
  @ViewChild('empInput') empInput:any;
  @Output() onCancel=new EventEmitter<any>();

  constructor(private spinner:NgxSpinnerService,private notification:NotificationService,private fb:FormBuilder,private masterservice:masterService) {
  }
  ngOnInit(): void {
    this.rmcreateForm=this.fb.group({
      'employee_id':new FormControl(''),
      'rmname':new FormControl(''),
      'functional_head_name':new FormControl('')
    })

    let empkeyvalue: String = "";
    this.getemployeeFK(empkeyvalue);
    this.rmcreateForm.get('employee_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')
        }),
        switchMap(value => this.masterservice.getemployeeFKdd(value, 1)
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
    this.spinner.show();
    this.masterservice.getemployeeFK(empkeyvalue)
        .subscribe((results: any[]) => {
          this.spinner.hide();
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
          this.spinner.hide();
        })
  }
  
  getrmlist(){
    // if (this.createemployss.get('entity').value==undefined || this.createemployss.get('entity').value=="" || this.createemployss.get('entity').value.id==undefined || this.createemployss.get('entity').value.id==""){
    //   this.notification.showWarning("Please Select The Entity Name..");
    //   return false;
    // }
    // let entity_id:any=this.createemployss.get('entity').value.id;
    this.masterservice.getlistdepartmentsenoor_entity(1,'').subscribe(data=>{
      this.rmlist=data['data'];})

    this.rmcreateForm.get('rmname').valueChanges.
    pipe(
      tap(()=>{
        this.isLoading=true;
      }),
      switchMap((value:any)=>this.masterservice.getlistdepartmentsenoor_entity(1,value).pipe(
        finalize(()=>{
          this.isLoading=false;
        }),
      )
      )
     
    ).subscribe(data=>{
      console.log('2');
      this.rmlist=data['data'];
      console.log(this.rmlist)
    });

  }
  autocompleterm() {
    setTimeout(() => {
      if (
        this.matrm &&
        this.autocompleteTrigger &&
        this.matrm.panel
      ) {
        fromEvent(this.matrm.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matrm.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matrm.panel.nativeElement.scrollTop;
            const scrollHeight = this.matrm.panel.nativeElement.scrollHeight;
            const elementHeight = this.matrm.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_rmnxt === true) {
                this.masterservice.getlistdepartmentsenoor_entity(this.has_rmpage+1, this.rminput.nativeElement.value)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.rmlist = this.rmlist.concat(datas);
                    if (this.rmlist.length >= 0) {
                      this.has_rmnxt = datapagination.has_next;
                      this.has_rmpre = datapagination.has_previous;
                      this.has_rmpage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  autocompleteFunctionalHead() {
    setTimeout(() => {
      if (
        this.matfunctionalhead &&
        this.autocompleteTrigger &&
        this.matfunctionalhead.panel
      ) {
        fromEvent(this.matfunctionalhead.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matfunctionalhead.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matfunctionalhead.panel.nativeElement.scrollTop;
            const scrollHeight = this.matfunctionalhead.panel.nativeElement.scrollHeight;
            const elementHeight = this.matfunctionalhead.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_functionheadnxt === true) {
                this.masterservice.getlistdepartmentsenoor_entity(this.has_functionheadpage+1, this.functionalheadinput.nativeElement.value)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.functional_head_list = this.functional_head_list.concat(datas);
                    if (this.functional_head_list.length >= 0) {
                      this.has_functionheadnxt = datapagination.has_next;
                      this.has_functionheadpre = datapagination.has_previous;
                      this.has_functionheadpage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  getrminterface(data ?:rmname):string | undefined{
    return data ?data.code +' - '+data.name:undefined;
  }
  getfunctionalheadinterface(data ?:functionalhead):string | undefined{
    return data ?data.code +' - '+data.name:undefined;
  }

getfunctionallist(){
  // if (this.createemployss.get('entity').value==undefined || this.createemployss.get('entity').value=="" || this.createemployss.get('entity').value.id==undefined || this.createemployss.get('entity').value.id==""){
  //   this.notification.showWarning("Please Select The Entity Name..");
  //   return false;
  // }
  // let entity_id:any=this.createemployss.get('entity').value.id;
  this.masterservice.getlistdepartmentsenoor_entity(1,'').subscribe(data=>{
    this.functional_head_list=data['data'];})

  this.rmcreateForm.get('functional_head_name').valueChanges.
  pipe(
    tap(()=>{
      this.isLoading=true;
    }),
    switchMap((value:any)=>this.masterservice.getlistdepartmentsenoor_entity(1,value).pipe(
      finalize(()=>{
        this.isLoading=false;
      }),
    )
    )
   
  ).subscribe(data=>{
    console.log('2');
    this.functional_head_list=data['data'];
    console.log(this.functional_head_list)
  });
}
emptypevalue(){
    let emp_id=this.rmcreateForm.get('employee_id').value.id;
    let rmname=this.rmcreateForm.get('rmname').value.id;
    let fun_head=this.rmcreateForm.get('functional_head_name').value.id
    if(!emp_id){
      this.notification.showWarning("Please select Employee Name")
      return false;
    }
    if(!rmname){
      this.notification.showWarning("Please select RM Name")
      return false;
    }
    if(!fun_head){
      this.notification.showWarning("Please select Function Head")
      return false;
    }
    let empdata={
      'id':this.rmcreateForm.get('employee_id').value.id,
      'rm':this.rmcreateForm.get('rmname').value.id,
      'functional_head':this.rmcreateForm.get('functional_head_name').value.id
    }
    this.spinner.show();
    this.masterservice.rmMapcreate(empdata).subscribe(res=>{
      this.spinner.hide()
      if(res['code']){
        this.notification.showError(res['description'])
      }else{
        this.notification.showSuccess(res['message'])
        this.rmcreateForm.get('employee_id').setValue('')
        this.rmcreateForm.get('rmname').reset()
        this.rmcreateForm.get('functional_head_name').reset()
      }
    })
    

}
cancelform(){
  this.onCancel.emit()

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
              this.masterservice.getemployeeFKdd(this.empInput.nativeElement.value, this.currentpage + 1)
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
                  this.spinner.hide();
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
}
export interface Emplistss {
  id: string;
  full_name: string;
}
 export interface rmname{
  id:string;
  name:string;
  code:string;
}
export interface functionalhead{
  id:string;
  name:string;
  code:string;
}
