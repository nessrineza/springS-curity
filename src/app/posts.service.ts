import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {map, tap} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({providedIn :'root'})
export class PostsService{
  error = new Subject<string>();
  constructor(private http: HttpClient) {
  }
  createAndStorePost(title: string,content: string){
    const postData : Post= {title: title,content: content}
    this.http
      .post<{ name: string}>(
        'https://ng-complete-guide-5b530-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
          observe : 'response'
        }
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error1 => {
        this.error.next(error1.message);
      });
  }
  fetchPosts(){
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print','pretty');
    searchParams = searchParams.append('print','pretty');
    return this.http
      .get('https://ng-complete-guide-5b530-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({'Custom-Header': 'Hello'}),
        params: searchParams,
        responseType: 'json'
      })
      .pipe(
        map((responseData) =>{
          const postsArray: Post[] =[];
          for (const key in responseData){
            if (responseData.hasOwnProperty(key))
            { // @ts-ignore
              postsArray.push({...responseData[key],id: key})
            }
          }
          return postsArray;
        })
      );
  }
  deletePosts(){
    return this.http.delete(
      'https://ng-complete-guide-5b530-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'events',
        responseType: 'text'
      })
      .pipe(
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent){
           //
          }

          if (event.type === HttpEventType.Response){
            console.log(event.body)
          }
        })
      );
  }
}
