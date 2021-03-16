import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]> = this.userService.userList$;
  phrase: string = '';
  direction: number = 1;
  columnKey: string = '';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAll();
    this.users$.subscribe();
  }

  onDelete(user: User): void {
    alert('Are you sure you want to delete?');
    this.userService.delUser(user).subscribe(
      () => {
        this.userService.getAll();
      }
    );
  }

  onSearchPhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onColumnSelect(key: string): void {
    if (this.columnKey === key) {
      this.direction = this.direction * -1;
    } else {
      this.direction = 1;
    }
    this.columnKey = key;
  }

}
