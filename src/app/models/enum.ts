export enum Operator {
  equal = 'eq',
  notEqual = 'neq',
  greater = 'gt',
  greaterThanEqual = 'gte',
  lower = 'lt',
  lowerThanEqual = 'lte',

  relationalData = 'relationaldata',
  contain = 'contains',
  notContain = 'ncontains',
  startWith = 'startswith',
  notStartWith = 'nstartswith',
  endWith = 'endswith',
  notEndWith = 'nendswith',

  in = 'in',
  notIn = 'nin',

  isNull = 'isnull',
  isNotNull = 'isnotnull',

  inRole = 'hasRole',
  notInRole = 'notHasRole',
  inCategory = 'inCategory',
  notInCategory = 'notInCategory',
  inPosition = 'inPosition',
  notInPosition = 'notInPosition',
  inListUser = 'inListUser',
  notInListUser = 'notInListUser',
  inListGroup = 'inListGroup',
  notInListGroup = 'notInListGroup',
  isCurrentUser = 'isCurrentUser',
  isCurrentCanBo = 'isCurrentCanBo'
}

export const TrangThai = [
  {
    id: 0,
    ten: ""
  },
  {
    id: 1,
    ten: "Đã liên hệ"
  },
  {
    id: 2,
    ten: "Đã phản hồi"
  }
]

export const CachThu = [
  {
    id: 0,
    ten: ""
  },
  {
    id: 1,
    ten: "Trực tiếp"
  },
  {
    id: 2,
    ten: "Chuyển khoản"
  }
]
