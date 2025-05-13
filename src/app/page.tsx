'use client'
import '@aws-amplify/ui-react/styles.css'
import Sidebar from '@/components/playground/Sidebar/Sidebar'
import { ChatArea } from '@/components/playground/ChatArea'
import { Suspense } from 'react'
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_m7oROzAya',
      userPoolClientId: '57bg3i6k5hvlclf3edeahoa5th'
    }
  }
})

export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Suspense fallback={<div>Loading...</div>}>
          <div className="bg-background/80 flex h-screen">
            <Sidebar />
            <ChatArea />
          </div>
        </Suspense>
      )}
    </Authenticator>
  )
}
