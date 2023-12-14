import { dbConnection } from "@utils/db_connection";


export async function POST(req, { params }) {



    if (params.instruction == 'get_sales') {
        const data = await req.json()
        console.log(data)
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







}