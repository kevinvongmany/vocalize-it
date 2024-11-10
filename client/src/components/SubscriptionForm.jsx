import { useEffect, useState } from 'react'
import { UPDATE_SUBSCRIPTION } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import { loadStripe } from '@stripe/stripe-js'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')


const SubscriptionForm = () => {
  const [subscriptionMonth, setSubscriptionMonth] = useState(1)
  const [subscribe, { data }] = useMutation(UPDATE_SUBSCRIPTION,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    }
  )
  const handleSubmitCheckout = async (e) => {
    subscribe({ variables: { isSubscribed: true } })
  }
   
  useEffect(() => {
    if (data) {
      console.log(data);
      stripePromise.redirectToCheckout({ sessionId: data.updateSubscription.sessionId })
    }
  }, [data])

  return (
    <div>
      <form
        onSubmit={handleSubmitCheckout}
      >
        <label>
          Subscription Months:
          <select
            onChange={(e) => setSubscriptionMonth(parseInt(e.target.value))}
            value={subscriptionMonth}
          >
            <option value={1}>1 Month</option>
            <option value={3}>3 Months</option>
            <option value={6}>6 Months</option>
            <option value={12}>12 Months</option>
          </select>
        </label>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  )
}

export default SubscriptionForm
