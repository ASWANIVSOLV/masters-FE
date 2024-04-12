import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MastermoduleRoutingModule } from './mastermodule-routing.module';
import { MasterComponent } from '../Master/master/master.component';
// import { CreateCostcentreComponent } from '../Master/create-costcentre/create-costcentre.component';
// import { CostcentreEditComponent } from '../Master/costcentre-edit/costcentre-edit.component';
// import { CreateBusinesssegmentComponent } from '../Master/create-businesssegment/create-businesssegment.component';
// import { BusinesssegmentEditComponent } from '../Master/businesssegment-edit/businesssegment-edit.component';
// import { CreateCCBSComponent } from '../Master/create-ccbs/create-ccbs.component';
// import { CcbsEditComponent } from '../Master/ccbs-edit/ccbs-edit.component';
// import { CreateHierarchyComponent } from '../Master/create-hierarchy/create-hierarchy.component';
// import { HierarchyEditComponent } from '../Master/hierarchy-edit/hierarchy-edit.component';
// import { RolesEditComponent } from '../Master/roles-edit/roles-edit.component';
// import {DepartmentViewComponent} from '../Master/department-view/department-view.component';
import { PermissionComponent } from '../Master/permission/permission.component';
import {EmployeeViewComponent} from '../Master/employee-view/employee-view.component';
// import {CreateDepartmentComponent} from '../Master/create-department/create-department.component'
// import {MemoDepartentEditComponent} from '../Master/memo-departent-edit/memo-departent-edit.component';
// import {CreateCategoryComponent} from '../Master/create-category/create-category.component';
// import {MemoCategoryEditComponent} from '../Master/memo-category-edit/memo-category-edit.component';
// import {MemoSubCategoryEditComponent} from '../Master/memo-sub-category-edit/memo-sub-category-edit.component';
// import {SubcategoryCreateComponent} from '../Master/subcategory-create/subcategory-create.component';
import { EmpDetailsEditComponent } from './emp-details-edit/emp-details-edit.component';
import { EmpDetailsCreateComponent } from './emp-details-create/emp-details-create.component';
// import { CreateCityComponent } from './create-city/create-city.component';
// import { EmpBankSummaryComponent } from './emp-bank-summary/emp-bank-summary.component';
// import { EmpBankAddComponent } from './emp-bank-add/emp-bank-add.component';

// import { CreateDesignationComponent } from './create-designation/create-designation.component';
// import { DesignationEditComponent } from './designation-edit/designation-edit.component';
// import { SectorCreateComponent } from './sector-create/sector-create.component';
// import { SectorEditComponent } from './sector-edit/sector-edit.component';

// import { PmdBranchCreateComponent } from './pmd-branch-create/pmd-branch-create.component';
// import { PmdBranchEditComponent } from './pmd-branch-edit/pmd-branch-edit.component';
// import { ExpenceGrpCreateComponent } from './expence-grp-create/expence-grp-create.component';
// import { ExpenceGrpEditComponent } from './expence-grp-edit/expence-grp-edit.component';
// import { ExpenceEditComponent } from './expence-edit/expence-edit.component';
// import { ExpenceCreateComponent } from './expence-create/expence-create.component';
import { EntityCreateComponent } from './entity-create/entity-create.component';
// import { FinYearCreateComponent } from './fin-year-create/fin-year-create.component';
// import { FinYearEditComponent } from './fin-year-edit/fin-year-edit.component';
// import { FinquaterYearCreateComponent } from './finquater-year-create/finquater-year-create.component';
// import { FinquaterYearEditComponent } from './finquater-year-edit/finquater-year-edit.component';
// import { MailTemplateComponent } from './mail-template/mail-template.component';
// import { MailTemplateCreateComponent } from './mail-template-create/mail-template-create.component';
// import { MailTemplateEditComponent } from './mail-template-edit/mail-template-edit.component';
// import { BranchBankAddComponent } from './branch-bank-add/branch-bank-add.component';
// import { EmpbranchviewComponent } from './empbranchview/empbranchview.component';
import { EmployeeEntityMappingComponent } from './employee-entity-mapping/employee-entity-mapping.component';
// import { PasswordPolicyComponent } from './password-policy/password-policy.component';
import{EmployeeTypeMappingComponent} from'./employee-type-mapping/employee-type-mapping.component';
import{BsccMappingComponent}from './bscc-mapping/bscc-mapping.component';
import { RmMappingComponent } from './rm-mapping/rm-mapping.component';
import { RoleMappingComponent } from './role-mapping/role-mapping.component';
// import { ProductcategoryComponent } from './productcategory/productcategory.component';
// import { ProductcategoryEditComponent } from './productcategory-edit/productcategory-edit.component';
// import { ProducttypeComponent } from './producttype/producttype.component';
// import { ProducttypeEditComponent } from './producttype-edit/producttype-edit.component';
// import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductmasterComponent } from './productmaster/productmaster.component';
import { ProductmasterEditComponent } from './productmaster-edit/productmaster-edit.component';
// import { ValidationserviceComponent } from './validationservice/validationservice.component';
// import { confirmationservice } from '../atma/confirmnotification/confirmationservice';
// import { ProductComponent } from './product/product.component';
@NgModule({
  declarations: [
    EmpDetailsCreateComponent, MasterComponent,EntityCreateComponent,
    // PasswordPolicyComponent,
    RmMappingComponent,RoleMappingComponent,
    // CreateCostcentreComponent,DepartmentViewComponent,
    // CostcentreEditComponent, CreateBusinesssegmentComponent,
    // BusinesssegmentEditComponent, CreateCCBSComponent,
    // CcbsEditComponent, CreateHierarchyComponent,
    // HierarchyEditComponent, RolesEditComponent,MemoDepartentEditComponent,
    PermissionComponent,EmployeeViewComponent,
    // CreateDepartmentComponent,
    // CreateCategoryComponent,MemoCategoryEditComponent,
    EmployeeEntityMappingComponent,
  //  MemoSubCategoryEditComponent,SubcategoryCreateComponent, 
    EmpDetailsEditComponent,
    //  CreateCityComponent, EmpBankSummaryComponent, EmpBankAddComponent, 
    // CreateDesignationComponent, DesignationEditComponent, SectorCreateComponent, 
    // SectorEditComponent, MemoSubCategoryEditComponent,SubcategoryCreateComponent, 
    //  CreateCityComponent, 
    // EmpBankSummaryComponent, EmpBankAddComponent, PmdBranchCreateComponent,
    // PmdBranchEditComponent, ExpenceGrpCreateComponent, ExpenceGrpEditComponent, ExpenceEditComponent, ExpenceCreateComponent,  FinYearCreateComponent, FinYearEditComponent, FinquaterYearCreateComponent, FinquaterYearEditComponent,MailTemplateComponent,MailTemplateCreateComponent,MailTemplateEditComponent, BranchBankAddComponent, EmpbranchviewComponent,
    EmployeeTypeMappingComponent,BsccMappingComponent,ProductmasterComponent,ProductmasterEditComponent,
    // ProductEditComponent,ProducttypeComponent,ProducttypeEditComponent,ProductcategoryComponent,
    // ProductcategoryEditComponent,
    //  ProductComponent
    //  ValidationserviceComponent

  ],
  imports: [
    MastermoduleRoutingModule, SharedModule, MaterialModule
  ]
})
export class MastermoduleModule { }
