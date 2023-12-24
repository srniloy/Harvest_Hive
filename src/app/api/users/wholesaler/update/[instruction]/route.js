import { dbConnection } from "@utils/db_connection";


export async function POST(req, { params }) {

    if (params.instruction == 'update_sales_offers_status') {

        const data = await req.json()
        console.log(data)
        let res = {
            message: 'Successfully updated the status',
            status: 200
        }
        try {

            const sqlLQuery1 = "UPDATE wholesaler_offers SET status=? WHERE id=?"
            const values1 = ['Accepted', data.offer_id]
            await dbConnection.query(sqlLQuery1, values1);


            const sqlLQuery = "UPDATE trader_sales SET status=? WHERE id=?"
            const values = ['Processing', data.sales_id]
            await dbConnection.query(sqlLQuery, values);



            // const sqlLQuery2 = "UPDATE farmer_sales SET total_offers=(SELECT COUNT(id) FROM offers WHERE sales_id=? AND project_id=? AND status='Pending') WHERE id=? AND project_id=?";
            // const values2 = [data.sales_id, data.product_id, data.sales_id, data.product_id]

            // await dbConnection.query(sqlLQuery2, values2);

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }


    else if (params.instruction == 'confirm_order') {

        const { order_id, transportInfo, order_details } = await req.json()
        let order_info = {}
        let res = {
            message: 'Successfully updated the status',
            status: 200
        }
        try {
            const sqlLQuery = "SELECT * FROM wt_orders WHERE id=?" // get order details
            const values = [order_id]
            const rows = await dbConnection.query(sqlLQuery, values);
            order_info = rows[0][0]


            const sqlLQuery1 = "UPDATE wt_orders SET status=? WHERE id=?" // update order status
            const values1 = ['Complete', order_id]
            await dbConnection.query(sqlLQuery1, values1);

            console.log(order_info)


            const sqlLQuery7 = "SELECT * FROM wholesaler_offers WHERE id=?" // get offer info
            const values7 = [order_info.offer_id]
            const offerInfo = await dbConnection.query(sqlLQuery7, values7);

            const sqlLQuery4 = "UPDATE trader_sales SET status=?, quantity=?, price=?, amount=? WHERE id=?" // update sales status and sale info
            const values4 = ['Sold Out', offerInfo[0][0].quantity, offerInfo[0][0].price, offerInfo[0][0].amount, order_info.sales_id]
            await dbConnection.query(sqlLQuery4, values4);


            const sqlLQuery6 = "UPDATE wholesaler_offers SET status=? WHERE id=?" // update offer status
            const values6 = ['Sold Out', order_info.offer_id]
            await dbConnection.query(sqlLQuery6, values6);

            const sqlLQuery5 = "INSERT INTO wt_transports (vehicle, pickup_location, delivery_location, distance, cost, order_id ) VALUES (?,?,?,?,?,?)"
            const values5 = [transportInfo.type, transportInfo.from, transportInfo.to, transportInfo.distance, transportInfo.cost, order_id]
            await dbConnection.query(sqlLQuery5, values5); // insert transport info


            const sqlLQuery8 = "SELECT * FROM wt_stocks WHERE product=? AND owner=?"
            const values8 = [order_details.product, order_info.buyer_id]
            const stock = await dbConnection.query(sqlLQuery8, values8); // get stock info

            if (stock[0][0]) {
                // insert stock slots info
                const sqlLQuery9 = "INSERT INTO wt_stock_slots (stock_id , order_id) VALUES (?,?)"
                const values9 = [stock[0][0].id, order_id]
                await dbConnection.query(sqlLQuery9, values9);

                const sqlLQuery13 = "UPDATE wt_stocks SET quantity=quantity+?, last_update=? WHERE id=?" // update stock quantity
                const values13 = [offerInfo[0][0].quantity, order_info.date, stock[0][0].id]
                await dbConnection.query(sqlLQuery13, values13);
            }
            else {
                // create new stock
                const sqlLQuery10 = "INSERT INTO wt_stocks (product, owner, last_update) VALUES (?,?,?)"
                const values10 = [order_details.product, order_info.buyer_id, order_info.date]
                await dbConnection.query(sqlLQuery10, values10);

                const sqlLQuery11 = "SELECT * FROM wt_stocks WHERE product=? AND owner=?"
                const values11 = [order_details.product, order_info.buyer_id]
                const stock = await dbConnection.query(sqlLQuery11, values11); // get stock info


                const sqlLQuery12 = "INSERT INTO wt_stock_slots (stock_id , order_id) VALUES (?,?)"
                const values12 = [stock[0][0].id, order_id]
                await dbConnection.query(sqlLQuery12, values12);

                const sqlLQuery13 = "UPDATE wt_stocks SET quantity=quantity+?, last_update=? WHERE id=?" // update stock quantity
                const values13 = [offerInfo[0][0].quantity, order_info.date, stock[0][0].id]
                await dbConnection.query(sqlLQuery13, values13);
            }



        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }


}
