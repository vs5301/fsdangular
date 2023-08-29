import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Restaurants } from 'src/app/models/restaurants';
import { RestaurantService } from 'src/app/service/restaurants.service';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { DbService } from 'src/app/service/db.service';
import { Firestore, addDoc, collection, serverTimestamp, doc, updateDoc, getDocs, deleteDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurantList: any
  addView:boolean = false
  text = "Add Restaurant"
  dataToSave: any
  action: string = ""
  restaurantData: any
  updateMode: boolean = false

  cities = [
    {city: "Ludhiana", state: "Punjab", pinCode: "141001"},
    {city: "Chandigarh", state: "Punjab"},
    {city: "Amritsar", state: "Punjab"},
    {city: "Jalandhar", state: "Punjab"},
    {city: "Phagwara", state: "Punjab"}
  ]

  loader: boolean = false
  file: any
  restaurants = this.service.getRestaurants()
  restaurantForm = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    veg: new FormControl(''),
    nonVeg: new FormControl(''),
    servingType: new FormControl('delivery'),
    city: new FormControl('', Validators.required),
    image: new FormControl(''),
    creationTime: new FormControl()
  })

  constructor(
    public service: RestaurantService,
    public dbService: DbService,
    public firestore: Firestore,
    public route: ActivatedRoute
  ){

  }

  ngOnInit(): void {
      this.fetchPromoRestaurants()
      this.route.queryParams.subscribe((params) => {
        this.action = params['action']
        if (this.action == "update") {
          this.addView = true
          this.updateMode = true
          this.text = "Update Restaurant"
          
          const sessionData = sessionStorage.getItem("restaurant")
          this.restaurantData = JSON.parse(sessionData!)

          this.restaurantForm.patchValue({
            name: this.restaurantData.name,
            phone: this.restaurantData.phone,
            email: this.restaurantData.email,
            veg: this.restaurantData.veg,
            nonVeg: this.restaurantData.nonVeg,
            servingType: this.restaurantData.servingType,
            city: this.restaurantData.city,
            image: this.restaurantData.image
          })
        }
      })
  }

  changeView(){
    this.addView = !this.addView
    if (this.addView) {
      this.text = "View Restaurants"
    } else {
      this.text = "Add Restaurants"
    }
  }

  addRestaurant(name:string, timeToDeliver:string, ratings:string, categories:string){
    this.restaurants.push(new Restaurants(name, Number(timeToDeliver),Number(ratings),categories))
  }

  addRestaurantToFirebase(){
    this.loader = true
    if (this.updateMode) {
      this.updateRestaurant(this.restaurantData.docId)
      return;
    }
    this.uploadImageToFirebase(this.restaurantForm.value)
    this.restaurantForm.reset()
  }

  pickFile(event: any){
    this.file = event.target.files[0]
   }

  uploadImageToFirebase(form: any){
    const storageRef = getStorage()
    const restImgRef = ref(storageRef, "restaurant-images/"+this.restaurantForm.value.name+".jpg")
    uploadBytes(restImgRef, this.file).then((snapshot) => {
      console.log("Image uploaded successfully");
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        this.dataToSave = form;
        this.dataToSave['image'] = downloadURL
        console.log("Image is available at: ", downloadURL);
        
        // Save this in Firebase
        this.dataToSave['image'] = downloadURL;
        this.dataToSave['creationTime'] = serverTimestamp()
        addDoc(collection(this.firestore, "restaurants"), this.dataToSave)
        this.loader = false;
      })
      .catch((error) => {
        console.log("Error code: ", error.code);
        console.log("Error message: ", error.message);
      })
    })
  }

  updateRestaurant(docId: any){
    const docRef = doc(collection(this.firestore, "restaurants"), docId)
    updateDoc(docRef, this.restaurantForm.value)
    this.restaurantForm.reset()
    this.loader = false
  }

  async fetchPromoRestaurants(){
    const snapshots = await getDocs(collection(this.firestore, "restaurants"))
    
    this.restaurantList = snapshots.docs.map((doc) => {
      const data = doc.data()
      console.log(doc.id);
      data['docId'] = doc.id
      return data
    })    
  }

  deleteRestaurant(docId: any){
    deleteDoc(doc(collection(this.firestore, "restaurants"), docId))
  }

  saveDataInSession(restaurant: any){
    sessionStorage.setItem("restaurant", JSON.stringify(restaurant))
  }


}
