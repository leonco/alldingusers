import { URL_USER_LIST } from "./consts.ts";


export type User = {
    unionid: string,
    openId: string,
    remark: string,
    userid: bigint,
    isBoss: boolean,
    hiredDate: bigint,
    tel: string,
    department: bigint[],
    workPlace: string,
    email: string,
    order: bigint,
    isLeader: boolean
    mobile: string,
    active: boolean,
    isAdmin: boolean,
    avatar: string,
    isHide: boolean,
    jobnumber: string,
    name: string,
    extattr: object,
    stateCode: string,
    position: string,
}
type UserResponse = {
    errcode: number,
    errmsg: string,
    userlist: User[]
}

export async function getUserList(token: string, departmentId: bigint): Promise<User[]> {
    const response = await fetch(`${URL_USER_LIST}?access_token=${token}&department_id=${departmentId}`);
    const userResponse: UserResponse = await response.json()
    if (userResponse.errcode === 0) {
        return userResponse.userlist
    }
    throw new Error(userResponse.errmsg)
}