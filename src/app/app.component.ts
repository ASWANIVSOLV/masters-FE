import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DataService } from './service/data.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from './service/shared.service'
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from './service/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
const isSkipLocationChange = environment.isSkipLocationChange

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  Url = environment.apiURL
  isPremise = false; showModal: boolean;
  timed: boolean = false;
  idleState = 'Not started.';
  CommonTitle = "";
  timedOut = false;
  lastPing?: Date = null;
  countdown: any;
  countdown_Keypress: any;
  adcolor: any;
  count = 100;
  timeout: any;
  submodule:any;
  isLoading: boolean = true;
  title = 'My First App';
  MODULES: any[];
  MODULES1: any[];
  TeamMembers = [];
  ionName: any;
  isIonName: boolean;
  menurlList: Array<any>;
  menuId: number;
  subModuleList: any[];
  titleUrls: string;
  urlTitle: any;
  isMasterList = false;
  isTransactionList = false;
  counter = 10;
  apiTimer: any
  masterUrl: any;
  otpflag = false;
  transactionUrl: any;
  branchViewName: string;
  isbranchView: boolean;
  headerName = '';
  vendorCode: string;
  vendorName: string;
  vendorCode_Name: string;
  premiseCode_Name: string
  premiseCode: string;
  premiseName: string;
  agreementCode: string;
  landLordViewCode: string;
  occupancyViewCode: string;
  premiseDetailsName: string;
  premiseHeaderTitle: string;
  public currentlyClickedCardIndex: number = 0;
  premisesData: any;
  header_Name: string;
  mobileupdationform: any;
  login_id: any;
  editflag = false;
  @ViewChild('closebutton') closebutton;
  login_code: any;
  mobileid: any;
  CommonSummaryNavigator: string;

  constructor(private idle: Idle, private dataService: DataService, private formBuilder: FormBuilder, private notification: NotificationService,
    public sharedService: SharedService,
     private SpinnerService: NgxSpinnerService,private cookieService:CookieService,
    private router: Router, private location: Location,
     private route: ActivatedRoute) {
      
    idle.setIdle(1);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(900);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    // idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');

    idle.onTimeout.subscribe(() => {
      this.idleState = '';
      this.timedOut = true;
      
      this.idle.stop()

      localStorage.removeItem("sessionData");
      this.cookieService.delete('my-key', '/');
      if (this.sharedService.TokenRefreshintervalId) {
        clearInterval(this.sharedService.TokenRefreshintervalId);
        this.sharedService.TokenRefreshintervalId = null;
        console.log("TokenRefreshintervalId stopped")
      }
      this.sharedService.Loginname = undefined;
      this.sharedService.isLoggedin = false; this.showModal = false;
      this.router.navigateByUrl('/login');
    });
    idle.onTimeoutWarning.subscribe((countdown) => {
      // this.idleState = 'session expired in ' + countdown + ' seconds!';
      this.CommonTitle = this.sharedService.MyModuleName;

      this.idleState = '(' + countdown + ' s)';
      this.countdown_Keypress = countdown;
      if (countdown == 1) {
        this.timed = true;
      }
      if (countdown <= 300) {
        this.adcolor = 'red'
      }
      else {
        this.adcolor = 'grey'
      }
      if (countdown === 300) {
        this.dataService.getRefresh()
          .subscribe(result => {
            // console.log("refreshhhh",result)
          })
      }

      if (countdown === 30) {
        this.showModal = true;
      }

    });

    this.reset();

    const data = this.cookieService.get("my-key")
    const item = localStorage.setItem('sessionData', data);
  } //end of constructor
  

  //Method to handle key press event
  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    // Check for the specific key code you are interested in

    if (event.key) {
      if (this.countdown_Keypress > 30) {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
      }
    }
  }

  ngOnDestroy() {
    if (this.sharedService.TokenRefreshintervalId) {
      clearInterval(this.sharedService.TokenRefreshintervalId);
      this.sharedService.TokenRefreshintervalId = null;
      console.log("TokenRefreshintervalId stopped")

    }
  }
  ngOnInit() {
   this. sharedService.transactionList=[]
   this.sharedService.masterList=[];
   
      
    const isAppOpen = localStorage.getItem('sessionData');
    if (isAppOpen) {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigateByUrl('/login');
        this.sharedService.isSideNav=false;
        
    }
    
    this.countdown_Keypress = 0;
    this.mobileupdationform = this.formBuilder.group({
      code: [''],
      name: [''],
      mobile_number: [''],
      otp: [''],
      id: ['']
    })
    this.sharedService.ionName.subscribe(data => {
      this.ionName = data;
      this.isIonName = this.ionName === '' ? false : true;
    });
    this.sharedService.vendorViewHeaderName.subscribe(result => {
      let data: any = result;
      this.headerName = 'vendorView'
      this.vendorCode = data.code
      this.vendorName = data.name
      this.vendorCode_Name = this.vendorCode + "-" + this.vendorName;
      if (this.vendorCode_Name) {
        this.sharedService.MyModuleName = ""
      }
      if (this.vendorCode_Name === 'undefined-undefined') {
        this.headerName = '';
      }
    })

    this.sharedService.branchView.subscribe(res => {
      let data: any = res;
      this.headerName = 'branchView'
      this.branchViewName = data.code + "-" + data.name;
      this.isbranchView = this.branchViewName === '' ? false : true;
      if (this.branchViewName === undefined) {
        this.headerName = ''
      }
      if (this.branchViewName === 'undefined-undefined') {
        this.headerName = ''
      }

    })
    const item = localStorage.getItem('sessionData');
    if (item !== null) {
      let itemValue = JSON.parse(item);
      this.sharedService.Loginname = itemValue.name;
      this.sharedService.isLoggedin = true;
      this.sharedService.loginUserId = itemValue.user_id;
      this.sharedService.loginEmpId = itemValue.employee_id;
      this.getMenuUrl();
    }
    this.getPremiseData();
  }

  mobile_popu() {
    this.otpflag = false;
    const sessionData = localStorage.getItem("sessionData")
    let logindata = JSON.parse(sessionData);
    this.login_code = logindata.code;
    this.getmobilestatus()
  }
  getmobilestatus() {
    this.dataService.getempmobiedata(this.login_code)
      .then((results: any[]) => {
        let datas = results["data"];
        if (datas) {
          this.mobileupdationform.get('mobile_number').setValue(datas.mobile_number);
          this.mobileupdationform.get('code').setValue(datas.code);
          this.mobileupdationform.get('name').setValue(datas.full_name);
          this.mobileupdationform.get('id').setValue(datas.id);
          this.editflag = true;
        }
      })
  }

  submitForm() {
    this.mobileupdationform.get('otp').setValue('');
    this.otpflag = false;
    let data = localStorage.getItem("location")
    if (data == 'true') {
      this.notification.showWarning("You are trying to login from outside KVB environment.Kindly access the App via KVB environment and update your mobile number in the xxxxxxxxxx for getting the OTP")
      return false
    }
    if (this.mobileupdationform.value.mobile_number.length == 10) {
      this.count = 35;
      this.timeout = setInterval(() => {
        if (this.count > 0) {
          this.count -= 1;
        } else {
          clearInterval(this.timeout);
        }
      }, 500);
      this.dataService.mobiledatapost(this.mobileupdationform.value)
        .subscribe((results) => {
          let datas = results;
          if (results.id) {
            this.otpflag = true;
            this.mobileid = results.id;
            this.notification.showSuccess("Please enter the 8-digit verification code we sent via SMS:(we want to make sure it's you before update ")
          }
          else {
            this.notification.showWarning('failed')
            this.otpflag = false;
          }
        })
    }
  }

  updatemobile() {
    var otpdata = { "otp": this.mobileupdationform.value.otp }
    this.dataService.employeemobilenomicro(otpdata, this.mobileid)
      .then(data => {
        if (data['MESSAGE'] == 'SUCCESS') {
          this.notification.showSuccess("Success")
          this.mobileupdationform.reset()
          this.otpflag = false
          this.closebutton.nativeElement.click();
        } else {
          this.notification.showWarning(data['MESSAGE'])
          this.mobileupdationform.reset()
          this.closebutton.nativeElement.click();
        }
      })
  }


  private getMenuUrl() {
    this.dataService.getMenuUrl()
      .subscribe((results: any[]) => {
        let data = results['data'];
        this.sharedService.titleUrl = data[0].url;
        this.sharedService.menuUrlData = data;
        this.menurlList = this.sharedService.menuUrlData;
        this.titleUrls = this.sharedService.titleUrl;
        this.sharedService.transactionList = [];
        this.sharedService.masterList = [];
        this.menurlList.forEach(element => {
          if (element.type === "transaction") {
            this.sharedService.transactionList.push(element);
          } else if (element.type === "master") {
            this.sharedService.masterList.push(element);
          }
        })
      })
  }

  continue() {
    this.showModal = false;

    this.reset();
    this.dataService.getRefresh()
      .subscribe(result => {
        this.reset();
      })
  }

  logout() {
    this.showModal = false;
    this.idleState = '';
    this.timedOut = true;
    this.logout1();
    this.idle.stop()
    localStorage.removeItem("sessionData");
    this.cookieService.delete('my-key', '/');
    this.sharedService.Loginname = undefined;
    this.sharedService.isLoggedin = false;
    this.sharedService.MyModuleName = ""
    this.sharedService.Memofrom = ""
    this.headerName = '';
    if (this.sharedService.TokenRefreshintervalId) {
      clearInterval(this.sharedService.TokenRefreshintervalId);
      this.sharedService.TokenRefreshintervalId = null;
      console.log("TokenRefreshintervalId stopped")
    }
    this.router.navigateByUrl('/login');
    this.sharedService.isSideNav = false;
    document.getElementById("mySidenav").style.width = "0px";      
    document.getElementById("main").style.marginLeft = "0px";
    document.getElementById("main").style.transition = 'margin-left 0s';
    
  }

  private logout1() {
    this.dataService.logout()
      .subscribe((results: any[]) => {
        let datas = results["data"];
      })
  }

  myModuleFunction(modrow, cardIndex) {
    this.isIonName = false;
    this.menuId = modrow.id;
    this.headerName = '';
    this.premiseHeaderTitle = ''
    this.sharedService.MyModuleName = modrow.name;
    this.currentlyClickedCardIndex = cardIndex;
    
    if (modrow.url === "/vendor") {
      this.router.navigate(['atma/vendor']);
      return true;
    } 
    if (modrow.url === "/vendormaster") {
      this.router.navigate(['atma/vendormaster']);
      return true;
    }
    if (modrow.url === "/master") {
      this.router.navigate(['master/master']);
      return true;
    }
    this.router.navigate([modrow.url], { skipLocationChange: isSkipLocationChange });//, 

  }

  public checkIfCardIsClicked(cardIndex: number): boolean {
    return cardIndex === this.currentlyClickedCardIndex;
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  backNavigation() {
    this.isIonName = false;
    this.sharedService.ionName.next('')
    this.router.navigate(["/ememo/memosummary"], { skipLocationChange: isSkipLocationChange })
  }

  openNav() {
    if (this.sharedService.isSideNav==true) {
      document.getElementById("mySidenav").style.width = "0px";      
      document.getElementById("main").style.marginLeft = "0rem";     
      this.sharedService.isSideNav = false;
      
    } else {
      document.getElementById("mySidenav").style.width ="200px";
      document.getElementById("main").style.marginLeft ="12rem";
      this.sharedService.isSideNav = true;
      
    }
  }

  masterData() {
    let data = this.sharedService.masterList;
    this.masterUrl = data[0].url
    this.sharedService.MyModuleName = data[0].name;
    this.router.navigateByUrl(this.masterUrl, { skipLocationChange: isSkipLocationChange });
    this.isMasterList = true;
    this.isTransactionList = false;
    this.headerName = '';
  }
  homes() {
    let data = this.sharedService.transactionList;
    this.transactionUrl = data[0]?.url
    this.sharedService.MyModuleName = data[0].name;
    this.router.navigateByUrl(this.transactionUrl, { skipLocationChange: isSkipLocationChange });
    this.isTransactionList = true;
    this.isMasterList = false;
    this.headerName = '';
  }

  backBranchView() {
    this.router.navigate(["/atma/vendorView"], { skipLocationChange: isSkipLocationChange })
  }

  backVendor() {
    let vendorName = "Vendor";
    this.sharedService.MyModuleName = vendorName;
    this.headerName = "";
    this.router.navigate(["/atma/vendor"], { skipLocationChange: isSkipLocationChange })
  }
  LOS() {
    this.router.navigate(["/los"], { skipLocationChange: true })
  }

  backpremise() {
    this.premisesData.forEach(element => {
      this.header_Name = element.headerName;
    });
    if (this.premisesData) {
      let index = this.premisesData.length - 1
      let data = this.premisesData[index]
      this.router.navigate([data.routerUrl], { skipLocationChange: isSkipLocationChange });
      this.sharedService.MyModuleName = this.header_Name;
      this.headerName = '';
    }
  }

  reports() {
    this.router.navigate(['/reports'], { skipLocationChange: isSkipLocationChange })

  }
  getPremiseData() {
    this.sharedService.premiseBackNavigation.subscribe(result => {
      if (result != null) {
        this.premisesData = result.data
        let index = this.premisesData.length - 1
        let data = this.premisesData[index]
        this.headerName = 'REMS';
        this.premiseCode = data.code;
        this.premiseName = data.name;
        if (data.title == BackNavigationData.premiseView) {
          this.premiseCode_Name = this.premiseCode + " (" + this.premiseName + ")";
        } else if (data.title == BackNavigationData.agreementView) {
          this.premiseCode_Name = this.premiseCode;
        } else if (data.title == BackNavigationData.landLordView) {
          this.premiseCode_Name = this.premiseCode_Name + " / " + this.premiseName;
        } else if (data.title == BackNavigationData.occupancyView) {
          this.premiseCode_Name = this.premiseCode_Name + " / " + this.premiseCode;
        } else if (data.title == BackNavigationData.premiseDetailsView) {
          this.premiseCode_Name = this.premiseCode_Name + " / " + this.premiseName;
        } else if (data.title == BackNavigationData.premisesIdentificationView) {
          this.premiseCode_Name = this.premiseCode + "(" + this.premiseName + ")";
        } else if (data.title == BackNavigationData.premisesDocInfoView) {
          this.premiseCode_Name = this.premiseName;
        } else if (data.title == BackNavigationData.scheduleView) {
          this.premiseCode_Name = this.premiseCode;
        } else if (data == "") {
          this.sharedService.MyModuleName = "REMS"
        }
      }
    })
  }
}

export enum BackNavigationData {
  agreementView = "AgreementView",
  premiseView = "PremiseView",
  landLordView = "LandLordView",
  occupancyView = "OccupancyView",
  premiseDetailsView = "PremiseDetailsView",
  premisesIdentificationView = "PremisesIdentificationView",
  premisesDocInfoView = "PremisesDocInfoView",
  scheduleView = "ScheduleView"
}
