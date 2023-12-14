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

            const sqlLQuery2 = "SELECT projects.product_name AS product, projects.img AS img, offers.quantity as quantity, offers.price as price, offers.amount as amount, order_table.id AS order_id, farmer_sales.collection_date AS harvest_time " +
                "FROM ((((SELECT * FROM orders WHERE buyer_id =? AND status=?) AS order_table " +
                "INNER JOIN projects ON order_table.product_id = projects.id) " +
                "INNER JOIN offers ON offers.id = order_table.offer_id) " +
                "INNER JOIN farmer_sales ON farmer_sales.id = order_table.sales_id)"

            const values2 = [data.user_id, 'Complete']

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

            res.data = rows[0]
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
            const sqlLQuery = "SELECT * FROM projects WHERE created_by =?";
            const values = [data.user_id]
            const rows = await dbConnection.query(sqlLQuery, values);
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