'use strict';

const config = require('./config');
const SMTPServer = require('smtp-server').SMTPServer;

// Setup server
const server = new SMTPServer({

    // log to console
    logger: false,

    // not required but nice-to-have
    banner: 'Welcome to My Awesome SMTP Server',

    // disable STARTTLS to allow authentication in clear text mode
    disabledCommands: ['STARTTLS'],

    // Accept messages up to 10 MB. This is a soft limit
    size: 10 * 1024 * 1024,

    // Setup authentication
    // Allow all usernames and passwords, no account checking
    onAuth(auth, session, callback) {
        return callback(null, {
            user: {
                username: auth.username
            }
        });
    },

    // Handle message stream
    onData(stream, session, callback) {
        console.log('Streaming message from user %s', session.user.username);
        console.log('------------------');
        stream.pipe(process.stdout);
        stream.on('end', () => {
            console.log(''); // ensure linebreak after the message
            callback(null, 'Message queued as ' + Date.now()); // accept the message once the stream is ended
        });
    }
});

server.on('error', err => {
    console.log('Error occurred');
    console.log(err);
});

// start listening
server.listen(config.server.port, config.server.host);
