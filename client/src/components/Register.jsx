import React from 'react'

const Register = () => {
    




  return (
    <div className = "w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className = "p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className = "text-left text-xl mt-8 ml-1 font-semibold text-gray-900 dark:text-white">Create an account</h1>
          <form className = "mt-10 flex flex-col w-full space-y-6">
              <div className = "w-full">
                  <label htmlFor="email" className="block mb-2 text-sm ml-1 font-medium text-gray-900 dark:text-gray-300 text-left">Your email</label>
                  <input type="email" id="email" name="email" placeholder="Email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  rounded-lg focus:border-blue-500 inline-block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div>
                  <label htmlFor="password" className="block mb-2 ml-1 text-sm font-medium text-gray-900 dark:text-gray-300 text-left">Password</label>
                  <input type="password" id="password" name="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div>
                  <label htmlFor="password" className="block mb-2 ml-1 text-sm font-medium text-gray-900 dark:text-gray-300 text-left">Confirm Password</label>
                  <input type="password" id="password" name="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 ml-1 border-gray-300 rounded" />
                    <label className="ml-1 text-white-500 font-bold">I agree to the terms and conditions</label>
                  </div>
              </div>
              <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>


          </form>



      </div>
    </div>
  )
}

export default Register;
