export interface ListInt {
  id: string
  nickName: string
  role: RoleInt[]
  userName: string
}
interface RoleInt {
  role: number
  roleName: string
}
interface SelectDataInt {
  role: number
  nickName: string
}
interface RoleListInt {
  authority: number[]
  roleId: number
  roleName: string
}
export class InitData {
  selectData: SelectDataInt = {
    role: 0,
    nickName: '',
  }
  list: ListInt[] = [] //接收用户信息列表
  roleList: RoleListInt[] = [] //接收角色列表
}
