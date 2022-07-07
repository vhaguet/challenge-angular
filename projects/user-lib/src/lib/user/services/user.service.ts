import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, take, tap } from 'rxjs';
import { Router } from '@angular/router';

import { UserInterface } from 'projects/user-lib/src/lib/user/types/user.interface';
import { UserInputInterface } from 'projects/user-lib/src/lib/user/types/user-input.interface';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private usersUrl = 'api/users';

  addUser(user: UserInputInterface): Observable<UserInterface> {
    return this.http
      .post<UserInterface>(this.usersUrl, user, this.httpOptions)
      .pipe(
        take(1),
        tap((newUser: UserInterface) => {
          console.log(`added user id=${newUser?.id}`);
          this.ngZone.run(() => this.router.navigate(['/users', newUser.id]));
        }),
        catchError((error: any) => {
          console.error(error);
          return of(error);
        })
      );
  }

  fetchAllUser(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.usersUrl).pipe(
      take(1),
      tap((_) => console.log('fetched users')),
      catchError(this.handleError<UserInterface[]>('fetchAllUser', []))
    );
  }

  getUser(id: number): Observable<UserInterface> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<UserInterface>(url).pipe(
      take(1),
      tap((_) => console.log(`Get user id=${id}`)),
      catchError(this.handleError<UserInterface>('getUser'))
    );
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
