import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  public loading:boolean=false;
  public contact:MyContact={} as MyContact;
  public errorMessagee:string|null=null;
  public groups:MyGroup[] = []as MyGroup[];
  constructor(private contsServices:ContactService, private router:Router) { }

  ngOnInit(): void {
    this.contsServices.getAllgroups().subscribe((data:any)=>{
      this.groups=data;
    },(error)=>{
      this.errorMessagee=error;
    })
  }
  public addSubmit(){
   this.contsServices.createContact(this.contact).subscribe((data:MyContact)=>{
    this.router.navigate(['/']).then();
   },(error)=>{
    this.errorMessagee=error;
    this.router.navigate(['/contacts/add']).then();
   })
  }
}
