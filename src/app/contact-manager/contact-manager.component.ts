import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false;
  public contacts: MyContact[] = [];
  public errorMassage: string | null = null;
  constructor(private contServices: ContactService) { }

  ngOnInit(): void {
    this.loading = true;
    this.contServices.getAllContacts().subscribe((data:any) => {
      this.contacts = data;
      this.loading = false;
    },(error)=>{
      this.errorMassage=error;
      this.loading=false;
      console.log(this.loading)
    })
  }

}
