
import { Users1Component } from './users/users1/users1.component';

import { NgxPayPalModule } from 'ngx-paypal';
import { AuthGuard } from './_helpers/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Validators, EmailValidator } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomMaterialModule } from './_helpers/confirm-dialog/custom-material.module';
import { ConfirmDeleteComponent } from './_helpers/confirm-delete/confirm-delete.component';
import { ConfirmDialogComponent } from './_helpers/confirm-dialog/confirm-dialog.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownBasicComponent } from './dropdown-basic/dropdown-basic.component';

import { LoginFormComponent } from './users/login-form.component';

import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AccountFormComponent } from './account/account-form.component';
import { IntegratorsComponent } from './integrators/integrators.component';
import { IntegratorFormComponent } from './integrators/integrator-form.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectFormComponent } from './projects/project-form.component';
import { LicensesComponent } from './licenses/licenses.component';

import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { LicenseFormComponent } from './licenses/license-form.component';
import { SignupFormComponent } from './users/signup-form.component';
import { minLengthValidationMessage } from './_common/error-messages';
import { ValidateEmail } from './_Validators/email.validator';
import { CheckPasswords } from './_Validators/passwordconfirm.validator';
import { SampleFormComponent } from './sample/sample-form/sample-form.component';
import { SignupConfirmationComponent } from './users/signup-confirmation.component';
import { TopTitleComponent } from './top/top-title/top-title.component';
import { ForgotpasswordFormComponent } from './users/forgotpassword-form.component';
import { PaypalComponent } from './payment/paypal/paypal.component';
import { ValidatePaid } from './_Validators/checkpaid.validator';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SignupapproveComponent } from './users/signupapprove.component';
import { PasswordresetComponent } from './users/passwordreset.component';
import { NotificationDialogComponent } from './_helpers/notification-dialog/notification-dialog.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { LicenseusageComponent } from './licenses/licenseusage/licenseusage.component';
import { AccountsComponent } from './account/accounts/accounts.component';
import { SolutionsComponent } from './solution/solutions/solutions.component';
import { SolutionFormComponent } from './solution/solution-form/solution-form.component';
import { SolutionpermissionsComponent } from './solution/solutionpermissions/solutionpermissions.component';
import { SolutionpermissionFormComponent } from './solution/solutionpermission-form/solutionpermission-form.component';
import { SolutionversionsComponent } from './solution/solutionversions/solutionversions.component';
import { SolutionversionFormComponent } from './solution/solutionversion-form/solutionversion-form.component';
import { SolutionregistrationsComponent } from './solution/solutionregistrations/solutionregistrations.component';
import { SolutionregistrationFormComponent } from './solution/solutionregistration-form/solutionregistration-form.component';
// import { TranzilaComponent } from './payment/tranzila/tranzila.component';
// import { TranzilapaymentconfirmComponent } from './payment/tranzilapaymentconfirm/tranzilapaymentconfirm.component';
import { PlanFormComponent } from './plans/plan-form/plan-form.component';
import { PlansComponent } from './plans/plans/plans.component';
import { LicensepaymentsComponent } from './licenses/licensepayments/licensepayments.component';
import { CheckoutComponent } from './payment/checkout/checkout.component';
import { LicenseactivationsComponent } from './licenses/licenseactivations/licenseactivations.component';
import { LandingpageFormComponent } from './users/landingpage-form/landingpage-form.component';
import { NewusersetpasswordFormComponent } from './users/newusersetpassword-form/newusersetpassword-form.component';
import { DefaultplantypeFormComponent } from './defaultplantypes/defaultplantype-form/defaultplantype-form.component';
import { DefaultplantypesComponent } from './defaultplantypes/defaultplantypes/defaultplantypes.component';
import { LicensepurchaseFormComponent } from './licenses/licensepurchase-form/licensepurchase-form.component';
import { LicenseupgradeFormComponent } from './licenses/licenseupgrade-form/licenseupgrade-form.component';
import { GlobalsFormComponent } from './globals/globals-form/globals-form.component';
import { AccountuserFormComponent } from './account/accountuser-form/accountuser-form.component';
import { DownloadComponent } from './download/download/download.component';
import { MultilicensepurchaseFormComponent } from './licenses/multilicensepurchase-form/multilicensepurchase-form.component';
import { FormlyFieldButton } from './_helpers/formly-field-button/button-type.component';
import { Checkout1Component } from './payment/checkout1/checkout1.component';



