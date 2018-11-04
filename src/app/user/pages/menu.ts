export let MENU_ITEM = [
  {
    path: 'user/profile',
    title: 'ข้อมูลของฉัน',
    icon: 'address-card-o'
  },
  {
      path: '#',
      title: 'จัดการบัญชี',
      icon: 'user',
      children: [
        {
          path: '#',
          title: 'จัดการโปร์ไฟล์'
        },
        {
          path: '#',
          title: 'จัดการที่อยู่'
        },
        {
          path: '#',
          title: 'ตั้งค่าความปลอดภัย'
        }
      ]
  },
  {
    path: '#',
    title: 'การซื้อของฉัน',
    icon: 'credit-card'
  }
];
