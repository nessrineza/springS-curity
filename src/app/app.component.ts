import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Post} from "./post.model";
import {PostsService} from "./posts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy {
  loadedPosts: Post[] = [];
  isFetching =false;
   error =null;
   private  errorSub!: Subscription;
  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub= this.postsService.error.subscribe(errorMessage =>{
      // @ts-ignore
      this.error =errorMessage;
    })
    this.isFetching =true;
    this.postsService.fetchPosts().subscribe(posts =>{
      this.isFetching= false;
      this.loadedPosts=posts;
    },
      error =>{
      this.error = error.message;
      });
  }

  // @ts-ignore
  onCreatePost(postData : Post) {
    // Send Http request
      this.postsService.createAndStorePost(postData.title,postData.content);
  }

  onFetchPosts() {

    // Send Http request
    this.isFetching =true;
    this.postsService.fetchPosts().subscribe(posts =>{
      this.isFetching= false;
      this.loadedPosts=posts;
    }, error => {
       this.error = error.message;
       console.log(error);
    });
  }

  onClearPosts() {
    // Send Http request
    // @ts-ignore
    this.postsService.deletePosts().subscribe(()=>{
      this.loadedPosts=[];

    });
  }
  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}