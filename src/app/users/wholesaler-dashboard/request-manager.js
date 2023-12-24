'use client';


async function getUserInfo() {

    // const postData = {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // };

    // const res = await fetch(
    //     '/api/get-info?type=Trader',
    //     postData
    // )
    // const data = await res.json()
    // return data
};

const logoutAction = async (router) => {
    const postData = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    };

    const res = await fetch(
        '/api/auth/logout/Trader',
        postData
    )
    console.log(await res.json())
    if (res.status == 200) {
        router.push('/auth/signin')
    }

};

const uploadImg = async (img) => {
    if (img) {
        console.log(img)
        const data = new FormData()
        data.set('img', img)
        const httpData = {
            method: 'POST',
            body: data,
        }
        const res = await fetch(
            `/api/add/img`,
            httpData,
        )
        const resp = await res.json();
        console.log(resp)
    }
    // router.push('/dashboard1')
}



export { getUserInfo, logoutAction, uploadImg }