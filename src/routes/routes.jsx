import { lazy } from 'react'
import TipsLayout from '../components/tips/TipsLayout'

// Lazy-loaded components
const Dashboard = lazy(() => import('../pages/Dashboard'))
const CompetitionsList = lazy(() => import('../pages/CompetitionsList'))
const CompetitionDetail = lazy(() => import('../pages/CompetitionDetail'))
const Tips = lazy(() => import('../pages/Tips'))
const TipsDetail = lazy(() => import('../pages/TipsDetail'))

export const routes = [
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/competitions',
    children: [
      {
        path: '',
        element: <CompetitionsList />
      },
      {
        path: ':competitionId',
        element: <CompetitionDetail />
      }
    ]
  },
  {
    path: '/tips',
    element: <TipsLayout />,
    children: [
      {
        path: '',
        element: <Tips />
      },
      {
        path: ':competitionId',
        element: <TipsDetail />
      }
    ]
  }
]
