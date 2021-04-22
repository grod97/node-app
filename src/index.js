require('dotenv').config();

import { listen, get } from './server';

import './database';

listen(get('port'), ()=> {
    console.log('server on port:', get('port'))
})