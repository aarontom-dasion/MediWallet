"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, ClockIcon, UserIcon, PlusIcon } from "lucide-react"

// Mock appointment data
const mockAppointments = [
  {
    id: 1,
    date: "2024-02-01",
    time: "2:00 PM",
    doctor: "Dr. Smith",
    type: "Follow-up",
    status: "confirmed",
    location: "Main Clinic - Room 205",
  },
  {
    id: 2,
    date: "2024-02-15",
    time: "10:30 AM",
    doctor: "Dr. Johnson",
    type: "Consultation",
    status: "pending",
    location: "Cardiology Wing - Room 301",
  },
]

const availableSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
]

const doctors = [
  { id: 1, name: "Dr. Smith", specialty: "General Practice" },
  { id: 2, name: "Dr. Johnson", specialty: "Cardiology" },
  { id: 3, name: "Dr. Williams", specialty: "Dermatology" },
  { id: 4, name: "Dr. Brown", specialty: "Orthopedics" },
]

const appointmentTypes = ["Annual Checkup", "Follow-up", "Consultation", "Urgent Care", "Specialist Referral"]

export default function AppointmentScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    doctor: "",
    type: "",
    time: "",
    reason: "",
  })

  const handleScheduleAppointment = () => {
    // Mock scheduling logic
    console.log("Scheduling appointment:", newAppointment)
    setShowNewAppointment(false)
    setNewAppointment({ doctor: "", type: "", time: "", reason: "" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your upcoming and past appointments</p>
        </div>
        <Button onClick={() => setShowNewAppointment(!showNewAppointment)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Schedule New
        </Button>
      </div>

      {/* New Appointment Form */}
      {showNewAppointment && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Appointment</CardTitle>
            <CardDescription>Fill out the details for your new appointment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Doctor</label>
                <Select
                  value={newAppointment.doctor}
                  onValueChange={(value) => setNewAppointment((prev) => ({ ...prev, doctor: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.name}>
                        {doctor.name} - {doctor.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Appointment Type</label>
                <Select
                  value={newAppointment.type}
                  onValueChange={(value) => setNewAppointment((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Available Times</label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={newAppointment.time === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewAppointment((prev) => ({ ...prev, time: slot }))}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Reason for Visit</label>
                  <Textarea
                    placeholder="Briefly describe your symptoms or reason for the appointment..."
                    value={newAppointment.reason}
                    onChange={(e) => setNewAppointment((prev) => ({ ...prev, reason: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleScheduleAppointment} className="flex-1">
                Schedule Appointment
              </Button>
              <Button variant="outline" onClick={() => setShowNewAppointment(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Appointments */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
        {mockAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <CalendarIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{appointment.type}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {appointment.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        {appointment.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <UserIcon className="h-4 w-4" />
                        {appointment.doctor}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{appointment.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                    {appointment.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
