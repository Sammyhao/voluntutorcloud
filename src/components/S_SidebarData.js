import React, { useState, useEffect } from 'react'
import { GrFavorite, GrPin } from 'react-icons/gr'
import { CgProfile } from 'react-icons/cg'
import { BsCalendarCheck } from 'react-icons/bs'
import { MdBookmarkBorder, MdOutlineSchool } from 'react-icons/md'
import { AiOutlineMessage, AiOutlineCalendar } from 'react-icons/ai'
import { SiGooglemeet } from 'react-icons/si'
import { RiFolder3Line } from 'react-icons/ri'

export const S_SidebarData = [
  {
    title: 'Profile',
    path: '/profile',
    cName: 'nav-text',
    icon: <CgProfile />,
  },
  {
    title: 'Bookings',
    path: '/book',
    cName: 'nav-text',
    icon: <AiOutlineCalendar />,
  },
  {
    title: 'Program Usage',
    path: '/program_usage',
    cName: 'nav-text',
    icon: <GrPin />,
  },
  {
    title: 'Message',
    path: '/message',
    cName: 'nav-text',
    icon: <AiOutlineMessage />,
  },
  {
    title: 'Teacher Portfolio',
    path: '/Student_portfolio',
    cName: 'nav-text',
    icon: <RiFolder3Line />,
  },
]
