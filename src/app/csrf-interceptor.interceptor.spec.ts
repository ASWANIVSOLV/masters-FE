import { TestBed } from '@angular/core/testing';
// import { HttpInterceptorFn } from '@angular/common/http';

import { csrfInterceptorInterceptor } from './csrf-interceptor.interceptor';

describe('csrfInterceptorInterceptor', () => {
  // const interceptor: HttpInterceptorFn => 
  //   TestBed.runInInjectionContext(() => csrfInterceptorInterceptor);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[csrfInterceptorInterceptor]
    });
  });

  it('should be created', () => {
    const interceptor: csrfInterceptorInterceptor = TestBed.inject(() => csrfInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
