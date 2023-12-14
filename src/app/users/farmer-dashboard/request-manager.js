'use client';



export const logoutAction = async (router) => {
    const postData = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    };

    const res = await fetch(
        '/api/auth/logout/Farmer',
        postData
    )
    console.log(await res.json())
    if (res.status == 200) {
        router.push('/auth/signin')
    }

};


export const ProfileInfoUpdate = async (user) => {
    const postData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    };

    const res = await fetch(
        'api/update/update_profile_info',
        postData
    )
    console.log(await res.json())
};



export const uploadImg = async (img) => {
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
    // router.push('/dashboard1')
}

