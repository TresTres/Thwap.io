module.exports = {
  apps : [{
    name: 'Thwap.io',
    script: 'app.js',
    instances: 'max',
    max_memory_restart: '256M',
    watch: true,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
