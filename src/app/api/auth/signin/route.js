import { dbConnection } from "@utils/db_connection";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// export async function POST(req) {
//     const res = NextResponse.json({ status: 200, message: 'ok' })
//     res.cookies.set('authToken', 'cbrsg425t43twgry4344gwry434we3642', {
//         expiresIn: '1d',
//         httpOnly: false
//     })
//     return res
// }

export async function POST(request) {
    const data = await request.json()
    const sqlLQuery = "SELECT id, type, phone, password FROM users WHERE phone = ?"
    const values = [data.phone]
    let res = {
        status: 200,
        message: 'Successfully signed in',
        user_data: {},
    }
    // let row = {}
    try {
        const [rows] = await dbConnection.query(sqlLQuery, values);
        if (!rows[0]) {
            res.status = 400
            res.message = "There is no user with this information, please sign up first"

        } else {
            const passwordMatches = await bcrypt.compare(data.password, rows[0].password);
            if (!passwordMatches) {
                res.status = 400
                res.message = "Password doesn't match"
            } else {
                res.user_data = {
                    user_id: rows[0].id,
                    user_type: rows[0].type
                }
            }
        }

    } catch (error) {
        res.status = 500
        res.message = "db error occured"

        new Error(error)
    }
    dbConnection.release()
    const token = jwt.sign(
        {
            'user_id': res.user_data.user_id
        },
        process.env.JWT_KEY
    )
    console.log(res.user_data.user_id)



    const response = NextResponse.json(res)
    // if (request.cookies.has('authToken')) {
    //     request.cookies.delete('authToken')
    // }
    const cookieName = `${res.user_data.user_type}Token`;
    response.cookies.set(cookieName, token, {
        expiresIn: '1d',
        httpOnly: true
    })

    return response;
}
