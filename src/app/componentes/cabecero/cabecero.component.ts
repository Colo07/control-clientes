import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { LoginServicio } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {
  
  isLoggedIn:boolean;
  loggedInUser:string | null ;

  permitirRegistro:boolean | undefined;

  constructor(private loginService:LoginServicio,
              private router:Router,
              private configuracionServicio:ConfiguracionServicio) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if (auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email
      }
      else{
        this.isLoggedIn=false;
      }
    })

    this.configuracionServicio.getConfiguracion().subscribe(config=>{
      this.permitirRegistro = config.permitirRegistro;})
  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn=false
    this.router.navigate(['/login'])
  }

}