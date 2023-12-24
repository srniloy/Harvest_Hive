import { dbConnection } from "@utils/db_connection";


export async function POST(req, { params }) {

    if (params.instruction == 'get_stock_slots') {
        const data = await req.json()
        // console.log(data)
        let orderData = {}
        let res = {
            message: 'Getting stocked products is successfull',
            status: 200,
            data: {}
        }
        try {

            // const sqlLQuery2 = "SELECT projects.product_name AS product, projects.img AS img, offers.quantity as quantity, transports.cost as transport_cost, " +
            //     "offers.price as price, users.name as seller_name, offers.amount as amount, order_table.id AS order_id, order_table.date AS date " +
            //     "FROM ((((((SELECT * FROM orders WHERE buyer_id =?) AS order_table " +
            //     "INNER JOIN users ON users.id = order_table.seller_id) " +
            //     "INNER JOIN projects ON order_table.product_id = projects.id AND projects.product_name=?) " +
            //     "INNER JOIN offers ON offers.id = order_table.offer_id) " +
            //     "INNER JOIN farmer_sales ON farmer_sales.id = order_table.sales_id) " +
            //     "INNER JOIN transports ON transports.order_id = order_table.id)"

            // projects 



            // const sqlLQuery2 = "SELECT projects.product_name AS product, farmer_sales.quantity as quantity, transports.cost as transport_cost, " +
            //     "farmer_sales.price as price, users.name as seller_name, farmer_sales.amount as amount, orders.id AS order_id, orders.date AS date, " +
            //     "stock_slots.id as slot_id, stock_slots.status as status " +
            //     "FROM (((((((SELECT * FROM stocks WHERE owner=? AND product=?) AS stocks_table " +
            //     "INNER JOIN stock_slots ON stocks_table.id = stock_slots.stock_id) " +
            //     "INNER JOIN orders ON orders.id = stock_slots.order_id) " +
            //     "INNER JOIN projects ON projects.id = orders.product_id) " +
            //     "INNER JOIN farmer_sales ON farmer_sales.id = orders.sales_id) " +
            //     "INNER JOIN users ON users.id = orders.seller_id) " +
            //     "INNER JOIN transports ON transports.order_id  = orders.id) ORDER BY order_id DESC";

            const sqlLQuery2 = "SELECT projects.product_name AS product, farmer_sales.quantity as quantity, transports.cost as transport_cost, " +
                "farmer_sales.price as price, users.name as seller_name, farmer_sales.amount as amount, orders.id AS order_id, orders.date AS date, " +
                "stock_slots.id as slot_id, stock_slots.status as status " +
                "FROM (((((((SELECT * FROM stocks WHERE owner=? AND product=?) AS stocks_table " +
                "INNER JOIN stock_slots ON stocks_table.id = stock_slots.stock_id) " +
                "INNER JOIN orders ON orders.id = stock_slots.order_id) " +
                "INNER JOIN projects ON projects.id = orders.product_id) " +
                "INNER JOIN farmer_sales ON farmer_sales.id = orders.sales_id) " +
                "INNER JOIN users ON users.id = orders.seller_id) " +
                "INNER JOIN transports ON transports.order_id  = orders.id)";

            const values2 = [data.user_id, data.product]

            const rows = await dbConnection.query(sqlLQuery2, values2);

            res.data = rows[0]
            console.log(rows[0])
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

    if (params.instruction == 'get_Trader_sales') {
        const data = await req.json()
        let res = {
            message: 'Getting sales data is successfull',
            status: 200,
            data: {}
        }
        try {



            const sqlLQuery2 = "SELECT trader_sales.* FROM " +
                "(((SELECT * FROM stocks WHERE product=? AND owner=?) AS stocks_table " +
                "INNER JOIN stock_slots ON stock_slots.stock_id = stocks_table.id) " +
                "INNER JOIN trader_sales ON trader_sales.slot_id = stock_slots.id)";

            const values2 = [data.product, data.user_id]

            const rows = await dbConnection.query(sqlLQuery2, values2);

            let arrObj = rows[0]
            // console.log(arrObj)
            for (let i = 0; i < arrObj.length; i++) {
                const data = arrObj[i]
                const query = "SELECT COUNT(id) total_offers FROM wholesaler_offers WHERE sales_id=? AND status='Pending'"
                const values1 = [data.id]
                const rows = await dbConnection.query(query, values1);
                // console.log(rows[0][0].total_offers)
                arrObj[i]['total_offers'] = rows[0][0].total_offers

            }
            res.data = arrObj
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }





}