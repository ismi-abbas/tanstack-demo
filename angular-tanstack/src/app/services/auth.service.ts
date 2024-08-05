import { Injectable } from '@angular/core';
import jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  private firstNames = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Emma',
    'Frank',
    'Grace',
    'Henry',
    'Isabel',
    'Jack',
    'Kate',
    'Liam',
    'Mia',
    'Noah',
    'Olivia',
    'Paul',
    'Quinn',
    'Rachel',
    'Sam',
    'Tara',
  ];

  private lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Hernandez',
    'Lopez',
    'Gonzalez',
    'Wilson',
    'Anderson',
    'Thomas',
    'Taylor',
    'Moore',
    'Jackson',
    'Martin',
  ];

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser() {
    return this.isAuthenticated;
  }

  getUserProfile() {
    return {
      name: this.generateRandomName(),
      email: this.generateRandomEmail(),
    };
  }

  generateRandomName() {
    const randomFirstName =
      this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
    const randomLastName =
      this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
    return `${randomFirstName} ${randomLastName}`;
  }

  generateRandomEmail() {
    const emailParts = [
      Math.random().toString(36).substring(2, 8),
      '@',
      ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'][
        Math.floor(Math.random() * 4)
      ],
    ];
    return emailParts.join('');
  }

  generateRandomToken() {
    const payload = {
      name: this.generateRandomName(),
      email: this.generateRandomEmail(),
    };
    return jwt.sign(payload, 'secretKey', { expiresIn: '1h' });
  }
}
