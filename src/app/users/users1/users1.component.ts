import { AccountService } from 'src/app/_services/account.service';
import { Component, OnInit } from '@angular/core';
import { iAccount } from 'src/app/account/iAccount';
import { ConfirmDeleteComponent } from 'src/app/_helpers/confirm-delete/confirm-delete.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { iUser } from '../iUser';
import { Router } from '@angular/router';

@Component({
  selector: 'users1',
  templateUrl: './users1.component.html',
  styleUrls: ['./users1.component.scss']
})
export class Users1Component implements OnInit {

  constructor(
    private router: Router,
    private service: UserService,
    public confirmDelete: ConfirmDeleteComponent,
    private authenticationService: AuthenticationService,
    private accountService : AccountService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x)

  }

  currentUser: iUser;
  users: iUser[] = [];
  usersFiltered: iUser[] = [];
  accounts: iAccount[] = [];

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(
        response => {
          this.users = <iUser[]>response;
          //     console.log(this.users);
          this.OnAccountSelect(0);
        },
        error => {
          alert('Error');
          console.log('error');
        })


    this.accountService.getAll()
      .subscribe(
        response => {
          this.accounts = <iAccount[]>response;

        },
        error => {
          alert('Error');
          console.log('error');
        })
  }

  OnAccountSelect(accountidParam: number)
  {
    // console.log(accountidParam);
    if (accountidParam==0)
    {
      this.usersFiltered = this.users;
    }
    else
    {
      this.usersFiltered = this.users.filter((obj) => {
         return obj.accountid == accountidParam;
      })

    }


  }

  userFilter(element, index, array) { 
    return (element >= 10); 
 } 

  isSameUser(user: iUser): Boolean {
    return (user.userid == this.currentUser.userid);
  }

  isAdminUser(): Boolean {
    return (this.currentUser.usertype == 5);
  }


  userRoute(userid: number, route: string) {
    this.router.navigate(['/user', userid], { queryParams: { returnUrl: route } });
  }

  AccountName(accountid: number) {
    let name = "";
    this.accounts.forEach(element => {
      if (element.accountid == accountid) {
        name = element.companyname;
      }

    });

    return name;
  }

  deleteuser(user: iUser) {

    this.confirmDelete.displayDeleteConfirmationMessege()

      .subscribe(dialogResult => {

        if (dialogResult) {
          this.service.delete(user.userid)
            .subscribe(response => {
              let index = this.users.indexOf(user);
              this.users.splice(index, 1);
            },
              error => {
                alert('Error');
                console.log('error');
              })
        }
      });
  }


}
