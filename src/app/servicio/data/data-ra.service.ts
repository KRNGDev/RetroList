import { Injectable } from '@angular/core';
import { UserRA } from 'src/app/interface/usr-ra';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';


const USR_RAIZ = "userLogin";
const KEY_RAIZ = "keyLogin";

@Injectable({
  providedIn: 'root'
})
export class DataRAService {
  private datosUser: UserRA = {} as UserRA;
  private apiKey:string='';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.storage.create().finally(() => {
      this.cargarDatos(USR_RAIZ);
      this.cargarDatos(KEY_RAIZ);
    });
  }
  
  setUser(data: UserRA,): void {
    this.datosUser = data;
    this.guardarUserLogin(data);
  }

  getUser(): UserRA {
    return this.datosUser;
  }

  setKey(data: string,): void {
    this.apiKey = data;
    this.guardarKeyLogin(data);
  }

  getKey(): string {
    return this.apiKey;
  }

  private cargarDatos(nodo:string){
    this.storage.get(nodo).
      then((userDB) => {
        if (userDB != null) {
          if(nodo===USR_RAIZ){
            this.datosUser=userDB;
          console.log("Datos cargados",this.datosUser);
          }else if(nodo===KEY_RAIZ){
            this.apiKey=userDB;
            console.log("Key cargada",this.apiKey);
          }
            

        }else{
          console.log("Datos no cargados");
        }
      })
  }

  private guardarUserLogin(usrLog: UserRA) {
    this.storage.get(USR_RAIZ).
      then((data) => {
        if (data == null) {
          let userLog = new Array();
          userLog.push(usrLog);
          this.storage.set(USR_RAIZ, userLog);
        } else {
          let userLog = usrLog;       
          this.storage.set(USR_RAIZ, userLog);
        }
      }).
      catch((error) => {
        console.error("Error:" + error);
      }).
      finally(() => {
        console.log("Fin del proceso de almacenamiento");
      });
  }
  private guardarKeyLogin(dato: string) {
    this.storage.get(KEY_RAIZ).
      then((data) => {
        if (data == null) {
          let keyLog = new String();
          keyLog=dato;
          this.storage.set(KEY_RAIZ, keyLog);
        } else {
          let keyLog = dato;       
          this.storage.set(KEY_RAIZ, keyLog);
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
