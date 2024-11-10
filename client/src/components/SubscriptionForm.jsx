import { useEffect } from 'react'
import { UPDATE_SUBSCRIPTION } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')


const SubscriptionForm = () => {
  const [subscribe, { data }] = useMutation(UPDATE_SUBSCRIPTION)
   


  return (
    <div>
      
    </div>
  )
}

export default SubscriptionForm
