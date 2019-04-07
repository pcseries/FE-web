export let MENU_ITEM = [
  {
    path: 'user/profile',
    title: 'ข้อมูลของฉัน',
    icon: 'address-card-o'
  },
  {
      path: 'user',
      title: 'จัดการบัญชี',
      icon: 'user',
      children: [
        {
          path: 'editProfile',
          title: 'จัดการโปร์ไฟล์'
        },
        {
          path: 'addressManage',
          title: 'จัดการที่อยู่'
        }
      ]
  },
  {
    path: 'user/payHistory/0',
    title: 'การซื้อของฉัน',
    icon: 'credit-card'
  },
  {
    path: 'user/store',
    title: 'จัดการร้านค้า',
    icon: 'briefcase'
  },
  {
    path: 'user/sellProducts',
    title: 'การขายของฉัน',
    icon: 'btc'
  }
];
