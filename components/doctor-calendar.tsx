"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { ClockIcon, PlusIcon } from "lucide-react"

// Mock appointment data
const mockAppointments = [
  {
    id: 1,
    date: "2024-02-01",
    time: "9:00 AM",
    duration: 30,
    patientId: "7xKX...gAsU",
    type: "Annual Checkup",
    status: "confirmed",
  },
  {
    id: 2,
    date: "2024-02-01",
    time: "10:30 AM",
    duration: 45,
    patientId: "2Bp8...4pQ5",
    type: "Follow-up",
    status: "confirmed",
  },
  {
    id: 3,
    date: "2024-02-01",
    time: "2:00 PM",
    duration: 60,
    patientId: "5KJp...N5pQ",
    type: "Consultation",
    status: "pending",
  },
  {
    id: 4,
    date: "2024-02-02",
    time: "11:00 AM",
    duration: 30,
    patientId: "9Mq4...7f",
    type: "Lab Review",
    status: "confirmed",
  },
]

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

export default function DoctorCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week">("day")

  const selectedDateString = selectedDate?.toISOString().split("T")[0]
  const dayAppointments = mockAppointments.filter((apt) => apt.date === selectedDateString)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar & Appointments</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your schedule and appointments</p>
        </div>
        <div className="flex gap-2">
          <Button variant={viewMode === "day" ? "default" : "outline"} onClick={() => setViewMode("day")}>
            Day View
          </Button>
          <Button variant={viewMode === "week" ? "default" : "outline"} onClick={() => setViewMode("week")}>
            Week View
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />

            {/* Quick Stats */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Today's Appointments</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>This Week</span>
                <span className="font-medium">32</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pending Confirmations</span>
                <span className="font-medium text-orange-600">3</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Day Schedule */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Schedule for {selectedDate?.toLocaleDateString()}</CardTitle>
                  <CardDescription>{dayAppointments.length} appointments scheduled</CardDescription>
                </div>
                <Button size="sm">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Appointment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dayAppointments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No appointments scheduled for this date
                  </div>
                ) : (
                  dayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                          <ClockIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{appointment.time}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {appointment.duration} minutes • {appointment.type}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Patient: {appointment.patientId}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Patient
                        </Button>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Available Time Slots */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Available Time Slots</CardTitle>
              <CardDescription>Open slots for new appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => {
                  const isBooked = dayAppointments.some((apt) => apt.time === slot)
                  return (
                    <Button
                      key={slot}
                      variant={isBooked ? "secondary" : "outline"}
                      size="sm"
                      disabled={isBooked}
                      className="justify-center"
                    >
                      {slot}
                      {isBooked && <span className="ml-1 text-xs">(Booked)</span>}
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
