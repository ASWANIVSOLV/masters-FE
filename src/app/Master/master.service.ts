import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { environment } from 'src/environments/environment';

const url = environment.masterurl
const user_url = environment.apiURL


@Injectable({
  providedIn: 'root'
})
export class masterService {
  idleState = 'Not started.';
  timedOut = false;
  ComingFrom = '';
  permissionJson: any;
  constructor(private idle: Idle, private http: HttpClient) { }

  public ms_getCategoryList(filter = "", sortOrder = 'asc', pageNumber = 1, catkeyvalue): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    return this.http.get<any>(url + "memserv/user_category?page=" + pageNumber +"&query=" +catkeyvalue, { 'headers': headers })
  }


  public getSubCategoryList(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize = 10, categoryIdValue: number): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + "memserv/category/" + categoryIdValue + "/subcategory?page=" + pageNumber, { 'headers': headers })
  }
  public getDepartmentList(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize = 10): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + "usrserv/department?page=" + pageNumber, { 'headers': headers })
  }



  public getDocument(pageNumber = 1): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('page', pageNumber.toString());
    return this.http.get<any>(url + 'mstserv/Documenttype', { headers, params })
  }

  public getChannel(pageNumber = 1): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('page', pageNumber.toString());
    return this.http.get<any>(url + 'mstserv/channel', { headers, params })
  }

  public getCourier(pageNumber = 1): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('page', pageNumber.toString());
    return this.http.get<any>(url + 'mstserv/courier', { headers, params })
  }

  public getAccountList(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize = 10): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + "prfserv/accounts?page=" + pageNumber, { 'headers': headers })
  }

  public acctDeleteForm(id: number): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    let idValue = id;
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.delete<any>(url + "prfserv/accounts/" + idValue, { 'headers': headers })
  }

  public getTemplateDD(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize = 10): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + "prfserv/template?page=" + pageNumber, { 'headers': headers })
  }
  public templateDeleteForm(id: number): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    let idValue = id;
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.delete<any>(url + "prfserv/template/" + idValue, { 'headers': headers })

  }
  public getCostCentreList(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize = 10): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + "usrserv/costcentre?page=" + pageNumber, { 'headers': headers })

  }
  public createCostCentreForm(CreateList: any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(CreateList)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "usrserv/costcentre", body, { 'headers': headers })

  }
  public costCentreEditForm(data: any, id: number): Observable<any> {
    this.reset();
    // console.log("costcentreEditFormmm")
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(data)
    let idValue = id;
    let value = {
      "id": idValue,
    }
    let jsonValue = Object.assign({}, data, value)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "usrserv/costcentre", jsonValue, { 'headers': headers })

  }
  public getBusinessSegmentList(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize = 10): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + "usrserv/businesssegment?page=" + pageNumber, { 'headers': headers })
  }
  public createBusinessSegmentForm(CreateList: any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(CreateList)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "usrserv/businesssegment", body, { 'headers': headers })
  }
  public businessSegmentEditForm(data: any, id: number): Observable<any> {
    this.reset();
    // console.log("businesssegmentEditFormmm")
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(data)
    let idValue = id;
    let value = {
      "id": idValue,
    }
    let jsonValue = Object.assign({}, data, value)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "usrserv/businesssegment", jsonValue, { 'headers': headers })

  }
  public getCCBSList(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize = 10): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + "usrserv/ccbsmapping?page=" + pageNumber, { 'headers': headers })
  }
  public getCostCentre(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "usrserv/costcentre", { 'headers': headers })
  }
  public getBusinessSegment(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "usrserv/businesssegment", { 'headers': headers })
  }
  public createCCBSMappingForm(CreateList: any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(CreateList)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "usrserv/ccbsmapping", body, { 'headers': headers })
  }
  public ccbsMappingEditForm(data: any, id: number): Observable<any> {
    this.reset();
    // console.log("ccbsMappingEditFormmm")
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(data)
    let idValue = id;
    let value = {
      "id": idValue,
    }
    let jsonValue = Object.assign({}, data, value)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "usrserv/ccbsmapping", jsonValue, { 'headers': headers })

  }
  public getHierarchyList(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize:any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    // params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + "usrserv/employeehierarchy?page=" + pageNumber+"&data="+pageSize, { 'headers': headers })
  }
  public createHierarchyForm(CreateList: any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(CreateList)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "usrserv/employeehierarchy", body, { 'headers': headers })
  }
  public hierarchyEditForm(data: any, id: number): Observable<any> {
    this.reset();
    // console.log("hierarchyEditFormmm")
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(data)
    let idValue = id;
    let value = {
      "id": idValue,
    }
    let jsonValue = Object.assign({}, data, value)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "usrserv/employeehierarchy", jsonValue, { 'headers': headers })
  }
  public getContactList(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize = 10): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + "mstserv/contacttype?page=" + pageNumber, { 'headers': headers })
  }
  public createContactForm(CreateList: any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(CreateList)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "mstserv/contacttype", body, { 'headers': headers })
  }
  public contactEditForm(data: any, id: number): Observable<any> {
    this.reset();
    // console.log("contactEditFormmm")
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(data)
    let idValue = id;
    let value = {
      "id": idValue,
    }
    let jsonValue = Object.assign({}, data, value)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "mstserv/contacttype", jsonValue, { 'headers': headers })
  }
  public contactDeleteForm(id: number): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    let idValue = id;
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.delete<any>(url + "mstserv/contacttype/" + idValue, { 'headers': headers })
  }
  public getDesignationList(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize:any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>( url + "mstserv/designation?page=" + pageNumber+'&data='+pageSize, { 'headers': headers })
  }
  public getDesignationList1(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize:any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>( url + "mstserv/designation_list?page=" + pageNumber+'&data='+pageSize, { 'headers': headers })
  }
  public createDesignationForm(CreateList: any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(CreateList)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "mstserv/designation", body, { 'headers': headers })
  }
  public designationEditForm(data: any, id: number): Observable<any> {
    this.reset();
    // console.log("designationEditFormmm")
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(data)
    let idValue = id;
    let value = {
      "id": idValue,
    }
    let jsonValue = Object.assign({}, data, value)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "mstserv/designation", jsonValue, { 'headers': headers })
  }
  public designationDeleteForm(id: number): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    let idValue = id;
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.delete<any>(url + "mstserv/designation/" + idValue, { 'headers': headers })
  }
  public getCountryList(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize = 10): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + "mstserv/country?page=" + pageNumber, { 'headers': headers })
  }
  public createCountryForm(CreateList: any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(CreateList)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "mstserv/country", body, { 'headers': headers })
  }
  public countryEditForm(data: any, id: number): Observable<any> {
    this.reset();
    // console.log("countryEditFormmm")
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(data)
    let idValue = id;
    let value = {
      "id": idValue,
    }
    let jsonValue = Object.assign({}, data, value)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "mstserv/country", jsonValue, { 'headers': headers })
  }
  public countryDeleteForm(id: number): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    let idValue = id;
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.delete<any>(url + "mstserv/country/" + idValue, { 'headers': headers })
  }
  public getStateList(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize = 10): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + "mstserv/state?page=" + pageNumber, { 'headers': headers })
  }
  public createStateForm(CreateList: any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(CreateList)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "mstserv/state", body, { 'headers': headers })
  }
  public getCountry(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/country", { 'headers': headers })
  }
  public stateEditForm(data: any, id: number): Observable<any> {
    this.reset();
    // console.log("stateEditForm")
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(data)
    let idValue = id;
    let value = {
      "id": idValue,
    }
    let jsonValue = Object.assign({}, data, value)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "mstserv/state", jsonValue, { 'headers': headers })

  }
  public stateDeleteForm(id: number): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    let idValue = id;
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.delete<any>(url + "mstserv/state/" + idValue, { 'headers': headers })
  }
  public getDistrictList(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize = 10): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + "mstserv/district?page=" + pageNumber, { 'headers': headers })
  }
  public createDistrictForm(CreateList: any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(CreateList)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "mstserv/district", body, { 'headers': headers })
  }
  public getState(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/state", { 'headers': headers })
  }
  public districtEditForm(data: any, id: number): Observable<any> {
    this.reset();
    // console.log("districtEditForm")
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(data)
    let idValue = id;
    let value = {
      "id": idValue,
    }
    let jsonValue = Object.assign({}, data, value)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "mstserv/district", jsonValue, { 'headers': headers })

  }
  public districtDeleteForm(id: number): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    let idValue = id;
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.delete<any>(url + "mstserv/district/" + idValue, { 'headers': headers })
  }
  public getCityList(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize = 10): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + "mstserv/city?page=" + pageNumber, { 'headers': headers })
  }
  public createCityForm(CreateList: any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(CreateList)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "mstserv/city", body, { 'headers': headers })
  }
  public cityEditForm(data: any, id: number): Observable<any> {
    this.reset();
    // console.log("cityEditForm")
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(data)
    let idValue = id;
    let value = {
      "id": idValue,
    }
    let jsonValue = Object.assign({}, data, value)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "mstserv/city", jsonValue, { 'headers': headers })

  }
  public cityDeleteForm(id: number): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    let idValue = id;
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.delete<any>(url + "mstserv/city/" + idValue, { 'headers': headers })
  }


  public get_cityValue(citykeyvalue): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    if (citykeyvalue === null) {
      citykeyvalue = "";
    }
    return this.http.get<any>(url + 'mstserv/new_city_search?query=' + citykeyvalue, { 'headers': headers })
   

  }
  public getStateSearch(statekeyvalue): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + 'mstserv/state_search?query=' + statekeyvalue, { 'headers': headers })
  }
  public getDistrictDropDown(districtkeyvalue): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    if (districtkeyvalue === null) {
      districtkeyvalue = "";
    }

    return this.http.get<any>(url + 'mstserv/district_search?query=' + districtkeyvalue, { 'headers': headers })
   
  }

  public getPinCodeSearch(pincodekeyvalue): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + 'mstserv/pincode_search?query=' + pincodekeyvalue, { 'headers': headers })
  }
  public getPincodeList(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize = 10): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + "mstserv/pincode?page=" + pageNumber, { 'headers': headers })
  }
  public getCity(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/city", { 'headers': headers })
  }
  public getDistrict(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/district", { 'headers': headers })
  }
  public createPincodeForm(CreateList: any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(CreateList)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "mstserv/pincode", body, { 'headers': headers })
  }
  public pincodeEditForm(data: any, id: number): Observable<any> {
    this.reset();
    // console.log("pincodeEditForm")
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(data)
    let idValue = id;
    let value = {
      "id": idValue,
    }
    let jsonValue = Object.assign({}, data, value)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "mstserv/pincode", jsonValue, { 'headers': headers })

  }
  public pincodeDeleteForm(id: number): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    let idValue = id;
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.delete<any>(url + "mstserv/pincode/" + idValue, { 'headers': headers })
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  public getModulesList(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "usrserv/usermodule", { 'headers': headers })
  }
  public getRolesList(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "usrserv/role", { 'headers': headers })
  }
  public rolesEditForm(data: any, id: number): Observable<any> {
    this.reset();
    // console.log("rolesEditFormmm")
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(data)
    let idValue = id;
    let value = {
      "id": idValue,
    }
    let jsonValue = Object.assign({}, data, value)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", body)
    return this.http.post<any>(url + "usrserv/role", jsonValue, { 'headers': headers })
  }
  public getModule(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(user_url + "usrserv/usermodule", { 'headers': headers })
  }
  public getRole(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(user_url + "usrserv/role", { 'headers': headers })
  }
  public get_EmployeeList(empkeyvalue): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(user_url + 'usrserv/searchemployee?query=' + empkeyvalue, { 'headers': headers })
  }
  public addPermission(json: any, empId: number): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    if (json.submodule_id) {
      let jsonValue: any = {
        "module_id": json.submodule_id,
        "role_id": json.role_id,
        "add": empId
      }
      this.permissionJson = jsonValue;
      // console.log("SUBModuid=-=-=", this.permissionJson)
    } else {
      let jsonValue = {
        "module_id": json.module_id,
        "role_id": json.role_id,
        "add": empId
      }
      this.permissionJson = jsonValue;
      // console.log("Moduid=-=-=", this.permissionJson)

    }

    const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any>(user_url + 'usrserv/permission', this.permissionJson, { 'headers': headers })
  }
  public removeEmployee(memojson: any, CreateList: any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const Url = url + 'usrserv/permission'
    let json = Object.assign({}, memojson, CreateList)
    const headers = { 'Authorization': 'Token ' + token }
    // console.log("Body", JSON.stringify(json))
    return this.http.post<any>(Url, json, { 'headers': headers })
  }



  public getEmployee(filter = "", sortOrder = 'asc', pageNumber = 1, pageSize = 10): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token

    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(url + 'usrserv/employee?page=' + pageNumber, { 'headers': headers })
  }

  public getPermissionList1(empid): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + 'usrserv/user_modules_admin/' + empid, { 'headers': headers })
  }

  public ms_getSubCategoryList1(filter = "", sortOrder = 'asc', pageNumber = 1, subcatkeyvalue): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('sortOrder', sortOrder);
    params = params.append('page', pageNumber.toString());
    return this.http.get<any>(url + "memserv/user_subcategory?page=" + pageNumber +"&query=" +subcatkeyvalue, { 'headers': headers })
  }

  public removePermission(json: any,empId:number): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { 'Authorization': 'Token ' + token };
    let jsonValue: any = {
      "module_id": json.parent_id,
      "role_id": json.role_id,
      "remove": empId
    }
    return this.http.post<any>(url + 'usrserv/permission',jsonValue, { 'headers': headers })
  }

    ////////////////// bs
    public getbs(pageNumber = 1, pageSize = 10): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      params = params.append('page', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
      //console.log(params);
      //console.log(headers);
      return this.http.get<any>(url + "usrserv/businesssegmentlist?page=" + pageNumber, { 'headers': headers, params })
    }
  
    public BSCreateForm(bs: any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      let data = JSON.stringify(bs)
      //console.log("bs Data", data)
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + 'usrserv/businesssegment', data, { 'headers': headers })
    }
  
    public getBssearch(no, name): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let names = name
  
      for (let i in names) {
        if (!names[i]) {
          delete names[i];
        }
      }
      let nos = no
  
      for (let i in nos) {
        if (!nos[i]) {
          delete nos[i];
        }
      }
      return this.http.get<any>(url + 'usrserv/businesssegmentsearch?name=' + names + '&no=' + nos, { 'headers': headers })
    }
    public activeInactivebs(bsId, status): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      let data = bsId + '?status=' + status
      //console.log('data check for apcat active inactive', data)
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + "usrserv/businesssegmentstatus/" + bsId + '?status=' + status, { 'headers': headers })
    }
  
    ////////////////// CC
    public getcc(pageNumber = 1, pageSize = 10): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      params = params.append('page', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
      //console.log(params);
     // console.log(headers);
      return this.http.get<any>(url + "usrserv/costcentrelist?page=" + pageNumber, { 'headers': headers, params })
    }
  
    public getCCsearch(no, name): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let names = name
  
      for (let i in names) {
        if (!names[i]) {
          delete names[i];
        }
      }
      let nos = no
  
      for (let i in nos) {
        if (!nos[i]) {
          delete nos[i];
        }
      }
      return this.http.get<any>(url + 'usrserv/costcentresearch?name=' + names + '&no=' + nos, { 'headers': headers })
    }
  
    public CCCreateForm(cc: any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      let data = JSON.stringify(cc)
     // console.log("cc Data", data)
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + 'usrserv/costcentre', data, { 'headers': headers })
    }
  
    public activeInactivecc(ccId, status): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      let data = ccId + '?status=' + status
     // console.log('data check for apcat active inactive', data)
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + "usrserv/costcentrestatus/" + ccId + '?status=' + status, { 'headers': headers })
    }
    public getccBS(pageNumber = 1, pageSize = 10): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      params = params.append('page', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
     // console.log(params);
     // console.log(headers);
      return this.http.get<any>(url + "usrserv/ccbsmapping?page=" + pageNumber, { 'headers': headers, params })
    }
  
  
    public getbsvalue(bskeyvalue): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + "usrserv/searchbusinesssegment?query=" + bskeyvalue, { 'headers': headers })
    }
    public getbsFKdd(bskeyvalue, pageno): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + 'usrserv/searchbusinesssegment?query=' + bskeyvalue + '&page=' + pageno, { 'headers': headers })
    }
  
  
    public getccvalue(empkeyvalue): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + "usrserv/searchcostcentre?query=" + empkeyvalue, { 'headers': headers })
    }
    public getccFKdd(empkeyvalue, pageno): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + 'usrserv/searchcostcentre?query=' + empkeyvalue + '&page=' + pageno, { 'headers': headers })
    }
  
    public ccbsCreateForm(ccbs: any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      let data = JSON.stringify(ccbs)
     // console.log("ccbs Data", data)
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + 'usrserv/ccbsmapping', data, { 'headers': headers })
    }
  
    public getCCBSsearch(searchccbs): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + 'usrserv/search_ccbs', searchccbs, { 'headers': headers })
    }
    public getbsInactivelist(pageNumber = 1, pageSize = 10): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      params = params.append('page', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
     // console.log(params);
     // console.log(headers);
      return this.http.get<any>(url + "usrserv/bslistinactive?page=" + pageNumber, { 'headers': headers, params })
    }
  
    public getbsactivelist(pageNumber = 1, pageSize = 10): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      params = params.append('page', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
     // console.log(params);
     // console.log(headers);
      return this.http.get<any>(url + "usrserv/bslistactive?page=" + pageNumber, { 'headers': headers, params })
    }
  
  
    public getccInactivelist(pageNumber = 1, pageSize = 10): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      params = params.append('page', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
      //console.log(params);
     // console.log(headers);
      return this.http.get<any>(url + "usrserv/cclistinactive?page=" + pageNumber, { 'headers': headers, params })
    }
  
    public getccactivelist(pageNumber = 1, pageSize = 10): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      params = params.append('page', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
     // console.log(params);
     // console.log(headers);
      return this.http.get<any>(url + "usrserv/cclistactive?page=" + pageNumber, { 'headers': headers, params })
    }
    public getlistdepartment(pageNumber:any,data:any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      // let params: any = new HttpParams();
      // params = params.append('page', pageNumber.toString());
      // params = params.append('pageSize', pageSize.toString());
     // console.log(params);
     // console.log(headers);
      return this.http.get<any>(url + "usrserv/employee_department?page="+pageNumber+"&data="+data, { 'headers': headers })
    }
    public getlistteamdepartment(pageNumber:any,data:any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }

      return this.http.get<any>(url + "usrserv/fetch_department_employee?page="+pageNumber+"&data="+data, { 'headers': headers })
    }
    public getlistdepartmentsenoor(pageNumber:any,data:any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      // let params: any = new HttpParams();
      // params = params.append('page', pageNumber.toString());
      // params = params.append('pageSize', pageSize.toString());
     // console.log(params);
     // console.log(headers);
      return this.http.get<any>(url + "usrserv/fetch_emp_dropdown?data="+data+"&page="+pageNumber, { 'headers': headers })
    }
    public getlistdepartmentcreate(data:any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + "usrserv/employee",data, { 'headers': headers })
    }
    public getEmployeeedit(id:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'usrserv/employee/'+id, { 'headers': headers })
    }
    public getBusinesssegmentsearch(query:any, page:any): Observable<any> {
      // let data: any = { 'branch': query }
      this.reset();
      const getToken = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + 'usrserv/masterbusinesssegment?page=' + page + '&data=' + query, { 'headers': headers })
    }
    public getBusinesssegmentname(query:any, page:any): Observable<any> {
      // let data: any = { 'branch': query }
      this.reset();
      const getToken = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + 'usrserv/bs_name_list?page=' + page + '&data=' + query, { 'headers': headers })
    }
    public getBusinesssectorsearch(query:any, page:any): Observable<any> {
      // let data: any = { 'branch': query }
      this.reset();
      const getToken = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + 'usrserv/apsectorname_get?page=' + page + '&data=' + query, { 'headers': headers })
    }
    public BSSegmentSave(searchccbs): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + 'usrserv/create_masterbusinesssegment', searchccbs, { 'headers': headers })
    }

    public getPinCodeDropDownscroll(pinkeyvalue, pageno): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      if (pinkeyvalue === null) {
        pinkeyvalue = "";
        console.log('calling empty');
      }
      let urlvalue = url + 'mstserv/pincode_search?query=' + pinkeyvalue + '&page=' + pageno;
      console.log(urlvalue);
      return this.http.get(urlvalue, {headers: new HttpHeaders().set('Authorization', 'Token ' + token)
      }
      )
    }
    public getCityDropDownscroll(citykeyvalue, pageno): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      if (citykeyvalue === null) {
        citykeyvalue = "";
        console.log('calling empty');
      }
      let urlvalue = url + 'mstserv/new_city_search?query=' + citykeyvalue + '&page=' + pageno;
      console.log(urlvalue);
      return this.http.get(urlvalue, {
        headers: new HttpHeaders()
          .set('Authorization', 'Token ' + token)
      }
      )
    }
    public getempcodedropdown(data:any,page:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'usrserv/employee_get_account?page='+page+'&data='+data, { 'headers': headers })
    }
    public getemppaydropdown(data:any,page:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'usrserv/employee_paymode_get?page='+page+'&data='+data, { 'headers': headers })
    }
    public getempbankdropdown(data:any,page:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'usrserv/employee_bank?page='+page+'&data='+data, { 'headers': headers })
    }
    public getempbranchdropdown(id,data:any,page:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'usrserv/employee_bankbranch/'+id+'?page='+page+'&data=+'+data, { 'headers': headers })
    }
    public getempbankcreate(data:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.post<any>(url + 'usrserv/create_employee_account_details',data, { 'headers': headers })
    }
    public getempbankaddsummarys(page:any): Observable<any> {


      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();


      return this.http.get<any>(url + 'usrserv/create_employee_account_details?page='+page, { 'headers': headers })
    }

      

    public getbsdatafilter(data:any,page:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token

  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'usrserv/employee_bs_data?data='+data+'&page='+page, { 'headers': headers })
    }
    public getccdatafilter(id:any,data:any,page:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token

  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
    
      return this.http.get<any>(url + 'usrserv/employee_bs_data?data='+data+'&page='+page, { 'headers': headers })
    }
   

 
    public getcitydatafilter(id:any,data:any,page:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'mstserv/city_scroll/'+id+'?page='+page+'&data='+data, { 'headers': headers })
    }

  public getbranchdatafilter(data:any,page:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'usrserv/Branch_data?data='+data+'&page='+page, { 'headers': headers })
    }
public getstatedatafilter(id:any,data:any,page:any): Observable<any> {

      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token

  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'mstserv/fetch_state_scroll/'+id+'?page='+page+'&data='+data, { 'headers': headers })
    }
 public getdistrictdatafilter(id:any,data:any,page:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'mstserv/district_scroll/'+id+'?page='+page+'&data='+data, { 'headers': headers })
    }

 public getsummarycity(id:any,page:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'mstserv/fetch_district_city_state?status='+id+'&page='+page, { 'headers': headers })

      // const headers = { 'Authorization': 'Token ' + token }
      // let params: any = new HttpParams();
      // return this.http.post<any>(url + 'usrserv/employeeaccount_active_inactivate',data, { 'headers': headers })

    }
    public getactiveinsctiveempbank(data){
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.post<any>(url + 'usrserv/employeeaccount_active_inactivate',data, { 'headers': headers })

    }
    public getsummarydistrict(id:any,page:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'mstserv/fetch_district_state?status='+id+'&page='+page, { 'headers': headers })
    }
    public getsummarydepartmentedit(id:any,page:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'usrserv/department/'+id+'?page='+page, { 'headers': headers })
    }
    public getdesignationsummary(data:any,page:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'mstserv/designation?page='+page+'&data='+data, { 'headers': headers })
    }
    public getdesignationcreate(data:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.post<any>(url + 'mstserv/designation',data,{ 'headers': headers })
    }
    public getsectorcreate(data:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.post<any>(url + 'mstserv/sector',data,{ 'headers': headers })
    }
    public getsectorsummary(data:any,page:any,status:'ALL'): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = {'status':status};
      return this.http.get<any>(url + 'mstserv/sector_summary_search?page='+page+'&data='+data,{ 'headers': headers,'params':params })
    }
    public getsectorsummaryactiveinactive(data:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.post<any>(url + 'mstserv/apsector_activate_inactivate',data,{ 'headers': headers })
    }
    public getexpsummaryactiveinactive(data:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.post<any>(url + 'mstserv/apexpense_activate_inactivate',data,{ 'headers': headers })
    }

    public getbranchsearchscroll(query,page): Observable<any> {
      let data: any = { 'branch': query }
      this.reset();
      const getToken = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + 'usrserv/search_employeebranch?page=' + page + '&query=' + query, { 'headers': headers })
    }
    public getPMDServ(pageNumber, pageSize): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      params = params.append('page', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
     // console.log(params);
     // console.log(headers);
      return this.http.get<any>(url + "mstserv/pmd_branch?page=" + pageNumber, { 'headers': headers, params })
    }
    public PMDCreateForm(bs: any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      let data = JSON.stringify(bs)
      //console.log("bs Data", data)
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + 'mstserv/pmd_branch', data, { 'headers': headers })

    }

    public expenceformcreate(d: any): Observable<any> {

      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token

      // let data = JSON.stringify(bs)
      //console.log("bs Data", data)
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + 'mstserv/expensegrp', d, { 'headers': headers })

    }
    // public expenceidscrollget(d: any,page:any): Observable<any> {

    //   const headers = { 'Authorization': 'Token ' + token }
    //   let params: any = new HttpParams();
    //   params = params.append('page', pageNumber.toString());
    //   params = params.append('pageSize', pageSize.toString());
    //  // console.log(params);
    //  // console.log(headers);
    //   return this.http.get<any>(url + "usrserv/gl_summary?page=" + pageNumber, { 'headers': headers, params })
    // }
     public activeInactivegl(glId, status): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      let data = glId + '?status=' + status
     // console.log('data check for apcat active inactive', data)
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + "usrserv/gl_activate_inactivate" + glId + '?status=' + status, { 'headers': headers })
    }
    public expenceidscrollget(d: any,page:any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      // let data = JSON.stringify(bs)
      //console.log("bs Data", data)
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + 'mstserv/expensegrp_search?query='+d+'&page='+page, { 'headers': headers })

    }
    public expencesummarydata(page:1,d:'',status:'ALL'): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      // let data = JSON.stringify(bs)
      //console.log("bs Data", data)
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = {'data':d,'status':status};
      return this.http.get<any>(url + 'mstserv/expensegrpsumsearch?page='+page, { 'headers': headers ,'params':params})

    }
    // public getGLListServ(pageNumber, pageSize, status): Observable<any> {

    //   this.reset();
    //   const getToken: any = localStorage.getItem('sessionData')
    //   let tokenValue = JSON.parse(getToken);
    //   let token = tokenValue.token

    //   // let data = JSON.stringify(bs)
    //   //console.log("bs Data", data)
    //   const headers = { 'Authorization': 'Token ' + token }
    //   return this.http.get<any>(url + 'mstserv/expensegrp?page='+page, { 'headers': headers })

    // }
    public expencedatacreate(data:any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      // let data = JSON.stringify(bs)
      //console.log("bs Data", data)
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + 'mstserv/expense',data, { 'headers': headers })
    }
   public getGLListServ(pageNumber, pageSize, status): Observable<any> {
    const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
     const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams();
     params = params.append('page', pageNumber.toString());
     params = params.append('pageSize', pageSize.toString());
     // console.log(params);
     // console.log(headers);
     return this.http.post<any>(url + "usrserv/gl_summary?page=" + pageNumber + '&status='+status, { 'headers': headers, params })
    }
    public getGLServ(pageNumber, pageSize): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      params = params.append('page', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
     // console.log(params);
     // console.log(headers);
      return this.http.get<any>(url + "usrserv/gl_summary?page=" + pageNumber, { 'headers': headers, params })
    }
    public empactiveinactive(data:any):Observable<any>{
      const getToken=localStorage.getItem('sessionData');
      let tokenValue=JSON.parse(getToken);
      let token=tokenValue.token;
      const headers={'Authorization': 'Token ' +token};
      return this.http.post<any>(url + "usrserv/employee_activate_inactivate" ,data, { 'headers': headers })

    }
    public getentitysummary(page:any,d:any):Observable<any>{
      const getToken=localStorage.getItem('sessionData');
      let tokenValue=JSON.parse(getToken);
      let token=tokenValue.token;
      const headers={'Authorization': 'Token ' +token};
      return this.http.get<any>(url + "usrserv/entity?page=" +page+'&data='+d, { 'headers': headers })
    }
    public getentityactiveinactive(data:any):Observable<any>{
      const getToken=localStorage.getItem('sessionData');
      let tokenValue=JSON.parse(getToken);
      let token=tokenValue.token;
      const headers={'Authorization': 'Token ' +token};
      return this.http.post<any>(url + "usrserv/entity_activate_inactivate" ,data, { 'headers': headers })
    }
    public getentitycreate(data:any):Observable<any>{
      const getToken=localStorage.getItem('sessionData');
      let tokenValue=JSON.parse(getToken);
      let token=tokenValue.token;
      const headers={'Authorization': 'Token ' +token};
      return this.http.post<any>(url + "usrserv/entity" ,data, { 'headers': headers })

    }
    public getbranchbanksummary(page:any=1,type:any='',accno:any='',paymode:any=''):Observable<any>{
      const getToken=localStorage.getItem('sessionData');
      let tokenValue=JSON.parse(getToken);
      let token=tokenValue.token;
      const headers={'Authorization': 'Token ' +token};
      let params= {'type':type,'accno':accno,'paymode':paymode}
      return this.http.get<any>(url + "mstserv/bankdetailstrn?page=" +page, { 'headers': headers,params })
    }
    // public getbranchbanksummary_search(type:any='',accno:any='',paymode:any='',page:any):Observable<any>{
    //   const getToken=localStorage.getItem('sessionData');
    //   let tokenValue=JSON.parse(getToken);
    //   let token=tokenValue.token;
    //   const headers={'Authorization': 'Token ' +token};
    //   return this.http.get<any>(url + "mstserv/bankdetailstrn_search?page=" +page, { 'headers': headers })
    // }
    public getbranchbankcreate(data:any):Observable<any>{
      const getToken=localStorage.getItem('sessionData');
      let tokenValue=JSON.parse(getToken);
      let token=tokenValue.token;
      const headers={'Authorization': 'Token ' +token};
      return this.http.post<any>(url + "mstserv/bankdetailstrn",data, { 'headers': headers })
    }
    public branchbankDeleteForm(id: number): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.delete<any>(url + "mstserv/branchbankdetailstrndata/" + id, { 'headers': headers })
    }
    public mailtemplatelist(pageNumber,name): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      // let data = JSON.stringify(bs)
      //console.log("bs Data", data)
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + 'mstserv/fetch_mail_template?page=' + pageNumber + '&name='+name, { 'headers': headers })
    }
    public mailtemplactinact(id,status): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      // let data = JSON.stringify(bs)
      //console.log("bs Data", data)
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + 'mstserv/mailtempl_activate_inactivate?id=' + id + '&status='+status, { 'headers': headers })
    }
    public getmail_typescroll(parentkeyvalue, pageno): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      if (parentkeyvalue === null) {
        parentkeyvalue = "";
      }
      // let urlvalue = apiurl + 'venserv/landlordbranch_list?query=' + parentkeyvalue + 'vendor_relation=1' + '&page=' + pageno;
      let urlvalue = url + 'mstserv/fetch_mail_type?query=' + parentkeyvalue  + '&page=' + pageno;
      return this.http.get(urlvalue, {
        headers: new HttpHeaders()
          .set('Authorization', 'Token ' + token)
      }
      )
    }
    public getmail_type(parentkeyvalue): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      if (parentkeyvalue === null) {
        parentkeyvalue = "";
      }
      // let urlvalue = apiurl + 'venserv/landlordbranch_list?query=' + parentkeyvalue + 'vendor_relation=1';
      let urlvalue = url + 'mstserv/fetch_mail_type?query=' + parentkeyvalue;
      return this.http.get(urlvalue, {
        headers: new HttpHeaders()
          .set('Authorization', 'Token ' + token)
      }
      )
    }
    public getconumn_type(data): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      // let urlvalue = apiurl + 'venserv/landlordbranch_list?query=' + parentkeyvalue + 'vendor_relation=1';
      let urlvalue = url + 'mstserv/fetch_column_name';
      return this.http.post(urlvalue,data, {
        headers: new HttpHeaders()
          .set('Authorization', 'Token ' + token)
      }
      )
    }
    public getcolumn_typescroll(data, pageno): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      // let urlvalue = apiurl + 'venserv/landlordbranch_list?query=' + parentkeyvalue + 'vendor_relation=1' + '&page=' + pageno;
      let urlvalue = url + 'mstserv/fetch_column_name?page=' + pageno ;
      return this.http.post(urlvalue,data, {
        headers: new HttpHeaders()
          .set('Authorization', 'Token ' + token)
      }
      )
    }
    public create_mail_temp(data): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      // let urlvalue = apiurl + 'venserv/landlordbranch_list?query=' + parentkeyvalue + 'vendor_relation=1';
      let urlvalue = url + 'mstserv/create_mailtemplate';
      return this.http.post(urlvalue,data, {
        headers: new HttpHeaders()
          .set('Authorization', 'Token ' + token)
      }
      )
    }
    public get_Emp_List(empkeyvalue, page): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + 'usrserv/searchemployee?query=' + empkeyvalue + '&page=' + page, { 'headers': headers })
    }
    public get_ref_type_list(): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const header = {'Authorization': 'Token ' + token}
      return this.http.get<any>(url + 'mstserv/get_ref_type_list', {'headers': header})
    }
    public getempbranchsummarysearch(data):Observable<any>{
      const getToken=localStorage.getItem('sessionData');
      let tokenValue=JSON.parse(getToken);
      let token=tokenValue.token;
      const headers={'Authorization': 'Token ' +token};
      return this.http.get<any>(url + "usrserv/employeebranch_data?" +data, { 'headers': headers })
    }
    public getempbranchlactive(data:any){
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
  
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.post<any>(url + "usrserv/employeebranch_activate_inactivate",data,{ 'headers': headers });
    }
    public getempbranchsummarydata(page:any,sortOrder:'asce'):Observable<any>{
      const getToken=localStorage.getItem('sessionData');
      let tokenValue=JSON.parse(getToken);
      let token=tokenValue.token;
      const headers={'Authorization': 'Token ' +token};
      let params :any = {'sortOrder':sortOrder};
      return this.http.get<any>(url + "usrserv/employeebranch_data?page=" +page, { 'headers': headers, params})
    }
    public getbranchemployee(branch_id,page=1): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = new HttpParams();
      return this.http.get<any>(url + 'usrserv/employee_based_branch?branch_id='+branch_id+'&query=&page='+page, { 'headers': headers })
    }
    public getempbranchDoenload(): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + 'usrserv/employeebranch_download', { 'headers': headers,responseType: 'blob' as 'json' })
    }
    public getempbranchviewdata(data):Observable<any>{
      const getToken=localStorage.getItem('sessionData');
      let tokenValue=JSON.parse(getToken);
      let token=tokenValue.token;
      const headers={'Authorization': 'Token ' +token};
      let params :any = {};
      return this.http.get<any>(url + "usrserv/employeebranch_get_id/" +data, {'headers': headers, params})
    }
    public getemployeeFKdd(empkeyvalue, pageno): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + 'usrserv/searchemployee?query=' + empkeyvalue + '&page=' + pageno, { 'headers': headers })
    }
    public empentitymap(data): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token };//
      return this.http.post<any>(url + 'usrserv/cre_emp_entity',data, { 'headers': headers })
    }
    public empentitymapsearch(page,entity_id,employee_id): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token };//
      if (employee_id === undefined || employee_id=== "" ||employee_id === null) {
        employee_id = ""
      }
      if (entity_id === undefined || entity_id === "" || entity_id === null) {
        entity_id = ""
      }
      return this.http.get<any>(url + 'usrserv/cre_emp_entity?page='+page+'&entity_id='+entity_id+'&employee_id='+employee_id, { 'headers': headers })
    }
    public empentitymapsummary(page:number): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token };//
      return this.http.get<any>(url + 'usrserv/cre_emp_entity?page='+page, { 'headers': headers })
    }
    public empentitymapinactive(data): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token };//
      return this.http.post<any>(url + 'usrserv/del_emp_entity',data, { 'headers': headers })
    }
    public getentity(): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token };//
      return this.http.get<any>(url + 'usrserv/entity', { 'headers': headers })
    }
    public getemployeeFK(empkeyvalue): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + "usrserv/searchemployee?query=" + empkeyvalue, { 'headers': headers })
    }
    public getlistdepartmentcreate_2(data:any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + "usrserv/employee",data, { 'headers': headers })
    }
    public employeetypeMap(data:any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + "usrserv/emp_type_mapping",data, { 'headers': headers })
    }
    public rmMapcreate(data:any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + "usrserv/emp_rm_mapping",data, { 'headers': headers })
    }
    public roleMapcreate(data:any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + "usrserv/emp_role_grade_mapping",data, { 'headers': headers })
    }
    public BsccMap(data:any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(url + "usrserv/emp_ccbs_mapping",data, { 'headers': headers })
    }
    public EmptypeMappingSum(page,data): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params={'emp_id':data}
      return this.http.get<any>(url + "usrserv/emp_type_mapping?page="+page, { 'headers': headers,params })
    }
    public rmMappingSum(page,data): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params={'emp_id':data}
      return this.http.get<any>(url + "usrserv/emp_rm_mapping?page="+page, { 'headers': headers,params })
    }
    public roleMappingSum(page,data): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params={'emp_id':data}
      return this.http.get<any>(url + "usrserv/emp_role_grade_mapping?page="+page, { 'headers': headers,params })
    }
    public BSCCMappingSum(page,data): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params={'emp_id':data}
      return this.http.get<any>(url + "usrserv/emp_ccbs_mapping?page="+page, { 'headers': headers,params })
    }
    
    public getlistdepartment_data_entity(pageNumber:any,emp_id): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(url + "usrserv/fetch_department_employee?page="+pageNumber+'&dept_id='+emp_id, { 'headers': headers })
    }
    public getlistdepartmentsenoor_entity(pageNumber:any,data:any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      
      return this.http.get<any>(url + "usrserv/fetch_emp_dropdown_entity?data="+data+"&page="+pageNumber, { 'headers': headers })
    }
    public getDesignationList_list_entity(filter :any, sortOrder = 'asce', pageNumber = 1, pageSize:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = {'sortOrder': sortOrder,'pageSize': pageSize.toString()};
  
      return this.http.get<any>( url + "mstserv/designation_role?page=" + pageNumber+'&data='+filter, { 'headers': headers,'params':params })
    }
    public getDesignationList_entity(filter :any, sortOrder = 'asce', pageNumber = 1, pageSize:any): Observable<any> {
      this.reset();
      const getToken = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      let params: any = {'sortOrder': sortOrder,'pageSize': pageSize.toString()};
  
      return this.http.get<any>( url + "mstserv/designation_grade?page=" + pageNumber+'&data='+filter, { 'headers': headers,'params':params })
    }
    public getCategory_Dept(Categoryvalue: string, deptid: any): Observable<any> {
      this.reset();
      let token = '';
      const getToken = localStorage.getItem("sessionData");
      if (getToken) {
          let tokenValue = JSON.parse(getToken);
          token = tokenValue.token
      }
      const headers = { 'Authorization': 'Token ' + token }
      let caturl = url + "memserv/category_search?query=" + Categoryvalue + "&department_id=" + deptid;
      // console.log(caturl);
      return this.http.get<any>(caturl, { 'headers': headers })
  }
     
  public getDepartment(deptkeyvalue): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let Url = url + 'usrserv/searchdepartment?query=' + deptkeyvalue
    // console.log(url);
    return this.http.get<any>(Url, { 'headers': headers })
}
public get_EmployeeList_2(cckeyvalue, pageno): Observable<any> {
  this.reset();
  const getToken = localStorage.getItem("sessionData");
  let tokenValue = JSON.parse(getToken);
  let token = tokenValue.token
  if (cckeyvalue === null) {
      cckeyvalue = "";
  }
  let urlvalue = url + '/memosearchemp?query=' + cckeyvalue + '&page=' + pageno;
  return this.http.get(urlvalue, {
      headers: new HttpHeaders()
          .set('Authorization', 'Token ' + token)
  }
  )
}
public getDepartmentPage(deptkeyvalue, pageno, type): Observable<any> {
  this.reset();
  const getToken = localStorage.getItem("sessionData");
  let tokenValue = JSON.parse(getToken);
  let token = tokenValue.token;
  const headers = { 'Authorization': 'Token ' + token }
  let Url = ''
  // console.log("type",type);
  if (type === '') {
      Url = url + 'usrserv/searchdepartment?query=' + deptkeyvalue + '&page=' + pageno;
  } else {
    Url = url + 'usrserv/searchdepartment?query=' + deptkeyvalue + '&page=' + pageno + '&type=' + type
  }
  // console.log(url);
  return this.http.get<any>(Url, { 'headers': headers })
}
public get_empTodeptMapping(empId: any, pageno: any): Observable<any> {
  this.reset();
  const getToken = localStorage.getItem("sessionData");
  let tokenValue = JSON.parse(getToken);
  let token = tokenValue.token
  let idValue = empId
  const headers = { 'Authorization': 'Token ' + token }
  let Url = url + 'usrserv/employee/' + idValue + '/department?' + 'page=' + pageno;
  return this.http.get<any>(Url, { 'headers': headers })
}
public getSingleEmployee(empId): Observable<any> {
  this.reset();
  const getToken = localStorage.getItem("sessionData");
  let tokenValue = JSON.parse(getToken);
  let token = tokenValue.token
  let emp = empId
  const headers = { 'Authorization': 'Token ' + token }
  return this.http.get<any>(url + 'usrserv/employee/'+ emp , { 'headers': headers })
}
public adddept_Toemployee(memojson: any, empId: any, admin: any, memo: any): Observable<any> {
  this.reset();
  const getToken = localStorage.getItem("sessionData");
  let tokenValue = JSON.parse(getToken);
  let token = tokenValue.token
  let idValue = empId
  let rights = {
      "isadmin": admin,
      "can_create": memo
  }
  const Url = url + 'usrserv/employee/' + idValue + '/department'
  let object = {
      "method": "add"
  }
  let json = Object.assign({}, memojson, object, rights, idValue)
  const headers = { 'Authorization': 'Token ' + token }
  return this.http.post<any>(Url, json, { 'headers': headers })
}
public removedept_Fromemployee(memojson: any, empId: any): Observable<any> {
  this.reset();
  const getToken = localStorage.getItem("sessionData");
  let tokenValue = JSON.parse(getToken);
  let token = tokenValue.token
  let idValue = empId
  const Url = url + 'usrserv/employee/' + idValue + '/department'
  let object = {
      "method": "remove"
  }
  let json = Object.assign({}, memojson, object, idValue)
  const headers = { 'Authorization': 'Token ' + token }
  return this.http.post<any>(Url, json, { 'headers': headers })
}
public SingleEmployeeActiveInactive(data): Observable<any> {
  this.reset();
  const getToken = localStorage.getItem("sessionData");
  let tokenValue = JSON.parse(getToken);
  let token = tokenValue.token
  let submitValue = data
  const headers = { 'Authorization': 'Token ' + token }
  return this.http.post<any>(url + 'usrserv/emp_activate', submitValue, { 'headers': headers })
}
public get_designation(dsgkeyvalue, pageno): Observable<any> {
  this.reset();
  const getToken = localStorage.getItem("sessionData")
  let tokenValue = JSON.parse(getToken);
  let token = tokenValue.token
  if (dsgkeyvalue === null) {
    dsgkeyvalue = "";
  }
  let urlvalue = url + 'mstserv/designation_search?query=' + dsgkeyvalue + '&page=' + pageno;
  return this.http.get(urlvalue, {
    headers: new HttpHeaders()
      .set('Authorization', 'Token ' + token)
  }
  )
}
public get_singleproduct(vendorId, productId): Observable<any> {
  this.reset();
  const getToken: any = localStorage.getItem('sessionData')
  let tokenValue = JSON.parse(getToken);
  let token = tokenValue.token
  let idValue = productId
  const headers = { 'Authorization': 'Token ' + token }
  return this.http.get<any>(url + "venserv/vendor/" + vendorId + "/product/" + idValue, { 'headers': headers })
}

}


  

