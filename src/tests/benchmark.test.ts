// benchmarks.ts
import { test, expect } from 'vitest';

// Import the functions to test from different versions
import { joinCollections } from './v1-file'; // or './v2-file'
import { groupBy } from './v1-file'; // or './v2-file'
import { sort } from './v1-file'; // or './v2-file'

// Define types for User and Order
interface User {
  id: number;
  name: string;
  age: number;
}

interface Order {
  orderId: number;
  userId: number;
  amount: number;
}

// Mock database initialization with proper typing
const db = {
  collections: {
    users: [] as User[],  // Explicitly type the users array
    orders: [] as Order[], // Explicitly type the orders array
  },

  getAllDocuments(collection: string) {
    return this.collections[collection] || [];
  },
};

// Function to generate random user data
function generateRandomUser(id: number): User {
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Hannah', 'Igor', 'Jack', 'Karen', 'Louis', 'Mona', 'Nina', 'Oliver', 'Paul', 'Quincy', 'Rachel', 'Sam', 'Tina', 'Uma', 'Vera', 'Walter', 'Xander'];
  const name = names[id % names.length];
  const age = Math.floor(Math.random() * (60 - 18 + 1)) + 18; // Random age between 18 and 60
  return { id, name, age };
}

// Function to generate random order data
function generateRandomOrder(orderId: number, userId: number): Order {
  const amount = Math.floor(Math.random() * (500 - 50 + 1)) + 50; // Random order amount between 50 and 500
  return { orderId, userId, amount };
}

// Populate mock database with 10 times the original data size
for (let i = 0; i < 1000; i++) {
  db.collections.users.push(generateRandomUser(i + 1));  // Generate 250 users (original data size * 10)
  db.collections.orders.push(generateRandomOrder(i + 1, i + 1));  // Generate 250 orders
}

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Shuffle the users and orders in the mock database
db.collections.users = shuffleArray(db.collections.users);
db.collections.orders = shuffleArray(db.collections.orders);

export default db;



// Benchmarking functions using vitest

test('joinCollections performance', async () => {
  const users = db.getAllDocuments('users');
  const orders = db.getAllDocuments('orders');

  // Run benchmark for joinCollections
  const start = Date.now();
  for (let i = 0; i < 10000; i++) {
    joinCollections(users, orders, 'id', 'userId');
  }
  const end = Date.now();

  const timeTaken = end - start;
  console.log(`joinCollections time: ${timeTaken}ms`);

  expect(timeTaken).toBeLessThan(1000); // Example performance expectation
});

test('groupBy performance', async () => {
  const users = db.getAllDocuments('users');

  // Run benchmark for groupBy
  const start = Date.now();
  for (let i = 0; i < 1000; i++) {
    groupBy(users, 'age');
  }
  const end = Date.now();

  const timeTaken = end - start;
  console.log(`groupBy time: ${timeTaken}ms`);

  expect(timeTaken).toBeLessThan(1000); // Example performance expectation
});

test('sort performance', async () => {
  const users = db.getAllDocuments('users');

  // Run benchmark for sort
  const start = Date.now();
  for (let i = 0; i < 1000; i++) {
    sort('users', 'age');
  }
  const end = Date.now();

  const timeTaken = end - start;
  console.log(`sort time: ${timeTaken}ms`);

  expect(timeTaken).toBeLessThan(1000); // Example performance expectation
});
