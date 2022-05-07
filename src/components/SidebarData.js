import React, { useState, useEffect } from 'react'
import { GrFavorite, GrPin } from 'react-icons/gr'
import { CgProfile } from 'react-icons/cg'
import { BsCalendarCheck } from 'react-icons/bs'
import { MdBookmarkBorder, MdOutlineSchool } from 'react-icons/md'
import { AiOutlineMessage, AiOutlineCalendar } from 'react-icons/ai'
import { FaBook} from 'react-icons/fa'

import { SiGooglemeet } from 'react-icons/si'
import { RiFolder3Line } from 'react-icons/ri'

export const SidebarData = [
  {
    title: 'Profile',
    path: '/profile',
    cName: 'nav-text',
    icon: <CgProfile />,
  },
  {
    title: 'Schools Tour',
    path: '/subjects',
    cName: 'nav-text',
    icon: <MdOutlineSchool />,
  },
  {
    title: 'My list',
    path: '/mylist',
    cName: 'nav-text',
    icon: <GrFavorite />,
  },
  {
    title: 'Booking',
    path: '/book',
    cName: 'nav-text',
    icon: <AiOutlineCalendar />,
  },
  {
    title: 'Appointment',
    path: '/appointment',
    cName: 'nav-text',
    icon: <SiGooglemeet />,
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
    title: 'Study Materials',
    path: '/studymat',
    cName: 'nav-text',
    icon: <FaBook />,
  },
  {
    title: 'Student Portfolio',
    path: '/Student_portfolio',
    cName: 'nav-text',
    icon: <RiFolder3Line />,
  },
]
