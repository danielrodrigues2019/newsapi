import React, { useEffect, useState } from 'react'
import api from './api'
import { login, logout, getToken } from './auth'
import RetAuth from './retAuth'

export default function WAuth() {
  const [redirect, setRedirect] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function verify() {
      var res = await api.get('/api/users/checktoken', { params: { token: getToken() } })

      if (res.data.status === 200) {
        setLoading(false)
        setRedirect(false)
      } else {
        logout()
        setLoading(false)
        setRedirect(true)
      }
    }
    // setTimeout(() => verify(),1000);
    verify()
  }, [])

  return (
    <>
      <RetAuth redirect={redirect} loading={loading} />
    </>
  )
}
