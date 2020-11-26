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
      'post-deploy' : 'yarn && yarn build && echo "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx" && pwd',
      'pre-setup': '',
    }
  }
};
