import { Injectable } from'@angular/core';
import 'rxjs/add/operator/map';
import { HTTP } from '@ionic-native/http'

let apiUrl = 'https://pm.inka.co.id/p/';

@Injectable()


export class AuthServiceProvider {
  constructor(private http: HTTP) {
   // console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {  
      let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic YzJGNVlTQnpaV1JoYm1jZ2JXVnRZWE5oYXlCdVlYTnBJSEJoYm1GeklHaGhjbWRoSURVd006REF3T25OaGVXRWdjMlZrWVc1bklHMXBiblZ0SUdWeklHTmhiWEIxY21oaGNtZGhJREl3TUQ="
      };   
      this.http.setRequestTimeout(10);
      this.http.post(apiUrl + type, credentials, headers)
        .then(data => {
          resolve(JSON.parse(data.data));
        })
        .catch(error => {
           //this.common.closeLoading();
           //console.log(JSON.parse(error));
           reject(JSON.parse(error.error));
        });      
      
    });
  }

  GetData(type) {
    return new Promise((resolve, reject) => {  
      let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic YzJGNVlTQnpaV1JoYm1jZ2JXVnRZWE5oYXlCdVlYTnBJSEJoYm1GeklHaGhjbWRoSURVd006REF3T25OaGVXRWdjMlZrWVc1bklHMXBiblZ0SUdWeklHTmhiWEIxY21oaGNtZGhJREl3TUQ="
      };   
      this.http.setRequestTimeout(10);
      this.http.get(apiUrl + type,{}, headers)
        .then(data => {
          resolve(JSON.parse(data.data));
        })
        .catch(error => {
           //this.common.closeLoading();
           //console.log(JSON.parse(error));
           reject(JSON.parse(error.error));
        });      
      
    });
  }
}