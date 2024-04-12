import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  TokenRefreshintervalId: any;
  isLoggedin = false;
  isSideNav =false;
  Loginname = '';
  Memofrom = '';
  loginUserId = '';
  loginEmpId = '';
  MyModuleName = '';
  transactionList = [];
  Mastersubmodule:any=[];
  passVal:any=[]
  status:number;

  masterList = [];
  // get_userlocation:any;

  menuUrlData: Array<any>;
  titleUrl: any;

  public forwardMessage = new BehaviorSubject<string>('');
  public summaryData = new BehaviorSubject<string>('');
  public fetchData = new BehaviorSubject<string>('')
  public imageValue = new BehaviorSubject<any>('')
  public get_userlocation = new BehaviorSubject<any>(' ');
  public fetchDataa = new BehaviorSubject<string>('')
  public deptEditValue = new BehaviorSubject<string>('');
  public categoryEditValue = new BehaviorSubject<string>('');
  public BranchbankEditValue = new BehaviorSubject<string>('');
  public subCategoryEditValue = new BehaviorSubject<string>('');
  public employeeView = new BehaviorSubject<string>('');
  public departmentView = new BehaviorSubject<string>('');
  public empView = new BehaviorSubject<string>(' ');
  public empname = new BehaviorSubject<string>(' ');
  public vendorViewHeaderName = new BehaviorSubject<string>(' ');
  public branchView = new BehaviorSubject<string>(' ');
  public premiseBackNavigation = new BehaviorSubject<any>(null);


  public priorityEditValue = new BehaviorSubject<string>(' ');
  public ionName = new BehaviorSubject<string>('');
  public branchreadonly = new BehaviorSubject<number>(0);
  // public menuUrlData = new BehaviorSubject<any>('');
  // public titleUrls = new BehaviorSubject<any>('');
  public subCategoryID = new BehaviorSubject<any>('');
  public memoView = new BehaviorSubject<any>('');
  public memoViews = new BehaviorSubject<any>('');
  public submodulesfa = new BehaviorSubject<any>('')
  public submodulestneb = new BehaviorSubject<any>('')
  public submodulessms = new BehaviorSubject<any>('');
  public submodulessmsmaster = new BehaviorSubject<any>('');
  public commonsummary = new BehaviorSubject<any>('');
  public CSRFToken = new BehaviorSubject<any>('');
  
  public submodulesreport = new BehaviorSubject<any>('');

  public Csrfcookie = new BehaviorSubject<any>('');

  public co_do_consumerno = new BehaviorSubject<any>('');
  // public vendorViewHeaderName = new BehaviorSubject<string>(' ');
  public submodulespayroll=new BehaviorSubject<any>('');
  public fetsubmodule=new BehaviorSubject<any>('');
  public appraisalsubmodule=new BehaviorSubject<any>('');
  public story_Id=new BehaviorSubject<any>('');
  public vendorView = new BehaviorSubject<string>(' ');
  public appVersion=new BehaviorSubject<any>('');
  public entity_Name =new BehaviorSubject<any>('');
  public entity_name =new BehaviorSubject<any>('');




  userlocation: boolean;
  prapproverblk: any;




  constructor() { }
}




