const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environments.ts';

const envFileContent = `
export const environment = {
  CLIENTID: "${ process.env['CLIENTID'] }",
  AUTHORITY_URL: "${ process.env['AUTHORITY_URL'] }",
  REDIRECT_URL: "${ process.env['REDIRECT_URL'] }",
};
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);