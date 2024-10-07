import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  async login(username: string, password: string): Promise<User | null> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      return null;
    }
  }

}
