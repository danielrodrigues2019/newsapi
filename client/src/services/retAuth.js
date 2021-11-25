import React, { useEffect, useState } from 'react'
import { Route, useNavigate, Router, Routes } from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress'

export default function RetAuth({ component: Component, ...rest }) {
  const [redirect, setRedirect] = useState(false)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  return loading ? (
    <LinearProgress style={{ width: '50%', margin: '80px auto' }} />
  ) : (
    <>
      {!redirect ? (
        <div>
          <h1>test</h1>
        </div>
      ) : (
        <div onLoad={() => navigate('/admin/login')}>
          <p>admin test</p>
        </div>
      )}
    </>
  )
}
