import { Suspense } from 'react'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const PrivateRoute = ({ children, route }) => { 
  const {
    data: session 
  } = useSession()
  const router = useRouter()
  const user = session.user
  if (route) {
    if (!user) {
      return router.push("/login")
    } else if (user && user.twoStep) {
      return router.push("/change-pass")
    } else if (![...user.liens].includes(route.path) && !['/', '/home'].includes(route.path)) {
      return router.push("/access")
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
