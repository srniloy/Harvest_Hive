import { dbConnection } from "@utils/db_connection";


export async function POST(req, { params }) {

    if (params.instruction == 'get_products') {
        // const data = await req.json()
        let res = {
            message: 'Account is Successfully Created',
            status: 200,
            data: []
        }
        try {
            const sqlLQuery = "SELECT users.name AS creator, salesTable.id AS sales_id, users.id AS user_id, projects.product_name AS name, projects.img AS img, projects.id AS project_id, quantity, price, users.address as location " +
                "FROM (((((SELECT * FROM trader_sales WHERE status=?) AS salesTable " +
                "INNER JOIN stock_slots ON stock_slots.id = salesTable.slot_id) " +
                "INNER JOIN orders ON orders.id = stock_slots.order_id ) " +
                "INNER JOIN users ON users.id = orders.buyer_id ) " +
                "INNER JOIN projects ON projects.id = orders.product_id)";
            const values = ['Ready To Sell']
            const rows = await dbConnection.query(sqlLQuery, values);
            res.data = rows[0]
            console.log(rows[0])
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'product_details') {
        const data = await req.json()
        let res = {
            message: 'Account is Successfully Created',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT users.name AS creator, salesTable.id AS sales_id, users.id AS user_id, projects.product_name AS name, salesTable.status AS sales_status, " +
                "projects.img AS img, projects.cover_img AS cover_img, projects.id AS project_id, quantity, price, users.address as location, users.phone as owner_phone " +
                "FROM (((((SELECT * FROM trader_sales WHERE id=?) AS salesTable " +
                "INNER JOIN stock_slots ON stock_slots.id = salesTable.slot_id) " +
                "INNER JOIN orders ON orders.id = stock_slots.order_id ) " +
                "INNER JOIN users ON users.id = orders.buyer_id ) " +
                "INNER JOIN projects ON projects.id = orders.product_id)";
            const values = [data.sales_id]
            const rows = await dbConnection.query(sqlLQuery, values);
            res.data = rows[0][0]
            console.log(rows[0][0])
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'get_sales_offer_list') {
        const data = await req.json()
        console.log(data)
        let res = {
            message: 'Getting Offers list is successfull ',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT name, phone, address, quantity, price, amount, offered_by, sales_id, offers_table.id as offer_id " +
                "FROM (SELECT * FROM wholesaler_offers WHERE sales_id=? AND status = 'Pending') AS offers_table " +
                "INNER JOIN users ON offers_table.offered_by = users.id";
            const values = [data.sales_id]
            const rows = await dbConnection.query(sqlLQuery, values);
            res.data = rows[0]
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }
    else if (params.instruction == 'sended_offers_list') {
        const data = await req.json()
        console.log(data)
        let res = {
            message: 'Getting Offers list is successfull ',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT orders.id as order_id, users.id as trader_id, users.name as trader_name, users.phone as phone, projects.id as product_id, " +
                "projects.product_name as product_name, offers_table.quantity AS quantity, offers_table.price AS price, offers_table.amount AS amount, offers_table.status as offer_status, " +
                "offers_table.id as offer_id, offers_table.sales_id as sales_id " +
                "FROM ((((((SELECT * FROM wholesaler_offers WHERE offered_by=?) AS offers_table " +
                "INNER JOIN trader_sales ON trader_sales.id = offers_table.sales_id) " +
                "INNER JOIN stock_slots ON stock_slots.id = trader_sales.slot_id) " +
                "INNER JOIN orders ON orders.id = stock_slots.order_id) " +
                "INNER JOIN projects ON projects.id = orders.product_id) " +
                "INNER JOIN users ON users.id = orders.buyer_id)";

            const values = [data.user_id]
            const rows = await dbConnection.query(sqlLQuery, values);
            res.data = rows[0]
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'get_order_info') {
        const data = await req.json()
        console.log(data)
        let res = {
            message: 'Getting Order info is successfull',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT projects.product_name as product, quantity, price, amount " +
                "FROM ((((SELECT * FROM wt_orders WHERE id=?) AS order_table " +
                "INNER JOIN orders ON orders.id = order_table.prev_order_id) " +
                "INNER JOIN projects ON orders.product_id = projects.id) " +
                "INNER JOIN wholesaler_offers ON wholesaler_offers.id = order_table.offer_id)"

            const values = [data.order_id]
            const rows = await dbConnection.query(sqlLQuery, values);
            res.data = rows[0][0]
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'get_stocked_products') {
        const data = await req.json()
        // console.log(data)
        let orderData = {}
        let res = {
            message: 'Getting stocked products is successfull',
            status: 200,
            data: {}
        }
        try {

            const sqlLQuery2 = "SELECT * FROM wt_stocks WHERE owner=?"

            // const sqlLQuery2 = "SELECT projects.product_name AS product, projects.img AS img, SUM(farmer_sales.quantity) as quantity, farmer_sales.price as price, farmer_sales.amount as amount, order_table.id AS order_id, MAX(order_table.date) AS last_update " +
            //     "FROM ((((SELECT * FROM orders WHERE buyer_id =? AND status=?) AS order_table " +
            //     "INNER JOIN projects ON order_table.product_id = projects.id) " +
            //     "INNER JOIN offers ON offers.id = order_table.offer_id) " +
            //     "INNER JOIN farmer_sales ON farmer_sales.id = order_table.sales_id) " +
            //     "GROUP BY projects.product_name"

            const values2 = [data.user_id]

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


    if (params.instruction == 'get_stock_slots') {
        const data = await req.json()
        console.log('tada')
        console.log(data)
        let orderData = {}
        let res = {
            message: 'Getting stocked products is successfull',
            status: 200,
            data: {}
        }
        try {

            const sqlLQuery2 = "SELECT projects.product_name AS product, trader_sales.quantity as quantity, wt_transports.cost as transport_cost, " +
                "trader_sales.price as price, users.name as seller_name, trader_sales.amount as amount, wt_orders.id AS order_id, wt_orders.date AS date, " +
                "wt_stock_slots.id as slot_id, wt_stock_slots.status as status " +
                "FROM ((((((((SELECT * FROM wt_stocks WHERE owner=? AND product=?) AS stocks_table " +
                "INNER JOIN wt_stock_slots ON stocks_table.id = wt_stock_slots.stock_id) " +
                "INNER JOIN wt_orders ON wt_orders.id = wt_stock_slots.order_id) " +
                "INNER JOIN orders ON orders.id = wt_orders.prev_order_id) " +
                "INNER JOIN projects ON projects.id = orders.product_id) " +
                "INNER JOIN trader_sales ON trader_sales.id = wt_orders.sales_id) " +
                "INNER JOIN users ON users.id = wt_orders.seller_id)" +
                "INNER JOIN wt_transports ON wt_transports.order_id = wt_orders.id)";

            const values2 = [data.user_id, data.product]

            const rows = await dbConnection.query(sqlLQuery2, values2);

            res.data = rows[0]
            console.log('208')
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'get_filtered_products') {
        const data = await req.json()
        console.log('gdf')
        console.log(data)
        let res = {
            message: 'Account is Successfully Created',
            status: 200,
            data: []
        }
        try {
            // const sqlLQuery = "SELECT users.name AS creator, users.id AS user_id, projects.title AS title, projects.product_name AS name, projects.img AS img, projects.id, quantity, price, users.address as location, collection_date as harvest_time "
            //     + "FROM ((users INNER JOIN projects ON users.id = created_by AND users.name = ? AND users.address = ? AND projects.status = ? AND projects.product_name = ?) INNER JOIN farmer_sales ON projects.id = project_id AND farmer_sales.status = ?)"
            // const values = [data.farmar, data.location, 'Running', data.product, 'Pending']
            let sqlLQuery = '';
            let values = [];
            if (data.location == '' && data.product != '') {
                sqlLQuery = "SELECT users.name AS creator, salesTable.id AS sales_id, users.id AS user_id, projects.product_name AS name, projects.img AS img, projects.id AS project_id, quantity, price, users.address as location " +
                    "FROM (((((SELECT * FROM trader_sales WHERE status=?) AS salesTable " +
                    "INNER JOIN stock_slots ON stock_slots.id = salesTable.slot_id) " +
                    "INNER JOIN orders ON orders.id = stock_slots.order_id ) " +
                    "INNER JOIN users ON users.id = orders.buyer_id) " +
                    "INNER JOIN projects ON projects.id = orders.product_id AND projects.product_name = ?)";

                values = ['Ready To Sell', data.product]
            } else if (data.location != '' && data.product == '') {
                sqlLQuery = "SELECT users.name AS creator, salesTable.id AS sales_id, users.id AS user_id, projects.product_name AS name, projects.img AS img, projects.id AS project_id, quantity, price, users.address as location " +
                    "FROM (((((SELECT * FROM trader_sales WHERE status=?) AS salesTable " +
                    "INNER JOIN stock_slots ON stock_slots.id = salesTable.slot_id) " +
                    "INNER JOIN orders ON orders.id = stock_slots.order_id ) " +
                    "INNER JOIN users ON users.id = orders.buyer_id AND address=?) " +
                    "INNER JOIN projects ON projects.id = orders.product_id)";

                values = ['Ready To Sell', data.location]
            }
            else {
                sqlLQuery = "SELECT users.name AS creator, salesTable.id AS sales_id, users.id AS user_id, projects.product_name AS name, projects.img AS img, projects.id AS project_id, quantity, price, users.address as location " +
                    "FROM (((((SELECT * FROM trader_sales WHERE status=?) AS salesTable " +
                    "INNER JOIN stock_slots ON stock_slots.id = salesTable.slot_id) " +
                    "INNER JOIN orders ON orders.id = stock_slots.order_id ) " +
                    "INNER JOIN users ON users.id = orders.buyer_id AND address=?) " +
                    "INNER JOIN projects ON projects.id = orders.product_id AND projects.product_name = ?)";

                values = ['Ready To Sell', data.location, data.product]
            }
            const rows = await dbConnection.query(sqlLQuery, values);
            res.data = rows[0]
            console.log(rows[0])
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }
    else if (params.instruction == 'get_transaction_lists_for_trader') {
        const data = await req.json()
        // console.log(data)
        let orderData = {}
        let res = {
            message: 'Getting stocked products is successfull',
            status: 200,
            data: {}
        }
        try {

            const sqlLQuery2 = "SELECT projects.product_name AS product, projects.img AS img, wholesaler_offers.quantity as quantity, wt_transports.cost as transport_cost, " +
                "wholesaler_offers.price as price, users.name as seller_name, wholesaler_offers.amount as amount, order_table.id AS order_id, order_table.date AS date " +
                "FROM (((((((SELECT * FROM wt_orders WHERE buyer_id =?) AS order_table " +
                "INNER JOIN orders ON orders.id = order_table.prev_order_id) " +
                "INNER JOIN users ON users.id = order_table.seller_id) " +
                "INNER JOIN projects ON orders.product_id = projects.id) " +
                "INNER JOIN wholesaler_offers ON wholesaler_offers.id = order_table.offer_id) " +
                "INNER JOIN trader_sales ON trader_sales.id = order_table.sales_id) " +
                "INNER JOIN wt_transports ON wt_transports.order_id = order_table.id)"

            const values2 = [data.user_id]

            const rows = await dbConnection.query(sqlLQuery2, values2);

            res.data = rows[0]
            // console.log(rows[0])
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }
}