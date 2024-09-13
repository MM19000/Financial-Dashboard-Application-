const { createClient } = require('@vercel/postgres');
const placeholderData = require('./placeholder-data');
async function queryPosts() {
  const client = createClient();
  await client.connect();
 
  try {
    const likes = 100;
    const { rows, fields } =
      await client.sql `
      CREATE TABLE IF NOT EXISTS invoices (
        id SERIAL PRIMARY KEY,
        amount DECIMAL NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS revenue (
        id SERIAL PRIMARY KEY,
        amount DECIMAL NOT NULL,
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  // Insert data into tables
  const insertInvoices = `
  INSERT INTO invoices (amount) VALUES
  ($1), ($2), ($3)
`;

const insertCustomers = `
  INSERT INTO customers (name, email) VALUES
  ($1, $2), ($3, $4)
`;

const insertUsers = `
  INSERT INTO users (username, password) VALUES
  ($1, $2), ($3, $4)
`;

const insertRevenue = `
  INSERT INTO revenue (amount) VALUES
  ($1), ($2), ($3)
`;

const { invoices, customers, users, revenue } = placeholderData;

// Helper function to insert data into a table
const insertData = async (queryString, data) => {
  for (const row of data) {
    await query(queryString, row);
  }
};

// Insert data into each table
await insertData(insertInvoices, invoices);
await insertData(insertCustomers, customers);
await insertData(insertUsers, users);
await insertData(insertRevenue, revenue);

console.log('Database seeded successfully!');  } finally {
    await client.end();
  }
}