import React from 'react'
const Button = props => {
  return (
    <button onClick={ props.onClick} className={`bg-slate-600 dark:bg-indigo-600  px-4 sm:px-6 py-2  rounded sm:rounded-lg text-white dark:hover:bg-gray-500 hover:bg-indigo-600 ${props.classes}`}>
        {props.children}
    </button>
  )
}

export default Button