import { dbConnection } from "@utils/db_connection";


export async function POST(req, { params }) {

    if (params.instruction == 'expense_delete') {

        const data = await req.json()
        console.log(data)
        let res = {
            message: '',
            status: 200
        }
        try {
            const sqlLQuery = "DELETE FROM farmer_expense WHERE project_id=? AND id=?"
            const values = [data.project_id, data.id]
            await dbConnection.query(sqlLQuery, values);
            res.message = 'Data is Successfully deleted'

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            new Error(error)
        }

        return new Response(JSON.stringify(res));
    }
    else if (params.instruction == 'sales_delete') {

        const data = await req.json()
        console.log(data)
        let res = {
            message: '',
            status: 200
        }
        try {
            const sqlLQuery = "DELETE FROM farmer_sales WHERE project_id=? AND id=?"
            const values = [data.project_id, data.id]
            await dbConnection.query(sqlLQuery, values);
            res.message = 'Data is Successfully deleted'

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            new Error(error)
        }

        return new Response(JSON.stringify(res));
    }
    else if (params.instruction == 'delete_project') {

        const data = await req.json()
        console.log(data)
        let res = {
            message: '',
            status: 200
        }
        try {
            const sqlLQuery = "DELETE FROM projects WHERE id=?"
            const values = [data.project_id]
            await dbConnection.query(sqlLQuery, values);
            res.message = 'Project is Successfully deleted'

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

}
