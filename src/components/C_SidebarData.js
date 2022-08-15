import React from 'react'
import { GrFavorite, GrPin } from 'react-icons/gr'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineSchool } from 'react-icons/md'
import { AiOutlineMessage, AiOutlineCalendar } from 'react-icons/ai'
import { SiGooglemeet } from 'react-icons/si'
import { RiFolder3Line } from 'react-icons/ri'
import { FaBook } from 'react-icons/fa'

export const C_SidebarData = [
  {
    title: '我的檔案',
    path: '/profile',
    cName: 'nav-text',
    icon: <CgProfile />,
  },
  {
    title: '志工計畫',
    path: '/subjects',
    cName: 'nav-text',
    icon: <MdOutlineSchool />,
  },
  // {
  //   title: '我的最愛',
  //   path: '/mylist',
  //   cName: 'nav-text',
  //   icon: <GrFavorite />,
  // },
  {
    title: '預約會議',
    path: '/book',
    cName: 'nav-text',
    icon: <AiOutlineCalendar />,
  },
  {
    title: '會議紀錄',
    path: '/appointment',
    cName: 'nav-text',
    icon: <SiGooglemeet />,
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
    title: '教學教材',
    path: '/studymat',
    cName: 'nav-text',
    icon: <FaBook />,
  },
  {
    title: '學生檔案',
    path: '/Student_portfolio',
    cName: 'nav-text',
    icon: <RiFolder3Line />,
  },
]
