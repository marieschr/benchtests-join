// benchmarks.ts
import { test, expect } from 'vitest';

// Import the functions to test from different versions
import { joinCollections } from './v1-file'; // or './v2-file'
import { groupBy } from './v1-file'; // or './v2-file'
import { sort } from './v1-file'; // or './v2-file'

// Example mock database
const db = {
  collections: {
    users: [
      { id: 1, name: 'Alice', age: 30 },
      { id: 2, name: 'Bob', age: 25 },
    ],
    orders: [
      { orderId: 101, userId: 1, amount: 100 },
      { orderId: 102, userId: 2, amount: 150 },
    ],
  },

  getAllDocuments(collection: string) {
    return this.collections[collection] || [];
  },
};

// Benchmarking functions using vitest

test('joinCollections performance', async () => {
  const users = db.getAllDocuments('users');
  const orders = db.getAllDocuments('orders');

  // Run benchmark for joinCollections
  const start = Date.now();
  for (let i = 0; i < 1000; i++) {
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
