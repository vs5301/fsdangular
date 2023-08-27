import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Restaurants } from 'src/app/models/restaurants';
import { RestaurantService } from 'src/app/service/restaurants.service';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { DbService } from 'src/app/service/db.service';
import { Firestore, addDoc, collection, serverTimestamp, doc, updateDoc, getDoc, getDocs } from '@angular/fire/firestore';

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
    public firestore: Firestore
  ){

  }

  ngOnInit(): void {
      this.fetchPromoRestaurants()
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
    console.log(this.restaurantForm.value);
    // this.restaurantForm.value['creationTime'] = serverTimestamp()
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
    


        // const collectionRef = collection(this.firestore, 'restaurants')
        // addDoc(collectionRef, dataToSave)
        console.log("Restaurant Added");
        this.loader = false;
      })
      .catch((error) => {
        console.log("Error code: ", error.code);
        console.log("Error message: ", error.message);
      })
    })
  }

  updateData(name: string){
    const docRef = doc(collection(this.firestore, "restaurants"), name)
    updateDoc(docRef, this.restaurantForm.value)
  }

  async fetchPromoRestaurants(){
    // const docRef = doc(collection(this.firestore, "restaurants"), "Subway")
    // await getDoc(docRef).then((result) => {
    //   this.restaurantList = result.data()
    //   console.log(this.restaurantList);
    //   return this.restaurantList
    // })

    const snapshots = await getDocs(collection(this.firestore, "restaurants"))
    
    this.restaurantList = snapshots.docs.map((doc) => {
      const data = doc.data()
      data['docId'] = doc.id
      return data
    })

    console.log(this.restaurantList);
    
  }

}
