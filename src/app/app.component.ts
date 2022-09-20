import { Component } from '@angular/core';
import { Auto } from './models/auto.model';
import { Piloto } from './models/piloto.model';
import { Carrera } from './models/carrera.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-car-race';
  
  constructor(){

    const p1: Piloto = this.crearPiloto(1,"Kevin","Sandoval","Mexicana")
    const p2: Piloto = this.crearPiloto(2,"Maria","Sanchez","Colombiana")
    const p3: Piloto = this.crearPiloto(3,"Juan","Lopez","Brasileña")
    const p4: Piloto = this.crearPiloto(4,"Rosa","Ramirez","Canadience")

    const a1 : Auto = this.crearAuto(1,"rojo","Detenido",0,p1)
    const a2 : Auto = this.crearAuto(2,"azul","Detenido",0,p2)
    const a3 : Auto = this.crearAuto(3,"verde","Detenido",0,p3)
    const a4 : Auto = this.crearAuto(4,"negro","Detenido",0)
    const a5 : Auto = this.crearAuto(5,"negro","Detenido",0,p4)

    const carrera :Carrera = this.crearCarrera([a1,a2,a3,a5],1,1,"Nueva")

    this.iniciarCarrera(carrera)
    
    while(carrera.estatus!="Terminada"){
      this.mostrarPosiciones(carrera)

    }
    
    const {autos} = carrera
    let distanciaAuto = 0
    let autoGanador: Auto;
    
    autos.forEach(auto =>{
        if(distanciaAuto < auto.distancia){
           distanciaAuto = auto.distancia
        }
        
    })

    autos.forEach(auto =>{
      if(distanciaAuto == auto.distancia){
        console.log("El ganador es: " + auto.piloto?.nombre + " " + auto.piloto?.apellido+" Nacionalidad: "+ auto.piloto?.nacionalidad+ " Auto: "+auto.numero);
      }
    })

    
    
  }

  crearPiloto(id: number,nombre : string, apellido: string, nacionalidad:string):Piloto{
    return {
      id:id,
      nombre:nombre,
      apellido: apellido,
      nacionalidad: nacionalidad
    }

  }

  crearAuto(numero: number,color:string,estatus :string,distancia:number,piloto?:Piloto): Auto{
    return {
      numero: numero,
      color: color,
      piloto: piloto,
      distancia : 0,
      estatus : estatus,
      arrancar(){
        this.estatus = "Avanzado";
        this.actualizarDistancia(50);
      },
      actualizarDistancia(distancia:number){
        this.distancia += distancia
      },
      detener(){
  	    this.estatus = "detenido";
      }
    }
  }

  crearCarrera(autos:Auto[],vueltas: number,distancia: number,estatus:string): Carrera{
     return{
       autos:autos,
       vueltas:vueltas,
       distancia:distancia,
       estatus:estatus
     }
  }

  iniciarCarrera(carrera: Carrera){
    const {estatus} = carrera
    
    if(estatus=="Nueva"){
      carrera.autos.forEach( auto =>{
        auto.arrancar()
      })
    }
    carrera.estatus= "En Proceso";
    
  }

  actualizarCarrera(carrera: Carrera){
    let terminada = 1
    if(carrera.estatus=="En Proceso"){
      carrera.autos.forEach(auto =>{
        auto.actualizarDistancia(Math.floor(Math.random() * (50 - 1) + 1))
        if(auto.distancia < carrera.distancia*carrera.vueltas*1000){
            terminada = 0
            
        }else{
          auto.estatus = "Detenido"
        }
      })
    }
    if(terminada == 1){
      carrera.estatus="Terminada"
    }
    

  }

  mostrarPosiciones(carrera : Carrera){
    let i =1
    this.actualizarCarrera(carrera)
    console.log("Estatus de la carrera: "+carrera.estatus);
    const autos: Auto[] =carrera.autos.sort((a : Auto,b: Auto)=> b.distancia-a.distancia)
    autos.forEach(auto=>{
      console.log("Posición: "+ (i++)+" Nombre: " + auto.piloto?.nombre + " " + auto.piloto?.apellido+" Nacionalidad: "+ auto.piloto?.nacionalidad+ " Auto: "+auto.numero);
    })
    console.table(autos)
    
    
  }




}
