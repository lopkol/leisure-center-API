'use strict';

const environment = process.env.NODE_ENV || 'dev';
require('dotenv-haphap').config(`config/environment/${environment}.env`, 'config/environment/confidential.env');

const dockerToolboxDefaultIp = '192.168.99.100';
const dbUrl = process.env.DATABASE_URL;
const useDockerToolbox = process.env.USE_DOCKER_TOOLBOX === 'true';
const shouldOverrideDbUrl = useDockerToolbox && dbUrl && dbUrl.includes('localhost');

if (shouldOverrideDbUrl) {
  process.env.DATABASE_URL = dbUrl.replace('localhost', dockerToolboxDefaultIp);
}
