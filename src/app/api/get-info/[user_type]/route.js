import { dbConnection } from '@utils/db_connection';
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';




export async function GET(req, { params }) {
    const authName = `${params.user_type}Token`;
    const authToken = req.cookies.get(authName)?.value
    const data = await jwt.verify(authToken, process.env.JWT_KEY);
    const sqlLQuery = "SELECT id, name, img, type, phone, address, nid, birth_date FROM users WHERE id = ?"
    const values = [data.user_id]

    let res = {
        status: 200,
        message: 'Successfully fetched user data',
        user_data: {},
    }
    try {
        const [rows] = await dbConnection.query(sqlLQuery, values);
        if (!rows[0]) {
            res.status = 400
            res.message = "User data not found"

        } else {
            res.user_data = rows[0]
        }

    } catch (error) {
        res.status = 500
        res.message = "db error occured"

        console.log(error)
    }
    dbConnection.release()
    return NextResponse.json(res);
}


