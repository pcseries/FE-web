export let MENU_ITEM = [
  {
      path: 'admin/userMN',
      title: 'จัดการuser',
      icon: 'user'
  },
  {
    path: '#',
    title: 'จัดการผูดูแลระบบ',
    icon: 'user',
    children: [{
      path: '#',
      title: 'ข้อมูลของฉัน'
    }
    ]
  }
];


