import {HttpErrorResponse} from '@angular/common/http';

export abstract class HandleError {
  protected errorString = '';
  protected submitRequest = false;

  protected handleError(error: HttpErrorResponse) {
    this.submitRequest = true;
    if (this.errorString === '') {
      if (error.error.data !== undefined) {
        const errorMessage = error.error.data['error-code'];
        if (error.status === 404) {
          this.errorString = 'Es trat ein unbekannter Fehler auf (404)!';
        } else if (error.status === 400) {
          if (errorMessage === 'invalid-request') {
            this.errorString = 'Der Request ist modifiziert worden!';
          } else if (errorMessage === 'request-not-found') {
            this.errorString = 'Der Request wurde nicht gefunden!';
          } else {
            this.errorString = 'Es trat ein unbekannter Fehler auf (400)!';
          }
        } else if (error.status === 401) {
          if (errorMessage === 'authorization-header-not-found') {
            this.errorString = 'Es wurde kein Authorisierungs Header gefunden!';
          } else if (errorMessage === 'no-token-provided') {
            this.errorString = 'Es wurde kein Token gefunden!';
          } else if (errorMessage === 'token-is-not-valid') {
            this.errorString = 'Der Token ist nicht mehr gültig! Bitte logge dich erneut ein!';
          } else {
            this.errorString = 'Es trat ein unbekannter Fehler auf (401)!';
          }
        }
      }

      if (error.status === 500) {
        this.errorString = 'Es trat ein unbekannter Fehler auf (500)!';
      }
    }
  }
}
