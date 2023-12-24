import { getCurrentDate } from "@utils/custom_date";
import { dbConnection } from "@utils/db_connection";


export async function POST(req, { params }) {

    if (params.instruction == 'add_trader_sales') {
        const data = await req.json()

        let res = {
            message: 'Trader Sales is Successfully added',
            status: 200
        }
        try {
            const sqlLQuery = "INSERT INTO trader_sales (quantity, price, amount, status, slot_id) VALUES (?,?,?,?,?)"
            const values = [data.quantity, data.price, (parseInt(data.quantity) + parseInt(data.price)), data.status, data.slot_id]
            await dbConnection.query(sqlLQuery, values);

            const sqlLQuery13 = "UPDATE stock_slots SET status=? WHERE id=?" // update stock quantity
            const values13 = ['Ready To Sell', data.slot_id]
            await dbConnection.query(sqlLQuery13, values13);
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

}