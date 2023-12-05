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
        console.log(data)
        let res = {
            message: 'Sales Information is successfully fetched',
            status: 200,
            data: {}
        }
        try {
            const sqlLQuery = "SELECT * FROM farmer_sales WHERE project_id =?";
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
    else if (params.instruction == 'get_products') {
        // const data = await req.json()
        let res = {
            message: 'Account is Successfully Created',
            status: 200,
            data: []
        }
        try {
            const sqlLQuery = "SELECT users.name AS creator, users.id AS user_id, projects.product_name AS name, projects.img AS img, projects.id, quantity, price, users.address as location, collection_date as harvest_time "
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







}