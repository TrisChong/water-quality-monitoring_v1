import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { join } from 'path';
import chalk from 'chalk';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

const CONNECTION_OPTIONS = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000,
  connectTimeoutMS: 10000,
  maxPoolSize: 10,
  family: 4
};

const testConnection = async () => {
  console.log(chalk.blue('\nTesting MongoDB connection...'));
  
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }

    // Log connection details (hide password)
    const sanitizedUri = uri.replace(/(mongodb\+srv:\/\/[^:]+:)[^@]+(@.*)/, '$1****$2');
    console.log(chalk.gray('\nConnection URI:'), sanitizedUri);
    console.log(chalk.yellow('\nAttempting connection...'));
    
    const conn = await mongoose.connect(uri, CONNECTION_OPTIONS);
    
    console.log(chalk.green('\n✅ MongoDB connection successful!'));
    console.log(chalk.gray('\nConnection details:'));
    console.log(chalk.gray('- Database:'), conn.connection.name);
    console.log(chalk.gray('- Host:'), conn.connection.host);
    
    await mongoose.disconnect();
    console.log(chalk.blue('\nConnection closed successfully'));
    process.exit(0);
  } catch (error) {
    console.error(chalk.red('\n❌ MongoDB connection failed!'));
    console.error(chalk.red('Error name:'), error.name);
    console.error(chalk.red('Error message:'), error.message);
    
    if (error.name === 'MongoServerSelectionError') {
      console.error(chalk.yellow('\nTroubleshooting steps:'));
      console.error(chalk.yellow('1. Check if your IP is whitelisted in MongoDB Atlas'));
      console.error(chalk.yellow('2. Verify username and password in connection string'));
      console.error(chalk.yellow('3. Ensure MongoDB Atlas cluster is running'));
      console.error(chalk.yellow('4. Check your network/firewall settings'));
      console.error(chalk.yellow('5. Try connecting from a different network'));
      
      // Additional debug info
      if (error.message.includes('authentication failed')) {
        console.error(chalk.red('\nAuthentication Error: Username or password is incorrect'));
      } else if (error.message.includes('getaddrinfo')) {
        console.error(chalk.red('\nNetwork Error: Cannot resolve MongoDB Atlas hostname'));
      }
    }
    
    process.exit(1);
  }
};

testConnection();