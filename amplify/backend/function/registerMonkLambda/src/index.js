const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const { Pool } = require('pg');

let pool;

// Fetch database credentials from Secrets Manager
async function getDbCredentials() {
  const secretName = process.env.DB_SECRET_NAME;
  const region = process.env.AWS_REGION || 'us-east-1';

  const secretsClient = new SecretsManagerClient({ region });

  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await secretsClient.send(command);

  return JSON.parse(response.SecretString);
}

// Initialize pool only once (important for Lambda warm reuse)
async function getDbPool() {
  if (!pool) {
    const credentials = await getDbCredentials();
    pool = new Pool({
      host: credentials.host,
      user: credentials.username,
      password: credentials.password,
      database: credentials.database,
      port: parseInt(credentials.port, 10),
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

// Lambda handler
exports.handler = async (event) => {
  let client;

  try {
    const dbPool = await getDbPool();
    client = await dbPool.connect();

    const { name, age, nationality, email } = JSON.parse(event.body);

    const insertQuery = `
      INSERT INTO monks (name, age, nationality, email)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [name, age, nationality, email];

    const result = await client.query(insertQuery, values);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // 👈 REQUIRED
      },
      body: JSON.stringify({
        message: "Monk registered successfully!",
        monk: result.rows[0]
      }),
    };
  } catch (error) {
    console.error('Error occurred:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to register monk', details: error.message }),
    };
  } finally {
    if (client) {
      client.release();
    }
  }
};


/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["DB_SECRET_NAME"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/


// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// exports.handler = async (event) => {
//     console.log(`EVENT: ${JSON.stringify(event)}`);
//     return {
//         statusCode: 200,
//     //  Uncomment below to enable CORS requests
//     //  headers: {
//     //      "Access-Control-Allow-Origin": "*",
//     //      "Access-Control-Allow-Headers": "*"
//     //  },
//         body: JSON.stringify('Hello from Lambda!'),
//     };
// };
