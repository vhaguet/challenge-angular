import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { UserInterface } from 'src/app/user/types/user.interface';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private usersUrl = 'api/users';

  addUser(user: UserInterface): Observable<UserInterface> {
    return this.http
      .post<UserInterface>(this.usersUrl, user, this.httpOptions)
      .pipe(
        tap((newUser: UserInterface) => {
          console.log(`added user id=${newUser.id}`);
          this.router.navigate(['/users', newUser.id]);
        }),
        catchError((error: any) => {
          console.error(error);
          return of(error);
        })
      );
  }

  fetchAllUser(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.usersUrl).pipe(
      tap((_) => console.log('fetched users')),
      catchError(this.handleError<UserInterface[]>('fetchAllUser', []))
    );
  }

  getUser(id: number): Observable<UserInterface> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<UserInterface>(url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
