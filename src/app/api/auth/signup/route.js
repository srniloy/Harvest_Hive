import { dbConnection } from "@utils/db_connection";
import bcrypt from 'bcrypt'


export async function POST(request) {

    const data = await request.json()
    let res = {
        message: '',
        status: 200
    }
    try {
        const hashedPassword = await bcrypt.hash(
            data.password,
            parseInt(process.env.BCRYPT_SALT)
        );
        const sqlLQuery = "INSERT INTO users (id, name, type, phone, address, nid, birth_date, password) VALUES (?,?,?,?,?,?,?,?)"
        const values = [data.user_id, data.name, data.user_type, data.phone, data.address, data.nid, data.birth_date, hashedPassword]
        console.log(data)
        await dbConnection.query(sqlLQuery, values);
        res.message = 'Account is Successfully Created'

    } catch (error) {
        res.message = 'Database error occured'
        res.status = 500
        new Error(error)
    }

    return new Response(JSON.stringify(res));
}

export async function GET(request) {
    return new Response('hello, next js! GET');
}
export async function PUT(request) {
    return new Response('hello, next js! PUT');
}