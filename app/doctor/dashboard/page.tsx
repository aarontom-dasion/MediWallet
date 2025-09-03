"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UsersIcon, CalendarIcon, FileTextIcon, ClockIcon } from "lucide-react"
import DoctorHeader from "@/components/doctor-header"
import PatientList from "@/components/patient-list"
import DoctorCalendar from "@/components/doctor-calendar"
import EMRManagement from "@/components/emr-management"

// Mock doctor data
const mockDoctor = {
  id: 1,
  name: "Dr. Sarah Smith",
  specialty: "General Practice",
  email: "sarah.smith@hospital.com",
  patients: 156,
  todayAppointments: 8,
  pendingRecords: 3,
}

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DoctorHeader doctor={mockDoctor} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {mockDoctor.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {mockDoctor.specialty} • {mockDoctor.patients} active patients
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Patients</p>
                    <p className="text-2xl font-bold">{mockDoctor.patients}</p>
                  </div>
                  <UsersIcon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Appointments</p>
                    <p className="text-2xl font-bold">{mockDoctor.todayAppointments}</p>
                  </div>
                  <CalendarIcon className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Records</p>
                    <p className="text-2xl font-bold">{mockDoctor.pendingRecords}</p>
                  </div>
                  <FileTextIcon className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Next Appointment</p>
                    <p className="text-lg font-bold">2:00 PM</p>
                  </div>
                  <ClockIcon className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="records">Medical Records</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Today's Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Today's Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { time: "9:00 AM", patient: "Patient #7xKX...gAsU", type: "Checkup" },
                      { time: "10:30 AM", patient: "Patient #2Bp8...bC2d", type: "Follow-up" },
                      { time: "2:00 PM", patient: "Patient #5KJp...3d", type: "Consultation" },
                      { time: "3:30 PM", patient: "Patient #9Mq4...7f", type: "Lab Review" },
                    ].map((appointment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{appointment.time}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.patient}</p>
                        </div>
                        <Badge variant="outline">{appointment.type}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileTextIcon className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <FileTextIcon className="h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Updated EMR</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Patient #7xKX...gAsU - 2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <CalendarIcon className="h-4 w-4 text-green-600" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Appointment Completed</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Patient #2Bp8...bC2d - 4 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <UsersIcon className="h-4 w-4 text-orange-600" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">New Patient Assigned</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Patient #9Mq4...7f - Yesterday</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="patients">
              <PatientList />
            </TabsContent>

            <TabsContent value="calendar">
              <DoctorCalendar />
            </TabsContent>

            <TabsContent value="records">
              <EMRManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
