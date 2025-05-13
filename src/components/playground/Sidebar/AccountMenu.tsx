import { useAuthenticator } from '@aws-amplify/ui-react'
import { motion } from 'framer-motion'

export default function AccountMenu() {
  const { signOut } = useAuthenticator()
  const onLogoutClicked = () => {
    signOut()
  }
  return (
    <div>
      <motion.button onClick={onLogoutClicked}>Logout</motion.button>
    </div>
  )
}
