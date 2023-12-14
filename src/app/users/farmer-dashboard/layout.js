'use client';
import { ThemeProvider, createTheme } from '@mui/material';
import * as React from 'react';
import UserContext from '@context/userContext';
import { Suspense } from 'react';
import Loading from './loading';



export default function FarmerDashboardLayout({ children }) {


  const [user, setUser] = React.useState(undefined)

  React.useEffect(() => {
    const fetchuser = async () => {
      try {
        const postData = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const res = await fetch(
          '/api/get-info/Farmer',
          postData
        )
        const resData = await res.json()
        setUser({ ...resData.user_data })
      } catch (error) {
        console.log(error);
        setUser(undefined)
      }
    }
    fetchuser()
  }, []);

  return (

    <main style={{ height: '100%', width: '100%', backgroundColor: "var(--color-bg-1)" }}>
      <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
        <UserContext.Provider value={{ user, setUser }}>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </UserContext.Provider>

      </ThemeProvider>

    </main>
  )
}
