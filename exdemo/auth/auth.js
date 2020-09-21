const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require ('passport-jwt').Strategy;
const ExtractJWT = require ('passport-jwt').ExtractJwt;

var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appsp5'
})

// ==================== JWT STRATEGY ==================


passport.use(new JWTstrategy({
    // secret
    secretOrKey:'rahasia_banget',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('access_token')
    },
    async (token,done)=>{
        console.log('TOKEN>>',token);
        try{
            return done(null,token.user)
        }catch(e){
            done(e);
        }
    }
))

// ======================= lOCAL strategy =========

var strategy = new LocalStrategy(
    {
    passReqToCallback : true,
    usernameField: 'email',
    passwordField: 'password'
    },
    function(req,email,password,done){
    console.log("process",email,password);
    var sql = "SELECT * FROM users WHERE email = ?"
    con.query(sql,[email],function(e,r){
        if(e){
        return done(e);
        }
        if(!r.length){
        return done(null,
            false,
            req.flash('LoginMessage','User Not Found'));
        }
        if(!(r[0].password == password)){
        return done(null,false,
            req.flash('loginMessage', 'Username/Password Wrong'))
        }
        return done(null,r[0]);
    })
    }
);

passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    con.query("SELECT * FROM users WHERE id:?",
    [id],
    function(e,r){
        done(e,r[0])
    }
    )
})

passport.use('local-login',strategy);