import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable()
export class FormValidationService {
  private days = [];

  public constructor(public globalService: GlobalService) {}

  public performTest(formObject: any): any {
    let formElements: any = [];
    if (formObject instanceof HTMLFormElement) {
      const formElementObject = formObject.querySelectorAll('input[data-validation]');
      formElementObject.forEach((element: any) => {
        formElements.push(element as any)
      });
    } else {
      const formElementObject = formObject.find('input[data-validation]');
      for (const element of formElementObject) {
        formElements.push(element as any)
      }
    }

    const response = {
      isSuccessful: true,
      numberFailed: 0,
      field: null,
    };

    for (const element of formElements) {
      response.field = element;
      (response?.field as any).classList.remove('is-invalid');

      if (
        element.getAttribute('type') === 'text' &&
        element.value.trim() === ''
      ) {
        response.isSuccessful = false;
        response.numberFailed += 1;
        break;
      }

      if (
        element.getAttribute('type') === 'password' &&
        element.value.trim() === ''
      ) {
        response.isSuccessful = false;
        response.numberFailed += 1;
        break;
      }
    }
    if (response.numberFailed > 0) {
      if (!response?.field.hasAttribute('aria-ignore')) {
        (response?.field as any).classList.add('is-invalid');
        (response?.field as any).focus();
      }

      // call popover
      let sibling = response.field.parentNode.firstChild;
      const siblings: Array<any> = [];
      while (sibling) {
        if (sibling.nodeType === 1 && sibling !== response.field) {
          if (
            sibling.hasAttribute('data-toggle') &&
            sibling.getAttribute('data-toggle') == 'popover'
          )
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
      }

      // check if
      if (siblings.length > 0) {
        siblings[0].click();
        setTimeout(() => {
          siblings[0].click();
        }, 3000);
      }
    } else {
      (response?.field as any).classList.remove('is-invalid');
    }
    return response;
  }

  public validateForm(formObject: any): any {
    const formElements = formObject.find('input[data-validation]');

    const response = {
      isSuccessful: true,
      numberFailed: 0,
      field: null,
    };

    for (const element of formElements) {
      response.field = element;
      (response?.field as any).classList.remove('is-invalid');

      if (
        element.getAttribute('type') === 'text' &&
        element.value.trim() === ''
      ) {
        response.isSuccessful = false;
        response.numberFailed += 1;
        break;
      }

      if (
        element.getAttribute('type') === 'password' &&
        element.value.trim() === ''
      ) {
        response.isSuccessful = false;
        response.numberFailed += 1;
        break;
      }
    }

    return response;
  }

  public validateNumber(args: any): void {
    if (args.target) {
      if (isNaN(args.target.value)) {
        args.target.value = '';
        args.cancelBubble = true;
        args.preventDefault();
      }
    }
  }

  public isValidEmailAddress(email) {
    const regularExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

}
