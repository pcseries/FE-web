export let MENU_ITEM = [
  {
      path: 'admin/userMN',
      title: 'จัดการuser',
      icon: 'user'
  },
  {
    path: 'admin/adminMN',
    title: 'ผู้ดูแลระบบ',
    icon: 'user',
    children: [{
      path: 'admin/adminMN',
      title: 'จัดการผู้ดูแลระบบ'
    },
    {
      path: '#',
      title: 'ข้อมูลของฉัน'
    }
    ]
  }
];


