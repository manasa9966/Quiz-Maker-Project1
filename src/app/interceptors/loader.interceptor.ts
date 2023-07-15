import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { QuizLoaderService } from '../services/quiz-loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private quizloaderService: QuizLoaderService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        //start loader.
        this.quizloaderService.quizLoaderShow();

        return next.handle(request).pipe(
            //stop loader.
            finalize(() => this.quizloaderService.quizLoaderHide()),
        );
    }
}
