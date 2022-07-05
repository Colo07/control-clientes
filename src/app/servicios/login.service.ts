import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map } from "rxjs";

@Injectable()
export class LoginServicio {
    
    constructor(private authService: AngularFireAuth){} //regresa una promesa luego de hacer login

    login(email:string,password:string){
        return new Promise((resolve,reject)=>{
            this.authService.signInWithEmailAndPassword(email,password)
            .then(datos=> resolve(datos),
            error=> reject(error))
        })
    }


    getAuth(){
        return this.authService.authState.pipe(
            map(auth=>auth)
        )
    }


    logout(){
        this.authService.signOut()
    }

        // es para agregar un nuevo usuario para no tener que hacerlo desde la BD
    registrarse(email:string,password:string){
        return new Promise((resolve,reject)=>{
            this.authService.createUserWithEmailAndPassword(email,password)
            .then(datos=>resolve(datos),
            error=> reject(error))
        })
        
    }

}