module.exports = {
  apps : [{
    script: './dist/src/server.js',
    watch: './dist/src/',
  }],

  deploy : {
    production: {
      name : 'sorteiu_api',
      user : 'root',
      host : '104.248.13.181',
      ref  : 'origin/master',
      repo : 'git@github.com:gabrieldissotti/fourleaves-api.git',
      path : '/var/apis/sorteiu_api',
      'pre-deploy-local': '',
      'post-deploy' : 'yarn && yarn build && cd /var/apis/sorteiu/source/dist/src/ && pm2 reload /var/apis/sorteiu/source/ecosystem.config.js --env production && cp .env ./dist/src/',
      'pre-setup': '',
    }
  }
};
