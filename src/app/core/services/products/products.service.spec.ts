import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

describe('ProductsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getAllProducts', () => {
    it('should return array products', () => {
      const expectData = [
        {
          id: '1',
          image: 'img/img.jpg',
          title: 'Asdf',
          price: 1212,
          description: 'asdasdasd'
        },
        {
          id: '2',
          image: 'img/img.jpg',
          title: 'Asdf',
          price: 1212,
          description: 'asdasdasd'
        }
      ];
      let dataError: any[];
      let dataResponse: any[];
      service.getAllProducts().subscribe(r => {
        dataResponse = r;
      }, error => {
        dataError = error;
      });
      const request = httpTestingController.expectOne(`${environment.urlAPI}products`);
      request.flush(expectData);
      expect(dataResponse.length).toEqual(2);
      expect(request.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });
  });

});
