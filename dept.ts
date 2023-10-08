import { URL_DEPARTMENT_LIST } from "./consts.ts";


type Department = {
    ext?: string,
    createDeptGroup: boolean,
    name: string,
    id: bigint,
    autoAddUser: boolean,
    parentid?: bigint
}
type DepartmentResponse = {
    errcode: number,
    errmsg: string,
    department: Department[]
}

export async function getDepartmentList(token: string): Promise<bigint[]>{
    const response = await fetch(`${URL_DEPARTMENT_LIST}?access_token=${token}`);
    const departmentResponse: DepartmentResponse = await response.json()
    if(departmentResponse.errcode === 0){
        return departmentResponse.department.map(i=>i.id)
    }
    throw new Error(departmentResponse.errmsg)
}