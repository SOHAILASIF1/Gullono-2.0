import React, { useState } from 'react'
import newsLetter from '../assest/images1.jpg'

function NewsLetter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('✅ Subscribed successfully!')
        setEmail('')
      } else {
        setStatus('❌ Subscription failed. Try again.')
      }
    } catch (error) {
      setStatus('❌ Something went wrong.')
      
    }
  }

  return (
    <div className="w-full h-full">
      <div
        style={{ backgroundImage: `url(${newsLetter})` }}
        className="flex items-center justify-center bg-cover bg-center h-80 sm:h-[400px] md:h-[500px] px-4 py-10"
      >
        <div className="bg-white/20 backdrop-blur-md p-6 sm:p-10 rounded-xl shadow-xl w-full max-w-2xl text-center">
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold mb-4 drop-shadow-md">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white text-base sm:text-lg mb-6 drop-shadow-md">
            Stay updated with our latest news, products, and special offers.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 items-center justify-center"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-80 px-4 py-2 rounded-lg outline-none text-lg text-white shadow-2xl bg-gray-400 focus:ring-2 ring-amber-500 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition duration-200 shadow-lg"
            >
              Subscribe
            </button>
          </form>
          {status && (
            <p className="text-white mt-4 text-sm sm:text-base font-medium">{status}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsLetter
