import { Component, OnInit, EventEmitter, Output,  ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Master2Service } from '../master2.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/service/notification.service';
import { debounceTime, distinctUntilChanged, tap, filter, switchMap, finalize,takeUntil, map } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable, from, fromEvent} from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
export interface ProductCategory {
  id: string;
  product_category:any;
  name: string;
}
export interface ProductType {
  id: string;
  name: string;
}
export interface UOM {
  id: string;
  name: string;
}
export interface Apcategory {
  id: string;
  name: string;
}
export interface Apsubcategory {
  id: string;
  name: string;
}
export interface producttype{
  id:string;
  name:string
}
export interface productcategory{
  id:string;
  product_category:string;
}
export interface productsubcategory{
  id:string;
  product_subcategory:string;
}
export interface hsncodedata{
  id:string;
  code:string;
}
@Component({
  selector: 'app-productmaster',
  templateUrl: './productmaster.component.html',
  styleUrls: ['./productmaster.component.scss']
})
export class ProductmasterComponent implements OnInit {
  @Output() onCancel = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();
  productForm: FormGroup;
  productcatlist: Array<ProductCategory>;
  producttypelist: Array<ProductType>;
  categorylist: Array<Apcategory>;
  subcatlist: Array<Apsubcategory>;
  // categorylist: any;
  // subcatlist: any;
  uomlist: Array<UOM>;
  hsnlist: any;
  has_next = true;
  has_previous = true;
  uom_next = true;
  uom_previous = true;
  ptype_next = true;
  ptype_previous = true;
  cat_next = true;
  cat_previous = true;
  subcat_next = true;
  subcat_previous = true;
  currentpage: number = 1;
  currentpagept: number = 1; 
  currentpageuom: number = 1;
  currentpagecat: number = 1;  
  currentpagesubcat: number = 1;  
  isLoading = false;
  disableSubmit = true;
  productcategorydetails:any=FormGroup;
  productsubcatdetails:any=FormGroup;
  SpecificationForm:any=FormGroup;
  specification:any=FormGroup;
  producttypearray:Array<any>=[];
  prodcutcategorylist:Array<any>=[];
  productsubcatlist:Array<any>=[];
  productspecificationArray:Array<any>=[];
  producthsndata:Array<any>=[];
  has_productcategorypre:boolean=false;
  has_productcategorynext:boolean=false;
  has_productcategorypage:number=1;

  has_productsubcategorypre:boolean=false;
  has_productsubcategorynext:boolean=false;
  has_productsubcategorypage:number=1;
  has_specificationpre:boolean=false;
  has_specificationnext:boolean=false;
  has_specificationpage:any=1;
  product_isblocked:boolean=false;
  product_isrcm:boolean=false;
  has_producthsnnxt:boolean=false;
  has_producthsnpre:boolean=false;
  has_producthsnpage:any=1;
  table_visible:boolean=false;
  table_data:Array<any>=[];
  producttradingiyem:any={'Yes':1,"No":0}
  
  selected='No';
  makemodule='No'
  makemodule_value:any={'Yes':1,'No':0}
  producttype_data={'Goods & Service':1,'Goods':2,'Service':3};
  @ViewChild('modalclose') modalclose:ElementRef;
  @ViewChild('modalclose_2') modalclose_2:ElementRef;
  @ViewChild('modalclose_3') modalclose_3:ElementRef;
  @ViewChild('catgorydatascroll') matproductcategory:MatAutocomplete;
  @ViewChild('productcategorydatavalue') paroductcategoryinput:any;
  @ViewChild('specificationtye') matspecication:MatAutocomplete;
  @ViewChild('specification') specificationinput:any;

  @ViewChild('subcatgorydatascroll') matproductsubcategory:MatAutocomplete;
  @ViewChild('productsubcategorydatavalue') paroductsubcategoryinput:any;

  @ViewChild('apcathsn') matproducthsn:MatAutocomplete;
  @ViewChild('hsninput') paroducthsnInput:any;

  @ViewChild('pdtcat') matproductcatAutocomplete: MatAutocomplete;
  @ViewChild('productcatInput') productcatInput: any;
  
  @ViewChild('pdttype') matproducttypeAutocomplete: MatAutocomplete;
  @ViewChild('producttypeInput') producttypeInput: any;

  @ViewChild('uomm') matAutocomplete: MatAutocomplete;
  @ViewChild('uomInput') uomInput: any;

  @ViewChild('apcat') matcatAutocomplete: MatAutocomplete;
  @ViewChild('apcaatInput') apcaatInput: any;

  @ViewChild('apsubcat') matsubcatAutocomplete: MatAutocomplete;
  @ViewChild('apsubcaatInput') apsubcaatInput: any;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;

  constructor(private formbuilder: FormBuilder, private masterservice: Master2Service,
    private notification: NotificationService, private toaster: ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({

      name: new FormControl('', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]),
      uom_id: ['', Validators.required],
      hsn_id: ['', Validators.required],
      unitprice: ['1', Validators.required],
      weight: ['1', Validators.required],
      productcategory_id: ['', Validators.required],
      producttype_id: ['', Validators.required],
      category_id: ['', Validators.required],
      subcategory_id: ['', Validators.required],
      product_code:['',Validators.required],
      product_type:['',Validators.required],
      product_main_cat:['',Validators.required],
      product_subcat:['',Validators.required],
      product_tradingitem:[this.selected,Validators.required],
      checkbox:['',Validators.required],
      specificationstype:['',Validators.required],
      configuration:['',Validators.required],
      specificationed:['',Validators.required],
      product_isblocked:['',Validators.required],
      product_isrcm:['',Validators.required],
      make_module:[this.makemodule,Validators.required]
    });
    this.productcategorydetails=this.formbuilder.group({
      namess:['',Validators.required],
      productstockimpact:['',Validators.required],
      productdivision:['',Validators.required]
    });
    this.productsubcatdetails=this.formbuilder.group({
      productcat:['',Validators.required],
      productcatname:['',Validators.required]
    });
    console.log('one');
    this.specification=this.formbuilder.group({
      specificationed:['',Validators.required]
    });
    let pckeyvalue: String = "";
    // this.getprocatValue(pckeyvalue);
    console.log('2');
    this.SpecificationForm=this.formbuilder.group({
      specificationed:['',Validators.required]
    })
    // this.productForm.get('product_main_cat').valueChanges
    // .pipe(
    //   debounceTime(100),
    //   distinctUntilChanged(),
    //   tap(() => {
    //     this.isLoading = true;
    //     console.log('inside tap')

    //   }),
    //   switchMap(value => this.masterservice.getproductcategorydata(this.productForm.get('product_type').value.id,value,1)
    //     .pipe(
    //       finalize(() => {
    //         this.isLoading = false
    //       }),
    //     )
    //   )
    // )
    // .subscribe((results: any[]) => {
    //   let datas = results["data"];
    //   this.prodcutcategorylist = datas;


    // });
    // console.log('3');
    // this.productForm.get('product_subcat').valueChanges
    // .pipe(
    //   debounceTime(100),
    //   distinctUntilChanged(),
    //   tap(() => {
    //     this.isLoading = true;
    //     console.log('inside tap')

    //   }),
    //   switchMap(value => this.masterservice.getproductsubcategorydata(this.productForm.get('product_main_cat').value.id,this.productForm.get('product_subcat').value,1)
    //     .pipe(
    //       finalize(() => {
    //         this.isLoading = false
    //       }),
    //     )
    //   )
    // )
    // .subscribe((results: any[]) => {
    //   let datas = results["data"];
    //   this.productsubcatlist = datas;

    // });
    console.log('4');
    // this.productForm.get('specificationstype').valueChanges
    // .pipe(
    //   debounceTime(100),
    //   distinctUntilChanged(),
    //   tap(() => {
    //     this.isLoading = true;
    //     console.log('inside tap')

    //   }),
    //   switchMap(value => this.masterservice.createproductspecification(this.productForm.get('product_main_cat').value.id,this.productForm.get('specificationstype').value,1)
    //     .pipe(
    //       finalize(() => {
    //         this.isLoading = false
    //       }),
    //     )
    //   )
    // )
    // .subscribe((results: any[]) => {
    //   let datas = results["data"];
    //   this.productspecificationArray = datas;

    // });
    console.log('5');
    this.productForm.get('productcategory_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')

        }),
        switchMap(value => this.masterservice.get_productCat(value, 1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.productcatlist = datas;

      });
      console.log('6');
      // this.productsubcatdetails.get('productcat').valueChanges
      // .pipe(
      //   debounceTime(100),
      //   distinctUntilChanged(),
      //   tap(() => {
      //     this.isLoading = true;
      //     console.log('inside tap')

      //   }),
      //   switchMap(value => this.masterservice.getproductcategorydata(this.productForm.get('product_type').value.id,value, 1)
      //     .pipe(
      //       finalize(() => {
      //         this.isLoading = false
      //       }),
      //     )
      //   )
      // )
      // .subscribe((results: any[]) => {
      //   let datas = results["data"];
      //   this.productcatlist = datas;

      // });
      console.log('7');
    let ptkeyvalue: String = "";
    this.getprotypeValue(ptkeyvalue);
    console.log('8');
    this.productForm.get('producttype_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')

        }),
        switchMap(value => this.masterservice.get_productType(value,1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.producttypelist = datas;

      });
      console.log('9');
      this.productForm.get('hsn_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')

        }),
        switchMap(value => this.masterservice.createhsnproductdetails(value,1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.producthsndata = datas;

      });
      console.log('10');
    let uomkeyvalue: String = "";
    this.getUOMValue(uomkeyvalue);
    console.log('11');
    this.productForm.get('uom_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')

        }),

        switchMap(value => this.masterservice.getuom_LoadMore(value, 1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.uomlist = datas;

      });
      console.log('12');
      let keyvalue: String = "";
    this.getApcateValue(keyvalue);
    console.log('13');
    this.productForm.get('category_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')

        }),
        switchMap(value => this.masterservice.getapcat_LoadMore(value, 1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.categorylist = datas;

      });
      console.log('14');
      let kvalue: String = "";
    // this.getApSubcateValue(kvalue);
    console.log('15');
    this.productForm.get('subcategory_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')

        }),
        switchMap(value => this.masterservice.getapsubcat(this.productForm.get('category_id').value.id+'&query='+value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.subcatlist = datas;

      })
      console.log('16');
    this.getHSNValue();
  }
  public displayFnPdtcategory(pdtcat?: ProductCategory): string | undefined {
    console.log('id', pdtcat.id);
    console.log('name', pdtcat.name);
    return pdtcat ? pdtcat.name : undefined;
  }

  get pdtcat() {
    return this.productForm.value.get('productcategory_id');
  }
  public displayFnProducttype(pdttype?: ProductType): string | undefined {
    console.log('id', pdttype.id);
    console.log('name', pdttype.name);
    return pdttype ? pdttype.name : undefined;
  }

  get pdttype() {
    return this.productForm.value.get('producttype_id');
  }
  public displayFnUOM(uomm?: UOM): string | undefined {
    console.log('id', uomm.id);
    console.log('name', uomm.name);
    return uomm ? uomm.name : undefined;
  }

  get uomm() {
    return this.productForm.value.get('uom_id');
  }
  public displayFnApcategory(apcat?: Apcategory): string | undefined {
    console.log('id', apcat.id);
    console.log('name', apcat.name);
    return apcat ? apcat.name : undefined;
  }
  public displatproductcategory(data? : productcategory): string | undefined{
    return data ? data.product_category : undefined;
  }
  public displayproductsubcategory(data ?:productsubcategory):string | undefined{
    return data ? data.product_subcategory:undefined;
  }
  get apcat() {
    return this.productForm.value.get('category_id');
  }
  public displayFnApsubcategory(apsubcat?: Apcategory): string | undefined {
    console.log('id', apsubcat.id);
    console.log('name', apsubcat.name);
    return apsubcat ? apsubcat.name : undefined;
  }
  public displayhsncodeData(data ?:hsncodedata):string | undefined{
    return data ?data.code:undefined;
  }
  public displayproducttype(producttype?:producttype):string | undefined{
    return producttype ? producttype.name : undefined;
  }
  get apsubcat() {
    return this.productForm.value.get('subcategory_id');
  }
 
  getprocatValue(pckeyvalue) {
    this.masterservice.getproductcatdropdown(pckeyvalue)
      .subscribe(result => {
        this.productcatlist = result['data']
        console.log("procat", this.productcatlist)
      })
  }
  getprotypeValue(ptkeyvalue) {
    this.masterservice.getproducttypedropdown(ptkeyvalue)
      .subscribe(result => {
        this.producttypelist = result['data']
        console.log("protype", this.producttypelist)
      })
  }
  getUOMValue(uomkeyvalue) {
    this.masterservice.getuom_Search(uomkeyvalue)
      .subscribe(result => {
        this.uomlist = result['data']
        console.log("uom", this.uomlist)
      })
  }
  
  getHSNValue() {
    this.masterservice.gethsn()
      .subscribe(result => {
        this.hsnlist = result['data']
        console.log("hsn", this.hsnlist)
      })
  }
  getApcateValue(keyvalue) {
    this.masterservice.getapcatdropdown(keyvalue)
      .subscribe(result => {
        this.categorylist = result['data']
        console.log("cat", this.categorylist)
      })
  }
  PdtcategoryScroll() {
    setTimeout(() => {
      if (
        this.matproductcatAutocomplete &&
        this.autocompleteTrigger &&
        this.matproductcatAutocomplete.panel
      ) {
        fromEvent(this.matproductcatAutocomplete.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matproductcatAutocomplete.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matproductcatAutocomplete.panel.nativeElement.scrollTop;
            const scrollHeight = this.matproductcatAutocomplete.panel.nativeElement.scrollHeight;
            const elementHeight = this.matproductcatAutocomplete.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_next === true) {
                this.masterservice.get_productCat(this.productcatInput.nativeElement.value, this.currentpage + 1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.productcatlist = this.productcatlist.concat(datas);
                    if (this.productcatlist.length >= 0) {
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
  ProducttypeScroll() {
    setTimeout(() => {
      if (
        this.matproducttypeAutocomplete &&
        this.autocompleteTrigger &&
        this.matproducttypeAutocomplete.panel
      ) {
        fromEvent(this.matproducttypeAutocomplete.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matproducttypeAutocomplete.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matproducttypeAutocomplete.panel.nativeElement.scrollTop;
            const scrollHeight = this.matproducttypeAutocomplete.panel.nativeElement.scrollHeight;
            const elementHeight = this.matproducttypeAutocomplete.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.ptype_next === true) {
                this.masterservice.get_productType(this.producttypeInput.nativeElement.value, this.currentpagept + 1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.producttypelist = this.producttypelist.concat(datas);
                    if (this.producttypelist.length >= 0) {
                      this.ptype_next = datapagination.has_next;
                      this.ptype_previous = datapagination.has_previous;
                      this.currentpagept = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  UOMScroll() {
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
            if (atBottom) {
              if (this.uom_next === true) {
                this.masterservice.getuom_LoadMore(this.uomInput.nativeElement.value, this.currentpageuom + 1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.uomlist = this.uomlist.concat(datas);
                    if (this.uomlist.length >= 0) {
                      this.uom_next = datapagination.has_next;
                      this.uom_previous = datapagination.has_previous;
                      this.currentpageuom = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  ApcategoryScroll() {
    setTimeout(() => {
      if (
        this.matcatAutocomplete &&
        this.autocompleteTrigger &&
        this.matcatAutocomplete.panel
      ) {
        fromEvent(this.matcatAutocomplete.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matcatAutocomplete.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matcatAutocomplete.panel.nativeElement.scrollTop;
            const scrollHeight = this.matcatAutocomplete.panel.nativeElement.scrollHeight;
            const elementHeight = this.matcatAutocomplete.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.cat_next === true) {
                this.masterservice.getapcat_LoadMore(this.apcaatInput.nativeElement.value, this.currentpagecat + 1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.categorylist = this.categorylist.concat(datas);
                    if (this.categorylist.length >= 0) {
                      this.cat_next = datapagination.has_next;
                      this.cat_previous = datapagination.has_previous;
                      this.currentpagecat = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  ApsubcategoryScroll() {
    setTimeout(() => {
      if (
        this.matsubcatAutocomplete &&
        this.autocompleteTrigger &&
        this.matsubcatAutocomplete.panel
      ) {
        fromEvent(this.matsubcatAutocomplete.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matsubcatAutocomplete.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matsubcatAutocomplete.panel.nativeElement.scrollTop;
            const scrollHeight = this.matsubcatAutocomplete.panel.nativeElement.scrollHeight;
            const elementHeight = this.matsubcatAutocomplete.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.subcat_next === true) {
                this.masterservice.getapsubcat_LoadMore(this.apsubcaatInput.nativeElement.value, this.currentpagesubcat + 1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.subcatlist = this.subcatlist.concat(datas);
                    if (this.subcatlist.length >= 0) {
                      this.subcat_next = datapagination.has_next;
                      this.subcat_previous = datapagination.has_previous;
                      this.currentpagesubcat = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
   productnamedisplay(){
     this.productForm.patchValue({
      'producttype_id':this.productForm.get('name').value
     })
   }
  
  productCreateForm() {
    console.log(this.productForm.get('product_isrcm').value?"Y":"N");
    console.log(this.productForm.get('product_isblocked').value?"Y":"N");
    console.log(this.productForm.value);
    // if(this.productForm.get('product_code').value==null || this.productForm.get('product_code').value==undefined || this.productForm.get('product_code').value==""){
    //   this.notification.showWarning('please Select The Product Code');
    //   return false;
    // }
    if(this.productForm.get('product_type').value==null || this.productForm.get('product_type').value=='' || this.productForm.get('product_type').value==undefined){
      this.notification.showWarning('please Select The Product Type');
      return false;
    }
    if(this.productForm.get('product_main_cat').value== '' || this.productForm.get('product_main_cat').value==null || this.productForm.get('product_main_cat').value==undefined){
      this.notification.showWarning('please Select The Product Main Category');
      return false;
    }
    if(this.productForm.get('product_subcat').value== '' || this.productForm.get('product_subcat').value==null || this.productForm.get('product_subcat').value==undefined){
      this.notification.showWarning('please Select The Product SubCategory');
      return false;
    }
    if(this.productForm.get('name').value== '' || this.productForm.get('name').value==null || this.productForm.get('name').value==undefined){
      this.notification.showWarning('please Select The ProductName');
      return false;
    }
    if(this.productForm.get('product_tradingitem').value== '' || this.productForm.get('product_tradingitem').value==null || this.productForm.get('product_tradingitem').value==undefined){
      this.notification.showWarning('please Select The Product Trading Item');
      return false;
    }
    // if(this.productForm.get('hsn_id').value== '' || this.productForm.get('hsn_id').value==null || this.productForm.get('product_tradingitem').value==undefined){
    //   this.notification.showWarning('please Select The Product Trading Item');
    //   return false;
    // }
    if(this.productForm.get('category_id').value== '' || this.productForm.get('category_id').value==null || this.productForm.get('category_id').value==undefined){
      this.notification.showWarning('please Select The ApCategory');
      return false;
    }
    if(this.productForm.get('subcategory_id').value== '' || this.productForm.get('subcategory_id').value==null || this.productForm.get('subcategory_id').value==undefined){
      this.notification.showWarning('please Select The ApSubCategory');
      return false;
    }
    if(this.productForm.get('uom_id').value== '' || this.productForm.get('uom_id').value==null || this.productForm.get('uom_id').value==undefined){
      this.notification.showWarning('please Select The UOM');
      return false;
    }
    if(this.productForm.get('unitprice').value== '' || this.productForm.get('unitprice').value==null || this.productForm.get('unitprice').value==undefined){
      this.notification.showWarning('please Select The UnitPrice');
      return false;
    }
    if(this.productForm.get('weight').value== '' || this.productForm.get('weight').value==null || this.productForm.get('weight').value==undefined){
      this.notification.showWarning('please Select The Weight');
      return false;
    }
    if(this.productForm.get('make_module').value=='' || this.productForm.get('make_module').value==null || this.productForm.get('make_module')==undefined){
      this.notification.showWarning('please Select The Make Module')
    }
    // if(this.productForm.get('specificationstype').value== '' || this.productForm.get('specificationstype').value==null || this.productForm.get('specificationstype').value==undefined){
    //   this.notification.showWarning('please Select The specificationstype');
    //   return false;
    // }
    // if(this.productForm.get('configuration').value== '' || this.productForm.get('configuration').value==null || this.productForm.get('configuration').value==undefined){
    //   this.notification.showWarning('please Select The configuration');
    //   return false;
    // }
    console.log(this.productForm.value);
    let dict:any={};
    if(this.table_data.length>0){
      for(let i of this.table_data){
        dict[i['Specification']]=i['Configuration'];
      }
    }
    console.log('before payload',dict)
    
    let data:any={
      'product_isrcm':this.productForm.get('product_isrcm').value?"Y":"N",
      'product_isblocked':this.productForm.get('product_isblocked').value?"Y":"N",
      "name": this.productForm.get('name').value,
      "weight":this.productForm.get('weight').value ,
      "unitprice": this.productForm.get('unitprice').value,
      "uom_id": this.productForm.get('uom_id').value.id,
      "hsn_id": this.productForm.get('hsn_id').value.id,
      "category_id": this.productForm.get('category_id').value.id,
      "subcategory_id": this.productForm.get('subcategory_id').value.id,
      "productcategory_id": this.productForm.get('product_main_cat').value.id,
      "producttype_id":this.productForm.get('product_subcat').value.id,
      'productdisplayname':this.productForm.get('producttype_id').value,
      'producttradingitem':this.producttradingiyem[this.productForm.get('product_tradingitem').value],
      // 'producttradingitem':this.productForm.get('product_tradingitem').value,
      'make_modelflag':this.makemodule_value[this.productForm.get('make_module').value],
      "product_details":dict
  }
  console.log(data);
    this.disableSubmit = true;
    // if(this.productForm.valid) {
      // this.productForm.value.productcategory_id = this.productForm.value.productcategory_id.id
      // this.productForm.value.producttype_id = this.productForm.value.producttype_id.id
      // this.productForm.value.uom_id = this.productForm.value.uom_id.id
      // this.productForm.value.category_id = this.productForm.value.category_id.id
      // this.productForm.value.subcategory_id = this.productForm.value.subcategory_id.id;
      this.spinner.show();
      this.masterservice.ProductCreateForms(data)
        .subscribe(res => {
          this.spinner.hide();
          if (res.code === "UNEXPECTED_ERROR" && res.description === "Duplicate Name") {
            this.notification.showWarning("Duplicate! Code Or Name ...")
            this.disableSubmit = false;
          } else if (res.code === "UNEXPECTED_ERROR" && res.description === "Unexpected Internal Server Error") {
            this.notification.showError("INVALID_DATA!...")
            this.disableSubmit = false;
          } else if(res.code === "INVALID_DATA"){
            this.notification.showWarning("Invalid Data or DB Constraint..");
            this.disableSubmit=false;
          } else if(res.code =="Duplicate Name" && res.description =="PRODUCT_ALREADY_EXISTS"){
            this.notification.showWarning(res.description);
            this.disableSubmit=false;
          }
          else {
            this.onSubmit.emit();
            console.log("productpost", res)
          }

        },
        (error)=>{
          this.spinner.hide();
          this.notification.showError(error.status+error.statusText);
        }
        );
    // } else {
    //   this.notification.showError("INVALID_DATA!...")
    //   this.disableSubmit = false;
    // }
  }
  onCancelClick() {
    this.onCancel.emit()
  }
  validateNumber(e: any) {
    let input = String.fromCharCode(e.charCode);
    const reg = /^\d*(?:[.,]\d{1,2})?$/;

    if (!reg.test(input)) {
      e.preventDefault();
    }
  }

  getApSubcateValue(id) {
    console.log(">>>>>>>>>>>>>>>>>>>", id)
    this.masterservice.getapsubcat(id)
      .subscribe(result => {
        this.subcatlist = result['data']
        console.log("sub..............................", this.subcatlist)
      })
  }
  getproductdatatypefocus(){
    // console.log(this.productForm.get('product_type').value.id);
    // console.log(this.productForm.get('product_type').value.product_category);
    this.masterservice.getproductcategorydata(this.productForm.get('product_type').value.id,this.productForm.get('product_main_cat').value.product_category,1).subscribe(data=>{
      this.prodcutcategorylist=data['data'];
    });
    console.log( this.prodcutcategorylist);
    console.log('cat call');
  }
  getproductdatafocus(){
    console.log(this.productForm.get('product_main_cat').value);
    let data:any='';
    if(this.productForm.get('product_subcat').value.product_subcategory==undefined || this.productForm.get('product_subcat').value.product_subcategory ==''){
      data='';
    }
    else{
      data=this.productForm.get('product_subcat').value.product_subcategory;
    }
    this.masterservice.getproductsubcategorydata(this.productForm.get('product_main_cat').value.id,data,1).subscribe(data=>{
      this.productsubcatlist=data['data'];
    });
    console.log( this.prodcutcategorylist);
    console.log('cat call');
  }
  getproductsubcategorydataclick(){
    console.log(this.productForm.get('product_main_cat').value);
    if(this.productForm.get('product_type').value == undefined || this.productForm.get('product_type').value==null || this.productForm.get('product_type').value=='' || this.productForm.get('product_type').value ==""){
      this.notification.showWarning('Please Select The Product Type');
      return false;
    }
    if(this.productForm.get('product_main_cat').value==undefined || this.productForm.get('product_main_cat').value =='' ||  this.productForm.get('product_main_cat').value ==null){
     this.notification.showWarning('Please Select The Product MainCategory');
     return false;
    }
    let data:any='';
    if(this.productForm.get('product_subcat').value.product_subcategory==undefined || this.productForm.get('product_subcat').value.product_subcategory=='' || this.productForm.get('product_subcat').value.product_subcategory==""){
      data='';
    }
    else{
      data=this.productForm.get('product_subcat').value.product_subcategory;
    }
    this.masterservice.getproductsubcategorydata(this.productForm.get('product_main_cat').value.id,data,1).subscribe(data=>{
      this.productsubcatlist=data['data'];
    });
    this.productForm.get('product_subcat').valueChanges
    .pipe(
      debounceTime(100),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
        console.log('inside tap')

      }),
      switchMap(value => this.masterservice.getproductsubcategorydata(this.productForm.get('product_main_cat').value.id,this.productForm.get('product_subcat').value,1)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe((results: any[]) => {
      let datas = results["data"];
      this.productsubcatlist = datas;

    });
  }
  getproducttypedata(){
    this.masterservice.getproducttypedata().subscribe(data=>{
      this.producttypearray=data;
    });
    console.log(this.producttypearray);
    console.log('call');
  }
  getproductcategorydata(){
    this.isLoading=true;
    if(this.productForm.get('product_type').value == undefined || this.productForm.get('product_type').value==null || this.productForm.get('product_type').value=='' || this.productForm.get('product_type').value ==""){
      this.notification.showWarning('Please Select The Product Type');
      return false;
    }
    let data:any='';
    if(this.productForm.get('product_main_cat').value==undefined || this.productForm.get('product_main_cat').value =='' ||  this.productForm.get('product_main_cat').value ==null){
      data='';
    }
    else{
      data=this.productForm.get('product_main_cat').value.product_category;
    }
    console.log(data);
    this.masterservice.getproductcategorydata(this.productForm.get('product_type').value.id,data,1).subscribe(data=>{
      this.isLoading=false;
      this.prodcutcategorylist=data['data'];
    });
    this.productForm.get('product_main_cat').valueChanges
    .pipe(
      debounceTime(100),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
        console.log('inside tap')

      }),
      switchMap(value => this.masterservice.getproductcategorydata(this.productForm.get('product_type').value.id,value,1)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe((results: any[]) => {
      let datas = results["data"];
      this.prodcutcategorylist = datas;


    });
  }
  getproductsubcaterydats(data:any){
    console.log(this.productForm.get('product_subcat'))
    this.productsubcatdetails.get('productcatname').patchValue(this.productForm.get('product_subcat').value.product_subcategory);
  }
  getproductspecificationclick(){
    let data:any='';
    if(this.productForm.get('product_main_cat').value.id==undefined || this.productForm.get('product_main_cat').value=='' || this.productForm.get('product_main_cat').value.id==null){
      this.notification.showError('Please Select Any Product MainCategory');
      return false;
      
    }
    if(this.productForm.get('specificationstype').value==undefined || this.productForm.get('specificationstype').value=='' || this.productForm.get('specificationstype').value==""){
      data='';
    }
    else{
      data=this.productForm.get('specificationstype').value;
    }
    this.masterservice.createproductspecification(this.productForm.get('product_main_cat').value.id,data,1).subscribe(data=>{
      this.productspecificationArray=data['data'];
    });
    this.productForm.get('specificationstype').valueChanges
    .pipe(
      debounceTime(100),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
        console.log('inside tap')

      }),
      switchMap(value => this.masterservice.createproductspecification(this.productForm.get('product_main_cat').value.id,this.productForm.get('specificationstype').value,1)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe((results: any[]) => {
      let datas = results["data"];
      this.productspecificationArray = datas;

    });
  }
  gethsndata(){
    let data:any='';
    if(this.productForm.get('hsn_id').value==undefined || this.productForm.get('hsn_id').value=='' || this.productForm.get('hsn_id').value==""){
      data='';
    }
    else{
      data=this.productForm.get('hsn_id').value.id;
    }
    this.masterservice.createhsnproductdetails(data,1).subscribe(data=>{
      this.producthsndata=data['data'];
    });
  }
  getproductcategorydatascroll(){
    // console.log('catinfinitecall')
    setTimeout(() => {
      if (
        this.matproductcategory &&
        this.autocompleteTrigger &&
        this.matproductcategory.panel
      ) {
        fromEvent(this.matproductcategory.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matproductcategory.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            console.log('catinfinitecall')
            const scrollTop = this.matproductcategory.panel.nativeElement.scrollTop;
            const scrollHeight = this.matproductcategory.panel.nativeElement.scrollHeight;
            const elementHeight = this.matproductcategory.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            console.log(atBottom);
            if (atBottom) {
              if (this.subcat_next === true) {
                this.masterservice.getproductcategorydata(this.productForm.get('product_type').value.id,this.paroductcategoryinput.nativeElement.value,this.has_productcategorypage+1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.prodcutcategorylist = this.prodcutcategorylist.concat(datas);
                    if (this.prodcutcategorylist.length >= 0) {
                      this.has_productcategorynext = datapagination.has_next;
                      this.has_productcategorypre = datapagination.has_previous;
                      this.has_productcategorypage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  
  }
  getproductsubcategorydata(){
    setTimeout(() => {
      if (
        this.matproductsubcategory &&
        this.matproductsubcategory &&
        this.matproductsubcategory.panel
      ) {
        fromEvent(this.matproductsubcategory.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matproductsubcategory.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            console.log('catinfinitecall')
            const scrollTop = this.matproductsubcategory.panel.nativeElement.scrollTop;
            const scrollHeight = this.matproductsubcategory.panel.nativeElement.scrollHeight;
            const elementHeight = this.matproductsubcategory.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.subcat_next === true) {
                this.masterservice.getproductsubcategorydata(this.productForm.get('product_main_cat').value.id,this.paroductsubcategoryinput.nativeElement.value,1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    let datapagination = results["pagination"];
                    this.productsubcatlist = this.productsubcatlist.concat(datas);
                    if (this.productsubcatlist.length >= 0) {
                      this.has_productsubcategorynext = datapagination.has_next;
                      this.has_productsubcategorypre = datapagination.has_previous;
                      this.has_productsubcategorypage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  getproductspecificationscrool(){
    setTimeout(() => {
      if (
        this.matspecication &&
        this.autocompleteTrigger &&
        this.matspecication.panel
      ) {
        fromEvent(this.matspecication.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matspecication.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matspecication.panel.nativeElement.scrollTop;
            const scrollHeight = this.matspecication.panel.nativeElement.scrollHeight;
            const elementHeight = this.matspecication.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_specificationnext === true) {
                this.masterservice.createproductspecification(this.productForm.get('product_main_cat').value.id,this.specificationinput.nativeElement.value,this.has_specificationpage+1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    console.log('pagination=',results)
                    let datapagination = results["pagination"];
                    this.productspecificationArray= this.productspecificationArray.concat(results);
                    if (this.productspecificationArray.length >= 0) {
                      this.has_specificationnext = datapagination.has_next;
                      this.has_specificationpre = datapagination.has_previous;
                      this.has_specificationpage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  getproducthsnscrool(){
    setTimeout(() => {
      if (
        this.matproducthsn &&
        this.autocompleteTrigger &&
        this.matproducthsn.panel
      ) {
        fromEvent(this.matproducthsn.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.matproducthsn.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.matproducthsn.panel.nativeElement.scrollTop;
            const scrollHeight = this.matproducthsn.panel.nativeElement.scrollHeight;
            const elementHeight = this.matproducthsn.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.has_specificationnext === true) {
                this.masterservice.createhsnproductdetails(this.paroducthsnInput.nativeElement.value,this.has_producthsnpage+1)
                  .subscribe((results: any[]) => {
                    let datas = results["data"];
                    console.log('pagination=',results)
                    let datapagination = results["pagination"];
                    this.producthsndata= this.producthsndata.concat(results);
                    if (this.producthsndata.length >= 0) {
                      this.has_producthsnnxt = datapagination.has_next;
                      this.has_producthsnpre = datapagination.has_previous;
                      this.has_producthsnpage = datapagination.index;
                    }
                  })
              }
            }
          });
      }
    });
  }
  createproductcategory(){
    if(this.productcategorydetails.get('namess').value.trim()=='' || this.productcategorydetails.get('namess').value==null || this.productcategorydetails.get('namess').value==undefined || this.productcategorydetails.get('namess').value.trim()=="" ){
      this.notification.showWarning('Please Select The ProductCategory:');
      return false;
    }
    if(this.productcategorydetails.get('productstockimpact').value=='' || this.productcategorydetails.get('productstockimpact').value==undefined || this.productcategorydetails.get('productstockimpact').value==null){
      this.notification.showWarning('Please Select The Product Category Impact:');
      return false;
    }
    if(this.productcategorydetails.get('productdivision').value=='' || this.productcategorydetails.get('productdivision').value==null || this.productcategorydetails.get('productdivision').value==undefined){
      this.notification.showWarning('Please select The Product Division :');
      return false;
    }
    let data:any={
      "client_id": 21,
      "isprodservice": this.producttype_data[this.productcategorydetails.value.productdivision],
      "name": this.productcategorydetails.value.namess.trim(),
      "stockimpact": this.productcategorydetails.value.productstockimpact=='Yes'?true:false
  };
    console.log(data);
    console.log(this.productcategorydetails.value);
    this.spinner.show();
    this.masterservice.createproductcategorydata(data).subscribe(data=>{
      this.spinner.hide();
      if(data['status']=="success"){
      this.notification.showSuccess('Sucess');
      this.productcategorydetails.reset('');
      this.modalclose.nativeElement.click();
      }
      else{
        this.notification.showWarning(data['description']);
      }
    },
    (error)=>{
      this.notification.showWarning(error.status+error.statusText);
    }
    );
    // this.modalclose.nativeElement.click();
  // this.productcategorydetails.reset('');
  } 
createproductsubcategoryData(){
  if(this.productsubcatdetails.get('productcat').value=='' || this.productsubcatdetails.get('productcat').value==undefined || this.productsubcatdetails.get('productcat').value==null){
    this.notification.showWarning('Please Select The Category');
    return false;
  }
  if(this.productsubcatdetails.get('productcatname').value=='' || this.productsubcatdetails.get('productcatname').value==undefined || this.productsubcatdetails.get('productcatname').value==null){
    this.notification.showWarning('Please Select The ProductSubCategory');
    return false;
  }

    console.log(this.productsubcatdetails.value);
    let data:any={
      "name": this.productsubcatdetails.value.productcatname,
      "productcategory_id": this.productsubcatdetails.get('productcat').value.id
  };
  console.log(data);
  this.spinner.show();
  this.masterservice.createproductsubcategorydata(data).subscribe(datas=>{
    this.spinner.hide();
    if(datas['status']=='success'){
      this.notification.showSuccess(datas['message']);
      this.productsubcatdetails.reset('');
      this.modalclose_2.nativeElement.click();
    }
    else{
      this.notification.showError(datas['description']);
      this.notification.showError(datas['code']);
    }
  },
  (error)=>{
    this.notification.showWarning(error.status+error.statusText);
  }
  );
  // this.modalclose.nativeElement.click();

  }
createspecificationsdata(){
  console.log(this.productForm.value);
    if(this.productForm.get('product_main_cat').value.id==undefined || this.productForm.get('product_main_cat').value.id==null || this.productForm.get('product_main_cat').value.id == ''){
      this.notification.showWarning('Please Select Any Product Category');
      return false;
    }
    if(this.SpecificationForm.get('specificationed').value == undefined || this.SpecificationForm.get('specificationed').value == '' || this.SpecificationForm.get('specificationed').value == ""){
      this.notification.showWarning('Please Fill The Specification');
      console.log(this.specification.value )
      return false;
    }
    let data:any={
      "productcategory_id": this.productForm.get('product_main_cat').value.id,
      "templatename":this.SpecificationForm.get('specificationed').value,
    };
    console.log(data);
    this.spinner.show();
    this.masterservice.createspecificationsdata(data).subscribe(dta=>{
      this.spinner.hide();
      if(dta['code'] === "UNEXPECTED_ERROR" || dta['code'] ==="INVALID DATA" ){
      this.notification.showWarning(dta['description']);
         return false;
      }
      else {
        this.notification.showSuccess(dta['message']);
        this.modalclose_3.nativeElement.click();
        this.SpecificationForm.reset('');
        // this.specification.patchValue({'specifications':''});
        // this.modalclose.nativeElement.click();
      }
    },
    (error)=>{
      this.notification.showError(error.status+error.statusText);
      
    }
    );
    // this.modalclose.nativeElement.click();
    // this.specification.patchValue({'specifications':''});

  }
  clicktablevisible(){
    if(this.productForm.get('specificationstype').value ==null || this.productForm.get('specificationstype').value =='' || this.productForm.get('specificationstype').value==undefined){
      this.notification.showWarning('Please select The Specification Type');
      return false;
    }
    if(this.productForm.get('configuration').value==null || this.productForm.get('configuration').value==undefined || this.productForm.get('configuration').value==''){
      this.notification.showWarning('Please Select The configuration');
      return false;
    }
    this.table_visible=true;
    let dear:any=this.table_data.length+1;
    let dta:any={'No':dear,'Specification':this.productForm.get('specificationstype').value,"Configuration":this.productForm.get('configuration').value};
    this.table_data.push(dta);
    this.productForm.get('specificationstype').patchValue('');
    this.productForm.get('configuration').patchValue('');


  }
  deletedata(data){
    let remove=data
    // let idex=this.table_data.indexOf(data);
    this.table_data.splice(data,1);
    if(this.table_data.length>0){
      this.table_visible=true;
    }
    else{
      this.table_visible=false;
    }

  }
  getproductdetailsdata(){
    // this.masterservice.getproductcategorydata(this.productForm.get('product_type').value.id,'',1).subscribe(results=>{
    //   this.productcatlist=results['data'];
    //   console.log(this.productcatlist);

    // });
    // this.getproductcategory();
    // if(this.productForm.get('product_type').value == undefined || this.productForm.get('product_type').value==null || this.productForm.get('product_type').value=='' || this.productForm.get('product_type').value ==""){
    //   this.notification.showWarning('Please Select The Product Type');
    //   return false;
    // }
    // this.productsubcatdetails.get('productcat').valueChanges
    // .pipe(
    //   debounceTime(100),
    //   distinctUntilChanged(),
    //   tap(() => {
    //     this.isLoading = true;
    //     console.log('inside tap')

    //   }),
    //   switchMap(value => this.masterservice.getproductcategorydata(this.productForm.get('product_type').value.id,value, 1)
    //     .pipe(
    //       finalize(() => {
    //         this.isLoading = false
    //       }),
    //     )
    //   )
    // )
    // .subscribe((results: any[]) => {
    //   let datas = results["data"];
    //   this.productcatlist = datas;

    // });
    if(this.productForm.get('product_type').value == undefined || this.productForm.get('product_type').value==null || this.productForm.get('product_type').value=='' || this.productForm.get('product_type').value ==""){
        this.notification.showWarning('Please Select The Product Type');
        return false;
      }
    let data:any='';
    if(this.productsubcatdetails.get('productcat').value==undefined || this.productsubcatdetails.get('productcat').value =='' ||  this.productsubcatdetails.get('productcat').value ==null){
      data='';
    }
    else{
      data=this.productsubcatdetails.get('productcat').value
     
    }
      data=this.productsubcatdetails.get('productcat').value
    this.masterservice.getproductcategorydata(this.productForm.get('product_type').value.id,data,1).subscribe(results=>{
      this.productcatlist=results['data'];
      console.log(this.productcatlist);

    });
    
  this.productsubcatdetails.get('productcat').valueChanges
    .pipe(
      debounceTime(100),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
        console.log('inside tap')

      }),
      switchMap(value => this.masterservice.getproductcategorydata(this.productForm.get('product_type').value.id,value, 1)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe((results: any[]) => {
      let datas = results["data"];
      this.productcatlist = datas;

    });
  }
}
