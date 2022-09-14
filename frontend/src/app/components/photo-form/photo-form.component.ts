import { Component, OnInit } from '@angular/core';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  file!: File;
  photoSelected!: String | ArrayBuffer;

  constructor() { }

  ngOnInit(): void {
  }

  onPhotoSelected(event: any){
    if(event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result as String;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement) {
    console.log(title.value);
    console.log(description.value);
    return false;
  }
}
