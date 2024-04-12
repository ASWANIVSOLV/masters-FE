import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service'
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { SharedService } from '../service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../service/notification.service'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { data } from 'jquery';
import { AboutComponent } from '../about/about.component';
import { interval } from 'rxjs';

// import { NewPasswordComponent } from '../new-password/new-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  redirect_tO_NAC = environment.redirect_TO_NAC
  loginForm: FormGroup;
  errormsg: any;
  returnUrl: string;
  mail_flag: any;
  otp_flag = false;
  mobile_flag = false;
  logbool:boolean;
  count = 100;
  timeout: any;
  mobile_form: FormGroup;
  resetForm:FormGroup;
  changeForm:FormGroup;
  ips: any;
  changepas:boolean;
  otp2: boolean;
  session_data: any;
  mobile_num: any;
  entityID: any;
  version: any;
  entityList: any;
  forgetpas:any;
  restrict_error:boolean;
  isChecked:boolean=false;
  showPassword:boolean=false;
  restrict:boolean=false;
  loginpage:boolean=true;
  mobile_flag1:boolean=false
  signupPage:boolean=false;
  passwordd:string='';
  reentity:any;
  username:any;
  lock:any;
  isVisible:boolean=true;
    constructor(private dataService: DataService, private router: Router, private SpinnerService: NgxSpinnerService, private notification: NotificationService,
    private sharedService: SharedService, public cookieService: CookieService,public toast:ToastrService,
    private formBuilder: FormBuilder, private route: ActivatedRoute,public dialog: MatDialog) {

  }

  ngOnInit() {
   
    
    console.log("login component calling");
    this.loginForm = this.formBuilder.group({
      entity: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });


    this.mobile_form = this.formBuilder.group({
      mobile_number: [''],
      otp: [''],
      mobile_num: ['']
    });
    this.resetForm = this.formBuilder.group({
      mobile_num:[''],
      resetentity:[this.reentity],
      setusername:[''],
      newPassword:[''],
      confirmPassword:['']
    });
    this.changeForm= this.formBuilder.group({
      setusername:[this.username],
      newPassword:[''],
      confirmPassword:['']

    })

    this.version = this.sharedService.appVersion.value
    // get return url from route parameters or default to '/'
    if (this.redirect_tO_NAC) {
      console.log("url", window.location.href)
      this.SpinnerService.show();
      this.dataService.authResponse(window.location.href)
        .subscribe(datas => {
          console.log("result for employeelist", datas)
          this.mobile_flag = false;
          this.SpinnerService.hide();
          localStorage.setItem("sessionData", JSON.stringify(datas))
          this.cookieService.set("my-key", JSON.stringify(datas))
          localStorage.setItem("location", JSON.stringify(this.mobile_flag))
          const item = localStorage.getItem("sessionData");
          this.sharedService.Loginname = datas.name;
          this.sharedService.isLoggedin = true;
          this.sharedService.loginUserId = datas.user_id;
          this.sharedService.entity_Name = datas.entity_name;
          this.sharedService.loginEmpId = datas.employee_id;
          this.sharedService.get_userlocation.next(this.mobile_flag)
          this.router.navigateByUrl('/about', { skipLocationChange: true });
          return true;

        })

    } else {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/about';
      const item = localStorage.getItem("sessionData");
      this.route.queryParams
        .subscribe(params => {
          this.mail_flag = params.from;
        }
        );
      if (item !== null && item !== "") {
        let itemValue = JSON.parse(item);
        this.sharedService.Loginname = itemValue.name;
        this.sharedService.isLoggedin = true;
        this.sharedService.loginUserId = itemValue.user_id;
        this.sharedService.loginEmpId = itemValue.employee_id;
        if (this.mail_flag == 'email' || this.mail_flag == 'remsemail') {
          //  this.getMenuUrl();
          this.sharedService.titleUrl = '';
        } else {
          this.getMenuUrl();
        }
      }
    }

    this.entity_List();
    this.loginForm.get('username').valueChanges.subscribe(value=>{
      this.lock=false;
     })

     interval(1500).subscribe(() => {

      // this.isVisible = !this.isVisible;
    });
  
  }//endof oninit

  private getMenuUrl() {
    this.dataService.getMenuUrl()
      .subscribe((results: any[]) => {
        let data = results['data'];
        if (data[0].url === '/memosummary') {
          this.sharedService.titleUrl = '/ememo/memosummary';
        } else {
          this.sharedService.titleUrl = data[0].url;
        }
        this.sharedService.menuUrlData = data;
        this.router.navigateByUrl(this.sharedService.titleUrl, { skipLocationChange: true });
      })
  }

  login() {
    localStorage.removeItem("memosearch_data")
    localStorage.removeItem("ls_approvaltypeiom");
    localStorage.removeItem("ls_approvaltype");
    if (!this.loginForm.value.entity){
      this.notification.showWarning('Please Select Entity');
      return
    }
    if (!this.loginForm.value.username){
      this.notification.showWarning('Please Enter Usercode');
      return
    }
    if (!this.loginForm.value.password){
      this.notification.showWarning('Please Enter Password');
      return false;
    }
    let data = this.sharedService.entity_name.value
    this.entityID = data
    this.logbool=true;
    this.dataService.login(this.loginForm.value, this.loginForm.value.entity)
      .subscribe(datas => {
        this.logbool=false;
        this.session_data = datas;
        if(datas.key=='Lock'){
          this.lock=1;
          this,this.notification.showWarning('User Account is Locked.Try contacting Admin to Unlock')
          return false;
        }
        if(datas.code == 403 && datas.description == "Invalid user account" ){
          this.notification.showWarning("No User Found, Invald Credentials")
          return false 
      }
      if(datas.status==1){
        let value=this.loginForm.value;
        this.sharedService.passVal=value;
        this.sharedService.status=datas.status;

      }
      
        if (datas.id) {
          this.dataService.Finduserlocation(datas.token, datas.id)
            .then(data => {
              if (data.status == false) {
                this.mobile_flag = true;
                this.mobile_form.get('mobile_number').setValue(data.mobile_number);
                this.mobile_num = data.mobile_number
                this.mobile_num = 'XXXXXX' + this.mobile_num.toString()
                this.mobile_form.get('mobile_num').setValue(this.mobile_num);
                this.gen_otp()
                localStorage.setItem("location", JSON.stringify(this.mobile_flag))
                this.sharedService.loginEmpId = datas.employee_id;
                return true;
              }
              else if (data.user_id) {
                this.mobile_flag = false;
                localStorage.setItem("sessionData", JSON.stringify(data))
                this.cookieService.set("my-key", JSON.stringify(data))
                localStorage.setItem("location", JSON.stringify(this.mobile_flag))
                const item = localStorage.getItem("sessionData");
                this.sharedService.Loginname = data.name;
                this.sharedService.isLoggedin = true;
                this.sharedService.loginUserId = data.user_id;
                this.sharedService.loginEmpId = data.employee_id;
                this.sharedService.get_userlocation.next(this.mobile_flag)

                this.router.navigateByUrl(this.returnUrl, { skipLocationChange: true });
                return true;
              }
              // this.SpinnerService.hide();
            })
        }
        else if (datas.user_id) {
          this.mobile_flag = false;
          localStorage.setItem("sessionData", JSON.stringify(datas))
          this.cookieService.set("my-key", JSON.stringify(datas))
          localStorage.setItem("location", JSON.stringify(this.mobile_flag))
          const item = localStorage.getItem("sessionData");
          this.sharedService.Loginname = datas.name;
          this.sharedService.entity_Name = datas.entity_name;
          this.sharedService.isLoggedin = true;
          this.sharedService.loginUserId = datas.user_id;
          this.sharedService.loginEmpId = datas.employee_id;
          this.sharedService.get_userlocation.next(this.mobile_flag)
          this.router.navigateByUrl(this.returnUrl, { skipLocationChange: false });
          return true;
        }
        console.log("my-key", this.cookieService.get("my-key"));
      },
      (error=>{
      
        this.logbool=false;
      })
      )
  }

  gen_otp() {
    this.mobile_form.get('otp').setValue('');
    this.count = 35;
    let mob = this.mobile_form.value.mobile_number
    this.timeout = setInterval(() => {
      if (this.count > 0) {
        this.count -= 1;
      } else {
        clearInterval(this.timeout);
      }
    }, 500);
    if (mob.toString().length == 3) {
      this.otp_flag = true;
      this.dataService.gen_otp(this.mobile_form.value, 'gen_OTP', this.session_data.id, '')
        .then(data => {
          if (data['validation_status'].Status == 'Success') {
          } else {
            if (data['validation_status'].Description) {
              this.notification.showWarning(data['validation_status'].Description)
            }
            else {
              this.notification.showWarning(data['validation_status'].ErrorMessage)
            }
            // this.otp_flag=false;
            localStorage.removeItem("sessionData");
            this.sharedService.isLoggedin = false;
            // this.otp2=false;
          }
        }).finally(function () {
        });
    }
    else {
      this.mobile_flag = false;
      // this.otp2=false;
      this.notification.showWarning("You are trying to login from outside NAC environment.Kindly access the App via NAC environment and update your mobile number in the xxxxxxxxxx for getting the OTP")
    }
    // this.SpinnerService.hide(); 
  }

  mobilelogin() {
    this.dataService.gen_otp(this.mobile_form.value, 'validate_OTP', this.session_data.id, '')
      .then(data => {
        if (data.user_id) {
          this.session_data = data;
          localStorage.setItem("sessionData", JSON.stringify(data))
          this.cookieService.set("my-key", JSON.stringify(data))
          localStorage.setItem("location", JSON.stringify(this.mobile_flag))
          const item = localStorage.getItem("sessionData");
          this.sharedService.Loginname = this.session_data.name;
          this.sharedService.isLoggedin = true;
          this.sharedService.loginUserId = this.session_data.user_id;
          this.sharedService.loginEmpId = this.session_data.employee_id;
          this.sharedService.get_userlocation.next(this.mobile_flag)
          this.getMenuUrl();
          this.router.navigateByUrl(this.returnUrl, { skipLocationChange: true });
          return true;
        }
        else {
          if (data['validation_status'].Description) {
            this.notification.showWarning(data['validation_status'].Description)
          }
          else {
            this.notification.showWarning('Unauthorized Request')
          }
          localStorage.removeItem("sessionData");
          this.sharedService.isLoggedin = false;
        }
      })
  }

  entity_List() {
    this.dataService.getEntity1_List()
      .subscribe((results: any[]) => {
        let datas = results["data"];
        console.log("enty-list", datas)
        this.entityList = datas;
  })
       
      
  }
  onKeyPress(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }
  onCheckboxChange() {
    if (this.isChecked) {
      this.isChecked=false;
      console.log('Checkbox is selected');
      this.showPassword=false;
    } else {
      this.isChecked=true;
      console.log('Checkbox is not selected');
      this.showPassword=true;
    }
}
backloginform(){
  this.mobile_flag=false;
  this.forgetpas=false;
  this.resetForm.reset();
}
forgetpass(){
  this.reentity=this.loginForm.get('entity').value;
  // this.signupPage=false;
  this.forgetpas=true;
  // this.loginpage=false;
  this.mobile_flag=true;
}
update_pass(){
  console.log("started");
  let pass_1=this.resetForm.get('newPassword').value.trim();
  let pass_2=this.resetForm.get('confirmPassword').value.trim();
  let username=this.resetForm.get('setusername').value.trim();
  let entity=this.resetForm.get('resetentity').value;
  if ((pass_1=='' || pass_1==undefined) && (pass_2==''|| pass_2==undefined) && (username=='' || username==undefined)){
    this.toast.warning('Enter Required Details');
    return false;
  }
  if(username==''|| username==undefined){
    this.toast.warning('Enter Username');
    return false;
  }
  if(pass_1==''|| pass_1==undefined){
    this.toast.warning('Enter Password');
    return false;
  }
  if(pass_2==''|| pass_2==undefined){
    this.toast.warning('Enter Confirm Password');
    return false;
  }
  // if(entity==''|| entity==undefined){
  //   this.toast.warning('Select Entity');
  //   return false;
  // }
  if (pass_1 != pass_2){
    this.toast.warning('Password Not Matched');
    return false;
  }
  else{
    // let enc_pass=btoa(pass_2);
    let enc_pass = CryptoJS.SHA256(pass_2).toString(CryptoJS.enc.Hex);

    const secretKey = CryptoJS.lib.WordArray.random(32); // 256 bits
    const secretKeyHex = CryptoJS.enc.Hex.stringify(secretKey);
    const password = pass_2;
    // const enc_pass = CryptoJS.AES.encrypt(password, secretKeyHex, { mode: CryptoJS.mode.CBC }).toString();
    this.dataService.forgetpassword(enc_pass,username).subscribe(result=>{
      if (result.status=='success'){
        this.toast.success(result.message);
        this.resetForm.reset();
      }
      else if(result.code!=undefined){
        this.toast.warning(result.description);
      }
    });
  }
}
onInputFocusOut(){
  this.passwordd=this.resetForm.get('newPassword').value;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  this.restrict=passwordRegex.test(this.passwordd);
  this.restrict_error=!this.restrict;
}

