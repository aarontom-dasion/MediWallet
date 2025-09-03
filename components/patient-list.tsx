"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, UserIcon, CalendarIcon, FileTextIcon, EyeIcon } from "lucide-react"

// Mock patient data
const mockPatients = [
  {
    id: 1,
    walletId: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    displayId: "7xKX...gAsU",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-02-01",
    status: "active",
    conditions: ["Hypertension", "Diabetes Type 2"],
    age: 45,
    gender: "M",
  },
  {
    id: 2,
    walletId: "2Bp8x1Y9wR7nM5kL4jE6tY3sA8cB9dF1gH7jK2mN4pQ5",
    displayId: "2Bp8...4pQ5",
    lastVisit: "2024-01-10",
    nextAppointment: null,
    status: "active",
    conditions: ["Asthma"],
    age: 32,
    gender: "F",
  },
  {
    id: 3,
    walletId: "5KJp7z2X9vQ8mR4nL6wE3tY1sA9cB7dF2gH8jK3mN5pQ",
    displayId: "5KJp...N5pQ",
    lastVisit: "2023-12-20",
    nextAppointment: "2024-02-15",
    status: "inactive",
    conditions: ["Migraine"],
    age: 28,
    gender: "F",
  },
]

export default function PatientList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.displayId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.conditions.some((condition) => condition.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Management</h2>
          <p className="text-gray-600 dark:text-gray-400">View and manage your assigned patients</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Patients</p>
          <p className="text-2xl font-bold">{mockPatients.length}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by wallet ID or condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Patients</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Patient List */}
      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <UserIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Patient #{patient.displayId}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>
                        {patient.age}y, {patient.gender}
                      </span>
                      <span>Last visit: {patient.lastVisit}</span>
                      {patient.nextAppointment && (
                        <span className="text-green-600">Next: {patient.nextAppointment}</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2">
                      {patient.conditions.map((condition) => (
                        <Badge key={condition} variant="secondary" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={patient.status === "active" ? "default" : "secondary"}>{patient.status}</Badge>
                  <Button variant="outline" size="sm" onClick={() => handleViewPatient(patient)}>
                    <EyeIcon className="h-4 w-4 mr-2" />
                    View EMR
                  </Button>
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Patient Detail Modal/Panel would go here */}
      {selectedPatient && (
        <Card className="mt-6 border-2 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Patient Details - {selectedPatient.displayId}</CardTitle>
            <CardDescription>Full wallet ID: {selectedPatient.walletId}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Patient Information</h4>
                <div className="space-y-1 text-sm">
                  <p>Age: {selectedPatient.age} years</p>
                  <p>Gender: {selectedPatient.gender}</p>
                  <p>Status: {selectedPatient.status}</p>
                  <p>Last Visit: {selectedPatient.lastVisit}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Medical Conditions</h4>
                <div className="space-y-1">
                  {selectedPatient.conditions.map((condition: string) => (
                    <Badge key={condition} variant="outline">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button>
                <FileTextIcon className="h-4 w-4 mr-2" />
                View Full EMR
              </Button>
              <Button variant="outline">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Schedule Appointment
              </Button>
              <Button variant="outline" onClick={() => setSelectedPatient(null)}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
