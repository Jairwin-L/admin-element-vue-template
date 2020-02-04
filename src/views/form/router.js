const prePath = '/form/'
const router = [
  {
    path: 'list',
    component: () => import('./list'),
    meta: {
      title: ['表单管理', '表单列表']
    }
  },
  {
    path: 'detail/:id',
    component: () => import('./detail'),
    meta: {
      title: ['表单管理', '表单列表', '表单详情']
    }
  },
  {
    path: 'add',
    component: () => import('./add'),
    meta: {
      title: ['表单管理', '表单列表', '创建表单']
    }
  },
  {
    path: 'edit/:id',
    component: () => import('./edit'),
    meta: {
      title: ['表单管理', '表单列表', '修改表单']
    }
  }
]

router.forEach(item => {
  item.path = prePath + item.path
})

export default router
