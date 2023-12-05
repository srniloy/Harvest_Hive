import { NextResponse } from "next/server";



export async function DELETE(req, { params }) {
    const authName = `${params.user_type}Token`
    const res = NextResponse.json({ status: 200, message: 'done!', })
    res.cookies.set(authName, "", {
        expiresIn: new Date(0),
    });
    return res;
}