const CLIENT_ID = "18539700416-oeomktubrt07rqr2dniohvnk5se84ge5.apps.googleusercontent.com";

@NgModule({
  declarations: [
    AppComponent,
    DropdownBasicComponent,
    ConfirmDeleteComponent,
    ConfirmDialogComponent,

    LoginFormComponent,
    HomeComponent,

    AccountFormComponent,

    IntegratorsComponent,
    IntegratorFormComponent,
    ProjectsComponent,
    ProjectFormComponent,
    LicensesComponent,
    LicenseFormComponent,
    SignupFormComponent,
    SampleFormComponent,
    SignupConfirmationComponent,
    TopTitleComponent,
    ForgotpasswordFormComponent,
    PaypalComponent,
    SignupapproveComponent,
    PasswordresetComponent,
    NotificationDialogComponent,
    Users1Component,
    UserFormComponent,
    LicenseusageComponent,
    AccountsComponent,
    SolutionsComponent,
    SolutionFormComponent,
    SolutionpermissionsComponent,
    SolutionpermissionFormComponent,
    SolutionversionsComponent,
    SolutionversionFormComponent,
    SolutionregistrationsComponent,
    SolutionregistrationFormComponent,
    // TranzilaComponent,
    // TranzilapaymentconfirmComponent,
    PlanFormComponent,
    PlansComponent,
    LicensepaymentsComponent,
    CheckoutComponent,
    LicenseactivationsComponent,
    LandingpageFormComponent,
    NewusersetpasswordFormComponent,
    DefaultplantypeFormComponent,
    DefaultplantypesComponent,
    LicensepurchaseFormComponent,
    LicenseupgradeFormComponent,
    GlobalsFormComponent,
    AccountuserFormComponent,
    DownloadComponent,
    MultilicensepurchaseFormComponent,
    FormlyFieldButton,
    Checkout1Component,
    
    

    // NgxPayPalModule,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    SocialLoginModule,
   
   
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    
      { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
      { path: 'account/:id', component: AccountFormComponent, canActivate: [AuthGuard] },
      // { path: 'accountuser/:id', component: AccountuserFormComponent, canActivate: [AuthGuard] },

      { path: 'accountuser', component: AccountuserFormComponent, canActivate: [AuthGuard] },

      { path: 'integrators', component: IntegratorsComponent, canActivate: [AuthGuard] },
      { path: 'integrator/:id', component: IntegratorFormComponent, canActivate: [AuthGuard] },

      { path: 'users', component: Users1Component, canActivate: [AuthGuard] },
      { path: 'user/:id', component: UserFormComponent, canActivate: [AuthGuard] },

      { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
      { path: 'project/:id', component: ProjectFormComponent, canActivate: [AuthGuard] },

      {path : 'defaultplantypes', component: DefaultplantypesComponent, canActivate: [AuthGuard]},
      {path : 'defaultplantype/:id', component: DefaultplantypeFormComponent, canActivate: [AuthGuard]},

      { path: 'plans', component: PlansComponent, canActivate: [AuthGuard] },
      { path: 'plan/:id', component: PlanFormComponent, canActivate: [AuthGuard] },
      

      { path: 'licenses', component: LicensesComponent, canActivate: [AuthGuard] },
      { path: 'license/:id', component: LicenseFormComponent, canActivate: [AuthGuard] },
      { path: 'license/:id/:plantypedefault', component: LicenseFormComponent, canActivate: [AuthGuard] },
      { path: 'licensepurchase', component: LicensepurchaseFormComponent, canActivate: [AuthGuard]},
      { path: 'licenseupgrade/:id', component: LicenseupgradeFormComponent, canActivate: [AuthGuard]},
      { path: 'multilicensepurchase', component: MultilicensepurchaseFormComponent, canActivate: [AuthGuard]},
   
      { path: 'licenseusage/:id', component: LicenseusageComponent, canActivate: [AuthGuard] },
      { path: 'licensepayments/:id', component: LicensepaymentsComponent, canActivate: [AuthGuard] },
      { path: 'licenseactivations/:id', component: LicenseactivationsComponent, canActivate: [AuthGuard] },
      

      { path: 'solutions', component: SolutionsComponent, canActivate: [AuthGuard] },
      { path: 'solution/:id', component: SolutionFormComponent, canActivate: [AuthGuard] },
      { path: 'solutionpermissions/:id', component: SolutionpermissionsComponent, canActivate: [AuthGuard] },
      { path: 'solutionpermission/:solutionid/:id', component: SolutionpermissionFormComponent, canActivate: [AuthGuard] },
      { path: 'solutionversions/:id', component: SolutionversionsComponent, canActivate: [AuthGuard] },
      { path: 'solutionversion/:solutionid/:id', component: SolutionversionFormComponent, canActivate: [AuthGuard] },
      { path: 'solutionregistrations/:id', component: SolutionregistrationsComponent, canActivate: [AuthGuard] },
      { path: 'solutionregistration/:solutionid/:id', component: SolutionregistrationFormComponent, canActivate: [AuthGuard] },
      
         

      { path: 'checkout/:id', component: CheckoutComponent, canActivate: [AuthGuard] },
      { path: 'checkout1/:id', component: Checkout1Component, canActivate: [AuthGuard] },
      { path: 'paypal/:id', component: PaypalComponent, canActivate: [AuthGuard] },
      // { path: 'tranzila/:id', component: TranzilaComponent, canActivate: [AuthGuard] },
      // { path: 'tranzilapaymentconfirm', component: TranzilapaymentconfirmComponent},

      { path: 'login', component: LoginFormComponent },
      { path: 'signup', component: SignupFormComponent },
      { path: 'forgotpassword', component: ForgotpasswordFormComponent },
      { path: 'signupconfirmation/:email', component: SignupConfirmationComponent },
      { path: 'signupapprove/:activationcode/:email', component: SignupapproveComponent },
      { path: 'passwordreset/:activationcode/:email', component: PasswordresetComponent },
      { path: 'newusersetpassword/:activationcode/:email', component: NewusersetpasswordFormComponent},

      { path: 'globals', component: GlobalsFormComponent, canActivate: [AuthGuard]},

      { path: 'landingpage', component: LandingpageFormComponent},

      { path: 'sample', component: SampleFormComponent },

      { path: 'download', component: DownloadComponent},

      // { path: '**', redirectTo: '' }

    ]),

    CustomMaterialModule,
    BrowserAnimationsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      extras: { 
        lazyRender: true ,
        checkExpressionOn: 'changeDetectionCheck',
      },
      validators: [
        {
          name: 'email',
          validation: ValidateEmail
        },
        {
          name: 'checkpasswords',
          validation: CheckPasswords
        },
        {
          name: 'validatepaid',
          validation: ValidatePaid
        }

      ],
      validationMessages: [
        {
          name: 'required',
          message: 'This field is required',
        },
        {
          name: 'minLength',
          message: minLengthValidationMessage
        },
        {
          name: 'email',
          message: 'Email is not valid'
        }

      ],
      
      types: [
        {
          name: 'button',
          component: FormlyFieldButton,
          wrappers: ['form-field'],
          defaultOptions: {
            props: {
              btnType: 'default',
              type: 'button',
            },
          },
        },
      ],
    }),
   

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
          
            provider: new GoogleLoginProvider(
              CLIENT_ID,  
            )
          }
    
        ]
      } as SocialAuthServiceConfig
    },
    {
      provide: LocationStrategy, useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
