import { Component,ElementRef, OnInit, Output, ViewChild,EventEmitter} from '@angular/core';
import { FormGroup,FormArray,FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { masterService } from '../master.service';

import { NotificationService } from 'src/app/service/notification.service';

import { fromEvent } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

export interface gradedata{
  id:string;
  name:string;
}
export interface roledata{
  id:string;
  name:string;
}


@Component({
  selector: 'app-role-mapping',

  templateUrl: './role-mapping.component.html',
  styleUrl: './role-mapping.component.scss'
})
export class RoleMappingComponent {
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;
  @ViewChild('gradeinfo') matgrade:MatAutocomplete;
  @ViewChild('gradeInput') gradeinput:ElementRef;
  @ViewChild('roleinfo') matrole:MatAutocomplete;
  @ViewChild('roleinput') roleinput:ElementRef; 
  @ViewChild('emp') matempAutocomplete: MatAutocomplete;
  @ViewChild('empInput') empInput:any;
  @Output() onCancel=new EventEmitter<any>();

  rolecreateForm:FormGroup;
  isLoading:boolean=false;
  has_gradenext:boolean=false;
  has_gradepre:boolean=false;
  gradepage:number=1
  gradelist:any=[];
  rolelist:any=[];
  has_rolenext:boolean=false;
  has_rolepre:boolean=false;
  rolepage:number=1;
  empid:any;
  employeeList:any=[];
  has_next:boolean=false;
  has_previous:boolean=false;
  currentpage :number=1;


  constructor(private datepipe:DatePipe,private spinner:NgxSpinnerService,private notification:NotificationService,private fb:FormBuilder,private masterservice:masterService) {
  }

  ngOnInit(): void {
    this.rolecreateForm=this.fb.group({
      'employee_id':new FormControl(''),
      'grade':new FormControl(''),

      'role':new FormControl('')
    })
      let empkeyvalue: String = "";
      this.getemployeeFK(empkeyvalue);
      this.rolecreateForm.get('employee_id').valueChanges
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
        if (this.employeeList.length >= 0) {
          let datapagination = results['pagination'];
          this.has_next = datapagination.has_next;
          this.has_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }

  });

    


    this.rolecreateForm.get('role').valueChanges
    .pipe(
      debounceTime(100),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
        console.log('inside tap')

      }),
      switchMap(value => this.masterservice.getDesignationList_list_entity(value,'asc',this.rolepage,10)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe((data: any[]) => {
      this.rolelist=data['data'];
    });

    this.rolecreateForm.get('grade').valueChanges
    .pipe(
      debounceTime(100),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
        console.log('inside tap')

      }),
      switchMap(value => this.masterservice.getDesignationList_entity(value,'asc',this.gradepage,10)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe((data: any[]) => {
      this.gradelist=data['data'];
    });

  }
  getemployeeFK(empkeyvalue){
    this.spinner.show();
    this.masterservice.getemployeeFK(empkeyvalue)
        .subscribe((results: any[]) => {
          this.spinner.hide();
          let datas = results["data"];
          this.employeeList = datas;
          if (this.employeeList.length >= 0) {
            let datapagination = results['pagination'];
            this.has_next = datapagination.has_next;
            this.has_previous = datapagination.has_previous;
            this.currentpage = datapagination.index;
          }
          console.log("employeeList", datas)
        },(error) => {
          this.spinner.hide();
        })
  }
  getgradelist(){
    // if (this.createemployss.get('entity').value==undefined || this.createemployss.get('entity').value=="" || this.createemployss.get('entity').value.id==undefined || this.createemployss.get('entity').value.id==""){
    //   this.notification.showWarning("Please Select The Entity Name..");
    //   return false;
    // }
    // let entity_id:any=this.createemployss.get('entity').value.id;
    this.masterservice.getDesignationList_entity('','asc',this.gradepage,10).subscribe(data=>{
      this.gradelist=data['data'];
      let pagination:any=data['pagination'];
      this.has_gradenext=pagination.has_next;
      this.has_gradepre=pagination.has_previous;
      this.gradepage=pagination.index;
    });
    console.log('1',this.gradelist);
    
  }
  
  getrolelist_role(){
    // if (this.createemployss.get('entity').value==undefined || this.createemployss.get('entity').value=="" || this.createemployss.get('entity').value.id==undefined || this.createemployss.get('entity').value.id==""){
    //   this.notification.showWarning("Please Select The Entity Name..");
    //   return false;
    // }
    // let entity_id:any=this.createemployss.get('entity').value.id;
    this.masterservice.getDesignationList_list_entity('','asc',1,10).subscribe(data=>{
      this.rolelist=data['data'];
      let pagination:any=data['pagination'];
      this.has_rolenext=pagination.has_next;
      this.has_rolepre=pagination.has_previous;
      this.rolepage=pagination.index;
    });
    console.log('1',this.rolelist);
    
  }
  autocompleteGrade() {
    setTimeout(() => {
      if (
        this.matgrade &&
        this.autocompleteTrigger &&
        this.matgrade.panel
      ) {
        fromEvent(this.matgrade.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matgrade.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matgrade.panel.nativeElement.scrollTop;
            const scrollHeight = this.matgrade.panel.nativeElement.scrollHeight;
            const elementHeight = this.matgrade.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_gradenext === true) {
                this.masterservice.getDesignationList_entity(this.gradeinput.nativeElement.value,'asc',this.gradepage+1,10)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.gradelist = this.gradelist.concat(datas);
                    if (this.gradelist.length >= 0) {
                      this.has_gradenext = datapagination.has_next;
                      this.has_gradepre = datapagination.has_previous;
                      this.gradepage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  autocompleteRole() {
    setTimeout(() => {
      if (
        this.matrole &&
        this.autocompleteTrigger &&
        this.matrole.panel
      ) {
        fromEvent(this.matrole.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matrole.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matrole.panel.nativeElement.scrollTop;
            const scrollHeight = this.matrole.panel.nativeElement.scrollHeight;
            const elementHeight = this.matrole.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_rolenext === true) {
                this.masterservice.getDesignationList_entity(this.roleinput.nativeElement.value,'asc',this.rolepage+1,10)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.rolelist = this.rolelist.concat(datas);
                    if (this.rolelist.length >= 0) {
                      this.has_rolenext = datapagination.has_next;
                      this.has_rolepre = datapagination.has_previous;
                      this.rolepage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  getgradeinterface(data ?:gradedata):string | undefined{
    return data?data.name:undefined;
  }
  getroleinterface(data ?:roledata):string | undefined{
    return data?data.name:undefined;
  }
  emptypevalue(){
    let emp_id=this.rolecreateForm.get('employee_id').value.id;
    let grade=this.rolecreateForm.get('grade').value.id;
    let role=this.rolecreateForm.get('role').value.id
    if(!emp_id){
      this.notification.showWarning("Please select Employee Name")
      return false;
    }
    if(!grade){
      this.notification.showWarning("Please select Grade")
      return false;
    }
    if(!role){
      this.notification.showWarning("Please select Role")
      return false;
    }
    let empdata={
      'id':this.rolecreateForm.get('employee_id').value.id,
      'role':this.rolecreateForm.get('role').value.name,
      'grade':this.rolecreateForm.get('grade').value.name
    }
    this.spinner.show();
    this.masterservice.roleMapcreate(empdata).subscribe(res=>{
      this.spinner.hide()
      if(res['code']){
        this.notification.showError(res['description'])
      }else{
        this.notification.showSuccess(res['message'])
        this.rolecreateForm.get('employee_id').setValue('')
        this.rolecreateForm.get('role').reset()
        this.rolecreateForm.get('grade').reset()
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
