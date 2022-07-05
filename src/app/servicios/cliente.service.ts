import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { map, Observable } from "rxjs";
import { Cliente } from "../modelo/cliente.model";

@Injectable()
export class ClienteServicio{
    clientesColeccion:AngularFirestoreCollection<Cliente>;
    clienteDoc:AngularFirestoreDocument<Cliente>;
    clientes: Observable<Cliente[]>;
    cliente: Observable<Cliente> | null;
    
    constructor(private db:AngularFirestore){
        this.clientesColeccion = db.collection('clientes',ref =>ref.orderBy('nombre','asc'))
    }

    getClientes():Observable<Cliente[]>{
        this.clientes= this.clientesColeccion.snapshotChanges().pipe(
            map(cambios=> {
                return cambios.map(
                    accion => {
                        const datos = accion.payload.doc.data() as Cliente; //el payload son los datos de nombre,apellido,mail,saldo
                        datos.id=accion.payload.doc.id;
                        return datos
                    })
            })
        ); return this.clientes
        
    }

    agregarCliente(cliente:Cliente){
        this.clientesColeccion.add(cliente)
    }
    
    getCliente(id:string){
        this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
        return this.cliente = this.clienteDoc.snapshotChanges().pipe(
            map( accion => {
                if(accion.payload.exists === false){
                    return null;
                }else{
                    const datos = accion.payload.data() as Cliente;
                    datos.id = accion.payload.id;
                    return datos as any;
                }
            }
            )
        )
    }

    modificarCliente(cliente:Cliente){
        this.clienteDoc = this.db.doc<Cliente>(`clientes/${cliente.id}`);
        this.clienteDoc.update(cliente)

    }

    eliminarCliente(cliente:Cliente){
        this.clienteDoc = this.db.doc<Cliente>(`clientes/${cliente.id}`);
        this.clienteDoc.delete();

    }
}