import { getCurrentDate } from "@utils/custom_date";
import { dbConnection } from "@utils/db_connection";


export async function POST(req, { params }) {


    if (params.instruction == 'add_offers') {
        const data = await req.json()
        let res = {
            message: 'Offer is Successfully Send',
            status: 200
        }
        try {
            const sqlLQuery = "INSERT INTO wholesaler_offers (price, quantity, amount, offered_by, sales_id ) VALUES (?,?,?,?,?)"
            const values = [parseInt(data.price), parseInt(data.quantity), (parseInt(data.quantity) * parseInt(data.price)), data.offered_by, data.sales_id]
            await dbConnection.query(sqlLQuery, values);

            // const sqlLQuery1 = "UPDATE farmer_sales SET total_offers=(SELECT COUNT(id) FROM offers WHERE sales_id=? AND project_id=? AND status='Pending') WHERE id=? AND project_id=?";
            // const values1 = [data.sales_id, data.project_id, data.sales_id, data.project_id]
            // await dbConnection.query(sqlLQuery1, values1);

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }


    else if (params.instruction == 'add_orders') {
        const { row, current_user } = await req.json()
        const order_id = row.trader_id[0] + current_user[0] + new Date().valueOf()
        const date = getCurrentDate()
        let res = {
            message: 'Order is Successfully Stored',
            status: 200,
            order_id: order_id
        }
        console.log(order_id)
        try {
            const sqlLQuery = "INSERT INTO wt_orders (id, seller_id, buyer_id, sales_id, offer_id, date, prev_order_id) VALUES (?,?,?,?,?,?,?)"
            const values = [order_id, row.trader_id, current_user, row.sales_id, row.offer_id, date, row.order_id]
            await dbConnection.query(sqlLQuery, values);

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }



}