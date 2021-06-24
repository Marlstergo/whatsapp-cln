import React from 'react'

function Messages( {message, user}) {
  // console.log(message, user)
  return (
    <div className=''>
      <p className="">
        {message.message}

      </p>
    </div>
  )
}

export default Messages
