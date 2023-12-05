import { dbConnection } from "@utils/db_connection";


export async function POST(req, { params }) {

    if (params.instruction == 'project_create') {
        const data = await req.json()

        let res = {
            message: 'Account is Successfully Created',
            status: 200
        }
        try {
            const project_id = 'pjt' + new Date().valueOf()
            const sqlLQuery = "INSERT INTO projects (id, title, product_name, seedling, land, start_time, status, img, created_by) VALUES (?,?,?,?,?,?,?,?,?)"
            const values = [project_id, data.title, data.product_name, data.seedling, data.land_size, data.start_time, 'Running', data.img, data.created_by]
            await dbConnection.query(sqlLQuery, values);

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }
    else if (params.instruction == 'frmr_add_expense') {
        const data = await req.json()
        let res = {
            message: 'Expenses is Successfully Added',
            status: 200
        }
        try {
            const sqlLQuery = "INSERT INTO farmer_expense (sector, date, unit, cost, project_id ) VALUES (?,?,?,?,?)"
            const values = [data.sector, data.date, data.unit, data.cost, data.project_id]
            await dbConnection.query(sqlLQuery, values);

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }
    else if (params.instruction == 'add_sales_data') {
        const data = await req.json()
        let res = {
            message: 'Sales is Successfully Added',
            status: 200
        }
        //
        try {
            const sqlLQuery = "INSERT INTO farmer_sales (quantity, price, amount, collection_date, status, project_id ) VALUES (?,?,?,?,?,?)"
            const values = [parseInt(data.quantity), parseInt(data.price), (parseInt(data.quantity) * parseInt(data.price)), data.collection_date, data.status, data.project_id]
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