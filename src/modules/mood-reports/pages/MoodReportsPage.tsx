import { useState } from 'react'
import { useDocumentTitle } from '@/core/hooks/utils/useDocumentTitle'
import { useUsers } from '@/core/hooks/users/useUsers'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/inputs/select'
import { FilterEditIcon } from '@/core/components/icons'
import { Calendar } from 'lucide-react'
import ReactECharts from 'echarts-for-react'

interface MoodLogEntry {
  date: string
  mood: string
  notes: string
}

const mockMoodData = [
  { day: 'Mon', value: 2 },
  { day: 'Tue', value: 1 },
  { day: 'Wed', value: 0 },
  { day: 'Thu', value: 1 },
  { day: 'Fri', value: 2 },
  { day: 'Sat', value: 2 },
  { day: 'Sun', value: 1 },
]

const mockMoodLog: MoodLogEntry[] = [
  { date: 'Monday, 06', mood: 'I feel Happy', notes: '-' },
  { date: 'Tuesday, 07', mood: 'I feel Okay', notes: 'Long day' },
  { date: 'Wednesday, 08', mood: 'I feel Stressed', notes: 'Bus delay' },
  { date: 'Thursday, 09', mood: 'I feel Okay', notes: 'Long day' },
  { date: 'Friday, 10', mood: 'I feel Happy', notes: '-' },
  { date: 'Saturday, 11', mood: 'I feel Happy', notes: 'Long day' },
  { date: 'Sunday, 12', mood: 'I feel Okay', notes: '-' },
]