// change_pass(){
//   let pass_1=this.changeForm.get('newPassword').value.trim();
//   let pass_2=this.changeForm.get('confirmPassword').value.trim();
//   let username=this.changeForm.get('setusername').value.trim();
//   if ((pass_1=='' || pass_1==undefined) && (pass_2==''|| pass_2==undefined) && (username=='' || username==undefined)){
//     this.toast.warning('Enter Required Details');
//     return false;
//   }
//   if(username==''|| username==undefined){
//     this.toast.warning('Enter Username');
//     return false;
//   }
//   if(pass_1==''|| pass_1==undefined){
//     this.toast.warning('Enter Password');
//     return false;
//   }
//   if(pass_2==''|| pass_2==undefined){
//     this.toast.warning('Enter Confirm Password');
//     return false;
//   }
  
//   if (pass_1 != pass_2){
//     this.toast.warning('Password Not Matched');
//     return false;
//   }
//   else{
//     let enc_pass = CryptoJS.SHA256(pass_2).toString(CryptoJS.enc.Hex);
//     this.dataService.changepassword(enc_pass,username).subscribe(result=>{
//       if (result.status=='success'){
//         this.toast.success(result.message);
//         this.changeForm.reset();      
//       }
//       else if(result.code!=undefined){
//         this.toast.warning(result.description);
//       }
//     });
//   }

// }
// backlogin(){
//   this.mobile_flag=false;
//   this.forgetpas=false;
//   this.changepas=false;
//   this.changeForm.reset();
// }
openDialog() {
  // this. dialog.open(NewPasswordComponent, {
  //   height: '445px',
  //   width: '530px',
  //   disableClose: true
    
  // });

  
}
onpaste(event:ClipboardEvent){
  event.preventDefault();
}

}