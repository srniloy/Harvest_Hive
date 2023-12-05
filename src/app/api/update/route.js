import { dbConnection } from "@utils/db_connection";


export async function POST(req) {

    const data = await req.json()
    let res = {
        message: '',
        status: 200
    }
    try {
        const sqlLQuery = "UPDATE users SET name=?, img=?, phone=?, address=?, nid=?, birth_date=? WHERE id = ?"
        const values = [data.name, data.img, data.phone, data.address, data.nid, data.birth_date, data.id]
        await dbConnection.query(sqlLQuery, values);
        res.message = 'Data is Successfully Updated'

    } catch (error) {
        res.message = 'Database error occured'
        res.status = 500
        new Error(error)
    }

    return new Response(JSON.stringify(res));
}
