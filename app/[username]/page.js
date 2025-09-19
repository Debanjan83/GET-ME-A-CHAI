import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'

const Username = async ({ params }) => {
  await connectDb()
  let u = await User.findOne({ username: params.username })
  if (!u) {
    notFound()
  }

  return (
    <>
      <PaymentPage username={params.username} />
    </>
  )
}

export default Username

export async function generateMetadata({ params }) {
  return {
    title: &#96;Support ${params.username} - Get Me A Chai&#96;,
  }
}
