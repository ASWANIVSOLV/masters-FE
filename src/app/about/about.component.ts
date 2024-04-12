import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { NotificationService } from '../service/notification.service';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

import { DataService } from '../service/data.service'
import { SharedService } from '../service/shared.service'
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  @ViewChild('showcomp') showcomp:any;
  @ViewChild('change') change:any;


  showModal: boolean;
  idleState = 'Not started.';
  timedOut: boolean= false;
  isgov: boolean= false;
  timed: boolean = false;
  headerName = '';
  adcolor: any;
  menuurls:any;
  langs:any;
  source:any;
  restrict_error:boolean;
  isChecked:boolean=false;
  showPassword:boolean=false;

  restrict:boolean=false;
  changeForm:FormGroup;
  passwordd:string='';
  entity:any;

  constructor(private dataService: DataService,public notification:NotificationService, public dialog: MatDialog,public sharedService: SharedService, private router: Router,private formBuilder: FormBuilder,) { }
  ngOnInit() {
    
    let currentUrl = window.location.href;
    let tmpVar = currentUrl.includes('/kvb');
    if (currentUrl.includes('/kvb')) {
      window.onpopstate = function (event) {
        history.go(1);
      }
    }

    this.getMenuUrl();
    
    this.changeForm= this.formBuilder.group({
      entity:[this.sharedService.passVal.entity==1?'VSOLV':'WISEFIN'],
      setusername:[this.sharedService.passVal.username],
      newPassword:[''],
      confirmPassword:['']

  
    })


  }
  ngAfterViewInit(){

    if(this.sharedService.status==1){
      this.notification.showWarning('Please Change Your PassWord')
      this.openDialog();
    }
  }
  openDialog() {
    this.showcomp.nativeElement.click()
}
  private getMenuUrl() {
    this.sharedService.menuUrlData = [];
    this.dataService.getMenuUrl()
      .subscribe((results: any[]) => {
        let data = results['data'];
        if (data) {
          this.sharedService.titleUrl = data[0].url;
          this.sharedService.menuUrlData = data;
         
          this.sharedService.transactionList= [];
          this.sharedService.masterList= [];
          this.sharedService.menuUrlData.forEach(element => {
            if (element.type === "transaction") {
              this.sharedService.transactionList.push(element);
            } else if (element.type === "master") {
              this.sharedService.masterList.push(element);
            }
          })
     
        }
      });
  }
  onpaste(event:ClipboardEvent){
    event.preventDefault();
  }
  onInputFocusOut(){
    this.passwordd=this.changeForm.get('newPassword').value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    this.restrict=passwordRegex.test(this.passwordd);
    this.restrict_error=!this.restrict;
  }

  change_pass(){
    let entity=this.changeForm.get('entity').value;
    let pass_1=this.changeForm.get('newPassword').value.trim();
    let pass_2=this.changeForm.get('confirmPassword').value.trim();
    let username=this.changeForm.get('setusername').value.trim();
    
    if (entity==''||entity==undefined){
      this.notification.showWarning('Select Entity');
      return false;
    }
    if(username==''|| username==undefined){
      this.notification.showWarning('Enter Username');
      return false;
    }
    if(pass_1==''|| pass_1==undefined){
      this.notification.showWarning('Enter Password');
      return false;
    }
    if(pass_2==''|| pass_2==undefined){
      this.notification.showWarning('Enter Confirm Password');
      return false;
    }
    
    if (pass_1 != pass_2){
      this.notification.showWarning('Password Not Matched');
      return false;
    }
    else{
      let enc_pass = CryptoJS.SHA256(pass_2).toString(CryptoJS.enc.Hex);
      this.dataService.forgetpassword(enc_pass,username).subscribe(result=>{
        if (result.status=='success'){
          this.notification.showSuccess(result.message +''+'Your Password Will Changed');
          this.changeForm.reset();   
          this.router.navigateByUrl('/login')  
        }
        else if(result.code!=undefined){
          this.notification.showWarning(result.description);
        }
      });
    }
  
  }
  backlogin(){
    this.changeForm.reset();
    window.location.reload();

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

}