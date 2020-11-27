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
      'pre-deploy': 'rm -r ./source/*',
      'post-deploy' : 'yarn && yarn build && cd /var/apis/sorteiu_api/source/dist/src/ && pm2 delete sorteiu_api && cp /var/apis/sorteiu_api/source/.env /var/apis/sorteiu_api/source/dist/src/ && pm2 start server.js --name sorteiu_api',
      'pre-setup': '',
    }
  }
};
