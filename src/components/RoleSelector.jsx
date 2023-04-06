import React from 'react'
import {Link} from 'react-router-dom'

function RoleSelector() {
  return (
    <div className="flex flex-col justify-center items-center md:w-6/12 bg-slate-100 text-black w-full gap-9 tabletLogIn">
        <h2 className="text-4xl font-semibold">What is your role?</h2>
        <div className="flex flex-col gap-3">
          <Link className="roleLink" to="companyLogIn">
            Company
          </Link>
          <Link className="roleLink" to="memberLogIn">
            Member
          </Link>
        </div>
      </div>
  )
}

export default RoleSelector