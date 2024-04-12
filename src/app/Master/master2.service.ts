import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject,map } from 'rxjs';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { environment } from 'src/environments/environment';
const url = environment.masterurl

@Injectable({
  providedIn: 'root'
})
export class Master2Service {

  idleState = 'Not started.';
  timedOut = false;
  ComingFrom = '';
  permissionJson: any;
  constructor(private idle: Idle, private http: HttpClient) { }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  public get_designation(dsgkeyvalue, pageno): Observable<any> {
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
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    let idValue = productId
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "venserv/vendor/" + vendorId + "/product/" + idValue, { 'headers': headers })
  }
  public getPinCode(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + 'mstserv/pincode_search', { 'headers': headers })
  }
  public getCity(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + 'mstserv/new_city_search', { 'headers': headers })
  }

  public getState(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + 'mstserv/state_search', { 'headers': headers })
  }


  public getDistrict(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + 'mstserv/district_search', { 'headers': headers })
  }
  public getDesignationSearch(desgkeyvalue): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + 'mstserv/designation_search?query=' + desgkeyvalue, { 'headers': headers })
  }
  public getContactSearch(contactkeyvalue): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + 'mstserv/contacttype_search?query=' + contactkeyvalue, { 'headers': headers })
  }
  public get_contact(contactkeyvalue, pageno): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    if (contactkeyvalue === null) {
      contactkeyvalue = "";
    }
    let urlvalue = url + 'mstserv/contacttype_search?query=' + contactkeyvalue + '&page=' + pageno;
    return this.http.get(urlvalue, {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + token)
    }
    )
  }
  public productEditForm(id, vendorId, productJson): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let idValue = {
      "id": id
    }
    let productEditjson = Object.assign({}, idValue, productJson)
    return this.http.post<any>(url + "venserv/vendor/" + vendorId + "/product", productEditjson, { 'headers': headers })
  }
  public productCreateForm(vendorId, productJson): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    console.log("clientCreateForm", JSON.stringify(productJson))
    return this.http.post<any>(url + "venserv/vendor/" + vendorId + "/product", productJson, { 'headers': headers })
  }
  public productCatCreateForm(productCatJson): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    console.log("productCatJson", productCatJson)
    return this.http.post<any>(url + "mstserv/pdtcat", productCatJson, { 'headers': headers })
  }
  public getproductCatEdit(id: any): Observable<any> {
    this.reset();
    let idValue = id.id
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + 'mstserv/pdtcat/' + idValue, { headers })
  }
  public editProductCatEdit(data: any, id: number): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const body = JSON.stringify(data)
    let idValue = id;
    let value = {
      "id": idValue,
    }
    let jsonValue = Object.assign({}, data, value)
    const headers = { 'Authorization': 'Token ' + token }
    console.log("editProductCatEdit", body)
    return this.http.post<any>(url + 'mstserv/pdtcat', jsonValue, { 'headers': headers })
  }
  public get_productCat(pckeyvalue, pageno): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    if (pckeyvalue === null) {
      pckeyvalue = "";
    }
    let urlvalue = url + 'mstserv/productcat_search?query=' + pckeyvalue + '&page=' + pageno;
    return this.http.get(urlvalue, {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + token)
    }
    )
  }
  public get_productType(ptkeyvalue, pageno): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    if (ptkeyvalue === null) {
      ptkeyvalue = "";
    }
    let urlvalue = url + 'mstserv/producttype_search?query=' + ptkeyvalue + '&page=' + pageno;
    return this.http.get(urlvalue, {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + token)
    }
    )
  }
  public createhsnproductdetails(data,page){
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get(url +'mstserv/hsn_data?page='+page+'&data='+data,{'headers':headers});
  
  }
  public getuom_LoadMore(uomKey, pageno): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    if (uomKey === null) {
      uomKey = "";
    }
    let urlvalue = url + 'mstserv/uom_search?query=' + uomKey + '&page=' + pageno;
    return this.http.get(urlvalue, {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + token)
    }
    )
  }
  public getapcat_LoadMore(q, pageno): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    if (q === null) {
      q = "";
    }
    let urlvalue = url + 'mstserv/Apcategory_search?query=' + q + '&page=' + pageno;
    return this.http.get(urlvalue, {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + token)
    }
    )
  }
  public getapsubcat(id): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/Apsubcategory_search?category_id=" + id, { 'headers': headers })
  }
  public getproductcatdropdown(pckeyvalue): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/productcat_search?query=" + pckeyvalue, { 'headers': headers })
  }
  public getproducttypedropdown(ptkeyvalue): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/producttype_search?query=" + ptkeyvalue, { 'headers': headers })
  }
  public getuom_Search(uomKey): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/uom_search?query=" + uomKey, { 'headers': headers })
  }
  public gethsn(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/hsn", { 'headers': headers })
  }
  public getapcatdropdown(q): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/Apcategory_search?query=" + q, { 'headers': headers })
  }
  public getapsubcat_LoadMore(q, pageno): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    if (q === null) {
      q = "";
    }
    let urlvalue = url + 'mstserv/Apsubcategory_search?query=' + q + '&page=' + pageno;
    return this.http.get(urlvalue, {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + token)
    }
    )
  }
  public ProductCreateForms(productJson): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    console.log("productpost", productJson)
    return this.http.post<any>(url + "mstserv/product", productJson, { 'headers': headers })


  }
  public getproductcategorydata(id,data,page){
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get(url +'mstserv/productclassification/'+id+'?page='+page+'&data='+data,{'headers':headers});
  }
  public getproductsubcategorydata(id,data,page){
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get(url +'mstserv/productcat/'+id+'?page='+page+'&data='+data,{'headers':headers});
  }
  public getproducttypedata(): Observable<any>{
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get(url +'mstserv/productclassification',{'headers':headers});
  }
  public createproductspecification(data:any,query:any,page:any){
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get(url +'mstserv/productspecification_data/'+data+'?page='+page+'&data='+query,{'headers':headers});
  
  }
  public createproductcategorydata(data:any){
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.post(url+'mstserv/pdtcat',data,{'headers':headers});
  }
  public createproductsubcategorydata(data:any){
    console.log('call')
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.post(url+'mstserv/pdttype',data,{'headers':headers});
  }
  public createspecificationsdata(data:any){
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.post(url+'mstserv/productspecificationmtom',data,{'headers':headers});
  }
  public productmasterEditForm(id, productJson): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let idValue = {
      "id": id
    }
    let jsonValue = Object.assign({}, idValue, productJson)
    console.log("productedit", JSON.stringify(jsonValue))
    return this.http.post<any>(url + "mstserv/product", jsonValue, { 'headers': headers })

  }
  public getProductmaster(): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/product", { 'headers': headers })
  }
  public getproductpage(pageNumber = 1, pageSize = 10,data:any): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let params: any = new HttpParams()
      .set('page', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<any>(url + 'mstserv/product?page=' + pageNumber+'&data='+data, { headers, params })
      .pipe(
        map(res => res)
      );
  }
  public productactiveinactive(id,data:any){
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.post(url +'mstserv/productactiveinactive/'+id,data,{'headers':headers});
  }
}
