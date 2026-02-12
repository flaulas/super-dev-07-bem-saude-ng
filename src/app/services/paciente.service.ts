import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PacienteResponseModel, PacienteCriarRequestModel, PacienteEditarRequestModel, PacientePesquisaResponseModel } from '../models/paciente.model';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private httpClient = inject(HttpClient);

  getAll(): Observable<PacienteResponseModel[]> {
    const url = `${environment.apiUrl}/pacientes`;
    return this.httpClient.get<PacienteResponseModel[]>(url);
  }

  create(form: PacienteCriarRequestModel): Observable<PacienteResponseModel> {
    const url = `${environment.apiUrl}/pacientes`;
    return this.httpClient.post<PacienteResponseModel>(url, form);
  }

  update(id: string, form: PacienteEditarRequestModel): Observable<PacienteResponseModel> {
    const url = `${environment.apiUrl}/pacientes/${id}`;
    return this.httpClient.put<PacienteResponseModel>(url, form);
  }

  getById(id: string): Observable<PacientePesquisaResponseModel> {
    const url = `${environment.apiUrl}/pacientes/${id}`;
    return this.httpClient.get<PacientePesquisaResponseModel>(url);
  }

  inativar(id: string): Observable<void> {
    const url = `${environment.apiUrl}/pacientes/${id}`;
    return this.httpClient.delete<void>(url);
  }

  ativar(id: string): Observable<void> {
    const url = `${environment.apiUrl}/pacientes/${id}/ativar`;
    return this.httpClient.put<void>(url, {});
  }
}
