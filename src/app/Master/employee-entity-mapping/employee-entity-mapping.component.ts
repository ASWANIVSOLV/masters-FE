import { Component, OnInit,ViewChild,EventEmitter } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { masterService } from '../master.service'
import { ShareService } from '../share.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/service/notification.service';
import {  MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, tap, switchMap, finalize, takeUntil, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

export interface Emplistss {
  id: string;
  full_name: string;
}
@Component({
  selector: 'app-employee-entity-mapping',
  templateUrl: './employee-entity-mapping.component.html',
  styleUrl: './employee-entity-mapping.component.scss'
})
export class EmployeeEntityMappingComponent {
  employeeentmapsearch: FormGroup;
  employeeentmap: FormGroup;
  employeeList     : Array<Emplistss>;
  isLoading = false;
  has_next = true;
  has_previous = true;
  currentpage: number = 1;
  employeeent:boolean =false
  addentcomflage:boolean =false
  employeeentmapdata:any=[];
  @ViewChild('emp') matempAutocomplete: MatAutocomplete;
  @ViewChild('empInput') empInput: any;
  @ViewChild('empInputt') empInputt: any;
  entityidd:any="";
  employee_idd:any="";
  empid:any;
  fill:{}
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;
  
  constructor(private fb: FormBuilder, private shareService: ShareService,private dataService: masterService, private toastr:ToastrService,private notification: NotificationService, private router: Router, private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.employeeentmap = this.fb.group({
      entity_id:['', Validators.required] ,
      employee_id:['', Validators.required],
    })
    this.employeeentmapsearch = this.fb.group({
      entity_id:[''] ,
      employee_id:[''],
    })
    
    this.employeeentmapsummary(this.currentpage)
    let empkeyvalue: String = "";
    this.getemployeeFK(empkeyvalue);
    this.employeeentmap.get('employee_id').valueChanges
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
      },(error) => {
        this.SpinnerService.hide();
      });
      let empkeyvaluee: String = "";
      this.getemployeeFK(empkeyvaluee);
      this.employeeentmapsearch.get('employee_id').valueChanges
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
  
        },(error) => {
          this.SpinnerService.hide();
        });
    this.select_entityName();
  }
  entityList:any;
  select_entityName(){
    this.dataService.getentity()
      .subscribe((result) => {
        this.entityList = result.data
        console.log("entity-id", this.entityList)
        this.entityidd=this.entityList
      })
   
  }
  public displayFnemp(emp?: Emplistss): string | undefined {
    console.log('id', emp.id);
    this.empid=emp.id
    console.log('full_name', emp.full_name);
    return emp ? emp.full_name : undefined;
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
  getemployeeFK(empkeyvalue){
    this.SpinnerService.show();
    this.dataService.getemployeeFK(empkeyvalue)
        .subscribe((results: any[]) => {
          this.SpinnerService.hide();
          let datas = results["data"];
          this.employeeList = datas;
          console.log("employeeList", datas)
        },(error) => {
          this.SpinnerService.hide();
        })
  }
  employeeentmapSubmit()
  {
    
    this.employeeentmap.value.employee_id=this.employeeentmap.value.employee_id.id;
    this.SpinnerService.show();
    this.dataService.empentitymap(this.employeeentmap.value)
        .subscribe((results) => {
          if(results.code != "INVALID_DATA")
          {
            this.employeeentmap.reset()
            this.empInputt.nativeElement.value=""
            this.employeeent=true;
            this.employeeentmapsummary(this.currentpage)
            this.SpinnerService.hide();
            console.log("results",results)
            this.SpinnerService.show();
            this.notification.showSuccess("Successfully Updated")
          }
          else
          {
            this.employeeentmap.reset()
            this.empInputt.nativeElement.value=""
            this.employeeent=true;
            this.SpinnerService.hide();
            console.log("results",results)
            this.notification.showError(results.description)
          }
            
        },(error) => {
          this.employeeentmap.reset()
          this.empInput.nativeElement.value=""
          this.SpinnerService.hide();
        })
  }
  search()
  {
   let entity=this.employeeentmapsearch.value.entity_id
    
   let emp = this.employeeentmapsearch.value.employee_id.id
   this.employeeentmapsearchfun(entity,emp)
  }
  employeeentmapsearchfun(entity,emp)
  {
    this.SpinnerService.show();
    this.dataService.empentitymapsearch(this.currentpage,entity,emp)
        .subscribe((results) => {
          if(results.code != "INVALID_DATA")
          {
            this.employeeentmapdata=results["data"]
            let datapagination=results["pagination"]
            this.has_next = datapagination.has_next;
            this.has_previous = datapagination.has_previous;
            this.SpinnerService.hide();
          }
          else
          {
            this.notification.showError(results.description)
            this.SpinnerService.hide();
          }
            
        },(error) => {
          this.SpinnerService.hide();
        })
  }
  employeeentmapsummary(currentpage)
  {
    this.SpinnerService.show();
    this.currentpage=currentpage
    this.dataService.empentitymapsummary(this.currentpage)
        .subscribe((results) => {
          if(results.code != "INVALID_DATA")
          {
            this.employeeentmapdata=results["data"]
            let datapagination=results["pagination"]
            this.has_next = datapagination.has_next;
            this.has_previous = datapagination.has_previous;
            this.SpinnerService.hide();
          }
          else
          {
            this.notification.showError(results.description);
            this.SpinnerService.hide();
          }
            
        },(error) => {
          this.SpinnerService.hide();
        })
  }
  Addempcommap()
  {
    this.addentcomflage=true
  }
  nextClickdel() { 
    if (this.has_next === true) {
      this.currentpage += 1;
      this.employeeentmapsearchfun(this.employeeentmapsearch.value.entity_id,this.employeeentmapsearch.value.employee_id.id)
    }
  }
  
  previousClickdel() {
    if (this.has_previous === true) {
      this.currentpage -=1;
      this.employeeentmapsearchfun(this.employeeentmapsearch.value.entity_id,this.employeeentmapsearch.value.employee_id.id)
    }
  }
  forInactivedel(data)
  {
    var ans = window.confirm("Are you Sure to In-Active this Employee?");
    if (!ans) {
      return false;
    }
    this.SpinnerService.show();
    let entity_id=data.entity_id
    let employee_id=data.employee_id
    let dataforinactive:any;
    dataforinactive={  
        "entity_id": entity_id,
        "employee_id":employee_id 
    }
    this.dataService.empentitymapinactive(dataforinactive)
    .subscribe((results) => {
      if(results.code != "INVALID_DATA")
      {
        this.SpinnerService.hide();
        this.empInput.nativeElement.value=""
        this.employeeentmapsummary(this.currentpage)
        this.notification.showSuccess("Sucessfully Updated")
        
      }
      else
      {
        this.empInput.nativeElement.value=""
        this.SpinnerService.hide();
        this.employeeentmapsummary(this.currentpage)
        this.notification.showError(results.description)
      }  
        
    },(error) => {
      this.empInput.nativeElement.value=""
      this.employeeentmapsummary(this.currentpage)
      this.SpinnerService.hide();
    })
  }
  foractivedel(data)
  {
    var ans = window.confirm("Are you Sure to Active?");
    if (!ans) {
      return false;
    }
    this.SpinnerService.show();
    let entity_id=data.entity_id
    let employee_id=data.employee_id
    let dataforinactive:any;
    dataforinactive={  
        "entity_id": entity_id,
        "employee_id":employee_id 
    }
    this.dataService.empentitymapinactive(dataforinactive)
    .subscribe((results) => {
      if(results.code != "INVALID_DATA")
      {
        this.SpinnerService.hide();
        this.notification.showSuccess("Sucessfully Updated")
        this.employeeentmapsummary(this.currentpage)
       
      }
      else
      {
        this.SpinnerService.hide();
        this.notification.showError(results.description)
      }
        
    },(error) => {
      this.SpinnerService.hide();
    })
  }
  onCancelClick()
  {
    this.employeeentmapsearch.reset()
    this.empInput.nativeElement.value=""
    this.employeeentmapsummary(1)
  }
  onCancelClickk()
  {
    this.employeeentmap.reset()
    this.empInputt.nativeElement.value=""
    this.employeeentmapsummary(1)
  }
}
