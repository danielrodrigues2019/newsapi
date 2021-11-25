import React, { useEffect, useState } from 'react'
import { Route, Navigate } from 'react-router-dom'

export default function RetAuth({ component: Component, ...rest }) {
  const [redirect, setRedirect] = useState(false)
  const [loading, setLoading] = useState(true)
  return (
    <>
      loading ?
      <Route
        {...rest}
        render={(props) =>
          !redirect ? (
            <Component {...props} />
          ) : (
            <Navigate to={{ pathname: '/admin/login', state: { from: props.location } }} />
          )
        }
      />
    </>
  )
}
