const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const { Pool } = require('pg');

async function getDbCredentials() {
  const secretName = process.env.DB_SECRET_NAME;
  const region = process.env.AWS_REGION || 'us-east-1';

  const secretsClient = new SecretsManagerClient({ region });
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await secretsClient.send(command);

  return JSON.parse(response.SecretString);
}

exports.handler = async (event) => {
  let client;

  try {
    const credentials = await getDbCredentials();

    const pool = new Pool({
      host: credentials.host,
      user: credentials.username,
      password: credentials.password,
      database: credentials.database,
      port: parseInt(credentials.port, 10),
      ssl: { rejectUnauthorized: false },
    });

    client = await pool.connect();
    const { monkName, arrivalDate, departureDate, comments } = JSON.parse(event.body);

    const result = await client.query(
      `INSERT INTO stay_requests (monk_name, arrival_date, departure_date, comments)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [monkName, arrivalDate, departureDate, comments]
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: 'Stay request submitted!',
        request: result.rows[0],
      }),
    };

  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Failed to submit stay request', details: err.message }),
    };
  } finally {
    if (client) client.release();
  }
};
