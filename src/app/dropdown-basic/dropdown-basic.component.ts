import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { iUser } from '../users/iUser';
import { userTypes } from '../_common/constants';

@Component({
  selector: 'dropdown-basic',
  templateUrl: './dropdown-basic.component.html',
  styleUrls: ['./dropdown-basic.component.scss']
})
export class DropdownBasicComponent implements OnInit {

  currentUser: iUser;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   
  }


  ngOnInit(): void {
  }

  isAdminuser() {
    return this.currentUser.usertype == userTypes.Admin;
    
  }

  isUserAccountManager(): boolean {
    return (this.currentUser.usertype == userTypes.AccountManager || this.currentUser.usertype == userTypes.Admin);
    //  return (this.currentUser.usertype == 2 || this.currentUser.usertype == 5);
  }



  isAccountUser(): boolean {
    return (this.currentUser.usertype == userTypes.AccountUser || this.currentUser.usertype == userTypes.AccountManager || this.currentUser.usertype == userTypes.Admin);
   // return (this.currentUser.usertype == 1 || this.currentUser.usertype == 2 || this.currentUser.usertype == 5);
  }


  isIntegratorUser(): boolean {
    return (this.currentUser.usertype == userTypes.Integrator);
  //  return (this.currentUser.usertype == 3);
  }

  isProjectUser(): boolean {
    return (this.currentUser.usertype == userTypes.ProjectUser);
  //  return (this.currentUser.usertype == 4);
  }


  isWebProjectUser(): boolean {
    return (this.currentUser.usertype == userTypes.WebProjectUser);
   // return (this.currentUser.usertype == 6);
  }

  Users() {
    this.router.navigate(['/users']);
  }

  User() {
    this.router.navigate(['/user', this.currentUser.userid], { queryParams: { returnUrl: '/home' } });
  }


  account() {
    this.router.navigate(['/account', this.currentUser.accountid], { queryParams: { returnUrl: '/home' } });

  }

  AccountUser()
  {
    
    this.router.navigate(['/accountuser'], { queryParams: { returnUrl: '/home' } });
   // this.router.navigate(['/accountuser', this.currentUser.userid], { queryParams: { returnUrl: '/home' } });
   
  }

  accounts() {
    this.router.navigate(['/accounts']);
  }




  Integrators() {
    this.router.navigate(['/integrators']);
  }
  Integrator() {
    // console.log(this.currentUser);
    this.router.navigate(['/integrator', this.currentUser.integratorid], { queryParams: { returnUrl: '/home' } });
  }


  Projects() {
    this.router.navigate(['/projects']);
  }

  Project() {
    //  console.log(this.currentUser.projectid);
    this.router.navigate(['/project', this.currentUser.projectid]);
  }

  DefaultPlanTypes() {
    this.router.navigate(['/defaultplantypes']);
  }

  Plans() {
    this.router.navigate(['/plans']);
  }

  Licenses() {
    this.router.navigate(['/licenses']);
  }

  Solutions() {
    this.router.navigate(['/solutions']);
  }

  BuyNow() {
    this.router.navigate(['/multilicensepurchase']);
  }

  Paypal() {
    this.router.navigate(['/paypal', 5]);
  }


  CheckOut() {
    this.router.navigate(['/checkout']);
  }

  globals() {
    this.router.navigate(['/globals']);
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  download()
  {
    this.router.navigate(['/download']);
  }

  DownloadInstallationFile() {
    // const link = document.createElement('a');
    // link.href = 'https://sendli365.com/ClassGenuisLandingPage/ClassiGeniusSetup.exe'; // path to installation file
    // link.target = '_blank';
    // link.download = 'ClassiGeniusSetup.exe'; // File name
    // link.click();
  }


}
