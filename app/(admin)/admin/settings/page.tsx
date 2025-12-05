'use client'

import {
  getThemeStatistics,
  getFontStatistics,
  getAppBuildStatistics,
  getAiModelStatistics,
  getLocaleStatistics,
} from '@/lib/api/settingsStatistics'
import { useEffect, useState } from 'react'
import ThemeStatisticsChart from '@/components/admin/settings/ThemeStatisticsChat'
import FontStatisticsChat from '@/components/admin/settings/FontStatisticsChat'
import AppBuildStatisticsChat from '@/components/admin/settings/AppBuildStatisticsChat'
import AiModelStatisticsChat from '@/components/admin/settings/AiModelStatisticsChat'
import LocaleStatisticsChat from '@/components/admin/settings/LocaleStatisticsChat'

export default function SettingsPage() {
  const [themeStatisticsData, setThemeStatisticsData] = useState([])
  const [fontStatisticsData, setFontStatisticsData] = useState([])
  const [appBuildStatisticsData, setAppBuildStatisticsData] = useState([])
  const [aiModelStatisticsData, setAiModelStatisticsData] = useState([])
  const [localeStatisticsData, setLocaleStatisticsData] = useState([])

  useEffect(() => {
    fetchGetThemeStatistics()
    fetchGetFontStatistics()
    fetchGetAppBuildStatistics()
    fetchGetAiModelStatistics()
    fetchGetLocaleStatistics()
  }, [])
  const fetchGetThemeStatistics = async () => {
    try {
      const data = await getThemeStatistics()
      setThemeStatisticsData(data)
    } catch (error) {
      console.error('Error fetching theme statistics:', error)
    }
  }

  const fetchGetFontStatistics = async () => {
    try {
      const data = await getFontStatistics()
      setFontStatisticsData(data)
    } catch (error) {
      console.error('Error fetching font statistics:', error)
    }
  }

  const fetchGetAppBuildStatistics = async () => {
    try {
      const data = await getAppBuildStatistics()
      setAppBuildStatisticsData(data)
    } catch (error) {
      console.error('Error fetching app build statistics:', error)
    }
  }

  const fetchGetAiModelStatistics = async () => {
    try {
      const data = await getAiModelStatistics()
      setAiModelStatisticsData(data)
    } catch (error) {
      console.error('Error fetching ai model statistics:', error)
    }
  }

  const fetchGetLocaleStatistics = async () => {
    try {
      const data = await getLocaleStatistics()
      setLocaleStatisticsData(data)
    } catch (error) {
      console.error('Error fetching locale statistics:', error)
    }
  }
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Settings statistics</h1>
      <h3 className="mb-2 text-lg font-semibold">Theme statistics</h3>
      <ThemeStatisticsChart data={themeStatisticsData} barName={'Count'} />

      <h3 className="mb-2 text-lg font-semibold">Font statistics</h3>
      <FontStatisticsChat data={fontStatisticsData} barName={'Count'} />

      <h3 className="mb-2 text-lg font-semibold">App build statistics</h3>
      <AppBuildStatisticsChat data={appBuildStatisticsData} barName={'Count'} />

      <h3 className="mb-2 text-lg font-semibold">Ai model statistics</h3>
      <AiModelStatisticsChat data={aiModelStatisticsData} barName={'Count'} />

      <h3 className="mb-2 text-lg font-semibold">Locale statistics</h3>
      <LocaleStatisticsChat data={localeStatisticsData} barName={'Count'} />
    </div>
  )
}
