import { dbConnection } from "@utils/db_connection";


export async function POST(req, { params }) {

    if (params.instruction == 'get_projects') {
        const data = await req.json()
        let res = {
            message: 'Account is Successfully Created',
            status: 200,
            data: []
        }
        try {
            const sqlLQuery = "SELECT * FROM projects WHERE created_by=? AND status=?";
            const values = [data.user_id, data.project_type]
            const rows = await dbConnection.query(sqlLQuery, values);
            res.data = rows[0]
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'project_details') {
        const data = await req.json()
        let res = {
            message: 'Account is Successfully Created',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT * FROM projects WHERE id=?";
            const values = [data.project_id]
            const rows = await dbConnection.query(sqlLQuery, values);
            res.data = rows[0][0]
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'get_expenses') {
        const data = await req.json()
        console.log(data)
        let res = {
            message: 'Account is Successfully Created',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT * FROM farmer_expense WHERE project_id =?";
            const values = [data.project_id]
            const rows = await dbConnection.query(sqlLQuery, values);
            res.data = rows[0]
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }
    else if (params.instruction == 'get_sales') {
        const data = await req.json()
        console.log('here')
        let res = {
            message: 'Sales Information is successfully fetched',
            status: 200,
            data: [{}]
        }
        try {

            const sqlLQuery = "SELECT * FROM farmer_sales WHERE project_id =?";
            const values = [data.project_id]
            const rows = await dbConnection.query(sqlLQuery, values);
            let arrObj = rows[0]
            // console.log(arrObj)
            for (let i = 0; i < arrObj.length; i++) {
                const data = arrObj[i]
                const query = "SELECT COUNT(id) total_offers FROM offers WHERE sales_id=? AND status='Pending'"
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

    else if (params.instruction == 'get_products') {
        // const data = await req.json()
        let res = {
            message: 'Account is Successfully Created',
            status: 200,
            data: []
        }
        try {
            const sqlLQuery = "SELECT users.name AS creator, users.id AS user_id, projects.title AS title, projects.product_name AS name, projects.img AS img, projects.id, quantity, price, users.address as location, collection_date as harvest_time "
                + "FROM ((users INNER JOIN projects ON users.id = created_by AND projects.status = ?) INNER JOIN farmer_sales ON projects.id = project_id AND farmer_sales.status = ?)"
            const values = ['Running', 'Pending']
            const rows = await dbConnection.query(sqlLQuery, values);
            res.data = rows[0]
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }
    else if (params.instruction == 'get_filtered_products') {
        const data = await req.json()
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
                sqlLQuery = "SELECT users.name AS creator, users.id AS user_id, projects.title AS title, projects.product_name AS name, projects.img AS img, projects.id, quantity, price, users.address as location, collection_date as harvest_time "
                    + "FROM (((SELECT * FROM users) AS users " +
                    "INNER JOIN projects ON users.id = created_by AND projects.status = ? AND projects.product_name = ?) " +
                    "INNER JOIN farmer_sales ON projects.id = project_id AND farmer_sales.status = ?)"
                values = ['Running', data.product, 'Pending']
            } else if (data.location != '' && data.product == '') {
                sqlLQuery = "SELECT users.name AS creator, users.id AS user_id, projects.title AS title, projects.product_name AS name, projects.img AS img, projects.id, quantity, price, users.address as location, collection_date as harvest_time "
                    + "FROM (((SELECT * FROM users WHERE address=?) AS users " +
                    "INNER JOIN projects ON users.id = created_by AND projects.status = ?) " +
                    "INNER JOIN farmer_sales ON projects.id = project_id AND farmer_sales.status = ?)"
                values = [data.location, 'Running', 'Pending']
            }
            else {
                sqlLQuery = "SELECT users.name AS creator, users.id AS user_id, projects.title AS title, projects.product_name AS name, projects.img AS img, projects.id, quantity, price, users.address as location, collection_date as harvest_time "
                    + "FROM (((SELECT * FROM users WHERE address=?) AS users " +
                    "INNER JOIN projects ON users.id = created_by AND projects.status = ? AND projects.product_name = ?) " +
                    "INNER JOIN farmer_sales ON projects.id = project_id AND farmer_sales.status = ?)"
                values = [data.location, 'Running', data.product, 'Pending']
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
    else if (params.instruction == 'projects_user_details') {
        const data = await req.json()
        let res = {
            message: 'Account is Successfully Created',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT * FROM users WHERE id=?";
            const values = [data.user_id]
            const rows = await dbConnection.query(sqlLQuery, values);
            res.data = rows[0][0]
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'get_product_pending_sales') {
        const data = await req.json()
        console.log(data)
        let res = {
            message: 'Sales Information is successfully fetched',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT * FROM farmer_sales WHERE project_id =?";
            const values = [data.product_id]
            const rows = await dbConnection.query(sqlLQuery, values);
            res.data = rows[0]
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
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
            const sqlLQuery = "SELECT name, phone, address, quantity, price, amount, offered_by, sales_id, project_id, offers_table.id as offer_id " +
                "FROM (SELECT * FROM offers WHERE sales_id=? AND project_id =? AND status = 'Pending') AS offers_table " +
                "INNER JOIN users ON offers_table.offered_by = users.id";
            const values = [data.sales_id, data.project_id]
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
            const sqlLQuery = "SELECT users.id as farmer_id, users.name as farmer_name, users.phone as phone, projects.id as product_id, " +
                "projects.product_name as product_name, quantity, price, amount, offers_table.status as offer_status, offers_table.id as offer_id, offers_table.sales_id as sales_id " +
                "FROM (((SELECT * FROM offers WHERE offered_by=?) AS offers_table " +
                "INNER JOIN projects ON offers_table.project_id = projects.id) " +
                "INNER JOIN users ON users.id = projects.created_by)";

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

    else if (params.instruction == 'accepted_offers_list') {
        const data = await req.json()
        console.log(data)
        let res = {
            message: 'Getting Offers list is successfull ',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT users.id as farmer_id, users.name as farmer_name, users.phone as phone, projects.id as product_id, " +
                "projects.product_name as product_name, quantity, price, amount, offers_table.status as offer_status, offers_table.id as offer_id, offers_table.sales_id as sales_id " +
                "FROM (((SELECT * FROM offers WHERE project_id=? AND status='Accepted') AS offers_table " +
                "INNER JOIN projects ON offers_table.project_id = projects.id) " +
                "INNER JOIN users ON users.id = offers_table.offered_by)";

            const values = [data.project_id]
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
                "FROM (((SELECT * FROM orders WHERE id=?) AS order_table " +
                "INNER JOIN projects ON order_table.product_id = projects.id) " +
                "INNER JOIN offers ON offers.id = order_table.offer_id)"

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

            const sqlLQuery2 = "SELECT * FROM stocks WHERE owner=?"

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

            const sqlLQuery2 = "SELECT projects.product_name AS product, projects.img AS img, offers.quantity as quantity, transports.cost as transport_cost, " +
                "offers.price as price, users.name as seller_name, offers.amount as amount, order_table.id AS order_id, order_table.date AS date " +
                "FROM ((((((SELECT * FROM orders WHERE buyer_id =?) AS order_table " +
                "INNER JOIN users ON users.id = order_table.seller_id) " +
                "INNER JOIN projects ON order_table.product_id = projects.id) " +
                "INNER JOIN offers ON offers.id = order_table.offer_id) " +
                "INNER JOIN farmer_sales ON farmer_sales.id = order_table.sales_id) " +
                "INNER JOIN transports ON transports.order_id = order_table.id)"

            const values2 = [data.user_id]

            const rows = await dbConnection.query(sqlLQuery2, values2);
            let Ttransaction = rows[0]

            const sqlLQuery3 = "SELECT projects.product_name AS product, projects.img AS img, wholesaler_offers.quantity as quantity, wt_transports.cost as transport_cost, " +
                "wholesaler_offers.price as price, users.name as seller_name, wholesaler_offers.amount as amount, order_table.id AS order_id, order_table.date AS date " +
                "FROM (((((((SELECT * FROM wt_orders WHERE seller_id =?) AS order_table " +
                "INNER JOIN orders ON orders.id = order_table.prev_order_id) " +
                "INNER JOIN users ON users.id = order_table.seller_id) " +
                "INNER JOIN projects ON orders.product_id = projects.id) " +
                "INNER JOIN wholesaler_offers ON wholesaler_offers.id = order_table.offer_id) " +
                "INNER JOIN trader_sales ON trader_sales.id = order_table.sales_id) " +
                "INNER JOIN wt_transports ON wt_transports.order_id = order_table.id)"

            const values3 = [data.user_id]
            const rows1 = await dbConnection.query(sqlLQuery3, values3);

            Array.prototype.push.apply(Ttransaction, rows1[0]);
            res.data = Ttransaction
            // console.log(rows[0])
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }


    else if (params.instruction == 'get_transaction_lists_for_farmer') {
        const data = await req.json()
        // console.log(data)
        let orderData = {}
        let res = {
            message: 'Getting stocked products is successfull',
            status: 200,
            data: {}
        }
        try {

            const sqlLQuery2 = "SELECT projects.product_name AS product, projects.img AS img, farmer_sales.quantity as quantity, transports.cost as transport_cost, " +
                "farmer_sales.price as price, users.name as buyer_name, farmer_sales.amount as amount, order_table.id AS order_id, order_table.date AS date " +
                "FROM ((((((SELECT * FROM orders WHERE seller_id =?) AS order_table " +
                "INNER JOIN users ON users.id = order_table.buyer_id) " +
                "INNER JOIN projects ON order_table.product_id = projects.id) " +
                "INNER JOIN offers ON offers.id = order_table.offer_id) " +
                "INNER JOIN farmer_sales ON farmer_sales.id = order_table.sales_id) " +
                "INNER JOIN transports ON transports.order_id = order_table.id)"

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


    else if (params.instruction == 'total_calculations') {
        const data = await req.json()
        console.log('data')
        console.log(data)
        let res = {
            message: 'Sales Information is successfully fetched',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT SUM(total_expense) AS expense, SUM(total_sales) AS sales, SUM(total_revenue) AS revenue FROM projects WHERE created_by =?";
            const values = [data.user_id]
            const rows = await dbConnection.query(sqlLQuery, values);
            res.data = rows[0][0]
            console.log(res.data)
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }
    else if (params.instruction == 'total_calculations_for_trader') {
        const data = await req.json()
        console.log('data')
        console.log(data)
        let res = {
            message: 'Sales Information is successfully fetched',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT SUM(total_cost) AS cost, SUM(total_revenue) AS revenue, SUM(total_profit) AS profit, SUM(total_stocked) AS stocked FROM stocks WHERE owner =?";
            const values = [data.user_id]
            const rows = await dbConnection.query(sqlLQuery, values);
            res.data = rows[0][0]
            console.log(res.data)
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }
    else if (params.instruction == 'get_project_info_for_graph') {
        const data = await req.json()
        console.log('data')
        console.log(data)
        let res = {
            message: 'Sales Information is successfully fetched',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT * FROM projects WHERE created_by =?"
            const values = [data.user_id]
            const rows = await dbConnection.query(sqlLQuery, values);

            console.log(res.data)
            let arr = []
            for (let i = 0; i < rows[0].length; i++) {
                arr.push({
                    product: rows[0][i].product_name,
                    total_sales: rows[0][i].total_sales,
                    date: rows[0][i].start_time,
                })
            }
            res.data = arr
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }


    else if (params.instruction == 'get_locations') {
        let res = {
            message: 'Locations are successfully fetched',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT DISTINCT address FROM users";
            const rows = await dbConnection.query(sqlLQuery);
            res.data = rows[0]
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'get_product_names') {
        let res = {
            message: 'Products are successfully fetched',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT DISTINCT product_name FROM projects";
            const rows = await dbConnection.query(sqlLQuery);
            res.data = rows[0]
            console.log(res.data)
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'get_farmers_name') {
        let res = {
            message: 'Products are successfully fetched',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT DISTINCT name FROM users WHERE type='Farmer'";
            const rows = await dbConnection.query(sqlLQuery);
            res.data = rows[0]
            console.log(res.data)
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }





}