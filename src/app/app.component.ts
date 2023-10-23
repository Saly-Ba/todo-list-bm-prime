import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { child, DataSnapshot, get, getDatabase, push, ref, set, update } from "firebase/database";
import { TaskStatus } from 'src/models/task';
const firebaseConfig = {
  apiKey: "AIzaSyBa9lYI6ikvmcawe2S5yZOdKmtCKyXMGlo",
  authDomain: "todo-list-bm-prime.firebaseapp.com",
  projectId: "todo-list-bm-prime",
  storageBucket: "todo-list-bm-prime.appspot.com",
  messagingSenderId: "1053783877602",
  appId: "1:1053783877602:web:0775d40aeb79b7f04b3bbb"
};

const app = initializeApp(firebaseConfig);
//calling the realtime database from Firebase
const db = getDatabase(app);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  tasks: any;
  title = 'todo-list-bm-prime';

  //this is the firebase configuration for Angular 

  ngOnInit() :void {
    this.getTaks();
  }
  addTask(){
    const newKey = push(child(ref(db), 'tasks')).key;
    set(ref(db, 'tasks/'+newKey), {
      'name': 'hello',
      'status': 'pending'
    });
  }

  getTaks(){
    get(child(ref(db), 'tasks/')).then((value) =>{
      if(value.exists()){
        console.log(value.val());
        this.tasks = value.val();
      }else {
        console.log("No data available");
      }
    })
  }

  updateTaskName(taskId: String, newName: String){
    return update(ref(db, 'tasks/'+taskId),{'name': newName})
  }

  updateTaskSatuts(taskId: String, status: TaskStatus){
    return update(ref(db, 'tasks/'+taskId),{'name': status.toString})
  }

}


