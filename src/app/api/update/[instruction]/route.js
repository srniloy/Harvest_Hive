import { dbConnection } from "@utils/db_connection";


export async function POST(req, { params }) {

    if (params.instruction == 'update_profile_info') {

        const data = await req.json()
        let res = {
            message: '',
            status: 200
        }
        try {
            const sqlLQuery = "UPDATE users SET name=?, img=?, phone=?, address=?, nid=?, birth_date=? WHERE id = ?"
            const values = [data.name, data.img, data.phone, data.address, data.nid, data.birth_date, data.id]
            await dbConnection.query(sqlLQuery, values);
            res.message = 'Data is Successfully Updated'

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            new Error(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'expense_update') {

        const data = await req.json()
        console.log(data)
        let res = {
            message: '',
            status: 200
        }
        try {
            const sqlLQuery = "UPDATE farmer_expense SET sector=?, date=?, unit=?, cost=? WHERE id = ? AND project_id = ?"
            const values = [data.sector, data.date, parseInt(data.unit), data.cost, data.id, data.project_id]
            await dbConnection.query(sqlLQuery, values);
            res.message = 'Data is Successfully Updated'

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
            new Error(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'total_expense_update') {

        const data = await req.json()
        // console.log(data)
        let res = {
            message: '',
            status: 200
        }
        try {
            const sqlLQuery = "UPDATE projects SET total_expense=? WHERE id = ?"
            const values = [parseInt(data.total_expense), data.project_id]
            await dbConnection.query(sqlLQuery, values);

            const sqlLQuery2 = "UPDATE projects SET total_revenue=(SELECT total_sales FROM projects WHERE id = ?)-(SELECT total_expense FROM projects WHERE id = ?) WHERE id = ?"
            const values2 = [data.project_id, data.project_id, data.project_id]
            await dbConnection.query(sqlLQuery2, values2);
            res.message = 'Total Expense is Successfully Updated'

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
            new Error(error)
        }

        return new Response(JSON.stringify(res));
    }


    else if (params.instruction == 'sales_update') {

        const data = await req.json()
        console.log(data)
        let res = {
            message: '',
            status: 200
        }
        try {
            const sqlLQuery = "UPDATE farmer_sales SET quantity=?, price=?, amount=?, collection_date=?, status=? WHERE id = ? AND project_id = ?"
            const values = [parseInt(data.quantity), parseInt(data.price), (parseInt(data.quantity) * parseInt(data.price)), data.collection_date, data.status, data.id, data.project_id]
            await dbConnection.query(sqlLQuery, values);
            res.message = 'Data is Successfully Updated'

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
            new Error(error)
        }

        return new Response(JSON.stringify(res));
    }


    else if (params.instruction == 'total_sales_update') {

        const data = await req.json()
        // console.log(data)
        let res = {
            message: '',
            status: 200
        }
        try {
            const sqlLQuery = "UPDATE projects SET total_sales=? WHERE id = ?"
            const values = [parseInt(data.total_sales), data.project_id]
            await dbConnection.query(sqlLQuery, values);

            const sqlLQuery2 = "UPDATE projects SET total_revenue=(SELECT total_sales FROM projects WHERE id = ?)-(SELECT total_expense FROM projects WHERE id = ?) WHERE id = ?"
            const values2 = [data.project_id, data.project_id, data.project_id]
            await dbConnection.query(sqlLQuery2, values2);
            res.message = 'Total Sales is Successfully Updated'

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            console.log(error)
            new Error(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'update_project') {

        const data = await req.json()
        console.log(data)
        let res = {
            message: 'Successfully edited the project',
            status: 200
        }
        try {
            const sqlLQuery = "UPDATE projects SET title=?, product_name=?, seedling=?, land=?, start_time=?, status=?, cover_img=? WHERE id=?"
            const values = [data.title, data.product_name, data.seedling, data.land_size, data.start_time, data.status, data.cover_img, data.id]
            await dbConnection.query(sqlLQuery, values);

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'update_sales_offers_status') {

        const data = await req.json()
        console.log(data)
        let res = {
            message: 'Successfully updated the status',
            status: 200
        }
        try {
            const sqlLQuery = "UPDATE farmer_sales SET status=? WHERE id=? AND project_id=?"
            const values = ['Processing', data.sales_id, data.project_id]

            const sqlLQuery1 = "UPDATE offers SET status=? WHERE id=? AND offered_by=? AND sales_id=? AND project_id=?"
            const values1 = ['Accepted', data.offer_id, data.offered_by, data.sales_id, data.project_id]
            await dbConnection.query(sqlLQuery, values);
            await dbConnection.query(sqlLQuery1, values1);

            const sqlLQuery2 = "UPDATE farmer_sales SET total_offers=(SELECT COUNT(id) FROM offers WHERE sales_id=? AND project_id=?) WHERE id=? AND project_id=?";
            const values2 = [data.sales_id, data.product_id, data.sales_id, data.product_id]

            await dbConnection.query(sqlLQuery2, values2);

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }

    else if (params.instruction == 'update_sales_offers_On_cancel') {

        const data = await req.json()
        console.log(data)
        let res = {
            message: 'Successfully updated the status',
            status: 200
        }
        try {
            const sqlLQuery = "UPDATE farmer_sales SET status=? WHERE id=? AND project_id=?"
            const values = ['Pending', data.sales_id, data.product_id]
            await dbConnection.query(sqlLQuery, values);

            const sqlLQuery1 = "DELETE FROM offers WHERE id=? AND sales_id=? AND project_id=?"
            const values1 = [data.offer_id, data.sales_id, data.product_id]

            await dbConnection.query(sqlLQuery1, values1);

            const sqlLQuery2 = "UPDATE farmer_sales SET total_offers=(SELECT COUNT(id) FROM offers WHERE sales_id=? AND project_id=?) WHERE id=? AND project_id=?";
            const values2 = [data.sales_id, data.product_id, data.sales_id, data.product_id]

            await dbConnection.query(sqlLQuery2, values2);

        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }


    else if (params.instruction == 'confirm_order') {

        const { order_id, transportInfo } = await req.json()
        let order_info = {}
        let res = {
            message: 'Successfully updated the status',
            status: 200
        }
        try {
            const sqlLQuery = "SELECT * FROM orders WHERE id=?"
            const values = [order_id]
            const rows = await dbConnection.query(sqlLQuery, values);
            order_info = rows[0][0]


            const sqlLQuery1 = "UPDATE orders SET status=? WHERE id=?"
            const values1 = ['Complete', order_id]
            await dbConnection.query(sqlLQuery1, values1);

            console.log(order_info)

            // const sqlLQuery2 = "DELETE FROM offers WHERE id=?"
            // const values2 = [order_info.offer_id]

            // await dbConnection.query(sqlLQuery2, values2);

            const sqlLQuery3 = "UPDATE farmer_sales SET total_offers=(SELECT COUNT(id) FROM offers WHERE sales_id=? AND project_id=?) WHERE id=? AND project_id=?";
            const values3 = [order_info.sales_id, order_info.product_id, order_info.sales_id, order_info.product_id]

            await dbConnection.query(sqlLQuery3, values3);


            const sqlLQuery4 = "UPDATE farmer_sales SET status=? WHERE id=? AND project_id=?"
            const values4 = ['Sold Out', order_info.sales_id, order_info.product_id]
            await dbConnection.query(sqlLQuery4, values4);

            const sqlLQuery5 = "INSERT INTO transports (vehicle, pickup_location, delivery_location, distance, cost, order_id ) VALUES (?,?,?,?,?,?)"
            const values5 = [transportInfo.type, transportInfo.from, transportInfo.to, transportInfo.distance, transportInfo.cost, order_id]
            await dbConnection.query(sqlLQuery5, values5);
        } catch (error) {
            res.message = 'Database error occured'
            res.status = 500
            // new Error(error)
            console.log(error)
        }

        return new Response(JSON.stringify(res));
    }




}
