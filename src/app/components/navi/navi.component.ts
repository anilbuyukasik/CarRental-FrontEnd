import { Component, OnInit } from '@angular/core';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  user:User;
  claims:OperationClaim[];
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

}
