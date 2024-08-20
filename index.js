import psforce from 'psforce';

import jsforce from 'jsforce';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


async function test(){
    const conn = new jsforce.Connection({version: '61.0'});
    await conn.login(process.env.username, process.env.password);

    let permissionsToCheck = process.env.permissions.split(',');

    const result = await psforce.getUsersWithAccess({
        sfClient: conn,
        permissionsToCheck
    });

    fs.writeFileSync('usersWithAllPermissions.json', JSON.stringify(result, null, 2));
}

test();