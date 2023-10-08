/// <reference lib="deno.unstable" />

import { fetchToken } from "./token.ts"
import { getDepartmentList } from "./dept.ts"

import { getUserList } from "./user.ts"


if (import.meta.main) {
  const token = await fetchToken()
  console.log(token)
  const deptList = await getDepartmentList(token)
  console.log(deptList)
  const users = await Promise.all(deptList.map(async (dept) => {
    const userList = await getUserList(token, dept)
    return userList
  }))
  console.log(users.flat().map(u => { return { id: u.userid, name: u.name, phone: u.mobile } }))
  
}