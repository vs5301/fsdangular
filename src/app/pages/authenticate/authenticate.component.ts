import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { addDoc, collection, collectionChanges, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { DbService } from 'src/app/service/db.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {

  auth = getAuth(this.dbService.app)

  constructor(
    private dbService: DbService,
    private firestore: Firestore
  ){
  
  }

  uid!: String

  authForm = new FormGroup(
    {
      email: new FormControl(''),
      password: new FormControl('')
    }
  )  

  registerUser(){
    createUserWithEmailAndPassword(this.auth, this.authForm.value.email!, this.authForm.value.password!).then((userCredential) => {
      console.log("User created in Auth Module");
      const user = userCredential.user
      this.uid = user.uid

      const collectionRef = collection(this.firestore, "users")
    // addDoc(collectionRef, {
    //   name: '',
    //   phone: '',
    //   email: this.authForm.value.email,
    //   profileImage: '',
    //   address: '',
    // })
    // .catch((error) => {
    //   console.log("Error code: ", error.code);
    //   console.log("Error message: ", error.message);      
    // })    

      const docRef = doc(this.firestore, `${collectionRef}/${this.uid}`)
      console.log("Document Id: ", this.uid);    
      setDoc(docRef, {
        name: '',
        phone: '',
        email: this.authForm.value.email,
        profileImage: '',
        address: '',
        id: this.uid
      })
    })
    .catch((error) => {
      console.log("Error code: ", error.code);
      console.log("Error message: ", error.message);                  
    })   
  }

  signInUser(){
    signInWithEmailAndPassword(this.auth, this.authForm.value.email!, this.authForm.value.password!).then((userCredential) => {
      console.log("User logged in");
      const user = userCredential.user
      this.uid = user.uid
    })
    .catch((error) => {
      console.log("Error code: ", error.code);
      console.log("Error message: ", error.message);
      
    })
  }

}
