"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileTextIcon, EditIcon, SaveIcon, SearchIcon, ClockIcon } from "lucide-react"

// Mock EMR data for doctor view
const mockPatientRecords = [
  {
    patientId: "7xKX...gAsU",
    lastUpdated: "2024-01-15",
    pendingUpdates: true,
    recentVisit: {
      date: "2024-01-15",
      diagnosis: "Annual physical examination",
      notes: "Patient in good health. Blood pressure normal.",
      vitals: {
        bp: "120/80",
        hr: "72",
        temp: "98.6°F",
        weight: "165 lbs",
      },
    },
  },
  {
    patientId: "2Bp8...4pQ5",
    lastUpdated: "2024-01-10",
    pendingUpdates: false,
    recentVisit: {
      date: "2024-01-10",
      diagnosis: "Asthma follow-up",
      notes: "Symptoms well controlled with current medication.",
      vitals: {
        bp: "118/75",
        hr: "68",
        temp: "98.4°F",
        weight: "140 lbs",
      },
    },
  },
]

export default function EMRManagement() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [editForm, setEditForm] = useState({
    diagnosis: "",
    notes: "",
    prescription: "",
    followUp: "",
  })

  const handleEditRecord = (patient: any) => {
    setSelectedPatient(patient)
    setEditForm({
      diagnosis: patient.recentVisit.diagnosis,
      notes: patient.recentVisit.notes,
      prescription: "",
      followUp: "",
    })
    setIsEditing(true)
  }

  const handleSaveRecord = () => {
    console.log("Saving EMR update:", editForm)
    setIsEditing(false)
    setSelectedPatient(null)
  }

  const filteredRecords = mockPatientRecords.filter((record) =>
    record.patientId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Medical Records Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Update and manage patient electronic medical records</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending Updates</p>
          <p className="text-2xl font-bold text-orange-600">
            {mockPatientRecords.filter((r) => r.pendingUpdates).length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search patient records by wallet ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Records List */}
      <div className="grid gap-4">
        {filteredRecords.map((record) => (
          <Card key={record.patientId} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <FileTextIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Patient #{record.patientId}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        Last updated: {record.lastUpdated}
                      </span>
                      <span>Recent visit: {record.recentVisit.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{record.recentVisit.diagnosis}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {record.pendingUpdates && <Badge variant="destructive">Pending Updates</Badge>}
                  <Button variant="outline" size="sm" onClick={() => handleEditRecord(record)}>
                    <EditIcon className="h-4 w-4 mr-2" />
                    Update EMR
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* EMR Update Modal/Form */}
      {isEditing && selectedPatient && (
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Update Medical Record - Patient #{selectedPatient.patientId}</CardTitle>
            <CardDescription>Last visit: {selectedPatient.recentVisit.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="visit" className="space-y-4">
              <TabsList>
                <TabsTrigger value="visit">Visit Notes</TabsTrigger>
                <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
                <TabsTrigger value="prescription">Prescriptions</TabsTrigger>
                <TabsTrigger value="followup">Follow-up</TabsTrigger>
              </TabsList>

              <TabsContent value="visit" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Diagnosis</label>
                  <Input
                    value={editForm.diagnosis}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, diagnosis: e.target.value }))}
                    placeholder="Primary diagnosis..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Clinical Notes</label>
                  <Textarea
                    value={editForm.notes}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Detailed clinical notes, observations, and treatment plan..."
                    rows={4}
                  />
                </div>
              </TabsContent>

              <TabsContent value="vitals" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Blood Pressure</label>
                    <Input defaultValue={selectedPatient.recentVisit.vitals.bp} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Heart Rate</label>
                    <Input defaultValue={selectedPatient.recentVisit.vitals.hr} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Temperature</label>
                    <Input defaultValue={selectedPatient.recentVisit.vitals.temp} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Weight</label>
                    <Input defaultValue={selectedPatient.recentVisit.vitals.weight} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="prescription" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Prescriptions</label>
                  <Textarea
                    value={editForm.prescription}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, prescription: e.target.value }))}
                    placeholder="Medication name, dosage, frequency, duration..."
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="followup" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Follow-up Instructions</label>
                  <Textarea
                    value={editForm.followUp}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, followUp: e.target.value }))}
                    placeholder="Next appointment recommendations, monitoring instructions..."
                    rows={3}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 mt-6">
              <Button onClick={handleSaveRecord}>
                <SaveIcon className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