export const MoodReportsPage = () => {
  useDocumentTitle('Mood Reports')
  const { data: users = [] } = useUsers()
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year' | 'custom'>('week')

  const selectedUser = users.find((u) => u.id === selectedUserId)

  const chartOption = {
    grid: {
      left: '60px',
      right: '20px',
      top: '20px',
      bottom: '40px',
    },
    xAxis: {
      type: 'category',
      data: mockMoodData.map((d) => d.day),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#949494',
        fontSize: 12,
        fontWeight: 500,
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 2,
      interval: 1,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#949494',
        fontSize: 12,
        fontWeight: 500,
        formatter: (value: number) => {
          const labels = ['Stressed', 'Mixed/Okay', 'Mostly Happy']
          return labels[value] || ''
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#E5E7EB',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        data: mockMoodData.map((d) => d.value),
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#007DC6',
          width: 2,
        },
        itemStyle: {
          color: '#007DC6',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 125, 198, 0.1)' },
              { offset: 1, color: 'rgba(0, 125, 198, 0)' },
            ],
          },
        },
      },
    ],
  }

  return (
    <div className="min-h-full bg-[#F9FAFB] px-8 py-8">
      <div className="mt-8 space-y-8">
        {/* Filters */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="bg-[#F2F4F7] border border-[#EAECF0] rounded-[8px] px-3 py-3 flex items-center gap-2.5">
              <FilterEditIcon className="h-5 w-5 text-[#475467]" />
              <span className="text-[14px] leading-5 text-[#475467] font-normal">
                Participant filter:
              </span>
            </div>
            <div className="h-4 w-px bg-[#EAECF0] rotate-180" />
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select User">
                  {selectedUser
                    ? selectedUser.firstName && selectedUser.lastName
                      ? `${selectedUser.firstName} ${selectedUser.lastName}`
                      : selectedUser.organizationName || selectedUser.email
                    : 'Select User'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.firstName && user.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user.organizationName || user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#F2F4F7] border border-[#EAECF0] rounded-[8px] px-3 py-3 flex items-center gap-2.5">
              <FilterEditIcon className="h-5 w-5 text-[#475467]" />
              <span className="text-[14px] leading-5 text-[#475467] font-normal">
                Timeframe filter:
              </span>
            </div>
            <div className="h-4 w-px bg-[#EAECF0] rotate-180" />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTimeframe('week')}
                className={`px-2.5 py-2 rounded-[8px] text-[14px] leading-5 font-medium transition-colors ${
                  timeframe === 'week'
                    ? 'bg-[#007DC6] text-white'
                    : 'bg-white text-[#475467]'
                }`}
              >
                Week
              </button>
              <button
                type="button"
                onClick={() => setTimeframe('month')}
                className={`px-2.5 py-2 rounded-[8px] text-[14px] leading-5 font-medium transition-colors ${
                  timeframe === 'month'
                    ? 'bg-[#007DC6] text-white'
                    : 'bg-white text-[#475467]'
                }`}
              >
                Month
              </button>
              <button
                type="button"
                onClick={() => setTimeframe('year')}
                className={`px-2.5 py-2 rounded-[8px] text-[14px] leading-5 font-medium transition-colors ${
                  timeframe === 'year'
                    ? 'bg-[#007DC6] text-white'
                    : 'bg-white text-[#475467]'
                }`}
              >
                Year
              </button>
              <button
                type="button"
                onClick={() => setTimeframe('custom')}
                className={`px-2.5 py-2 rounded-[8px] text-[14px] leading-5 font-medium transition-colors flex items-center gap-2 ${
                  timeframe === 'custom'
                    ? 'bg-[#007DC6] text-white'
                    : 'bg-white text-[#475467]'
                }`}
              >
                From - To
                <Calendar className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-[10px] shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)] p-5 flex flex-col gap-2">
            <p className="text-[30px] leading-[38px] font-bold text-[#242A32]">38</p>
            <p className="text-[16px] leading-6 text-[#475467] font-normal">Days Logged</p>
          </div>

          <div className="bg-white rounded-[10px] shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)] p-5 flex flex-col gap-2">
            <p className="text-[30px] leading-[38px] font-bold text-[#242A32]">212</p>
            <p className="text-[16px] leading-6 text-[#475467] font-normal">Total Entries</p>
          </div>

          <div className="bg-white rounded-[10px] shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)] p-5 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-[30px] leading-[38px] font-bold text-[#242A32]">4 days</p>
                <p className="text-[16px] leading-6 text-[#475467] font-normal">I feel Happy</p>
              </div>
              <div className="bg-[#D1FADF] rounded-[4px] px-1.5 py-1">
                <p className="text-[16px] leading-6 font-medium text-[#039855]">40%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[10px] shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)] p-5 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-[30px] leading-[38px] font-bold text-[#242A32]">2 days</p>
                <p className="text-[16px] leading-6 text-[#475467] font-normal">I feel Okay</p>
              </div>
              <div className="bg-[#FEEDE6] rounded-[4px] px-1.5 py-1">
                <p className="text-[16px] leading-6 font-medium text-[#DC6803]">29%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[10px] shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)] p-5 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-[30px] leading-[38px] font-bold text-[#242A32]">1 day</p>
                <p className="text-[16px] leading-6 text-[#475467] font-normal">I feel Stressed</p>
              </div>
              <div className="bg-[#FEF3F2] rounded-[4px] px-1.5 py-1">
                <p className="text-[16px] leading-6 font-medium text-[#DE2525]">14%</p>
              </div>
            </div>
          </div>

          <div className="bg-[#007DC6] rounded-[10px] shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)] p-5 flex flex-col gap-2">
            <p className="text-[22px] leading-[38px] font-bold text-white">I feel happy</p>
            <p className="text-[16px] leading-6 text-[#D2EFFF] font-normal">Dominant mood</p>
          </div>
        </div>

        {/* Chart and Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Mood Graph */}
          <div className="bg-white rounded-[10px] shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)] p-5 flex flex-col gap-4">
            <h2 className="text-[24px] leading-[32px] font-medium text-[#242A32]">
              Daily Mood Graph
            </h2>
            <div className="h-[280px]">
              <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>

          {/* Daily Mood Log */}
          <div className="bg-white rounded-[10px] shadow-[0px_27px_80px_0px_rgba(8,12,58,0.04),0px_9.855px_29.201px_0px_rgba(8,12,58,0.03),0px_4.785px_14.177px_0px_rgba(8,12,58,0.02),0px_2.346px_6.95px_0px_rgba(8,12,58,0.02),0px_0.927px_2.748px_0px_rgba(8,12,58,0.01)] p-5 flex flex-col gap-4">
            <h2 className="text-[24px] leading-[32px] font-medium text-[#242A32]">
              Daily Mood Log
            </h2>
            <div className="border border-[#EAECF0] rounded-[8px] overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-[#F9FAFB] border-b border-[#EAECF0]">
                <div className="px-3 py-3 border-r border-[#EAECF0]">
                  <p className="text-[16px] leading-6 font-medium text-[#344054]">Date</p>
                </div>
                <div className="px-3 py-3 border-r border-[#EAECF0]">
                  <p className="text-[16px] leading-6 font-medium text-[#344054]">Mood</p>
                </div>
                <div className="px-3 py-3">
                  <p className="text-[16px] leading-6 font-medium text-[#344054]">Notes</p>
                </div>
              </div>

              {/* Table Rows */}
              {mockMoodLog.map((entry, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 border-b border-[#F2F4F7] ${
                    index === mockMoodLog.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <div className="px-3 py-4">
                    <p className="text-[16px] leading-6 text-[#344054] font-normal">
                      {entry.date}
                    </p>
                  </div>
                  <div className="px-3 py-1">
                    <div className="bg-white border border-[#F2F4F7] rounded-[10px] px-3 py-3">
                      <p className="text-[16px] leading-6 text-[#344054] font-normal">
                        {entry.mood}
                      </p>
                    </div>
                  </div>
                  <div className="px-3 py-4">
                    <p className="text-[16px] leading-6 text-[#007DC6] font-bold">
                      {entry.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
