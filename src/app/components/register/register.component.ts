import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Member } from '../../models/member';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DatePipe]
})
export class RegisterComponent implements OnInit {

	today;
  membershipForm : FormGroup;
  name!: string;
  gender!: string;
  dob!: string;

  emptyName = 'Enter Name';
  emptyGender = 'Select gender';
  emptyEmail = 'Enter a valid email';
  emptyDOB = 'Enter your date fo birth';

  formValue = {};
  isEdit: boolean;

  constructor(private _formBuilder: FormBuilder,private service: ApiService, private datePipe: DatePipe, private route: Router, private activatedRoute: ActivatedRoute,) { 
    
    this.isEdit = false;

    this.membershipForm = this._formBuilder.group({
      id: "",
      name: ['', [ Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [ Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      science: [''],
      fiction: [''],
      journals: ['']
    });

    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd')

    this.service.getFormStatus().subscribe((res: any) => {
      this.isEdit = res;
    })

    this.service.getFormValue().subscribe((res: any) => {
      this.formValue = res;
      this.membershipForm.patchValue(this.formValue);
    })
  }

	ngOnInit() {

	}

  regMembership(value: any){
    if (!this.isEdit) {
        if(value.science == true) {
          value.science = 'Science & Technology';
        }
        else {
          value.science = '';
        }
        if(value.fiction == true) {
          value.fiction = 'Fiction & Non fiction';
        }
        else {
          value.fiction = '';
        }
        if(value.journals == true) {
          value.journals = 'Journals & Magazines';
        }
        else {
          value.journals = '';
        }
        this.service.addMember(value).subscribe(res => {
            this.route.navigate(['/home']);
          },(error) => {
            this.membershipForm.reset();
        });
    } 
    else {
      if(value.science == false) {
        value.science = '';
      }
      else {
        value.science = 'Science & Technology';
      }
      if(value.fiction == false) {
        value.fiction = '';
      }
      else {
        value.fiction = 'Fiction & Non fiction';
      }
      if(value.journals == false) {
        value.journals = '';
      }
      else {
        value.journals = 'Journals & Magazines';
      }
      this.service.updateMember(value).subscribe(res => {
          this.service.clearFormValue();
          this.route.navigate(['/home']);
          this.membershipForm.reset();
        },(error) => {
        this.membershipForm.reset();
      });
    }
  }

  cancel() {
    this.route.navigate(['/home']);
    this.service.clearFormValue();
  }

}
