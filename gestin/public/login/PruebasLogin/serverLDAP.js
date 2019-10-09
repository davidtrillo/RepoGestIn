function auth() {
    //     $host = "172.27.120.108";
    // $port = "389";
    
    // // Conexto donde se encuentran los usuarios
    // $basedn = "OU=Usuaris Mobilitat,DC=mobilitat,DC=local";
    
    // // Atributos a recuperar
    // $searchAttr = array("dn", "cn", "sn", "givenName");
    
    // var connect = require('connect');
    // var LdapAuth = require('ldapauth');
    
    // // Config from a .json or .ini file or whatever.
    // var config = {
    //   ldap: {
    //     url: "ldaps://172.27.120.108:389",
    //     adminDn: "uid=Administrador2,ou=users,o=example.com",
    //     adminPassword: "David69",
    //     searchBase: "OU=Usuaris Mobilitat,DC=mobilitat,DC=local",
    //     searchFilter: "(uid={{dtrillo}})"
    //   }
    // };
    
    // var ldap = new LdapAuth({
    //   url: config.ldap.url,
    //   adminDn: config.ldap.adminDn,
    //   adminPassword: config.ldap.adminPassword,
    //   searchBase: config.ldap.searchBase,
    //   searchFilter: config.ldap.searchFilter,
    //   //log4js: require('log4js'),
    //   cache: true
    // });
    
    // var basicAuthMiddleware = connect.basicAuth(function (username, password, callback) {
    //   ldap.authenticate(username, password, function (err, user) {
    //     if (err) {
    //       console.log("LDAP auth error: %s", err);
    //     }
    //     callback(err, user)
    //   });
    // });
    
    //     
    // version 2
        // var username='dtrillo';
        // var password='Mobilitat01';
        // var ldap = require('ldapjs');
        // var ldapServer = new ldap({ uri: 'ldap://172.27.120.108:389"', version: 3});
    
        // ldapServer.open(function(error) {
        //     if(error) {
        //        throw new Error('Cant not connect');
        //     } else {
        //         console.log('---- connected to ldap ----');
    
        //         username = '(cn='+username+')';
        //         ldapServer.findandbind({
        //             base: 'OU=Usuaris Mobilitat,DC=mobilitat,DC=local',
        //             filter: username,
        //             password: password
        //         }, function(error, data) {
        //             if(error){
        //                 console.log(error);
        //             } else {
        //                 console.log('---- verified user ----');
        //             }
        //         });
        //     }
        // });
    // version 3
    import * as ldap from 'C:/wamp64/www/gestin/node_modules/ldapjs/';
    var ldap = require('C:/wamp64/www/gestin/node_modules/ldapjs/lib/index.js');
    console.log("hola desde serverLDAP");
    
     var server = ldap.createServer();
        server.listen(389, function() {
       console.log('/etc/passwd LDAP server up at: %s', server.url);
     });




    }