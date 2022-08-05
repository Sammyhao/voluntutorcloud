import React from 'react'
import { GrFavorite, GrPin } from 'react-icons/gr'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineMessage, AiOutlineCalendar } from 'react-icons/ai'
import { RiFolder3Line } from 'react-icons/ri'

export const C_S_SidebarData = [
  {
    title: '我的檔案',
    path: '/profile',
    cName: 'nav-text',
    icon: <CgProfile />,
  },
  {
    title: '會議預約',
    path: '/book',
    cName: 'nav-text',
    icon: <AiOutlineCalendar />,
  },
  {
    title: '服務時數',
    path: '/program_usage',
    cName: 'nav-text',
    icon: <GrPin />,
  },
  {
    title: '訊息',
    path: '/message',
    cName: 'nav-text',
    icon: <AiOutlineMessage />,
  },
  {
    title: '老師檔案',
    path: '/Student_portfolio',
    cName: 'nav-text',
    icon: <RiFolder3Line />,
  },
]
