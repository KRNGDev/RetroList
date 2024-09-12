import { Injectable } from '@angular/core';
import { UserRA } from 'src/app/interface/usr-ra';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';


const NODO_RAIZ = "userLogin";

@Injectable({
  providedIn: 'root'
})
export class DataRAService {
  private datosUser: UserRA = {} as UserRA;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.storage.create().finally(() => {
      this.cargarDatos();
    });
  }

  cargarDatos(){
    this.storage.get(NODO_RAIZ).
      then((userDB) => {
        if (userDB != null) {
          
            this.datosUser=userDB;
          console.log("Datos cargados",this.datosUser);

        }else{
          console.log("Datos no cargados");
        }
      })
  }

  setUser(data: UserRA,): void {
    this.datosUser = data;
    this.guardarUserLogin(data);
  }

  getUser(): UserRA {
    return this.datosUser;
  }

  guardarUserLogin(usrLog: UserRA) {
    this.storage.get(NODO_RAIZ).
      then((data) => {
        if (data == null) {
          let userLog = new Array();
         
          userLog.push(usrLog);
          console.log(userLog);
          this.storage.set(NODO_RAIZ, userLog);
        } else {
          let userLog = data;
          userLog.push(usrLog);
          this.storage.set(NODO_RAIZ, userLog);
        }
      }).
      catch((error) => {
        console.error("Error:" + error);
      }).
      finally(() => {
        console.log("Fin del proceso de almacenamiento");
      });
  }
}
