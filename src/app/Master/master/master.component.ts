import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { Observable, fromEvent, } from 'rxjs'
import { masterService } from '../master.service'
import { ShareService } from '../share.service'
import { NotificationService } from '../../service/notification.service'
import { SharedService } from '../../service/shared.service'
import { DataService } from '../../service/data.service'
import { finalize, switchMap, tap, distinctUntilChanged, debounceTime, map, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
// import { Department, MemoService } from '../../ememo/memo.service'
import { MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { COMMA, ENTER, I } from '@angular/cdk/keycodes';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeEntityMappingComponent } from '../employee-entity-mapping/employee-entity-mapping.component';
import { Master2Service } from '../master2.service';
export interface iEmployeeList {
  full_name: string;
  id: number;
}
export interface DepartmentList {
  name: string;
  id: number;
}
export interface iEmployeeSummaryList {
  full_name: string;
  id: number;
}
export interface bslistss {
  id: string;
  name: string;
}
export interface cclistss {
  id: string;
  name: string;
}
export interface status {
  value: string;
  viewValue: string;
}
export interface emppaymode {
  id: string;
  name: string;
}
export interface empbank {
  id: string;
  name: string;
}
export interface empbranch {
  id: string;
  name: string;
}
export interface Emplistss {
  id: string;
  full_name: string;
}
export interface Department {
  id: string;
  name: string;
}
@Component({
  selector: 'app-master',
  
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})

export class MasterComponent implements OnInit {
  has_paynxt: boolean = true;
  has_paypre: boolean = false;
  has_paypage: number = 1;
  has_banknxt: boolean = true;
  has_bankpre: boolean = false;
  has_bankpage: number = 1;
  has_branchnxt: boolean = true;
  has_branchpre: boolean = false;
  has_branchpage: number = 1;
  categoryList: Array<any>
  categoryName = "";
  subcategoryName = "";
  subCategoryList: Array<any>
  channelList: Array<any>
  courierList: Array<any>
  documentList: Array<any>
  departmentList: Array<any>
  modulesList: Array<any>
  rolesList: Array<any>
  templateList: Array<any>
  accountList: Array<any>
  has_next = false;
  has_previous = false;
  phas_next = false;
  phas_previous = false;
  shas_next = false;
  shas_previous = false;
  has_nextpdm = false;
  has_previouspdm = false;
  chas_next = false;
  chas_previous = false;
  dhas_next = false;
  dhas_previous = false;
  currentpage: number = 1;
  subModuleList: any;
  subModuleUrls: any;
  urlPermission: string;
  urlbranchbank: string;
  urlDepartment: string;
  urlCategory: string;
  urlSubCategory: string;
  urlEmployee: string;
  urlMoudles: string;
  urlRoles: string;
  urlState: string;
  urlPinCode: string;
  urlDistrict: string;
  urlCity: string;
  urlemployeeentity: string;
  urlproduct: string;
  urlEmpbranch:string;
  urlDesignation: string;
  urlGL: string;
  urlPMD: string;
  isPermission: boolean;
  isBranchbank: boolean;
  isBranchbankForm: boolean;
  isDesignation: boolean;
  isproduct:boolean;
  isDesignationForm: boolean;
  isDepartment: boolean;
  isCategory: boolean;
  isSubcategory: boolean;
  isEmployee: boolean
  isRoles: boolean;
  isModules: boolean;
  isEmployeecreate: boolean;
  isState: boolean;
  isPinCode: boolean;
  isCity: boolean;
  isDistrict: boolean;
  isPMD: boolean;
  isGL: boolean;
  isEmptypeMap:boolean;
  urlEmptypeMap:string;
  isbsccMap:boolean;
  urlbsccMap:string;
  citysummarydata: Array<any> = [];
  productlist: Array<any> = [];
  districtsummaryData: Array<any> = [];
  BranchbankList: Array<any> = [];
  datadistrictid: any;
  datacityid: any;
  has_nexts: boolean = false;
  has_prese: boolean = false;
  dispage: number = 1;
  citypage: number = 1;
  roleValues: any;
  employeeId: any;
  makerNameBtn: any;
  employee: string;
  ismakerCheckerButton: boolean;
  isEditMakerChekerBtn: boolean;
  employeeList: Array<any>
  url: string;
  isEmployeeViewForm: boolean;
  isDeptForm: boolean;
  AddForm: FormGroup;
  BSCCMappingForm:FormGroup;
  EmptypeMappingForm:FormGroup;
  rmMappingForm:FormGroup;
  roleMappingForm:FormGroup;
  ctrldepartment = new FormControl();
  departmentList1: DepartmentList[] = [];
  departmentId: any;
  isdeptEditForm: boolean;
  isPermissionForm: boolean;
  isCategoryForm: boolean;
  isCategoryEditForm: boolean;
  isSubCategoryForm: boolean;
  isSubCategoryEditForm: boolean;
  isRolesEdit: boolean;
  isStateForm: boolean
  isDistrictForm: boolean
  isCityForm: boolean
  isGLForm: boolean
  isPinCodeForm: boolean;
  passpolicy:boolean=false;
  designationeditform: boolean;
  designationform: any = FormGroup;
  designationList: Array<any> = [];
  has_designationnext: boolean;
  has_designationprevious: boolean;
  has_designationpage: number = 1;
  sectorlist: Array<any> = [];
  glstatus: any;
  has_sectornext: boolean;
  has_sectorprevious: boolean;
  has_sectorpage: number = 1;
  isSector: boolean;
  isSectorform: boolean;
  isSectorEdit: boolean;
  urlSector: any;
  explist: Array<any> = [];
  has_expnext: boolean;
  has_expprevious: boolean;
  has_exppage: number = 1;
  isExp: boolean;
  isExpform: boolean;
  isExpEdit: boolean;
  urlExp: any;
  entitylist: Array<any> = [];
  has_entitynext: boolean;
  has_entityprevious: boolean;
  has_entitypage: number = 1;
  isEntity: boolean;
  isEntityForm: boolean;
  isEntityEdit: boolean;
  urlEntity: any;
  isemployeeentityForm:boolean;
  Finlist: Array<any> = [];
  has_Finnext: boolean;
  has_Finprevious: boolean;
  has_Finpage: number = 1;
  isFin: boolean;
  isFinForm: boolean;
  isFinEdit: boolean;
  urlFin: any;
  FinQlist: Array<any> = [];
  has_FinQnext: boolean;
  has_FinQprevious: boolean;
  has_FinQpage: number = 1;
  isFinQ: boolean;
  isFinQForm: boolean;
  isFinQEdit: boolean;
  urlQFin: any;
  isbranchempdata:boolean;
  branch_emp_Data:Array<any>=[];
  branchempnext:boolean=false;
  branchempprevious:boolean=false;
  branchemppage:number=1;
  // isEmpbranchEdit:boolean=false;
  // isEMpbranchsummary:boolean=false;
  // isEmpbranchchecker:boolean=false
  isEmpbranchview:boolean=false;
  isEmpbranch:boolean=false;
  first:boolean=false;
  empbranchpage:number=1;
  empbranchprevious:boolean=false;
  empbranchnext:boolean=false;
  empbranchData:Array<any>;
  empviewdata:Array<any>
  empbranchform:any=FormGroup;
  sectorForm: any = FormGroup;
  branchbankForm: any = FormGroup;
  entityForm: any = FormGroup;
  finForm: any = FormGroup;
  finquaterform: any = FormGroup;
  ExpForm: any = FormGroup;
  prform: any = FormGroup;
  isPMDForm: boolean;
  isProductForm: boolean;
  isProductEditForm: boolean;
  subModuleName: string;
  rolesIndex: string;
  employeeIndex: string;
  isEmptypeMapcreate:boolean=false;
  isBSCCMapcreate:boolean=false;
  isBSCCMapping:boolean;
  isEmptypeMapping:boolean;
  emptype_mapList:any=[];
  pagesize:number=10;
  presentpageemp:number=1;
  has_previousem:boolean=false;
  has_nextem:boolean=false;
  permissionList: Array<any>;
  permisionSubList: Array<any>;
  categoryIdValue: number;
  employeeSearchId: number;
  category_sub: string;
  bsccmapList:any=[];
  has_previousbc:boolean=false;
  presentpagebc:number=1;
  has_nextbc:boolean=false;
  urlrm:string;
  urlrole:string;
  isrm:boolean;
  isrole:boolean;
  rolesummary:boolean
  rolemapcreate:boolean
  rmsummary:boolean
  rmmapcreaet:boolean
  rmList:any=[];
  roleList:any=[]
  has_previousrm:boolean=false;
  has_nextrm:boolean=false;
  presentpagerm:number=1
  has_previousrl:boolean=false;
  has_nextrl:boolean=false;
  presentpagerl:number=1
  drpdwn: any = { 'ACTIVE': 1, 'INACTIVE': 0, 'ALL': 2 };
  status: status[] = [
    { value: 'ACTIVE', viewValue: 'ACTIVE ' },
    { value: 'INACTIVE', viewValue: 'INACTIVE' },
  ];
  public allEmployeeList: iEmployeeList[];
  public chipSelectedEmployeeTo: iEmployeeList[] = [];
  public chipSelectedEmployeeToid = [];
  public to_emp = new FormControl();
  public totalEmployeeList: iEmployeeSummaryList[];
  public chipSelectedEmployee: iEmployeeSummaryList[] = [];
  public chipSelectedEmployeeid = [];
  public employeeControl = new FormControl();
  isLoading = false;
  memoAddForm: FormGroup;
  PMDSearchForm: FormGroup;
  GLSearchForm: FormGroup;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;
  @ViewChild('emp') matempAutocomplete: MatAutocomplete;
  @ViewChild('empInput') empInput:any;
  @ViewChild('payemp') matPay: MatAutocomplete;
  @ViewChild('payinput') payInput;
  @ViewChild('bankemp') matBank: MatAutocomplete;
  @ViewChild('bankinput') bankInput;
  @ViewChild('branchemp') matBranch: MatAutocomplete;
  @ViewChild('branchinput') branchInput;
  @ViewChild('employeeToInput') employeeToInput: any;
  @ViewChild('autoto') matToAutocomplete: MatAutocomplete;
  @ViewChild('employeeccInput') employeeccInput: any;
  @ViewChild('autocc') matAutocompleteCC: MatAutocomplete;
  @ViewChild('employeeApproverInput') employeeApproverInput: any;
  @ViewChild('autoapprover') matAutocompleteApp: MatAutocomplete;
  @ViewChild('employeeInput') employeeInput: any;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('autodept') matAutocompleteDept: MatAutocomplete;
  @ViewChild('employeeDeptInput') employeeDeptInput: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  permissionArray = [];
  isDepartmentView: boolean;
  employeeIdValue: any;
  type: Object = { 1: 'Employee', 2: 'Branch' }
  type_reverse: Object = { 'Employee': 1, 'Branch': 2 }
  stateList: Array<any>
  districtList: Array<any>
  cityList: Array<any>
  pincodeList: Array<any>
  isStateEditForm: boolean;
  isDistrictEditForm: boolean;
  isPinCodeEditForm: boolean;
  isCityEditForm: boolean;
  presentpagepro:number=1;
  has_previouspro: boolean;
  has_nextpro: boolean;
  isPMDEditForm: boolean;
  emppaycodelist: Array<any> = [];
  banknamelist: Array<any> = [];
  branchnamelist: Array<any> = [];
  pinform: any;
  districtform: any
  cityform: any;
  sform: any;
  totalcount: any;
  isempcreate: boolean = false;
  PDMList: Array<any>;
  isPMDFormedit: boolean;
  GLList: any;
  has_nextgl: boolean = false;
  presentpagegl: any = 1;
  has_previousgl: boolean = false;
  has_nextbrbank: boolean = false;
  presentpagebrbank: any = 1;
  has_previousbrbank: boolean = false;
  isMailtemplate: boolean;
  isMailtemplateForm: boolean;
  isMailtemplateEdit: boolean;
  urlisMailtemplate: any;
  has_nextemp:boolean=false;
  has_previousemp :boolean=false;
  currentpageemp:boolean=false;
  employeenameList:any=[];
  // employeenameList1:any=[];
  // employeenameList2:any=[];
  // employeenameList3:any=[];

  constructor(private router: Router, private notification: NotificationService, private mastersErvice: masterService,private master2:Master2Service,
    // private memoService: MemoService, 
    private dataServices: DataService, private formBuilder: FormBuilder,
    private shareService: ShareService, private sharedService: SharedService, private SpinnerService:NgxSpinnerService) { }

  ngOnInit(): void {

    this.AddForm = this.formBuilder.group({
      ctrldepartment: ['', Validators.required],
    });
    this.pinform = this.formBuilder.group({
      name: ['']
    })
    this.cityform = this.formBuilder.group({
      name: ['']
    })
    this.districtform = this.formBuilder.group({
      name: ['']
    })
    this.sform = this.formBuilder.group({
      name: ['']
    })
    ////cc bs ccbs forms
    this.BSSearchForm = this.formBuilder.group({
      no: "",
      name: ""
    })
    this.CCSearchForm = this.formBuilder.group({
      no: "",
      name: ""
    })
    this.CCBSSearchForm = this.formBuilder.group({
      businesssegment_id: '',
      costcentre_id: '',
      name: '',
      no: '',
    });
    this.prform = this.formBuilder.group({
      name: ['']

    });
    this.editbss = this.formBuilder.group({
      id: '',
      code: ['', Validators.required],
      name: ['', Validators.required],
      no: ['', Validators.required],

    });
    this.designationform = this.formBuilder.group({
      'name': ['', Validators.required]
    });
    this.sectorForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'drop': ['', Validators.required]
    });
    this.branchbankForm = this.formBuilder.group({
      'type': [''],
      'paymode': [''],
      'branchname': [''],
      'bankname': [''],
      'accountno': [''],
      'benifiencyname': ['']
    });
    this.entityForm = this.formBuilder.group({
      'name': ['', Validators.required]
    });
    this.finForm = this.formBuilder.group({
      'year': ['', Validators.required],
      'month': ['', Validators.required]
    });
    this.finquaterform = this.formBuilder.group({
      'year': ['', Validators.required],
      'month': ['', Validators.required]
    });
    this.ExpForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'drop': ['', Validators.required]
    });
    this.empbranchform=this.formBuilder.group({
      'code': new FormControl(''),
      'name':new FormControl(''),
      'drop':new FormControl('')

    })

    this.PMDSearchForm = this.formBuilder.group({
      branch_name: '',
      branch_code: '',
      location: ''
    })
    this.BSCCMappingForm=this.formBuilder.group({
      'employee_id':new FormControl()
    })
    this.EmptypeMappingForm=this.formBuilder.group({
      'employee_id':new FormControl()
    })
    this.rmMappingForm=this.formBuilder.group({
      'employee_id':new FormControl()
    })
    this.roleMappingForm=this.formBuilder.group({
      'employee_id':new FormControl()
    })
    this.GLSearchForm = this.formBuilder.group({
      gl_number: ''
    })

    this.sharedService.subCategoryID.subscribe(data => {
      this.categoryIdValue = data;
    })

    // this.sharedService.menuUrls.subscribe(data => {
    let datas = this.sharedService.menuUrlData;

    // console.log("MENu", datas)
    datas.forEach((element) => {
      let subModule = element.submodule;
      if (element.name === "Masters") {
        this.subModuleList = subModule;
        this.isEmployee = subModule[0].name
      } else if (element.name === "Masters") {
        this.subModuleList = subModule;
        this.isSubcategory = subModule[0].name
      } else if (element.name === "Masters") {
        this.subModuleList = subModule;
        this.isCategory = subModule[0].name
      } else if (element.name === "Masters") {
        this.subModuleList = subModule;
        this.isDepartment = subModule[0].name
      } else if (element.name === "Masters") {
        this.subModuleList = subModule;
        this.isModules = subModule[0].name
      } else if (element.name === "Masters") {
        this.subModuleList = subModule;
        this.isRoles = subModule[0].name
      } else if (element.name === "Masters") {
        this.subModuleList = subModule;
        this.isPermission = subModule[0].name
      } else if (element.name === "Masters") {
        this.subModuleList = subModule;
        this.isBS = subModule[0].name
      } else if (element.name === "Masters") {
        this.subModuleList = subModule;
        this.isCC = subModule[0].name
      } else if (element.name === "Masters") {
        this.subModuleList = subModule;
        this.isCCBS = subModule[0].name
      } else if (element.name == "Masters") {
        this.subModuleList = subModule;
        this.isDesignation = subModule[0].name;
      }
    });
    

    if (this.to_emp !== null) {
      this.to_emp.valueChanges
        .pipe(
          debounceTime(100),
          distinctUntilChanged(),
          tap(() => {
            this.isLoading = true;
          }),
          switchMap(value => this.mastersErvice.get_EmployeeList_2(value, 1)
            .pipe(
              finalize(() => {
                this.isLoading = false;
              }),
            )
          )
        )
        .subscribe((results: any[]) => {
          let datas = results["data"];
          let datapagination = results["pagination"];
          this.allEmployeeList = datas;
          // console.log("toemps", datas)
          if (this.allEmployeeList.length >= 0) {
            this.has_next = datapagination.has_next;
            // console.log('this.has_next', this.has_next);
            this.has_previous = datapagination.has_previous;
            this.currentpage = datapagination.index;
          }
        })
    }
    if (this.employeeControl !== null) {
      this.employeeControl.valueChanges
        .pipe(
          debounceTime(100),
          distinctUntilChanged(),
          tap(() => {
            this.isLoading = true;
          }),
          switchMap(value => this.dataServices.get_EmployeeList(value, 1)
            .pipe(
              finalize(() => {
                this.isLoading = false;
              }),
            )
          )
        )
        .subscribe((results: any[]) => {
          let datas = results["data"];
          let datapagination = results["pagination"];
          this.totalEmployeeList = datas;
          // console.log("totalEmployeeList", datas)
          if (this.totalEmployeeList.length >= 0) {
            this.has_next = datapagination.has_next;
            // console.log('this.has_next', this.has_next);
            this.has_previous = datapagination.has_previous;
            this.currentpage = datapagination.index;
          }

        })
    }

    // let deptkeyvalue: String = "";
    // this.getDepartment(deptkeyvalue);
    this.AddForm.get('ctrldepartment').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(value => this.mastersErvice.getDepartmentPage(value, 1, '')
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.departmentList1 = datas;
        let datapagination = results["pagination"];
        this.departmentList1 = datas;
        if (this.departmentList1.length >= 0) {
          this.has_next = datapagination.has_next;
          this.has_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }
      })

    
    this.EmptypeMappingForm.get('employee_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')
        }),
        switchMap(value => this.mastersErvice.getemployeeFKdd(value, 1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.employeenameList = datas;

  });

  this.BSCCMappingForm.get('employee_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')
        }),
        switchMap(value => this.mastersErvice.getemployeeFKdd(value, 1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.employeenameList = datas;

  });

  this.rmMappingForm.get('employee_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')
        }),
        switchMap(value => this.mastersErvice.getemployeeFKdd(value, 1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.employeenameList = datas;

  });
  this.roleMappingForm.get('employee_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')
        }),
        switchMap(value => this.mastersErvice.getemployeeFKdd(value, 1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.employeenameList = datas;

  });

    //////////////////////CC BS SEARCH
    let bskeyvalue: String = "";
    this.getbsDD(bskeyvalue);
    this.CCBSSearchForm.get('businesssegment_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')

        }),
        switchMap(value => this.mastersErvice.getbsFKdd(value, 1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.bsList = datas;

      })


    let cckeyvalue: String = "";
    this.getccDD(cckeyvalue);
    this.CCBSSearchForm.get('costcentre_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')

        }),
        switchMap(value => this.mastersErvice.getccFKdd(value, 1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.ccList = datas;

      })
    // this.getbs();
    // this.getcc();
    // this.getccbs();

  }

  private getDepartment(deptkeyvalue) {
    this.mastersErvice.getDepartment(deptkeyvalue)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.departmentList1 = datas;
      })
  }

  private getDepartmentList(filter = "", sortOrder = 'asc',
    pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getDepartmentList(filter, sortOrder, pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.departmentList = datas;
        // console.log(this.departmentList)
        let datapagination = results["pagination"];
        if (this.departmentList.length >= 0) {
          this.has_next = datapagination.has_next;
          this.has_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }

      })
  }
  nextClickDepartment() {
    if (this.has_next === true) {
      this.getDepartmentList("", 'asc', this.currentpage + 1, 10)
    }
  }

  previousClickDepartment() {
    if (this.has_previous === true) {
      this.getDepartmentList("", 'asc', this.currentpage - 1, 10)
    }
  }
  departmentView(data) {
    this.isDepartment = false;
    this.ismakerCheckerButton = false;
    this.isDepartmentView = true
    this.sharedService.departmentView.next(data)

  }

  getModulesList() {
    this.mastersErvice.getModulesList()
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.modulesList = datas;
      })
  }

  getRolesList() {
    this.mastersErvice.getRolesList()
      .subscribe((results: any[]) => {
        let datas = results["data"]; ``
        this.rolesList = datas;
      })
  }
  rolesEdit(data: any) {
    this.isRoles = false;
    this.isRolesEdit = true
    this.shareService.rolesEditValue.next(data)
    return data;
  }

  getPermissionList(id) {
    this.mastersErvice.getPermissionList1(id)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        datas.forEach((element) => {
          let masterRole = element.role;
          masterRole.forEach(masRoles => {
            let role_code = masRoles.code;
            let role_id = masRoles.id;
            let role_name = masRoles.name;
            let masterRoleDatas = {
              "code": role_code,
              "name": role_name,
              "role_id": role_id,
              "parent_name": element.name,
              "parent_id": element.id,
              "logo": element.log,
              "url": element.url,
            }
            this.permissionArray.push(masterRoleDatas)
          });

          let subModule = element.submodule;
          subModule.forEach(subElement => {
            let suModuleRole = subElement.role;
            suModuleRole.forEach(subModRoles => {
              let role_code = subModRoles.code;
              let role_id = subModRoles.id;
              let name = subModRoles.name;
              let subModuleRoleDatas = {
                "code": role_code,
                "name": name,
                "role_id": role_id,
                "parent_name": subElement.name,
                "parent_id": subElement.id,
                "submodule": element.name,
                "submodule_id": element.id,
                "logo": subElement.log,
                "url": subElement.url,

              }
              this.permissionArray.push(subModuleRoleDatas)
            });
          });
        })
      })
  }

  private getAccountList(filter = "", sortOrder = 'asc',
    pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getAccountList(filter, sortOrder, pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.accountList = datas;
        for (let i = 0; i < this.accountList.length; i++) {
          let temp = this.accountList[i].template
          if (temp == undefined) {
            this.accountList[i].template_name = ''
          } else {
            this.accountList[i].template_name = temp.template
          };
        }
        let datapagination = results["pagination"];
        this.accountList = datas;
        if (this.accountList.length >= 0) {
          this.has_next = datapagination.has_next;
          this.has_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }

      })
  }
  accountEdit(data: any) {
    this.shareService.accountEditValue.next(data)
    this.router.navigateByUrl('/accountEdit', { skipLocationChange: true })
    return data;
  }
  deleteAccount(data) {
    let value = data.id
    this.mastersErvice.acctDeleteForm(value)
      .subscribe(result => {
        this.notification.showSuccess("Successfully deleted....")
        return true

      })
  }
  nextClickAccount() {
    if (this.has_next === true) {
      this.getAccountList("", 'asc', this.currentpage + 1, 10)
    }
  }

  previousClickAccount() {
    if (this.has_previous === true) {
      this.getAccountList("", 'asc', this.currentpage - 1, 10)
    }
  }


  private getTemplate(filter = "", sortOrder = 'asc',
    pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getTemplateDD(filter, sortOrder, pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.templateList = datas;
        for (let i = 0; i < this.templateList.length; i++) {
          let ft = this.templateList[i].file_type
          if (ft == undefined) {
            this.templateList[i].file_name = ''
          } else {
            this.templateList[i].file_name = ft.text
          };
        }
        let datapagination = results["pagination"];
        this.templateList = datas;
        if (this.templateList.length >= 0) {
          this.has_next = datapagination.has_next;
          this.has_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }


      })
  }
  templateEdit(data: any) {
    this.shareService.templateEditValue.next(data)
    this.router.navigateByUrl('/templateedit', { skipLocationChange: true })
    return data;
  }
  nextClickTemplate() {
    if (this.has_next === true) {
      this.getTemplate("", 'asc', this.currentpage + 1, 10)
    }
  }

  previousClickTemplate() {
    if (this.has_previous === true) {
      this.getTemplate("", 'asc', this.currentpage - 1, 10)
    }
  }
  deleteTemplate(data) {
    let value = data.id
    // console.log("tempdetelevalueeee", value)
    this.mastersErvice.templateDeleteForm(value)
      .subscribe(result => {
        // // console.log("deleteact",result)
        this.notification.showSuccess("Successfully deleted....")
        return true

      })
  }


  private getCategoryList(filter = "", sortOrder = 'asc',
    pageNumber = 1) {
    this.mastersErvice.ms_getCategoryList(filter, sortOrder, pageNumber, this.categoryName)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.categoryList = datas;
        let datapagination = results["pagination"];
        this.categoryList = datas;
        if (this.categoryList.length >= 0) {
          this.has_next = datapagination.has_next;
          this.has_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }
      })
  }
  categoryEdit(data: any) {
    this.isCategoryEditForm = true;
    this.ismakerCheckerButton = false;
    this.isCategory = false;
    this.shareService.categoryEditValue.next(data)
    return data;
  }
  nextClickCategory() {
    if (this.has_next === true) {
      this.getCategoryList("", 'asc', this.currentpage + 1)
    }
  }

  previousClickCategory() {
    if (this.has_previous === true) {
      this.getCategoryList("", 'asc', this.currentpage - 1)
    }
  }

  private getSubCategoryList1(filter = "", sortOrder = 'asc',
    pageNumber = 1) {
    this.mastersErvice.ms_getSubCategoryList1(filter, sortOrder, pageNumber, this.subcategoryName)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.category_sub = datas.category;
        this.subCategoryList = datas;
        let datapagination = results["pagination"];
        this.subCategoryList = datas;
        if (this.subCategoryList.length >= 0) {
          this.has_next = datapagination.has_next;
          this.has_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }
      })
  }
  nextClickSubCategory() {
    if (this.has_next === true) {
      this.getSubCategoryList1("", 'asc', this.currentpage + 1)
    }
  }

  previousClickSubCategory() {
    if (this.has_previous === true) {
      this.getSubCategoryList1("", 'asc', this.currentpage - 1)
    }
  }
  departmentEdit(data: any) {
    this.isdeptEditForm = true;
    this.isDepartment = false;
    this.ismakerCheckerButton = false;
    this.shareService.deptEditValue.next(data)
    return data;
  }


  subCategoryEdit(data: any) {
    this.isSubCategoryEditForm = true;
    this.isSubcategory = false;
    this.ismakerCheckerButton = false;
    this.shareService.subCategoryEditValue.next(data);
    return data;
  }
  BranchbankEdit(data: any, num: number) {
    this.isBranchbankForm = true;
    this.isBranchbank = false;
    this.ismakerCheckerButton = false;
    this.sharedService.BranchbankEditValue.next(data);
    this.sharedService.branchreadonly.next(num);
    return data;
  }

  getChannel(
    pageNumber = 1) {
    this.mastersErvice.getChannel(pageNumber)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        let datapagination = results["pagination"];
        this.channelList = datas;
        if (this.channelList.length >= 0) {
          this.has_next = datapagination.has_next;
          this.has_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }
      })
  }



  getDocument(
    pageNumber = 1) {
    this.mastersErvice.getDocument(pageNumber)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        let datapagination = results["pagination"];
        this.documentList = datas;
        if (this.documentList.length >= 0) {
          this.has_next = datapagination.has_next;
          this.has_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }
      })
  }

  next_Click() {
    if (this.has_next === true) {
      this.getDocument(this.currentpage + 1)
    }
  }

  previous_Click() {
    if (this.has_previous === true) {
      this.getDocument(this.currentpage - 1)
    }
  }



  _nextClick() {
    if (this.has_next === true) {
      this.getChannel(this.currentpage + 1)
    }
  }

  _previousClick() {
    if (this.has_previous === true) {
      this.getChannel(this.currentpage - 1)
    }
  }


  courierEdit(data) {
    this.shareService.courierEdit.next(data)
    this.router.navigateByUrl('/courierEdit', { skipLocationChange: true })
  }

  channelEdit(data) {
    this.shareService.channelEdit.next(data)
    this.router.navigateByUrl('/channelEdit', { skipLocationChange: true })
  }
  documentEdit(data) {
    this.shareService.documentEdit.next(data)
    this.router.navigateByUrl('/documentEdit', { skipLocationChange: true })
  }



  getCourier(
    pageNumber = 1) {
    this.mastersErvice.getCourier(pageNumber)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        let datapagination = results["pagination"];
        this.courierList = datas;
        if (this.courierList.length >= 0) {
          this.has_next = datapagination.has_next;
          this.has_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }
      })
  }

  nextClick() {
    if (this.has_next === true) {
      this.getCourier(this.currentpage + 1)
    }
  }

  previousClick() {
    if (this.has_previous === true) {
      this.getCourier(this.currentpage - 1)
    }
  }


  getEmployee(filter = "", sortOrder = 'asc',
    pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getEmployee(filter, sortOrder, pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.employeeList = datas;
        let datapagination = results["pagination"];
        this.employeeList = datas;
        this.totalcount = this.employeeList[0]['count'];
        if (this.employeeList.length >= 0) {
          this.has_next = datapagination.has_next;
          this.has_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }

      })
  }
  getempeditnavigate(data: any) {
    // routerLink="/master/empedit"
    this.shareService.empeditid.next(data.id);
    this.router.navigate(['/master/empedit']);
  }
  nextClickEmployee() {
    if (this.has_next === true) {
      this.getEmployee("", 'asc', this.currentpage + 1, 10)
    }
  }

  previousClickEmployee() {
    if (this.has_previous === true) {
      this.getEmployee("", 'asc', this.currentpage - 1, 10)
    }
  }
  employeeView(data) {
    this.isEmployeeViewForm = true;
    this.isEmployee = false;
    console.log("employeeView", data)
    this.sharedService.empView.next(data.id)
    // this.sharedService.employeeView.next(data)
  }
  CategoryView() {
    this.getCategoryList();
  }
  subCategoryView() {
    this.getSubCategoryList1();
  }
  empView() {
    this.isEmployeeViewForm = true;
    this.isEmployee = false;
    let empdata = this.employeeId
    console.log("empdata", empdata);
   let name:string='';
   for(let i in this.chipSelectedEmployee){
    if (name !=''){
      name = name +','+this.chipSelectedEmployee[i]['name']
    }else{
      name=this.chipSelectedEmployee[i]['name']
    }
    
  }
    this.sharedService.empView.next(empdata)
    this.sharedService.empname.next(name)
  }
  autocompleteEmployeeScroll() {
    setTimeout(() => {
      if (
        this.matAutocomplete &&
        this.autocompleteTrigger &&
        this.matAutocomplete.panel
      ) {
        fromEvent(this.matAutocomplete.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matAutocomplete.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matAutocomplete.panel.nativeElement.scrollTop;
            const scrollHeight = this.matAutocomplete.panel.nativeElement.scrollHeight;
            const elementHeight = this.matAutocomplete.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            // console.log('fetchmoredataemp', scrollTop, elementHeight, scrollHeight, atBottom);
            if (atBottom) {
              // fetch more data
              // console.log('fetchmoredataemp1', this.has_next);
              // console.log(this.employeeInput.nativeElement.value);
              if (this.has_next === true) {
                this.dataServices.get_EmployeeList(this.employeeInput.nativeElement.value, this.currentpage + 1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.totalEmployeeList = this.totalEmployeeList.concat(datas);
                    // console.log("emp", datas)
                    if (this.totalEmployeeList.length >= 0) {
                      this.has_next = datapagination.has_next;
                      this.has_previous = datapagination.has_previous;
                      this.currentpage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }

  public removeEmployee(employee: iEmployeeSummaryList): void {
    const index = this.chipSelectedEmployee.indexOf(employee);

    // this.chipRemovedEmployeeid.push(employee.id)
    // // console.log('this.chipRemovedEmployeeid', this.chipRemovedEmployeeid);
    // // console.log(employee.id)
    if (index >= 0) {

      this.chipSelectedEmployee.splice(index, 1);
      // console.log(this.chipSelectedEmployee);
      this.chipSelectedEmployeeid.splice(index, 1);
      // console.log(this.chipSelectedEmployeeid);
      this.employeeInput.nativeElement.value = '';
    }

  }

  public employeeSelected(event: MatAutocompleteSelectedEvent): void {
    // console.log('employeeSelected', event.option.value.full_name);
    this.selectEmployeeByName(event.option.value.full_name);
    this.employeeInput.nativeElement.value = '';
  }
  private selectEmployeeByName(employeeName) {
    let foundEmployee1 = this.chipSelectedEmployee.filter(employee => employee.full_name == employeeName);
    if (foundEmployee1.length) {
      // console.log('found in chips');
      return;
    }
    let foundEmployee = this.totalEmployeeList.filter(employee => employee.full_name == employeeName);
    if (foundEmployee.length) {
      // We found the employeecc name in the allEmployeeList list
      // console.log('founde', foundEmployee[0].id);
      this.chipSelectedEmployee.push(foundEmployee[0]);
      this.chipSelectedEmployeeid.push(foundEmployee[0].id)
      // console.log(this.chipSelectedEmployeeid);
      let employeId = foundEmployee[0].id
      this.employeeId = employeId
      // console.log("employeeId", this.employeeId)
    }
  }
  subModuleData(data) {
    this.sharedService.Mastersubmodule=data.name
    this.url = data.url;
    this.urlproduct = "/product";
    this.urlPermission = "/permissions";
    this.urlDepartment = "/department";
    this.urlEmployee = "/employeeSummary";
    this.urlSubCategory = "/subCategory";
    this.urlCategory = "/category";
    this.urlMoudles = "/module";
    this.urlRoles = "/roles";
    this.urlState = "/state";
    this.urlPinCode = "/pincode";
    this.urlCity = "/city";
    this.urlDistrict = "/district";
    this.urlDesignation = "/designation";
    this.urlCC = "/costcentre";
    this.urlBS = "/businesssegment";
    this.urlCCBS = "/ccbs";
    this.urlExp = "/expense";
    this.urlSector = "/sector";
    this.urlFin = '/finyear';
    this.urlQFin = "/finquarter"
    this.urlPMD = "/pmd";
    this.urlbranchbank = "/branchdetail";
    this.urlGL = "/gl";
    this.urlemployeeentity='/entitymapping'
    this.urlEntity = "/entity";
    this.urlisMailtemplate = "/mail_template";
    this.urlEmpbranch="/empbranch";
    this.urlEmptypeMap='/employetypeemapping'
    this.urlbsccMap="/ccbsmapping"
    this.urlrm="/rmmapping";
    this.urlrole="/rolemapping"
    this.isproduct = this.urlproduct === this.url ? true : false;
    this.isemployeeentityForm = this.urlemployeeentity === this.url ? true : false;
    this.isrm = this.urlrm === this.url ? true : false;
    this.isrole = this.urlrole === this.url ? true : false;

    this.isPermission = this.urlPermission === this.url ? true : false;
    this.isBranchbank = this.urlbranchbank === this.url ? true : false;
    this.isDepartment = this.urlDepartment === this.url ? true : false;
    this.isEmployee = this.urlEmployee === this.url ? true : false;
    this.isEmptypeMap=this.urlEmptypeMap===this.url?true:false;
    this.isbsccMap=this.urlbsccMap===this.url? true :false;
    this.isSubcategory = this.urlSubCategory === this.url ? true : false;
    this.isCategory = this.urlCategory === this.url ? true : false;
    this.isRoles = this.urlRoles === this.url ? true : false;
    this.isModules = this.urlMoudles === this.url ? true : false;
    this.isState = this.urlState === this.url ? true : false;
    this.isPinCode = this.urlPinCode === this.url ? true : false;
    this.isDistrict = this.urlDistrict === this.url ? true : false;
    this.isCity = this.urlCity === this.url ? true : false;
    this.isCC = this.urlCC === this.url ? true : false;
    this.isBS = this.urlBS === this.url ? true : false;
    this.isCCBS = this.urlCCBS === this.url ? true : false;
    this.isExp = this.urlExp === this.url ? true : false;
    this.isDesignation = this.urlDesignation === this.url ? true : false;
    this.isFin = this.urlFin === this.url ? true : false;
    this.isFinQ = this.urlQFin === this.url ? true : false;
    this.isPMD = this.urlPMD === this.url ? true : false;

    this.isGL = this.urlGL === this.url ? true : false;
    this.isEntity = this.urlEntity === this.url ? true : false;
    this.isMailtemplate = this.urlisMailtemplate === this.url ? true : false;
    this.isEmpbranch = this.urlEmpbranch === this.url ? true : false;

    this.roleValues = data.role[0].name;
    this.isSector = this.urlSector === this.url ? true : false;
    this.makerNameBtn = data.name;
    if (this.isPermission) {
      this.isPermissionForm = false;
      this.isDeptForm = false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;

      this.isRolesEdit = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;
    }
    else if(this.isrm){
      let empkeyvalue: String = "";
      this.getemployeeFK(empkeyvalue);
      this.rmMappingForm.reset();

      this.isPermissionForm = false;
      this.isDeptForm = false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;

      this.isRolesEdit = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=true;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.rmMappingsum(1,'')
      this.isDesignationForm = false;
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;

    }
    else if(this.isrole){
      let empkeyvalue: String = "";
      this.getemployeeFK(empkeyvalue);
      this.roleMappingForm.reset()

      this.isPermissionForm = false;
      this.isDeptForm = false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isRolesEdit = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rolesummary=true;
      this.rolemapcreate=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.roleMappingsum(1,'')
      this.isDesignationForm = false;

      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;

    }
    else if (this.isFin) {
      // this.getentitysummarysearch(1);
      this.isFinQ = false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;


      this.isFinQEdit = false;
      this.isFinQForm = false;
      this.isFinEdit = false;
      this.isFinForm = false;
      this.isEntityForm = false;
      this.isEntityEdit = false;
      this.isExpEdit = false;
      this.isExpform = false;
      this.isSectorEdit = false;
      this.isSectorform = false;
      this.isDeptForm = false;
      this.isDepartmentView = false;
      this.isdeptEditForm = false;
      this.isEmployeeViewForm = false;
      this.isRolesEdit = false;
      this.isPermissionForm = false;
      this.isCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isSubCategoryForm = false;
      this.isCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false;
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;


    }
    else if (this.isproduct) {
      this.getproductlist();
      this.isFinQ = false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isFinQEdit = false;
      this.isFinQForm = false;
      this.isFinEdit = false;
      this.isFinForm = false;
      this.isEntityForm = false;
      this.isEntityEdit = false;
      this.isExpEdit = false;
      this.isExpform = false;
      this.isSectorEdit = false;
      this.isSectorform = false;
      this.isDeptForm = false;
      this.isDepartmentView = false;
      this.isdeptEditForm = false;
      this.isEmployeeViewForm = false;
      this.isRolesEdit = false;
      this.isPermissionForm = false;
      this.isCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isSubCategoryForm = false;
      this.isCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false;
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isFin=false;
      this.isProductEditForm=false;
      this.isProductForm=false;
    }
    else if (this.isFinQ) {
      this.getfinquatersummarysearch(1);
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;
      this.isFinQEdit = false;
      this.isEmptypeMapcreate=false;

      this.isEmptypeMapping=false;

      this.isFinQForm = false;
      this.isFinEdit = false;
      this.isFinForm = false;
      this.isEntityForm = false;
      this.isEntityEdit = false;
      this.isExpEdit = false;
      this.isExpform = false;
      this.isSectorEdit = false;
      this.isSectorform = false;
      this.isDeptForm = false;
      this.isDepartmentView = false;
      this.isdeptEditForm = false;
      this.isEmployeeViewForm = false;
      this.isRolesEdit = false;
      this.isPermissionForm = false;
      this.isCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isSubCategoryForm = false;
      this.isCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false;
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;



    }
    else if (this.isEntity) {
      this.getentitysummarysearch(1);
      this.isFinEdit = false;
      this.isEmptypeMapcreate=false;
      this.isproduct=false;
      this.isEmptypeMapping=false;

      this.isFinForm = false;
      this.isFin = false;
      this.isEntityForm = false;
      this.isEntityEdit = false;
      this.isExpEdit = false;
      this.isExpform = false;
      this.isSectorEdit = false;
      this.isSectorform = false;
      this.isDeptForm = false;
      this.isDepartmentView = false;
      this.isdeptEditForm = false;
      this.isEmployeeViewForm = false;
      this.isRolesEdit = false;
      this.isPermissionForm = false;
      this.isCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isSubCategoryForm = false;
      this.isCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false;
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;



    }
    else if(this.isemployeeentityForm)
    {
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;
      this.isemployeeentityForm=true;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;

      this.ismakerCheckerButton=false
      this.isPermissionForm = false;
      this.isFinQEdit=false;
      this.isFinQForm=false;
      this.isFinEdit=false;
      this.isFinForm=false;
      this.isEntityForm=false;
      this.isEntityEdit=false;
      this.isExpEdit=false;
      this.isExpform=false;
      this.isSectorEdit=false;
      this.isSectorform=false;
      this.isDeptForm = false;
      this.isRolesEdit = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isPMDForm=false;
      this.isEmployeecreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;


    }
    else if (this.isEmpbranch) {
      this.isemployeeentityForm=false;
      this.isEmptypeMapcreate=false;
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;
      this.isEmpbranch=true;
      this.isEmptypeMapping=false;

      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.getempbranchdata();
      this,this.isEmpbranchview=false;
      this.isFinEdit = false;
      this.isFinForm = false;
      this.isFin = false;
      this.isEntityForm = false;
      this.isEntityEdit = false;
      this.isExpEdit = false;
      this.isExpform = false;
      this.isSectorEdit = false;
      this.isSectorform = false;
      this.isDeptForm = false;
      this.isDepartmentView = false;
      this.isdeptEditForm = false;
      this.isEmployeeViewForm = false;
      this.isRolesEdit = false;
      this.isPermissionForm = false;
      this.isCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isSubCategoryForm = false;
      this.isCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false;
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmployeecreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;


    }
    else if (this.isExp) {
      this.getexpsummary(1);
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;
      this.isEntity = false;
      this.isemployeeentityForm=false;
      this.isEntityEdit = false;
      this.isEntityForm = false;
      this.isExpEdit = false;
      this.isExpform = false;
      this.isSectorEdit = false;
      this.isSectorform = false;
      this.isDeptForm = false;
      this.isDepartmentView = false;
      this.isdeptEditForm = false;
      this.isEmployeeViewForm = false;
      this.isRolesEdit = false;
      this.isPermissionForm = false;
      this.isCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isSubCategoryForm = false;
      this.isCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false;
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isEmployeecreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;


    }
    else if (this.isSector) {
      this.getsectorsummary(1);
      this.isExpEdit = false;
      this.isEmptypeMapcreate=false;
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;
      this.isemployeeentityForm=false;
      this.isExpform = false;
      this.isExp = false;
      this.isSectorEdit = false;
      this.isSectorform = false;
      this.isDeptForm = false;
      this.isDepartmentView = false;
      this.isdeptEditForm = false;
      this.isEmployeeViewForm = false;
      this.isRolesEdit = false;
      this.isPermissionForm = false;
      this.isCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isSubCategoryForm = false;
      this.isCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false;
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;



    }
    else if (this.isBranchbank) {
      this.sharedService.BranchbankEditValue.next('');
      this.sharedService.branchreadonly.next(0);
      this.branchbankForm.reset('');
      this.getBranchbanksummary(1);
      this.isBranchbankForm = false;
      this.isExpEdit = false;
      this.isExpform = false;
      this.isproduct=false;
      this.isExp = false;
      this.isSectorEdit = false;
      this.isSectorform = false;
      this.isDeptForm = false;
      this.isDepartmentView = false;
      this.isdeptEditForm = false;
      this.isEmployeeViewForm = false;
      this.isRolesEdit = false;
      this.isPermissionForm = false;
      this.isCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isSubCategoryForm = false;
      this.isCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false;
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isProductForm=false;
      this.isProductEditForm=false;





    } else if (this.isDepartment) {
      this.getDepartmentList();
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;
      this.isDeptForm = false;
      this.isDepartmentView = false;
      this.isdeptEditForm = false;
      this.isEmployeeViewForm = false;
      this.isRolesEdit = false;
      this.isPermissionForm = false;
      this.isCategoryForm = false;
      this.isExp = false;
      this.isSubCategoryEditForm = false;
      this.isSubCategoryForm = false;
      this.isCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false;
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;





    } else if (this.isDesignation) {
      this.getdesignationsummary(this.has_designationpage, '');
      this.isSector = false;
      this.isProductForm=false;
      this.isProductEditForm=false;
      this.isSectorEdit = false;
      this.isSectorform = false;
      this.isDesignationForm = false;
      this.isDeptForm = false;
      this.isDepartmentView = false;
      this.isdeptEditForm = false;
      this.isproduct=false;
      this.isEmployeeViewForm = false;
      this.isRolesEdit = false;
      this.isPermissionForm = false;
      this.isExp = false;
      this.isCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isSubCategoryForm = false;
      this.isCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false;
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;




    }
    else if (this.isEmployee) {
      this.getEmployee()
      this.isEmployeeViewForm = false;
      this.ismakerCheckerButton = false;
      this.isSubCategoryEditForm = false;
      this.isCategoryForm = false;
      this.isRolesEdit = false;
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;
      this.isDeptForm = false;
      this.isPermissionForm = false;
      this.isSubCategoryForm = false;
      this.isCategoryEditForm = false;
      this.isDepartmentView = false;
      this.isdeptEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;





    } else if (this.isCategory) {
      this.getCategoryList();
      this.isCategoryForm = false;
      this.isCategoryEditForm = false;
      this.isPermissionForm = false;
      this.isRolesEdit = false;
      this.isEmployeeViewForm = false;
      this.isSubCategoryEditForm = false;
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;
      this.isDeptForm = false;
      this.isdeptEditForm = false;
      this.isSubCategoryForm = false;
      this.isDepartmentView = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;





    } else if (this.isSubcategory) {
      this.getSubCategoryList1();
      this.isPermissionForm = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;
      this.isRolesEdit = false;
      this.isDeptForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;





    } else if (this.isModules) {
      this.getModulesList();
      this.isEmployeeViewForm = false;
      this.isSubCategoryEditForm = false;
      this.isPermissionForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isRolesEdit = false;
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;
      this.isCategoryForm = false;
      this.isDeptForm = false;
      this.isSubCategoryForm = false;
      this.isDepartmentView = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;





    } else if (this.isRoles) {
      this.getRolesList();
      this.isRolesEdit = false;
      this.isEmployeeViewForm = false;
      this.isPermissionForm = false;
      this.isSubCategoryEditForm = false;
      this.isCategoryForm = false;
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;
      this.isDeptForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isSubCategoryForm = false;
      this.isDepartmentView = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;





    }
    else if (this.isState) {
      this.getStateList();
      this.isPermissionForm = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isRolesEdit = false;
      this.isDeptForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isproduct=false;
      this.isProductForm=false;
      this.isProductEditForm=false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;





    } else if (this.isCity) {
      this.getCityList();
      this.isPermissionForm = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isRolesEdit = false;
      this.isDeptForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isSubCategoryForm = false;
      this.isproduct=false;
      this.isSubCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isProductForm=false;
      this.isProductEditForm=false;





    } else if (this.isPinCode) {
      this.getPincodeList();
      this.isPermissionForm = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isRolesEdit = false;
      this.isDeptForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isproduct=false;
      this.isDepartmentView = false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isProductForm=false;
      this.isProductEditForm=false;





    } else if (this.isDistrict) {
      this.getDistrictList();
      this.isPermissionForm = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isRolesEdit = false;
      this.isDeptForm = false;
      this.isproduct=false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isProductForm=false;
      this.isProductEditForm=false;





    }

    else if (this.isBS) {
      this.getbs();
      this.isPermissionForm = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isRolesEdit = false;
      this.isDeptForm = false;
      this.isCategoryEditForm = false;
      this.isproduct=false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isProductForm=false;
      this.isProductEditForm=false;




    }

    else if (this.isCC) {
      this.getcc();
      this.isPermissionForm = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isRolesEdit = false;
      this.isDeptForm = false;
      this.isproduct=false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isProductForm=false;
      this.isProductEditForm=false;





    }
    else if (this.isCCBS) {
      this.getccbs();
      this.isPermissionForm = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isRolesEdit = false;
      this.isDeptForm = false;
      this.isproduct=false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isProductForm=false;
      this.isProductEditForm=false;





    }
    else if (this.isPMD) {
      this.getPMD();
      this.isPermissionForm = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isproduct=false;
      this.isRolesEdit = false;
      this.isDeptForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isPMDForm = false;
      this.isPMDFormedit = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isProductForm=false;
      this.isProductEditForm=false;





    }
    else if (this.isGL) {
      this.getGL();
      this.isPermissionForm = false;
      this.isEmployeeViewForm = false;
      this.isproduct=false;
      this.isCategoryForm = false;
      this.isRolesEdit = false;
      this.isDeptForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isPMDForm = false;
      this.isPMDFormedit = false;
      this.isMailtemplateForm = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isProductForm=false;
      this.isProductEditForm=false;




    }
    else if (this.isMailtemplate) {
      this.isPermissionForm = false;
      this.isMailtemplateForm = true;
      this.isDeptForm = false;
      this.isRolesEdit = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isproduct=false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=false;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isProductForm=false;
      this.isProductEditForm=false;



    }
    else if (this.isEmptypeMap){
      this.isPermissionForm = false;
      this.isMailtemplateForm = false;
      this.isDeptForm = false;
      this.isRolesEdit = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isStateForm = false;
      this.isproduct=false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapping=true;
      this.isEmptypeMapcreate=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=false;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.EmptypeMapping(1,'');
      this.EmptypeMappingForm.reset();
      let empkeyvalue: String = "";
      this.getemployeeFK(empkeyvalue);
      this.isDesignationForm = false;

      this.isProductForm=false;
      this.isProductEditForm=false;


    }
    else if (this.isbsccMap){
      this.BSCCMapping(1,'')
      this.BSCCMappingForm.reset()
      let empkeyvalue: String = "";
      this.getemployeeFK(empkeyvalue);
      this.isEmptypeMapping=false;
      this.isPermissionForm = false;
      this.isMailtemplateForm = false;
      this.isDeptForm = false;
      this.isproduct=false;
      this.isRolesEdit = false;
      this.isEmployeeViewForm = false;
      this.isCategoryForm = false;
      this.isSubCategoryForm = false;
      this.isSubCategoryEditForm = false;
      this.isCategoryEditForm = false;
      this.isdeptEditForm = false;
      this.isDepartmentView = false;
      this.isStateForm = false;
      this.isCityForm = false;
      this.isDistrictForm = false;
      this.isPinCodeForm = false
      this.isStateEditForm = false;
      this.isDistrictEditForm = false;
      this.isCityEditForm = false;
      this.isPinCodeEditForm = false;
      this.isCCBSform = false;
      this.isBSForm = false;
      this.isCCform = false;
      this.isEmpbranch=false;
      this.isbranchempdata=false;
      this.isEmpbranchview=false;
      this.isemployeeentityForm=false;
      this.isEmployeecreate=false;
      this.isEmptypeMapcreate=false;
      this.isEmptypeMapping=false;
      this.isBSCCMapcreate = false;
      this.isBSCCMapping=true;
      this.rmsummary=false;
      this.rmmapcreaet=false;
      this.rolesummary=false;
      this.rolemapcreate=false;
      this.isDesignationForm = false;
      this.isProductForm=false;
      this.isProductEditForm=false;



    }


    if (this.roleValues === "Maker") {
      this.ismakerCheckerButton = true;
    } else if (this.roleValues === "Checker") {
      this.ismakerCheckerButton = false;
    }
    if (data.name === "Module") {
      this.ismakerCheckerButton = this.makerNameBtn = false;
    }
    // if (data.name === "Employee") {
    //   this.ismakerCheckerButton = this.makerNameBtn = false;
    // }
    if (data.name === "Roles") {
      this.ismakerCheckerButton = this.makerNameBtn = false;
      this.isEditMakerChekerBtn = true;
    }
    if (data.name === "Mail Template") {
      this.ismakerCheckerButton = this.makerNameBtn = false;
    }
    if (data.name === "Employee Branch") {
      this.ismakerCheckerButton = this.makerNameBtn = false;
    }
    if (data.name === "Entity Mapping") {
      this.ismakerCheckerButton = this.makerNameBtn = false;
    }

    // console.log("cccccccc", data)
  }

  addForm() {
    console.log(this.makerNameBtn)
    if (this.makerNameBtn === "Department") {
      this.isDeptForm = true;
      this.isDepartment = false;
      this.isdeptEditForm = false;
      this.ismakerCheckerButton = false;
    } else if (this.makerNameBtn === "Permissions") {
      this.isPermission = false;
      this.isPermissionForm = true;
    } else if (this.makerNameBtn === "Sub Category") {
      this.isSubCategoryForm = true;
      this.isSubcategory = false;
      this.isSubCategoryEditForm = false;
      this.ismakerCheckerButton = false;
    } else if (this.makerNameBtn === "Designation") {
      this.isDesignationForm = true;
      this.isDesignation = false;
      // this.isSubCategoryEditForm = false;
      this.ismakerCheckerButton = false;
    }
    else if (this.makerNameBtn === "Category") {
      this.isCategoryForm = true;
      this.isCategoryEditForm = false;
      this.isCategory = false;
      this.ismakerCheckerButton = false;
    } else if (this.makerNameBtn === "State") {
      this.isStateForm = true;
      this.isState = false;
      this.isStateEditForm = false;
      this.ismakerCheckerButton = false;
    } else if (this.makerNameBtn === "Pincode") {
      this.isPinCodeForm = true;
      this.isPinCode = false;
      this.isPinCodeEditForm = false;
      this.ismakerCheckerButton = false;
    } else if (this.makerNameBtn === "City") {
      this.isCityForm = true;
      this.isCity = false;
      this.isCityEditForm = false;
      this.ismakerCheckerButton = false;
    } else if (this.makerNameBtn === "District") {
      this.isDistrictForm = true;
      this.isDistrict = false;
      this.isDistrictEditForm = false;
      this.ismakerCheckerButton = false;
    }
    else if (this.makerNameBtn === "Cost Centre") {
      this.isCCform = true;
      this.isCC = false;
      this.isBS = false;
      this.isCCBS = false;
      this.ismakerCheckerButton = false;
    }
    else if (this.makerNameBtn === "Business Segment") {
      this.isBSForm = true;
      this.isCC = false;
      this.isBS = false;
      this.isCCBS = false;

      this.ismakerCheckerButton = false;
    }
    else if (this.makerNameBtn === "CCBS") {
      this.isCCBSform = true;
      this.isCC = false;
      this.isBS = false;
      this.isCCBS = false;
      this.ismakerCheckerButton = false;
    }

    else if (this.makerNameBtn === "Sector") {
      this.isSectorform = true;
      this.isSector = false;
      this.isSectorEdit = false;
      this.ismakerCheckerButton = false;
    }

    else if (this.makerNameBtn === "PMD BRANCH") {
      this.isPMDForm = true;
      this.isPMDFormedit = false;
      this.isPMD = false;
      this.isCCBSform = false;
      this.ismakerCheckerButton = false;
    }

    else if (this.makerNameBtn === "Expense") {
      this.isExpform = true;
      this.isExpEdit = false;
      this.isExp = false;
      this.ismakerCheckerButton = false;
    }
    else if (this.makerNameBtn === "CBS GL") {
      this.isGL = false;
      this.ismakerCheckerButton = true;

    }
    else if (this.makerNameBtn === "Entity") {
      this.isEntity = false;
      this.isEntityForm = true;
      this.isEntityEdit = false;
      this.ismakerCheckerButton = false;

    }
    else if (this.makerNameBtn === "Product") {
      this.ismakerCheckerButton = false;
      this.isProductForm = true;
      this.isproduct = false
    }
    else if (this.makerNameBtn === "Fin Year") {
      this.isFin = false;
      this.isFinForm = true;
      this.isFinEdit = false;
      this.ismakerCheckerButton = false;

    }
    else if (this.makerNameBtn === "Fin Quarter") {
      this.isFinQ = false;
      this.isFinQEdit = true;
      this.isFinQForm = false;
      this.ismakerCheckerButton = false;

    }
    else if (this.makerNameBtn === "Mail Template") {
      this.isMailtemplateForm = true;
      this.isMailtemplate = true;
      this.ismakerCheckerButton = false;
    }
    else if (this.makerNameBtn === "Branch Bank Detail") {
      this.isBranchbankForm = true;
      this.ismakerCheckerButton = false;
      this.isBranchbank = false;
    }
    else if (this.makerNameBtn === "Employee") {
      this.isEmployeecreate = true;
      this.isEmployee = false;
      // this.isBranchbank = false;
    }
    else if (this.makerNameBtn === "Employee Type Mapping") {
      this.isEmptypeMapcreate = true;
      this.isEmptypeMapping = false;
    }
    else if (this.makerNameBtn === "CCBS Mapping") {
      this.isBSCCMapcreate = true;
      this.isBSCCMapping = false;
    }
    else if (this.makerNameBtn === "RM Mapping") {
      this.rmmapcreaet = true;
      this.rmsummary = false;
      this.rolesummary = false;

    }
    else if (this.makerNameBtn === "Role Mapping") {
      this.rolemapcreate = true;
      this.rolesummary = false;
      this.rmsummary = false;

    }
  }

  sectorsubmit() {
    this.getsectorsummary(1);
    this.isSector = true;
    this.isSectorEdit = false;
    this.isSectorform = false;
  }
  sectorcancel() {
    this.getsectorsummary(1);
    this.isSector = true;
    this.isSectorEdit = false;
    this.isSectorform = false;
  }
  designation() {
    this.getdesignationsummary(this.has_designationpage, '');
    this.ismakerCheckerButton = true;
    this.isDesignation = true;
    this.isDesignationForm = false;
    this.designationeditform = false;
  }
  designationcancel() {
    this.isDesignationForm = false;
    this.isDesignation = true;
    this.designationeditform = false;
    this.ismakerCheckerButton = true;
  }
  sectoractiveinactive(e: any) {
    let data: any = {
      'id': e.id,
      'status': e.status
      ,
    };
    this.mastersErvice.getsectorsummaryactiveinactive(data).subscribe(res => {
      if (res['status'] == 'success') {
        this.notification.showSuccess(res['message']);
        this.getsectorsummary(1)
      }
      else {
        // this.notification.showError(res['code']);
        this.notification.showError(res['description']);
      }
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    )

  }
  expactiveinactive(e: any) {
    let data: any = {
      'id': e.id,
      'status': e.status
      ,
    };
    this.mastersErvice.getexpsummaryactiveinactive(data).subscribe(res => {
      if (res['status'] == 'success') {
        this.notification.showSuccess(res['message']);
        this.getexpsummarysearch(1)
      }
      else {
        // this.notification.showError(res['code']);
        this.notification.showError(res['description']);
      }
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    )

  }
  Entityactiveinactive(e: any) {
    let data: any = {
      'id': e.id,
      'status': e.status
      ,
    };
    this.mastersErvice.getentityactiveinactive(data).subscribe(res => {
      if (res['status'] == 'success') {
        this.notification.showSuccess(res['message']);
        this.getentitysummarysearch(1);
      }
      else {
        this.notification.showError(res['code']);
        this.notification.showError(res['description']);
      }
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    )

  }
  Finactiveinactive(e: any) {
    let data: any = {
      'id': e.id,
      'status': e.status
      ,
    };
    this.mastersErvice.getentityactiveinactive(data).subscribe(res => {
      if (res['status'] == 'success') {
        this.notification.showSuccess(res['message']);
        this.getentitysummarysearch(1);
      }
      else {
        this.notification.showError(res['code']);
        this.notification.showError(res['description']);
      }
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    )

  }
  deptCancel() {
    this.isDeptForm = false;
    this.ismakerCheckerButton = true;
    this.isDepartment = true;
  }
  branchbankCancel() {
    this.isBranchbankForm = false;
    this.ismakerCheckerButton = true;
    this.isBranchbank = true;
    this.getBranchbanksummary(1);
  }

  deptEditCancel() {
    this.isdeptEditForm = false;
    this.isDepartment = true;
    this.ismakerCheckerButton = true;
  }
  expsubmit(data: any) {
    this.getsectorsummary(1);
    this.isSector = false;
    this.isSectorEdit = true;
    this.isSectorform = false;
    this.shareService.expEdit.next(data);
  }
  ExpCancel() {
    this.isExpform = false;
    this.ismakerCheckerButton = true;
    this.isExp = true;
    this.isExpEdit = false;
  }
  ProductCancle() {
    this.isProductForm = false;
    this.ismakerCheckerButton = true;
    this.isproduct = true
  }
  ProductSubmit() {
    this.getproductlist();
    this.notification.showSuccess("Saved Successfully....")
    this.isproduct = true;
    this.ismakerCheckerButton = true;
    this.isProductForm = false
  }
  ProductEditSubmit() {
    this.getproductlist();
    this.notification.showSuccess("Updated Successfully....")
    this.isProductEditForm = false;
    this.ismakerCheckerButton = true;
    this.isproduct = true;
  }
  getproductlist() {
    this.master2.getProductmaster()
      .subscribe(result => {
        this.productlist = result["data"];
        this.productlist.forEach((s => {
          let tes = s.unitprice;
        }))
      })
  }
  ProductEditCancle() {
    this.isProductEditForm = false;
    this.ismakerCheckerButton = true;
    this.isproduct = true;
  }
  ExpSubCancel() {
    this.isExpEdit = false;
    this.isExp = true;
    this.ismakerCheckerButton = true;
    this.isExpform = false;
  }
  // designation(){
  //   this.getdesignationsummary(this.has_designationpage,'');
  //   this.ismakerCheckerButton = true;
  //   this.isDesignation = true;
  //   this.isDesignationForm = false;
  //   this.designationeditform=false;
  // }
  // designationcancel(){
  //   this.isDesignationForm=false;
  //   this.isDesignation=true;
  //   this.designationeditform=false;
  //   this.ismakerCheckerButton = true;
  // }

  expensereset() {
    this.ExpForm.reset('');
    this.getexpsummary(1)
    // this.mastersErvice.expencesummarydata(1,'','ALL').subscribe(data=>{
    //   this.explist=data['data'];
    // });
  }
  sectorreset() {
    this.sectorForm.reset('');
    this.getsectorsummary(1)
    // this.mastersErvice.getsectorsummary('',1,'ALL').subscribe(data=>{
    //   this.sectorlist=data['data'];
    // });
  }
  exp_next() {
    if (this.has_expnext) {
      this.getexpsummary(this.has_exppage + 1);
    }
  }
  entity_next() {
    if (this.has_entitynext) {
      this.getentitysummarysearch(this.has_entitypage + 1);
    }
  }
  fin_next() {
    if (this.has_Finnext) {
      this.getentitysummarysearch(this.has_Finpage + 1);
    }
  }
  finQ_next() {
    if (this.has_FinQnext) {
      this.getfinquatersummarysearch(this.has_FinQpage + 1);
    }
  }
  exp_previous() {
    if (this.has_expprevious) {
      this.getexpsummary(this.has_exppage - 1);
    }
  }
  entity_previous() {
    if (this.has_entityprevious) {
      this.getentitysummarysearch(this.has_entitypage - 1);
    }
  }
  fin_previous() {
    if (this.has_Finprevious) {
      this.getentitysummarysearch(this.has_Finpage - 1);
    }
  }
  finQ_previous() {
    if (this.has_FinQprevious) {
      this.getfinquatersummarysearch(this.has_FinQpage - 1);
    }
  }
  getexpsummary(page: any) {
    this.isLoading = true;
    this.mastersErvice.expencesummarydata(page, '', 'ALL').subscribe(data => {
      this.explist = data['data'];
      let pagination = data['pagination'];
      this.has_expnext = pagination.has_next;
      this.has_expprevious = pagination.has_previous;
      this.has_exppage = pagination.index;
      this.isLoading = false;
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    );
  }
  getexpsummarysearch(page: any) {
    this.isLoading = true;
    let d: any;
    if (this.ExpForm.get('name').value == undefined || this.ExpForm.get('name').value == '' || this.ExpForm.get('name').value == null) {
      d = ''
    }
    else {
      d = this.ExpForm.get('name').value;
    }
    let status: any = this.drpdwn[this.ExpForm.get('drop').value ? this.ExpForm.get('drop').value : 'ALL'];
    this.mastersErvice.expencesummarydata(page, d, status).subscribe(data => {
      this.explist = data['data'];
      let pagination = data['pagination'];
      this.has_expnext = pagination.has_next;
      this.has_expprevious = pagination.has_previous;
      this.has_exppage = pagination.index;
      this.isLoading = false;
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    )
  }
  getentitysummarysearch(page: any) {
    let d: any;
    if (this.entityForm.get('name').value == undefined || this.entityForm.get('name').value == null || this.entityForm.get('name').value == '') {
      d = ''
    }
    else {
      d = this.entityForm.get('name').value;
    }
    this.mastersErvice.getentitysummary(page, d).subscribe(data => {
      this.entitylist = data['data'];
      let pagination = data['pagination'];
      this.has_entitynext = pagination.has_next;
      this.has_entityprevious = pagination.has_previous;
      this.has_entitypage = pagination.index;
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    )
  }
  brbanksummarysearch(page: any = 1, is_pagination) {
    let type: any = '';
    let paymode: any = '';
    let accno: any = '';
    let type_val = this.branchbankForm.get('type').value;
    let paymode_val = this.branchbankForm.get('paymode').value;
    let accno_val = this.branchbankForm.get('accountno').value;
    if (is_pagination != 5) {
      if ((type_val == undefined || type_val == null || type_val == '') && (paymode_val == undefined || paymode_val == null || paymode_val == '') && (accno_val == undefined || accno_val == null || accno_val == '')) {
        this.notification.showWarning("Please Select Any One Field")
      }
    }
    if (type_val != undefined && type_val != null && type_val != '') {
      type = this.type_reverse[type_val];
    }
    if (paymode_val != undefined && paymode_val != null && paymode_val != '' && paymode_val.id != undefined && paymode_val.id != null && paymode_val.id != '') {
      paymode = paymode_val.id;
    }
    if (accno_val != undefined && accno_val != null && accno_val != '') {
      accno = accno_val
    }
    this.mastersErvice.getbranchbanksummary(page, type, accno, paymode).subscribe(data => {
      this.BranchbankList = data['data'];
      if (this.BranchbankList.length > 0) {
        let pagination = data['pagination'];
        this.has_previousbrbank = pagination['has_previous'];
        this.has_nextbrbank = pagination['has_next'];
        this.presentpagebrbank = pagination['index'];
      }
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    )
  }
  getfinsummarysearch(page: any) {
    let d: any;
    if (this.finForm.get('year').value == undefined || this.finForm.get('year').value == null || this.finForm.get('year').value == '') {
      d = ''
    }
    else {
      d = this.finForm.get('year').value;
    }
    this.mastersErvice.getentitysummary(page, d).subscribe(data => {
      this.Finlist = data['data'];
      let pagination = data['pagination'];
      this.has_Finnext = pagination.has_next;
      this.has_Finprevious = pagination.has_previous;
      this.has_Finpage = pagination.index;
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    )
  }
  getfinquatersummarysearch(page: any) {
    let d: any;
    if (this.finquaterform.get('year').value == undefined || this.finquaterform.get('year').value == null || this.finquaterform.get('year').value == '') {
      d = ''
    }
    else {
      d = this.finquaterform.get('year').value;
    }
    this.mastersErvice.getentitysummary(page, d).subscribe(data => {
      this.FinQlist = data['data'];
      let pagination = data['pagination'];
      this.has_FinQnext = pagination.has_next;
      this.has_FinQprevious = pagination.has_previous;
      this.has_FinQpage = pagination.index;
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    )
  }
  categoryCancel() {
    this.ismakerCheckerButton = true;
    this.isCategoryForm = false;
    this.isCategory = true
  }

  categoryEditCancel() {
    this.ismakerCheckerButton = true;
    this.isCategoryEditForm = false;
    this.isCategory = true;
  }

  subCategoryCancel() {
    this.ismakerCheckerButton = true;
    this.isSubCategoryForm = false;
    this.isSubcategory = true
  }

  subCategoryEditCancel() {
    this.ismakerCheckerButton = true;
    this.isSubCategoryEditForm = false;
    this.isSubcategory = true
  }

  permissionCancel() {
    this.ismakerCheckerButton = true;
    this.isPermission = true;
    this.isPermissionForm = false;
  }

  rolesEditCancel() {
    this.ismakerCheckerButton = false;
    this.isRoles = true;
    this.isRolesEdit = false;
  }

  employeeViewCancel() {
    this.isEmployeeViewForm = false;
    this.isEmployee = true;
  }

  categorySubmit() {
    this.getCategoryList();
    this.ismakerCheckerButton = true;
    this.isCategory = true;
    this.isCategoryForm = false;
  }

  categoryEditSubmit() {
    this.getCategoryList();
    this.ismakerCheckerButton = true;
    this.isCategory = true;
    this.isCategoryEditForm = false;
  }
  deptSubmit() {
    this.getDepartmentList()
    this.ismakerCheckerButton = true;
    this.isDeptForm = false;
    this.isDepartment = true;
  }
  branchbankSubmit() {
    // this.getDepartmentList()
    this.ismakerCheckerButton = true;
    this.isBranchbankForm = false;
    this.isBranchbank = true;
  }
  editdeptSubmit() {
    this.getDepartmentList()
    this.ismakerCheckerButton = true;
    this.isdeptEditForm = false;
    this.isDepartment = true;
  }

  subCategorySubmit() {
    this.getSubCategoryList1();
    this.isSubCategoryForm = false;
    this.isSubcategory = true;
    this.ismakerCheckerButton = true;
  }

  subCategoryEditSubmit() {
    this.getSubCategoryList1();
    this.isSubCategoryEditForm = false;
    this.isSubcategory = true;
    this.ismakerCheckerButton = true;
  }

  rolesEditSubmit() {
    this.getRolesList();
    this.ismakerCheckerButton = false;
    this.isRolesEdit = false;
    this.isRoles = true;
  }


  stateSubmit() {
    this.getStateList();
    this.isStateForm = false;
    this.isState = true;
    this.ismakerCheckerButton = true;
  }

  stateCancel() {
    this.ismakerCheckerButton = true;
    this.isStateForm = false;
    this.isState = true
  }


  citySubmit() {
    this.getStateList();
    this.isCityForm = false;
    this.isCity = true;
    this.ismakerCheckerButton = true;
  }

  cityCancel() {
    this.ismakerCheckerButton = true;
    this.isCityForm = false;
    this.isCity = true
  }

  districtSubmit() {
    // this.getStateList();
    this.isDistrictForm = false;
    this.isDistrict = true;
    this.ismakerCheckerButton = true;
  }

  districtCancel() {
    this.ismakerCheckerButton = true;
    this.isDistrictForm = false;
    this.isDistrict = true;
  }
  pinCodeSubmit() {
    // this.getStateList();
    this.isPinCodeForm = false;
    this.isPinCode = true;
    this.ismakerCheckerButton = true;
  }

  pinCodeCancel() {
    this.ismakerCheckerButton = true;
    this.isPinCodeForm = false;
    this.isPinCode = true;
  }



  stateEditCancel() {
    this.isStateEditForm = false;
    this.isState = true;
    this.ismakerCheckerButton = true;
  }
  stateEditSubmit() {
    this.getStateList();
    this.ismakerCheckerButton = true;
    this.isState = true;
    this.isStateEditForm = false;
  }

  cityEditCancel() {
    this.isCityEditForm = false;
    this.isCity = true;
    this.ismakerCheckerButton = true;
  }
  cityEditSubmit() {
    this.getCityList();
    this.isCityEditForm = false;
    this.isCity = true;
    this.ismakerCheckerButton = true;
  }
  districtEditCancel() {
    this.isDistrictEditForm = false;
    this.isDistrict = true;
    this.ismakerCheckerButton = true;
  }
  districtEditSubmit() {
    this.getDistrictList();
    this.isDistrictEditForm = false;
    this.isDistrict = true;
    this.ismakerCheckerButton = true;
  }
  pinCodeEditCancel() {
    this.isPinCodeEditForm = false;
    this.isPinCode = true;
    this.ismakerCheckerButton = true;
  }
  pinCodeEditSubmit() {
    this.getPincodeList();
    this.isPinCodeEditForm = false;
    this.isPinCode = true;
    this.ismakerCheckerButton = true;
  }
  empcreateselect: boolean = false;

  empcreateSubmit() {
    this.getEmployee();
    this.isEmployeecreate = false;
    this.isEmployee = true;
  }
  empcreatecancel(){
    this.isEmployeecreate = false;
    this.isEmployee = true;
  }
  empbranCancel(){
    this.getempbranchdata();
    this.isEmpbranch=true;
    this.isEmpbranchview=false;
  }
 

  autocompleteToScroll() {
    setTimeout(() => {
      if (
        this.matToAutocomplete &&
        this.autocompleteTrigger &&
        this.matToAutocomplete.panel
      ) {
        fromEvent(this.matToAutocomplete.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matToAutocomplete.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matToAutocomplete.panel.nativeElement.scrollTop;
            const scrollHeight = this.matToAutocomplete.panel.nativeElement.scrollHeight;
            const elementHeight = this.matToAutocomplete.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            // console.log('fetchmoredata1', scrollTop, elementHeight, scrollHeight, atBottom);
            if (atBottom) {
              // fetch more data
              // console.log('fetchmoredata');
              // console.log(this.employeeToInput.nativeElement.value);
              if (this.has_next === true) {
                this.mastersErvice.get_EmployeeList_2(this.employeeToInput.nativeElement.value, this.currentpage + 1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.allEmployeeList = this.allEmployeeList.concat(datas);
                    // console.log("toempss", datas)
                    if (this.allEmployeeList.length >= 0) {
                      this.has_next = datapagination.has_next;
                      this.has_previous = datapagination.has_previous;
                      this.currentpage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  public displayTo(empto?: iEmployeeList): string | undefined {
    return empto ? empto.full_name : undefined;
  }
  public getemppaymodeinterface(data?: emppaymode): string | undefined {
    return data ? data.name : undefined;
  }
  public getempbanknameinterface(data?: empbank): string | undefined {
    return data ? data.name : undefined;
  }
  public getempbranchinterface(data?: empbranch): string | undefined {
    return data ? data.name : undefined;
  }
  get empto() {
    return this.memoAddForm.get('to_emp');
  }
  public removeEmployeeTo(employee: iEmployeeList): void {
    const index = this.chipSelectedEmployeeTo.indexOf(employee);
    if (index >= 0) {
      this.chipSelectedEmployeeTo.splice(index, 1);
      // console.log(this.chipSelectedEmployeeTo);
      this.chipSelectedEmployeeToid.splice(index, 1);
      // console.log(this.chipSelectedEmployeeToid);
      this.employeeToInput.nativeElement.value = '';
    }
    if (index === 0) {
      this.permissionArray = []
    }

  }

  public employeeToSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectEmployeeToByName(event.option.value.full_name);
    this.employeeToInput.nativeElement.value = '';
  }
  private selectEmployeeToByName(employeeName) {
    let foundEmployeeCC1 = this.chipSelectedEmployeeTo.filter(employeecc => employeecc.full_name == employeeName);
    if (foundEmployeeCC1.length) {
      return;
    }
    let foundEmployeeCC = this.allEmployeeList.filter(employeecc => employeecc.full_name == employeeName);
    if (foundEmployeeCC.length) {
      this.chipSelectedEmployeeTo.push(foundEmployeeCC[0]);
      this.chipSelectedEmployeeToid.push(foundEmployeeCC[0].id)
    }
    if (this.chipSelectedEmployeeTo.length > 1) {
      alert("select one value")
    }
    this.employeeIdValue = this.chipSelectedEmployeeToid;
  }

  permissionDelete(data) {
    var answer = window.confirm("Remove permission?");
    if (answer) {
      //some code
    }
    else {
      return false;
    }
    this.mastersErvice.removePermission(data, this.employeeIdValue)
      .subscribe(result => {
        this.notification.showSuccess(result.message)
        this.permissionArray = [];
        this.getPermissionList(this.employeeIdValue)
        // console.log("ssPOOOOOOO", result)
      })
  }

  departmentViewCancel() {
    this.isDepartment = true;
    this.isDepartmentView = false;
    this.ismakerCheckerButton = true
  }
  employeeViewSubmit() {
    this.getEmployee();
    this.isEmployeeViewForm = false;
    this.isEmployee = true;
  }

  autocompleteDeptScroll() {
    setTimeout(() => {
      if (
        this.matAutocompleteDept &&
        this.autocompleteTrigger &&
        this.matAutocompleteDept.panel
      ) {
        fromEvent(this.matAutocompleteDept.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matAutocompleteDept.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matAutocompleteDept.panel.nativeElement.scrollTop;
            const scrollHeight = this.matAutocompleteDept.panel.nativeElement.scrollHeight;
            const elementHeight = this.matAutocompleteDept.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_next === true) {
                this.mastersErvice.getDepartmentPage(this.employeeDeptInput.nativeElement.value, this.currentpage + 1, '')
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.departmentList1 = this.departmentList1.concat(datas);
                    if (this.departmentList1.length >= 0) {
                      this.has_next = datapagination.has_next;
                      this.has_previous = datapagination.has_previous;
                      this.currentpage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  departmentSelected(data) {
    this.departmentId = data;
  }
  getsectorsummary(page) {
    this.isLoading = true;
    let d: any;
    if (this.sectorForm.get('name').value == undefined || this.sectorForm.get('name').value == '' || this.sectorForm.get('name').value == null) {
      d = '';
    }
    else {
      d = this.sectorForm.get('name').value;
    }
    let status: any = this.drpdwn[this.sectorForm.get('drop').value ? this.sectorForm.get('drop').value : 'ALL'];
    this.mastersErvice.getsectorsummary(d, page, status).subscribe(data => {
      this.sectorlist = data['data'];
      let pagination = data['pagination'];
      this.has_sectornext = pagination.has_next;
      this.has_sectorprevious = pagination.has_previous;
      this.has_sectorpage = pagination.index;
      this.isLoading = false;
    })
  }
  getdesignationsummary(page, data) {
    let dta: any;
    if (this.designationform.get('name').value == '' || this.designationform.get('name').value == undefined || this.designationform.get('name').value == null) {
      dta = '';
    }
    else {
      dta = this.designationform.get('name').value;
    }

    this.mastersErvice.getdesignationsummary(dta, page).subscribe(data => {
      this.designationList = data['data'];
      let pagination = data['pagination'];
      this.has_designationnext = pagination.has_next;
      this.has_designationprevious = pagination.has_previous;
      this.has_designationpage = pagination.index;

    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    );
  }
  has_designationclicknext() {
    if (this.has_designationnext) {
      this.getdesignationsummary(this.has_designationpage + 1, '');
    }
  }
  has_designationclickprevoius() {
    if (this.has_designationprevious) {
      this.getdesignationsummary(this.has_designationpage - 1, '');
    }
  }
  designationedit(data: any) {
    this.designationeditform = true;
    this.isDesignation = false;
    this.isDesignationForm = false;
    this.shareService.designationValue.next(data);
    return true;
  }
  has_sectorclicknext() {
    if (this.has_sectornext) {
      this.getsectorsummary(this.has_sectorpage + 1);
    }
  }
  has_sectorclickprevoius() {
    if (this.has_sectorprevious) {
      this.getsectorsummary(this.has_sectorpage - 1);
    }
  }
  sectoredit(data: any) {
    this.isSectorEdit = true;
    this.isSector = false;
    this.isStateForm = false;
    this.shareService.sectorEdit.next(data);
    this.getsectorsummary(1);
    return true;
  }
  expenseedit(data: any) {
    this.isExpEdit = true;
    this.isExp = false;
    this.isExpform = false;
    this.shareService.expEdit.next(data);
    this.getexpsummarysearch(1);
    return true;
  }
  Finedit(data: any) {
    this.isFinForm = true;
    this.isFin = false;
    this.isFinEdit = false;
    this.shareService.finedit.next(data);
    return true;
  }
  FinQuateredit(data: any) {
    this.isFinQForm = true;
    this.isFinQ = false;
    this.isFinQEdit = false;
    this.shareService.finquateredit.next(data);
    return true;
  }
  deptView() {
    if (this.AddForm.get('ctrldepartment').value == undefined || this.AddForm.get('ctrldepartment').value == '' || this.AddForm.get('ctrldepartment').value == null || this.AddForm.get('ctrldepartment').value == '') {
      this.notification.showError("Please Select The Valid Department");
      return false;
    }
    this.isDepartment = false;
    this.ismakerCheckerButton = false;
    this.isDepartmentView = true
    this.sharedService.departmentView.next(this.departmentId)
  }
  public displayFn(department?: Department): string | undefined {
    return department ? department.name : undefined;
  }
  get department() {
    return this.AddForm.get('ctrldepartment');
  }

  getStateList(filter = "", sortOrder = 'asc',
    pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getStateList(filter, sortOrder, pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.stateList = datas;
        for (let i = 0; i < this.stateList.length; i++) {
          let ci = this.stateList[i].country_id
          if (ci == undefined) {
            this.stateList[i].country_name = ''
          } else {
            this.stateList[i].country_name = ci.name
          };
        }
        let datapagination = results["pagination"];
        this.stateList = datas;
        if (this.stateList.length >= 0) {
          this.shas_next = datapagination.has_next;
          this.shas_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }

      })
  }
  nextClickState() {
    if (this.has_next === true) {
      this.getStateList("", 'asc', this.currentpage + 1, 10)
    }
  }

  previousClickState() {
    if (this.has_previous === true) {
      this.getStateList("", 'asc', this.currentpage - 1, 10)
    }
  }
  stateEdit(data: any) {
    this.shareService.stateEditValue.next(data)
    this.isStateEditForm = true;
    this.ismakerCheckerButton = false;
    this.isState = false;
    return data;
  }
  deleteState(data) {
    let value = data.id
    // console.log("deletestate", value)
    this.mastersErvice.stateDeleteForm(value)
      .subscribe(result => {
        this.notification.showSuccess("Successfully deleted....")
        return true

      })
  }

  getDistrictList(filter = "", sortOrder = 'asc',
    pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getDistrictList(filter, sortOrder, pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.districtList = datas;
        for (let i = 0; i < this.districtList.length; i++) {
          let si = this.districtList[i].state_id
          if (si == undefined) {
            this.districtList[i].state_name = ''
          } else {
            this.districtList[i].state_name = si.name
          };
        }
        let datapagination = results["pagination"];
        this.districtList = datas;
        if (this.districtList.length >= 0) {
          this.dhas_next = datapagination.has_next;
          this.dhas_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }

      })
  }
  nextClickDistrict() {
    if (this.dhas_next === true) {
      this.getDistrictList("", 'asc', this.currentpage + 1, 10)
    }
  }

  previousClickDistrict() {
    if (this.dhas_previous === true) {
      this.getDistrictList("", 'asc', this.currentpage - 1, 10)
    }
  }
  districtEdit(data: any) {
    this.shareService.districtEditValue.next(data)
    this.isDistrictEditForm = true;
    this.ismakerCheckerButton = false;
    this.isDistrict = false;
    return data;
  }
  deleteDistrict(data) {
    let value = data.id
    // console.log("deletedistrict", value)
    this.mastersErvice.districtDeleteForm(value)
      .subscribe(result => {
        this.notification.showSuccess("Successfully deleted....")
        return true

      })
  }

  getCityList(filter = "", sortOrder = 'asc',
    pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getCityList(filter, sortOrder, pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.cityList = datas;
        for (let i = 0; i < this.cityList.length; i++) {
          let si = this.cityList[i].state_id
          if (si == undefined) {
            this.cityList[i].state_name = ''
          } else {
            this.cityList[i].state_name = si.name
          };
        }
        let datapagination = results["pagination"];
        for (let i = 0; i < this.cityList.length; i++) {
          this.cityList[i]['con'] = false;
        }
        this.cityList = datas;
        if (this.cityList.length >= 0) {
          this.chas_next = datapagination.has_next;
          this.chas_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }

      })
  }
  nextClickCity() {
    if (this.chas_next === true) {
      this.getCityList("", 'asc', this.currentpage + 1, 10)
    }
  }

  previousClickCity() {
    if (this.chas_previous === true) {
      this.getCityList("", 'asc', this.currentpage - 1, 10)
    }
  }
  cityEdit(data: any) {
    this.shareService.cityEditValue.next(data)
    this.isCityEditForm = true;
    this.ismakerCheckerButton = false;
    this.isCity = false;
    return data;
  }
  deleteCity(data) {
    let value = data.id
    // console.log("deletecity", value)
    this.mastersErvice.cityDeleteForm(value)
      .subscribe(result => {
        this.notification.showSuccess("Successfully deleted....")
        return true

      })
  }

  getPincodeList(filter = "", sortOrder = 'asc',
    pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getPincodeList(filter, sortOrder, pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.pincodeList = datas;
        for (let i = 0; i < this.pincodeList.length; i++) {
          let ci = this.pincodeList[i].city_id
          let di = this.pincodeList[i].district_id
          if (ci == undefined) {
            this.pincodeList[i].city_name = ''
          } else {
            this.pincodeList[i].city_name = ci.name
          };
          if (di == undefined) {
            this.pincodeList[i].district_name = ''
          } else {
            this.pincodeList[i].district_name = di.name
          };
        }
        let datapagination = results["pagination"];
        this.pincodeList = datas;
        if (this.pincodeList.length >= 0) {
          this.phas_next = datapagination.has_next;
          this.phas_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }

      })
  }
  nextClickPincode() {
    if (this.phas_next === true) {
      this.getPincodeList("", 'asc', this.currentpage + 1, 10)
    }
  }

  previousClickPincode() {
    if (this.phas_previous === true) {
      this.getPincodeList("", 'asc', this.currentpage - 1, 10)
    }
  }
  pincodeEdit(data: any) {
    this.isPinCodeEditForm = true;
    this.ismakerCheckerButton = false;
    this.isPinCode = false;
    this.shareService.pincodeEditValue.next(data)
    return data;
  }
  deletePincode(data) {
    let value = data.id
    // console.log("deletepincode", value)
    this.mastersErvice.pincodeDeleteForm(value)
      .subscribe(result => {
        this.notification.showSuccess("Successfully deleted....")
        return true

      })
  }
  pinsearch() {
    this.mastersErvice.getPinCodeSearch(this.pinform.value.name)
      .subscribe(result => {
        let datas = result['data'];
        this.pincodeList = datas;
        for (let i = 0; i < this.pincodeList.length; i++) {
          let ci = this.pincodeList[i].city
          let di = this.pincodeList[i].district
          if (ci == undefined) {
            this.pincodeList[i].city_name = ''
          } else {
            this.pincodeList[i].city_name = ci.name
          };
          if (di == undefined) {
            this.pincodeList[i].district_name = ''
          } else {
            this.pincodeList[i].district_name = di.name
          };
        }
        let datapagination = result["pagination"];
        this.pincodeList = datas;
        if (this.pincodeList.length >= 0) {
          this.phas_next = datapagination.has_next;
          this.phas_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }

      })
  }

  citysearch() {

    this.mastersErvice.get_cityValue(this.cityform.value.name)
      .subscribe(result => {
        let datas = result["data"];
        this.cityList = datas;
        for (let i = 0; i < this.cityList.length; i++) {
          let si = this.cityList[i].state
          if (si == undefined) {
            this.cityList[i].state_name = ''
          } else {
            this.cityList[i].state_name = si.name
          };
        }
        for (let i = 0; i < this.cityList.length; i++) {
          this.cityList[i]['con'] = false;
        }
        let datapagination = result["pagination"];
        this.cityList = datas;
        if (this.cityList.length >= 0) {
          this.chas_next = datapagination.has_next;
          this.chas_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }

      })
  }
  productedit(data) {
    this.isProductEditForm = true;
    this.isproduct = false;
    this.ismakerCheckerButton = false;
    this.shareService.productedit.next(data)
    return data;
  }
  data: any = { 'name': '', 'productcategory_id': { 'name': '' }, 'unitprice': '', 'weight': '', 'producttype_id': { 'name': '' } };
  displayStyle = false;
  openPopup(datas: any) {
    this.data = datas;
    console.log(this.data);
    this.displayStyle = true;
  }
  getproductactive(data) {
    let fdata: any = { 'status': data.status };
    this.master2.productactiveinactive(data.id, fdata).subscribe(data => {
      this.notification.showSuccess('Updated Successfully');
      this.getproductlist();
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    );

  }
  previousClickpro() {
    if (this.has_previouspro === true) {

      this.getproductpage(this.presentpagepro - 1, 10)
    }
  }
  getproductpage(pageNumber = 1, pageSize = 10) {
    this.master2.getproductpage(pageNumber, pageSize, this.prform.value.name)
      .subscribe((results: any[]) => {
        let datapagination = results["pagination"];
        this.productlist = results["data"];;
        if (this.productlist.length >= 0) {
          this.has_nextpro = datapagination.has_next;
          this.has_previouspro = datapagination.has_previous;
          this.presentpagepro = datapagination.index;
        }
      })
  }
  nextClickpro() {
    if (this.has_nextpro === true) {

      this.getproductpage(this.presentpagepro + 1, 10)
    }
  }
  dsearch() {

    this.mastersErvice.getDistrictDropDown(this.districtform.value.name)
      .subscribe(results => {
        let datas = results["data"];
        this.districtList = datas;
        for (let i = 0; i < this.districtList.length; i++) {
          let si = this.districtList[i].state
          if (si == undefined) {
            this.districtList[i].state_name = ''
          } else {
            this.districtList[i].state_name = si.name
          };
        }
        let datapagination = results["pagination"];
        this.districtList = datas;
        if (this.districtList.length >= 0) {
          this.dhas_next = datapagination.has_next;
          this.dhas_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }



      })
  }
  ssearch() {

    this.mastersErvice.getStateSearch(this.sform.value.name)
      .subscribe(results => {

        let datas = results["data"];
        this.stateList = datas;
        for (let i = 0; i < this.stateList.length; i++) {
          let ci = this.stateList[i].country
          if (ci == undefined) {
            this.stateList[i].country_name = ''
          } else {
            this.stateList[i].country_name = ci.name
          };
        }
        let datapagination = results["pagination"];
        this.stateList = datas;
        if (this.stateList.length >= 0) {
          this.shas_next = datapagination.has_next;
          this.shas_previous = datapagination.has_previous;
          this.currentpage = datapagination.index;
        }




      })
  }

  ///////////////////////////////// CC BS and CCBS coding part 

  urlCC;
  urlBS;
  urlCCBS;

  isBS: boolean;
  isBSForm: boolean;
  isCCform: boolean;
  isCC: boolean;
  isCCBS: boolean;
  isCCBSform: boolean;

  BSSearchForm: FormGroup;
  CCSearchForm: FormGroup;
  CCBSSearchForm: FormGroup;
  editbss: FormGroup;

  presentpagebs: number = 1;
  has_previousbs = true;
  has_nextbs = true;

  presentpagecc: number = 1;
  has_nextcc = true;
  has_previouscc = true;

  presentpageccbs: number = 1;
  has_nextccbs = true;
  has_previousccbs = true;

  presentpagepmd: number = 1;
  has_nextpmd = true;
  has_previouspmd = true;

  pageSize = 10;

  businesssegmentList: any;
  costcenterList: any;
  ccbsList: any;

  bsList: Array<bslistss>;
  costcentre_id = new FormControl();

  ccList: Array<cclistss>;
  businesssegment_id = new FormControl();

  @ViewChild('bs') matbsAutocomplete: MatAutocomplete;
  @ViewChild('bsInput') bsInput: any;

  @ViewChild('cc') matccAutocomplete: MatAutocomplete;
  @ViewChild('ccInput') ccInput: any;

  ActiveInactive = [
    { value: 0, display: 'Active' },
    { value: 1, display: 'Inactive' },
    { value: 0, display: 'All' }
  ]

  comment = true
  ////////////////////////////////////////////////  bs
  getbs(pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getbs(pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        console.log("getbs", datas);
        let datapagination = results["pagination"];
        this.businesssegmentList = datas;
        if (this.businesssegmentList.length > 0) {
          this.has_nextbs = datapagination.has_next;
          this.has_previousbs = datapagination.has_previous;
          this.presentpagebs = datapagination.index;
        }
      })
  }


  nextClickbs() {
    if (this.has_nextbs === true) {
      this.getbs(this.presentpagebs + 1, 10)
    }
  }

  previousClickbs() {
    if (this.has_previousbs === true) {
      this.getbs(this.presentpagebs - 1, 10)
    }
  }

  BsSubmit() {
    this.getbs();
    this.ismakerCheckerButton = true;
    this.isBS = true;
    this.isBSForm = false;
  }
  BsCancel() {
    this.ismakerCheckerButton = true;
    this.isBS = true;
    this.isBSForm = false;
  }
  resetBS() {
    this.BSSearchForm.controls['no'].reset("")
    this.BSSearchForm.controls['name'].reset("")
    this.getbs();
  }
  BSSearch() {
    if (this.BSSearchForm.value.no === '' && this.BSSearchForm.value.name === '') {
      this.getbs();
      return
    }
    if (this.BSSearchForm.value.name === null && this.BSSearchForm.value.no === null) {
      this.getbs();
      return false
    }
    let no = this.BSSearchForm.value.no
    let name = this.BSSearchForm.value.name
    this.mastersErvice.getBssearch(no, name)
      .subscribe(result => {
        console.log("businesssegmentList search result", result)
        this.businesssegmentList = result['data']
      })
    if (this.BSSearchForm.value.no === '' && this.BSSearchForm.value.name === '') {
      this.getbs();
    }
  }
  getBranchbanksummary(page: any = 1) {
    this.mastersErvice.getbranchbanksummary(page).subscribe(data => {
      this.BranchbankList = data['data'];
      if (this.BranchbankList.length > 0) {
        let pagination = data['pagination'];
        this.has_previousbrbank = pagination['has_previous'];
        this.has_nextbrbank = pagination['has_next'];
        this.presentpagebrbank = pagination['index'];
      }
    })
  }
  deletebranchbank(id: any) {
    this.mastersErvice.branchbankDeleteForm(id).subscribe(result => {
      if (result['status'] == 'success') {
        this.notification.showSuccess(result['message']);
        this.getBranchbanksummary(this.presentpagebrbank);
      }
      else if (result['code'] == "UNEXPECTED_ERROR" || result['code'] == "INVALID_BANK_ID") {
        this.notification.showError(result['description'])
      }
    })
  }
  branchbankDeleteForm
  forInactivebs(data) {
    let datas = data.id
    let status: number = 0
    console.log('check id for data passing', datas)
    this.mastersErvice.activeInactivebs(datas, status)
      .subscribe((results: any[]) => {
        this.notification.showSuccess('Successfully InActivated!')
        this.getbs();
        return true
      })
    // alert('inactive')
  }
  foractivebs(data) {
    let datas = data.id
    let status: number = 1
    console.log('check id for data passing', datas)
    this.mastersErvice.activeInactivebs(datas, status)
      .subscribe((results: any[]) => {
        this.notification.showSuccess('Successfully Activated!')
        this.getbs();
        return true
      })
    // alert('active')
  }

  editbs(data) {

    this.editbss.patchValue({
      id: data.id,
      name: data.name,
      code: data.code,
      no: data.no
    })

  }
  editbssForm() {
    let data = this.editbss.value
    this.mastersErvice.BSCreateForm(data)
      .subscribe(res => {
        if (res.code === "INVALID_DATA" && res.description === "Invalid Data or DB Constraint") {
          this.notification.showError("[INVALID_DATA! ...]")
        }
        else if (res.code === "UNEXPECTED_ERROR" && res.description === "Duplicate Name") {
          this.notification.showWarning("Duplicate Data! ...")
        } else if (res.code === "UNEXPECTED_ERROR" && res.description === "Unexpected Internal Server Error") {
          this.notification.showError("INVALID_DATA!...")
        }
        else {
          this.notification.showSuccess("Updated Successfully!...")
        }
        this.getbs();
        console.table("BSFormeditsssssssssssss SUBMIT", res)
        return true
      })


  }
  omit_special_char(event) {
    var k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  ////////////////////////////////////////////////  CC


  getcc(pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getcc(pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        console.log("getcc", datas);
        let datapagination = results["pagination"];
        this.costcenterList = datas;
        if (this.costcenterList.length > 0) {
          this.has_nextcc = datapagination.has_next;
          this.has_previouscc = datapagination.has_previous;
          this.presentpagecc = datapagination.index;
        }
      })

  }


  nextClickcc() {
    if (this.has_nextcc === true) {
      this.getcc(this.presentpagecc + 1, 10)
    }
  }

  previousClickcc() {
    if (this.has_previouscc === true) {
      this.getcc(this.presentpagecc - 1, 10)
    }
  }

  CCSubmit() {
    this.getcc();
    this.ismakerCheckerButton = true;
    this.isCC = true;
    this.isCCform = false;
  }
  entitySubmit() {
    this.isEntity = true;
    this.isEntityEdit = false;
    this.isEntityForm = false;
  }
  entityCancel() {
    this.isEntity = true;
    this.isEntityEdit = false;
    this.isEntityForm = false;
  }
  CCCancel() {
    this.ismakerCheckerButton = true;
    this.isCC = true;
    this.isCCform = false;
  }
  resetCC() {
    this.CCSearchForm.controls['no'].reset("")
    this.CCSearchForm.controls['name'].reset("")
    this.getcc();
  }

  CCSearch() {
    if (this.CCSearchForm.value.no === '' && this.CCSearchForm.value.name === '') {
      this.getcc();
      return
    }
    if (this.CCSearchForm.value.name === null && this.CCSearchForm.value.no === null) {
      this.getcc();
      return false
    }
    let no = this.CCSearchForm.value.no
    let name = this.CCSearchForm.value.name
    this.mastersErvice.getCCsearch(no, name)
      .subscribe(result => {
        console.log("costcenterList search result", result)
        this.costcenterList = result['data']
      })
    if (this.CCSearchForm.value.no === '' && this.CCSearchForm.value.name === '') {
      this.getcc();
    }
  }
  forInactivecc(data) {
    let datas = data.id
    let status: number = 0
    console.log('check id for data passing', datas)
    this.mastersErvice.activeInactivecc(datas, status)
      .subscribe((results: any[]) => {
        this.notification.showSuccess('Successfully InActivated!')
        this.getcc();
        return true
      })
    // alert('inactive')
  }
  foractivecc(data) {
    let datas = data.id
    let status: number = 1
    console.log('check id for data passing', datas)
    this.mastersErvice.activeInactivecc(datas, status)
      .subscribe((results: any[]) => {
        this.notification.showSuccess('Successfully Activated!')
        this.getcc();
        return true
      })
    // alert('active')
  }

  forInactivegl(data) {
    let datas = data.id
    let status: number = 0
    console.log('check id for data passing', datas)
    this.mastersErvice.activeInactivegl(datas, status)
      .subscribe((results: any[]) => {
        this.notification.showSuccess('Successfully InActivated!')
        this.getGL();
        return true
      })
    // alert('inactive')
  }
  foractivegl(data) {
    let datas = data.id
    let status: number = 1
    console.log('check id for data passing', datas)
    this.mastersErvice.activeInactivegl(datas, status)
      .subscribe((results: any[]) => {
        this.notification.showSuccess('Successfully Activated!')
        this.getGL();
        return true
      })
    // alert('active')
  }
  //////////////////////////////////////////////////////////CCBS



  getccbs(pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getccBS(pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        console.log("getccBS", datas);
        let datapagination = results["pagination"];
        this.ccbsList = datas;
        if (this.ccbsList.length > 0) {
          this.has_nextccbs = datapagination.has_next;
          this.has_previousccbs = datapagination.has_previous;
          this.presentpageccbs = datapagination.index;
        }
      })

  }

  getPMD(pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getPMDServ(pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        console.log("getPMD", datas);
        let datapagination = results["pagination"];
        this.PDMList = datas;
        if (this.ccbsList.length > 0) {
          this.has_nextpmd = datapagination.has_next;
          this.has_previouspmd = datapagination.has_previous;
          this.presentpagepmd = datapagination.index;
        }
      })

  }

  nextClickccbs() {
    if (this.has_nextccbs === true) {
      this.getccbs(this.presentpageccbs + 1, 10)
    }
  }

  previousClickccbs() {
    if (this.has_previousccbs === true) {
      this.getccbs(this.presentpageccbs - 1, 10)
    }
  }

  CCBSSubmit() {
    this.getccbs();
    this.ismakerCheckerButton = true;
    this.isCCBS = true;
    this.isCCBSform = false;
  }
  CCBSCancel() {
    this.ismakerCheckerButton = true;
    this.isCCBS = true;
    this.isCCBSform = false;
  }
  resetCCBS() {
    this.CCBSSearchForm.controls['businesssegment_id'].reset("")
    this.CCBSSearchForm.controls['costcentre_id'].reset("")
    this.CCBSSearchForm.controls['name'].reset("")
    this.CCBSSearchForm.controls['no'].reset("")
    this.getccbs();
  }

  nextClickPMD() {
    if (this.has_nextccbs === true) {
      this.getPMD(this.presentpagepmd + 1, 10)
    }
  }

  previousClickPMD() {
    if (this.has_previousccbs === true) {
      this.getPMD(this.presentpagepmd - 1, 10)
    }
  }

  PMDSubmitCreate() {
    this.getPMD();
    this.ismakerCheckerButton = true;
    this.isPMD = false;
    this.isPMDForm = true;
  }
  PMDCancelCreate() {
    this.ismakerCheckerButton = true;
    this.isPMD = true;
    this.isPMDForm = false;
  }
  resetPMD() {
    this.PMDSearchForm.controls['branch_name'].reset("")
    this.PMDSearchForm.controls['location'].reset("")
    this.PMDSearchForm.controls['branch_code'].reset("")
    this.getPMD();
  }

  PMDSubmitEdit() {
    this.getPMD();
    this.ismakerCheckerButton = true;
    this.isPMD = false;
    this.isPMDForm = false;
    this.isPMDFormedit = true;
  }
  FinSubmit() {
    this.getfinsummarysearch(1);
    this.ismakerCheckerButton = true;
    this.isFin = true;
    this.isFinForm = false;
    this.isFinEdit = false;
  }
  FinQSubmit() {
    this.getfinsummarysearch(1);
    this.ismakerCheckerButton = true;
    this.isFinQ = true;
    this.isFinQForm = false;
    this.isFinQEdit = false;
  }
  PMDCancelEdit() {
    this.ismakerCheckerButton = true;
    this.isPMD = true;
    this.isPMDForm = false;
    this.isPMDFormedit = false;
  }
  fincancel() {
    this.ismakerCheckerButton = true;
    this.isFin = true;
    this.isFinForm = false;
    this.isFinEdit = false;
  }
  finQcancel() {
    this.ismakerCheckerButton = true;
    this.isFinQ = true;
    this.isFinQForm = false;
    this.isFinQEdit = false;
  }

  nextClickPDM() {
    if (this.has_nextpdm === true) {
      this.getPMD(this.presentpagepmd + 1, 10)
    }
  }

  previousClickPDM() {
    if (this.has_previouspdm === true) {
      this.getPMD(this.presentpagepmd - 1, 10)
    }
  }

  edit(d) {
    this.isPMDForm = false;
    this.isPMD = false;
    this.ismakerCheckerButton = false;
    this.isPMDFormedit = true;
  }

  PMDSearch() {

  }

  gledit(d) {
    this.glstatus = d
    this.getGL(this.glstatus)
  }

  getGL(pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getGLServ(pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        console.log("getPMD", datas);
        let datapagination = results["pagination"];
        this.GLList = datas;
        if (this.GLList.length > 0) {
          this.has_nextgl = datapagination.has_next;
          this.has_previousgl = datapagination.has_previous;
          this.presentpagegl = datapagination.index;
        }
      })

  }

  getGLList(pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getGLListServ(pageNumber, pageSize, this.glstatus)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        console.log("getPMD", datas);
        let datapagination = results["pagination"];
        this.GLList = datas;
        if (this.GLList.length > 0) {
          this.has_nextgl = datapagination.has_next;
          this.has_previousgl = datapagination.has_previous;
          this.presentpagegl = datapagination.index;
        }
      })

  }

  nextClickGL() {
    if (this.has_nextgl === true) {
      this.getGL(this.presentpagegl + 1, 10)
    }
  }

  previousClickGL() {
    if (this.has_previousgl === true) {
      this.getGL(this.presentpagegl - 1, 10)
    }
  }

  GLSearch() {

  }

  autocompletebsScroll() {
    setTimeout(() => {
      if (
        this.matbsAutocomplete &&
        this.autocompleteTrigger &&
        this.matbsAutocomplete.panel
      ) {
        fromEvent(this.matbsAutocomplete.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matbsAutocomplete.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matbsAutocomplete.panel.nativeElement.scrollTop;
            const scrollHeight = this.matbsAutocomplete.panel.nativeElement.scrollHeight;
            const elementHeight = this.matbsAutocomplete.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_next === true) {
                this.mastersErvice.getbsFKdd(this.bsInput.nativeElement.value, this.currentpage + 1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.bsList = this.bsList.concat(datas);
                    // console.log("emp", datas)
                    if (this.bsList.length >= 0) {
                      this.has_next = datapagination.has_next;
                      this.has_previous = datapagination.has_previous;
                      this.currentpage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  autocompleteDeptScrollpay() {
    setTimeout(() => {
      if (
        this.matPay &&
        this.autocompleteTrigger &&
        this.matPay.panel
      ) {
        fromEvent(this.matPay.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matPay.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matPay.panel.nativeElement.scrollTop;
            const scrollHeight = this.matPay.panel.nativeElement.scrollHeight;
            const elementHeight = this.matPay.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_paynxt === true) {
                this.mastersErvice.getemppaydropdown(this.payInput.nativeElement.value, this.has_paypage + 1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.emppaycodelist = this.emppaycodelist.concat(datas);
                    if (this.emppaycodelist.length >= 0) {
                      this.has_paynxt = datapagination.has_next;
                      this.has_paypre = datapagination.has_previous;
                      this.has_paypage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });

  }
  autocompleteDeptScrollBank() {
    setTimeout(() => {
      if (
        this.matBank &&
        this.autocompleteTrigger &&
        this.matBank.panel
      ) {
        fromEvent(this.matBank.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matBank.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matBank.panel.nativeElement.scrollTop;
            const scrollHeight = this.matBank.panel.nativeElement.scrollHeight;
            const elementHeight = this.matBank.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_banknxt === true) {
                this.mastersErvice.getempbankdropdown(this.bankInput, this.has_bankpage + 1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.banknamelist = this.banknamelist.concat(datas);
                    if (this.banknamelist.length >= 0) {
                      this.has_banknxt = datapagination.has_next;
                      this.has_bankpre = datapagination.has_previous;
                      this.has_bankpage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });

  }
  autocompleteDeptScrollBranch() {
    setTimeout(() => {
      if (
        this.matBranch &&
        this.autocompleteTrigger &&
        this.matBranch.panel
      ) {
        fromEvent(this.matBranch.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matBranch.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matBranch.panel.nativeElement.scrollTop;
            const scrollHeight = this.matBranch.panel.nativeElement.scrollHeight;
            const elementHeight = this.matBranch.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_branchnxt === true) {
                this.mastersErvice.getempbranchdropdown(this.branchbankForm.get('bankname').value.id, this.branchInput.nativeElement.value, this.has_branchpage + 1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.branchnamelist = this.branchnamelist.concat(datas);
                    if (this.branchnamelist.length >= 0) {
                      this.has_branchnxt = datapagination.has_next;
                      this.has_branchpre = datapagination.has_previous;
                      this.has_branchpage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });

  }

  public displayFnbs(bs?: bslistss): string | undefined {
    return bs ? bs.name : undefined;
  }

  get bs() {
    return this.CCBSSearchForm.get('businesssegment_id');
  }

  private getbsDD(bskeyvalue) {
    this.mastersErvice.getbsvalue(bskeyvalue)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.bsList = datas;
      })
  }








  //////////////////////////////////////////cc

  autocompleteccScroll() {
    setTimeout(() => {
      if (
        this.matccAutocomplete &&
        this.autocompleteTrigger &&
        this.matccAutocomplete.panel
      ) {
        fromEvent(this.matccAutocomplete.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matccAutocomplete.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matccAutocomplete.panel.nativeElement.scrollTop;
            const scrollHeight = this.matccAutocomplete.panel.nativeElement.scrollHeight;
            const elementHeight = this.matccAutocomplete.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_next === true) {
                this.mastersErvice.getccFKdd(this.ccInput.nativeElement.value, this.currentpage + 1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.ccList = this.ccList.concat(datas);
                    if (this.ccList.length >= 0) {
                      this.has_next = datapagination.has_next;
                      this.has_previous = datapagination.has_previous;
                      this.currentpage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }

  public displayFncc(cc?: cclistss): string | undefined {
    return cc ? cc.name : undefined;
  }

  get cc() {
    return this.CCBSSearchForm.get('costcentre_id');
  }

  private getccDD(cckeyvalue) {
    this.mastersErvice.getccvalue(cckeyvalue)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.ccList = datas;
      })
  }

  createFormateccbs() {
    let data = this.CCBSSearchForm.controls;
    let ccbsSearchclass = new ccbsSearchtype();
    ccbsSearchclass.businesssegment_id = data['businesssegment_id'].value.id;
    ccbsSearchclass.costcentre_id = data['costcentre_id'].value.id;
    ccbsSearchclass.name = data['name'].value;
    ccbsSearchclass.no = data['no'].value;
    console.log("ccbsSearchclass", ccbsSearchclass)
    return ccbsSearchclass;
  }

  CCBSSearch() {
    let search = this.createFormateccbs();
    console.log(search);
    for (let i in search) {
      if (!search[i]) {
        delete search[i];
      }
    }

    //let data = this.CCBSSearchForm.value
    this.mastersErvice.getCCBSsearch(search)
      .subscribe(result => {
        console.log("ccbsList search result", result)
        this.ccbsList = result['data']
      })
    if (this.CCBSSearchForm.value.businesssegment_id === '' && this.CCBSSearchForm.value.costcentre_id === '' && this.CCBSSearchForm.value.name === '' && this.CCBSSearchForm.value.no === '') {
      this.getccbs();
    }
  }

  createFormatePMD() {
    let data = this.PMDSearchForm.controls;
    let ccbsSearchclass = new ccbsSearchtype();
    ccbsSearchclass.businesssegment_id = data['businesssegment_id'].value.id;
    ccbsSearchclass.costcentre_id = data['costcentre_id'].value.id;
    ccbsSearchclass.name = data['name'].value;
    ccbsSearchclass.no = data['no'].value;
    console.log("ccbsSearchclass", ccbsSearchclass)
    return ccbsSearchclass;
  }
  bsInactivelist(pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getbsInactivelist(pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        let datapagination = results["pagination"];
        this.businesssegmentList = datas;
        if (this.businesssegmentList.length >= 0) {
          this.has_nextbs = datapagination.has_next;
          this.has_previousbs = datapagination.has_previous;
          this.presentpagebs = datapagination.index;
        }
      })
  }



  bsactivelist(pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getbsactivelist(pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        let datapagination = results["pagination"];
        this.businesssegmentList = datas;
        if (this.businesssegmentList.length >= 0) {
          this.has_nextbs = datapagination.has_next;
          this.has_previousbs = datapagination.has_previous;
          this.presentpagebs = datapagination.index;
        }
      })
  }



  ccInactivelist(pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getccInactivelist(pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        let datapagination = results["pagination"];
        this.costcenterList = datas;
        if (this.costcenterList.length >= 0) {
          this.has_nextcc = datapagination.has_next;
          this.has_previouscc = datapagination.has_previous;
          this.presentpagecc = datapagination.index;
        }
      })
  }

  has_pre: boolean = false;
  presentPage: number = 1;
  ccactivelist(pageNumber = 1, pageSize = 10) {
    this.mastersErvice.getccactivelist(pageNumber, pageSize)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        let datapagination = results["pagination"];
        this.costcenterList = datas;
        if (this.costcenterList.length >= 0) {
          this.has_nextcc = datapagination.has_next;
          this.has_previouscc = datapagination.has_previous;
          this.presentpagecc = datapagination.index;
        }
      })
  }

  getcitydata(data: any) {
    // if(e=='yes'){
    this.datadistrictid = data.id;
    for (let i = 0; i < this.cityList.length; i++) {
      if (data.id == this.cityList[i].id) {
        this.cityList[i]['con'] = !this.cityList[i]['con'];
      }
      else {
        this.cityList[i]['con'] = false;
      }
    }
    this.mastersErvice.getsummarydistrict(data.id, this.dispage).subscribe(dta => {
      this.citysummarydata = dta['data'];
      let pagination = dta['pagination'];
      this.has_next = pagination.has_next;
      this.has_pre = pagination.has_previous;
      this.dispage = pagination.index;
      console.log(this.citysummarydata);
      for (let i = 0; i < this.citysummarydata.length; i++) {
        this.citysummarydata[i]['con'] = false;
      }
      console.log(this.citysummarydata);
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    )
    // }
    // else{
    //   for(let i=0;i<this.cityList.length;i++){
    //     if(data.id==this.cityList[i].id){
    //       this.cityList[i]['con']=!this.cityList[i]['con'];
    //     }
    //     else{
    //       this.cityList[i]['con']=false;
    //     }
    //   }
    // }

  }
  has_nextdistrict() {
    if (this.has_next) {
      this.mastersErvice.getsummarydistrict(this.datadistrictid, this.dispage + 1).subscribe(dta => {
        this.citysummarydata = dta['data'];
        let pagination = dta['pagination'];
        this.has_next = pagination.has_next;
        this.has_pre = pagination.has_previous;
        this.dispage = pagination.index;
        console.log(this.citysummarydata);
        for (let i = 0; i < this.citysummarydata.length; i++) {
          this.citysummarydata[i]['con'] = false;
        }
        console.log(this.citysummarydata);
      },
        (error) => {
          this.notification.showError(error.status + error.statusText);
        }
      )
    }
  }
  has_predisrict() {
    if (this.has_pre) {
      this.mastersErvice.getsummarydistrict(this.datadistrictid, this.dispage - 1).subscribe(dta => {
        this.citysummarydata = dta['data'];
        let pagination = dta['pagination'];
        this.has_next = pagination.has_next;
        this.has_pre = pagination.has_previous;
        this.dispage = pagination.index;
        console.log(this.citysummarydata);
        for (let i = 0; i < this.citysummarydata.length; i++) {
          this.citysummarydata[i]['con'] = false;
        }
        console.log(this.citysummarydata);
      },
        (error) => {
          this.notification.showError(error.status + error.statusText);
        }
      )

    }
  }
  getdistrictcitydata(data: any) {
    // if(e=='yes'){
    this.datacityid = data.id;
    for (let i = 0; i < this.citysummarydata.length; i++) {
      if (data.id == this.citysummarydata[i].id) {
        this.citysummarydata[i]['con'] = true;
      }
      else {
        this.citysummarydata[i]['con'] = false;
      }
    }
    this.mastersErvice.getsummarycity(data.id, this.dispage).subscribe(dta => {
      this.districtsummaryData = dta['data'];
      let pagination = dta['pagination'];
      this.has_nexts = pagination.has_next;
      this.has_prese = pagination.has_previous;
      this.citypage = pagination.index;
      for (let i = 0; i < this.districtsummaryData.length; i++) {
        this.districtsummaryData[i]['con'] = false;
      }
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    );
    // }
    // else{
    //   for(let i=0;i<this.citysummarydata.length;i++){
    //     if(data.id==this.citysummarydata[i].id){
    //       this.citysummarydata[i]['con']=true;
    //     }
    //     else{
    //       this.citysummarydata[i]['con']=false;
    //     }
    //   }
    // }
  }
  has_citynext() {
    if (this.has_nexts) {
      this.mastersErvice.getsummarycity(this.datacityid, this.citypage + 1).subscribe(dta => {
        this.districtsummaryData = dta['data'];
        let pagination = dta['pagination'];
        this.has_nexts = pagination.has_next;
        this.has_prese = pagination.has_previous;
        this.citypage = pagination.index;
        for (let i = 0; i < this.districtsummaryData.length; i++) {
          this.districtsummaryData[i]['con'] = false;
        }
      },
        (error) => {
          this.notification.showError(error.status + error.statusText);
        }
      );
    }
  }
  getpayadata() {
    let d: any;
    if (this.branchbankForm.get('paymode').value == null || this.branchbankForm.get('paymode').value == undefined || this.branchbankForm.get('paymode').value == '' || this.branchbankForm.get('paymode').value == "") {
      d = '';
    }
    else {
      d = this.branchbankForm.get('paymode').value;
    }
    this.mastersErvice.getemppaydropdown(d, 1).subscribe(data => {
      this.emppaycodelist = data['data'];
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    );
  }
  keypressnodigit(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 64 || charCode > 123)) {
      return false;
    }
    return true;
  }
  getbankdata() {
    let d: any;
    if (this.branchbankForm.get('bankname').value == null || this.branchbankForm.get('bankname').value == undefined || this.branchbankForm.get('bankname').value == '' || this.branchbankForm.get('bankname').value == "") {
      d = '';
    }
    else {
      d = this.branchbankForm.get('bankname').value;
    }
    this.mastersErvice.getempbankdropdown(d, 1).subscribe(data => {
      this.banknamelist = data['data'];
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    );
  }
  getbranchdata() {
    if (this.branchbankForm.get('bankname').value.id == undefined || this.branchbankForm.get('bankname').value == '' || this.branchbankForm.get('bankname').value == null) {
      this.notification.showError('Plaese Select The Bank Name');
      return false;
    }
    let d: any;
    if (this.branchbankForm.get('branchname').value == null || this.branchbankForm.get('branchname').value == undefined || this.branchbankForm.get('branchname').value == '' || this.branchbankForm.get('branchname').value == "") {
      d = '';
    }
    else {
      d = this.branchbankForm.get('branchname').value;
    }
    this.mastersErvice.getempbranchdropdown(this.branchbankForm.get('bankname').value.id, d, 1).subscribe(data => {
      this.branchnamelist = data['data'];
    },
      (error) => {
        this.notification.showError(error.status + error.statusText);
      }
    );
  }
  keypressnodigitbranch(event: any) {
    const charCodebranch = (event.which) ? event.which : event.keyCode;
    if (charCodebranch > 31 && (charCodebranch < 48 || charCodebranch > 57) && (charCodebranch < 64 || charCodebranch > 123)) {
      if (charCodebranch == 127 || charCodebranch == 32 || charCodebranch == 8) {
        // this.ifsccode='';
      }
      return false;
    }
    else if (charCodebranch == 127 || charCodebranch == 32 || charCodebranch == 8) {
      // this.ifsccode='';
    }
    return true;
  }
  keypressd(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 64 || charCode == 94 || charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 58 || charCode > 126)) {
      return false;
    }
    return true;
  }
  keypressdd(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 64 || charCode == 94 || charCode > 32 && (charCode < 48 || charCode > 57) && (charCode < 58 || charCode > 123)) {
      return false;
    }
    return true;
  }
  has_citypre() {
    if (this.has_prese) {
      this.mastersErvice.getsummarycity(this.datacityid, this.citypage - 1).subscribe(dta => {
        this.districtsummaryData = dta['data'];
        let pagination = dta['pagination'];
        this.has_nexts = pagination.has_next;
        this.has_prese = pagination.has_previous;
        this.citypage = pagination.index;
        for (let i = 0; i < this.districtsummaryData.length; i++) {
          this.districtsummaryData[i]['con'] = false;
        }
      },
        (error) => {
          this.notification.showError(error.status + error.statusText);
        }
      );
    }
  }
  paginationbrbank(num) {
    if (num == 1) {
      this.brbanksummarysearch(this.presentpagebrbank - 1, 5);
    }
    else {
      this.brbanksummarysearch(this.presentpagebrbank + 1, 5);
    }

  }
  empactiveinactive(data: any) {
    let d: any = { 'id': data.id, 'status': data.status };
    this.mastersErvice.empactiveinactive(d).subscribe(result => {
      if (result['status'] == 'success') {
        this.notification.showSuccess(result['message']);
      }
      else {
        this.notification.showError(result['code']);
        this.notification.showError(result['description']);
      }
    })
  }
  ifsc(data) {
  }
  resetbranchbank() {
    this.branchbankForm.reset('');
    this.getBranchbanksummary(1);
  }
  tocobremp:number=0
totalcountbremp(){
 this.tocobremp=1
}
  sortOrderempb:any;
  empbclr:boolean=false;
  empbclr1:boolean=false;
  getempbranchdatalist(page=1){
    this.tocoempb=0;
    if (this.empbclr == true){
      this.empbclr=true;
    }
    else if(this.empbclr1 == true){
      this.empbclr1=true;
    }
    else{
      this.empbclr=true;
      this.empbclr1=false;
    }
    let d:any=page;
    if(this.empbranchform.get('code').value !=undefined && this.empbranchform.get('code').value !='' && this.empbranchform.get('code').value !=""){
      d=d+'&code='+this.empbranchform.get('code').value;
    }
    if(this.empbranchform.get('name').value !=undefined && this.empbranchform.get('name').value !='' && this.empbranchform.get('name').value !=""){
      d=d+'&name='+this.empbranchform.get('name').value;
    }
    if(this.empbranchform.get('drop').value !=undefined && this.empbranchform.get('drop').value !='' && this.empbranchform.get('drop').value !=""){
      d=d+'&status='+this.drpdwn[this.empbranchform.get('drop').value?this.empbranchform.get('drop').value:'ALL'];
    }
    if(this.sortOrderempb!=undefined && this.sortOrderempb!=null && this.sortOrderempb!=''){
      this.sortOrderempb=this.sortOrderempb;
    }
    else{
      this.sortOrderempb='asce';
    }
    this.SpinnerService.show();
    this.mastersErvice.getempbranchsummarydata(d,this.sortOrderempb).subscribe(datas=>{
      this.SpinnerService.hide();
      this.empbranchData=datas['data'];
      let pagination=datas['pagination'];
      this.empbranchnext=pagination.has_next;
      this.empbranchprevious=pagination.has_previous;
      this.empbranchpage=pagination.index;
    },
    (error)=>{
      this.SpinnerService.hide();
      this.empbranchData=[];
    }
    );
  }

  getempbranchdata(){
    this.tocoempb=0;
    if (this.empbclr == true){
      this.empbclr=true;
    }
    else if(this.empbclr1 == true){
      this.empbclr1=true;
    }
    else{
      this.empbclr=true;
      this.empbclr1=false;
    }
    let d:any=this.empbranchpage;
    if(this.empbranchform.get('code').value !=undefined && this.empbranchform.get('code').value !='' && this.empbranchform.get('code').value !=""){
      d=d+'&code='+this.empbranchform.get('code').value;
    }
    if(this.empbranchform.get('name').value !=undefined && this.empbranchform.get('name').value !='' && this.empbranchform.get('name').value !=""){
      d=d+'&name='+this.empbranchform.get('name').value;
    }
    if(this.empbranchform.get('drop').value !=undefined && this.empbranchform.get('drop').value !='' && this.empbranchform.get('drop').value !=""){
      d=d+'&status='+this.drpdwn[this.empbranchform.get('drop').value?this.empbranchform.get('drop').value:'ALL'];
    }
    if(this.sortOrderempb!=undefined && this.sortOrderempb!=null && this.sortOrderempb!=''){
      this.sortOrderempb=this.sortOrderempb;
    }
    else{
      this.sortOrderempb='asce';
    }
    this.SpinnerService.show();
    this.mastersErvice.getempbranchsummarydata(d,this.sortOrderempb).subscribe(datas=>{
      this.SpinnerService.hide();
      this.empbranchData=datas['data'];

      let pagination=datas['pagination'];
      this.empbranchnext=pagination.has_next;
      this.empbranchprevious=pagination.has_previous;
      this.empbranchpage=pagination.index;
    },
    (error)=>{
      this.SpinnerService.hide();
      this.empbranchData=[];
    }
    );
  }
    tocoempb:number=0
    totalcountempb(){
    this.tocoempb=1
}
getempbascdes(data,num){
  this.SpinnerService.show();
  this.sortOrderempb=data
  this.tocoempb=0;
  if (num==1){
    this.empbclr=true;
    this.empbclr1=false;
  }
  if (num==2){
    this.empbclr=false;
  this.empbclr1=true;
  }
  let d:any=1;
  if(this.empbranchform.get('code').value !=undefined && this.empbranchform.get('code').value !='' && this.empbranchform.get('code').value !=""){
    d=d+'&code='+this.empbranchform.get('code').value;
  }
  if(this.empbranchform.get('name').value !=undefined && this.empbranchform.get('name').value !='' && this.empbranchform.get('name').value !=""){
    d=d+'&name='+this.empbranchform.get('name').value;
  }
  if(this.empbranchform.get('drop').value !=undefined && this.empbranchform.get('drop').value !='' && this.empbranchform.get('drop').value !=""){
    d=d+'&status='+this.drpdwn[this.empbranchform.get('drop').value?this.empbranchform.get('drop').value:'ALL'];
  }
  this.mastersErvice.getempbranchsummarydata(d,this.sortOrderempb).subscribe(datas=>{
    this.SpinnerService.hide();
    this.empbranchData=datas['data'];
    let pagination=datas['pagination'];
    this.empbranchnext=pagination.has_next;
    this.empbranchprevious=pagination.has_previous;
    this.empbranchpage=pagination.index;
  },
  (error)=>{
    this.SpinnerService.hide();
    this.empbranchData=[];
  }
  );
}
branch_id:any;
getbranch_emp_data(id:any,page=1){
  this.branch_id=id;
  this.SpinnerService.show();
  this.mastersErvice.getbranchemployee(id,page).subscribe(data=>{
    this.SpinnerService.hide();
    this.branch_emp_Data=data['data'];
    if (this.branch_emp_Data.length>0){
      let pagination=data['pagination'];
      this.branchempprevious=pagination.has_previous;
      this.branchempnext=pagination.has_next;
      this.branchemppage=pagination.index;
    }
  },(error)=>{
    this.SpinnerService.hide();
  })
}
   
  empbranchreset(){
    this.empbranchform.reset('');
    this.getempbranchdata();
  }
  addempbranchForm(){}
  getempbranchdatasearch(){
    let d:any='page='+this.empbranchpage;
    if(this.empbranchform.get('code').value !=undefined && this.empbranchform.get('code').value !='' && this.empbranchform.get('code').value !=""){
      d=d+'&code='+this.empbranchform.get('code').value;
    }
    if(this.empbranchform.get('name').value !=undefined && this.empbranchform.get('name').value !='' && this.empbranchform.get('name').value !=""){
      d=d+'&name='+this.empbranchform.get('name').value;
    }
    // if(this.empbranchform.get('drop').value !=undefined && this.empbranchform.get('drop').value !='' && this.empbranchform.get('drop').value !=""){
    //   d=d+'&status='+this.drpdwn[this.empbranchform.get('drop').value?this.empbranchform.get('drop').value:'ALL'];
    // }
    if (this.empbranchform.get('code').value=="" && this.empbranchform.get('name').value==""){
      this.notification.showError("Please Select Any One Field");
      return false;
    }
    this.SpinnerService.show();
    // let status:any=this.drpdwn[this.hsnform.value.drop?this.hsnform.value.drop:'ALL'];
    // this.spinner.show();
    // this.atmaService.hsnsearch(this.hsnform.value.hsn,hsnpresentpagepro,status)
    this.mastersErvice.getempbranchsummarysearch(d).subscribe(datas=>{
      this.SpinnerService.hide();
      this.empbranchData=datas['data'];
      let pagination=datas['pagination'];
      if (this.empbranchData.length >= 0) {
        this.empbranchnext = pagination.has_next;
        this.empbranchprevious = pagination.has_previous;
        this.empbranchpage = pagination.index;
      }
      if (this.empbranchnext == true) {
        this.empbranchnext = true;
      }
      if (this.empbranchprevious == true) {
        this.empbranchprevious = true;
      }
    },
    (error)=>{
      this.SpinnerService.hide();
      this.empbranchData=[];
    }
    );
  }
  getempbranchdownload(){
    if(this.first==true){
      this.notification.showWarning('Already Running')
      return true
    }
    this.first=true;
    this.mastersErvice.getempbranchDoenload()
    .subscribe(fullXLS=>{
      console.log(fullXLS);
      let binaryData = [];
      binaryData.push(fullXLS)
      let downloadUrl = window.URL.createObjectURL(new Blob(binaryData));
      let link = document.createElement('a');
      link.href = downloadUrl;
      let date: Date = new Date();
      link.download = 'Employee Branch'+ date +".xlsx";
      link.click();
      this.first = false;
      this.notification.showSuccess('Download Successfully...')
    },
    (error)=>{
      this.first=false;
      this.notification.showWarning(error.status+error.statusText)
    })
  }
  empbranchactiveinactive(data:any){
    let d:any={'id':data.id,'status':data.status};
    this.mastersErvice.getempbranchlactive(d).subscribe(res=>{
      if(res['status']=='success'){
        this.notification.showSuccess(res['message']);
        this.getempbranchdata();
      }
      else{
        this.notification.showError(res['code']);
        this.notification.showError(res['description']);
      }
    },
    (error)=>{
      this.notification.showError(error.status+error.statusText);
    }
    )
  }
  viewmasterbranchdata(data:any,num:number){
    // this.getempview(data);
    this.SpinnerService.show();
    // this.isEmpbranch=false;
    // this.isbranchempdata=false;
    // this.isEmpbranchview=true;
    let id =data['id']
    this.mastersErvice.getempbranchviewdata(id).subscribe(datas=>{
    console.log(datas);
    this.empviewdata=datas;
    this.isEmpbranch=false;
    this.isbranchempdata=false;
    this.isEmpbranchview=true;
    this.shareService.branchview.next(this.empviewdata);
    },
    (error)=>{
      this.SpinnerService.hide();
    }
    );
    // this.shareService.branchmstid.next(data['id']);
    // this.shareService.branchview.next(this.empviewdata);
    this.SpinnerService.hide();
  }
  branch_emp_data(data:any){
    this.isEmpbranch=false;
    this.isbranchempdata=true;
    this.getbranch_emp_data(data['id'],1);
  }
  empsbranchnext(){
    if(this.empbranchnext){
      this.getempbranchdatalist(this.empbranchpage +=1);
      this.tocoempb=0;
    }
  }
  empsbranchprevious(){
    if(this.empbranchprevious){
      this.getempbranchdatalist(this.empbranchpage -=1);
      this.tocoempb=0;
    }
  }
  exit_branch_emp(){
    this.isbranchempdata=false;
    this.isEmpbranch=true;
    this.isEmpbranchview=false;
    this.getempbranchdata();
  }
  branchemppagination(num){
    if (num==1){
      this.getbranch_emp_data(this.branch_id,this.branchemppage-1);
    }
    else{
      this.getbranch_emp_data(this.branch_id,this.branchemppage+1);
    }
  }
  BSCCMapping(page,data){
    this.SpinnerService.show();
    this.mastersErvice.BSCCMappingSum(page,data).subscribe(res=>{
      this.SpinnerService.hide();
      if(res['code']){
        this.notification.showError(res['description'])
      }else{
        this.bsccmapList=res['data']
        if(this.bsccmapList.length > 0){
          let pagination=res['pagination']
          this.has_previousbc=pagination.has_previous
          this. has_nextbc=pagination.has_next
          this.presentpagebc=pagination.index
        }
      }
    })

  }
  EmptypeMapping(page,data){
    this.SpinnerService.show();
    this.mastersErvice.EmptypeMappingSum(page,data).subscribe(res=>{
      this.SpinnerService.hide();
      if(res['code']){
        this.notification.showError(res['description'])
      }else{
        this.emptype_mapList=res['data']
        if(this.emptype_mapList.length > 0){
          let pagination=res['pagination']
          this.has_previousem=pagination.has_previous
          this. has_nextem=pagination.has_next
          this.presentpageemp=pagination.index
        }
      }
    })


  }
  emptypeMapcreateCancel(){
    this.isEmptypeMapping=true;
    this.isEmptypeMapcreate=false;
    this.EmptypeMapping(1,'')
    this.EmptypeMappingForm.reset();



  }
  previousClickem(){
    if(this.has_nextem==true){
      this.presentpageemp -=1
      this.EmptypeMapping(this.presentpageemp,'')
    }

  }
  nextClickem(){
    if(this.has_previousem==true){
      this.presentpageemp +=1
      this.EmptypeMapping(this.presentpageemp,'')
    }

  }


  bsccMapcreateCancel(){
    this.isBSCCMapcreate = false;
    this.isBSCCMapping=true;
    this.BSCCMapping(1,'')
    this.BSCCMappingForm.reset();

  }
  previousClickbc(){
    if(this.has_previousbc==true){
      this.presentpagebc -=1
      this.BSCCMapping(this.presentpagebc,'')
    }

  }
  nextClickbc(){
    if(this.has_nextbc==true){
      this.presentpagebc +=1
      this.BSCCMapping(this.presentpagebc,'')
    }

  }
  public displayFnemp(emp?: Emplistss): string | undefined {
    return emp ? emp.full_name : undefined;
  }
  getemployeeFK(empkeyvalue){
    this.SpinnerService.show();
    this.mastersErvice.getemployeeFK(empkeyvalue)
        .subscribe((results: any[]) => {
          this.SpinnerService.hide();
          let datas = results["data"];
          this.employeenameList = datas;
          let datapagination = results["pagination"];
          if (this.employeenameList.length >= 0) {
            this.has_nextemp = datapagination.has_next;
            this.has_previousemp = datapagination.has_previous;
            this.currentpageemp = datapagination.index;
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
              if (this.has_nextemp === true) {
                this.mastersErvice.getemployeeFKdd(this.empInput.nativeElement.value, this.currentpage + 1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.employeenameList = this.employeenameList.concat(datas);
                    if (this.employeenameList.length >= 0) {
                      this.has_nextemp = datapagination.has_next;
                      this.has_previousemp = datapagination.has_previous;
                      this.currentpageemp = datapagination.index;
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
  prsearch() {
    this.master2.getproductpage(1, 10, this.prform.value.name)
      .subscribe((results: any[]) => {
        let datapagination = results["pagination"];
        this.productlist = results["data"];;
        if (this.productlist.length >= 0) {
          this.has_nextpro = datapagination.has_next;
          this.has_previouspro = datapagination.has_previous;
          this.presentpagepro = datapagination.index;
        }
      })

  }
  employesnameView(page,hint){
 if(hint=="bscc"){
  let emp_id=this.BSCCMappingForm.get('employee_id').value.id
  if(!emp_id){
    this.notification.showWarning('Please select Employee Name')
    return false;
  }
  console.log(emp_id)
  this.BSCCMapping(page,emp_id)

 }else if(hint=="emptype"){
  let emp_id=this.EmptypeMappingForm.get('employee_id').value.id
  if(!emp_id){
    this.notification.showWarning('Please select Employee Name')
    return false;
  }
  this.EmptypeMapping(page,emp_id)

 }
 else if(hint=="role"){
  let emp_id=this.roleMappingForm.get('employee_id').value.id
  if(!emp_id){
    this.notification.showWarning('Please select Employee Name')
    return false;
  }
  this.roleMappingsum(page,emp_id)

 }
 else if(hint=="rm"){
  let emp_id=this.rmMappingForm.get('employee_id').value.id
  if(!emp_id){
    this.notification.showWarning('Please select Employee Name')
    return false;
  }
  this.rmMappingsum(page,emp_id)

 }
 
  }
  
  roleMappingsum(page,data){
    this.SpinnerService.show();
    this.mastersErvice.roleMappingSum(page,data).subscribe(res=>{
      this.SpinnerService.hide();
      if(res['code']){
        this.notification.showError(res['description'])
      }else{
        this.roleList=res['data']
        if(this.rmList.length > 0){
          let pagination=res['pagination']
          this.has_previousrl=pagination.has_previous
          this. has_nextrl=pagination.has_next
          this.presentpagerl=pagination.index
        }
      }
    })
  
  
  }
  rmMappingsum(page,data){
    this.SpinnerService.show();
    this.mastersErvice.rmMappingSum(page,data).subscribe(res=>{
      this.SpinnerService.hide();
      if(res['code']){
        this.notification.showError(res['description'])
      }else{
        this.rmList=res['data']
        if(this.rmList.length > 0){
          let pagination=res['pagination']
          this.has_previousrm=pagination.has_previous
          this. has_nextrm=pagination.has_next
          this.presentpagerm=pagination.index
        }
      }
    })
  }
  previousClickrl(){
    if(this.has_previousrl==true){
      this.presentpagerl -=1
      this.roleMappingsum(this.presentpagerl,'')
    }

  }
  nextClickrl(){
    if(this.has_previousrl==true){
      this.presentpagerl +=1
      this.roleMappingsum(this.presentpagerl,'')
    }

  }
  previousClickrm(){
    if(this.has_previousrm==true){
      this.presentpagerm -=1
      this.rmMappingsum(this.presentpagerm,'')
    }

  }
  nextClickrm(){
    if(this.has_nextrm==true){
      this.presentpagerm -=1
      this.rmMappingsum(this.presentpagerm,'')
    }

  }
  rmCreateCancel(){
    this.rmsummary=true;
    this.rmmapcreaet=false;
    this.rmMappingForm.reset();
    this.rmMappingsum(1,'')


  }
  roleCreateCancel(){
    this.rolesummary=true;
    this.rolemapcreate=false;
    this.roleMappingForm.reset()
    this.roleMappingsum(1,'')


  }
  pass_pol(){
    this.passpolicy=true;
    this.isEmployee=false;
  }



}
class ccbsSearchtype {
  costcentre_id: any;
  businesssegment_id: any;
  name: string;
  no: string;
}

class PMDSearchtype {
  branch_code: any;
  branch_name: any;
  location: string;
}

