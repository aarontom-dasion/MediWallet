"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileTextIcon, DownloadIcon, PillIcon, TestTubeIcon, HeartIcon } from "lucide-react"

// Mock EMR data
const mockEMR = {
  visits: [
    {
      id: 1,
      date: "2024-01-15",
      doctor: "Dr. Smith",
      type: "Annual Checkup",
      diagnosis: "Routine physical examination",
      notes: "Patient in good health. Blood pressure normal. Recommended annual follow-up.",
      status: "completed",
    },
    {
      id: 2,
      date: "2023-12-10",
      doctor: "Dr. Johnson",
      type: "Follow-up",
      diagnosis: "Hypertension monitoring",
      notes: "Blood pressure improved with medication. Continue current treatment.",
      status: "completed",
    },
  ],
  prescriptions: [
    {
      id: 1,
      medication: "Lisinopril 10mg",
      prescribedBy: "Dr. Johnson",
      date: "2023-12-10",
      instructions: "Take once daily with food",
      refills: 5,
      status: "active",
    },
    {
      id: 2,
      medication: "Vitamin D3 1000 IU",
      prescribedBy: "Dr. Smith",
      date: "2024-01-15",
      instructions: "Take once daily",
      refills: 11,
      status: "active",
    },
  ],
  labResults: [
    {
      id: 1,
      test: "Complete Blood Count",
      date: "2024-01-15",
      status: "normal",
      doctor: "Dr. Smith",
      results: {
        "White Blood Cells": "7.2 K/uL (Normal)",
        "Red Blood Cells": "4.5 M/uL (Normal)",
        Hemoglobin: "14.2 g/dL (Normal)",
        Platelets: "250 K/uL (Normal)",
      },
    },
    {
      id: 2,
      test: "Lipid Panel",
      date: "2024-01-15",
      status: "attention",
      doctor: "Dr. Smith",
      results: {
        "Total Cholesterol": "220 mg/dL (High)",
        "LDL Cholesterol": "140 mg/dL (High)",
        "HDL Cholesterol": "45 mg/dL (Normal)",
        Triglycerides: "180 mg/dL (Borderline High)",
      },
    },
  ],
  vitals: [
    {
      date: "2024-01-15",
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      weight: "165 lbs",
      height: "5'8\"",
    },
  ],
}

export default function EMRView() {
  const [selectedRecord, setSelectedRecord] = useState<any>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Electronic Medical Records</h2>
          <p className="text-gray-600 dark:text-gray-400">Your complete medical history and health data</p>
        </div>
        <Button variant="outline">
          <DownloadIcon className="h-4 w-4 mr-2" />
          Export Records
        </Button>
      </div>

      <Tabs defaultValue="visits" className="space-y-6">
        <TabsList>
          <TabsTrigger value="visits">Visits & Diagnoses</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
        </TabsList>

        <TabsContent value="visits" className="space-y-4">
          {mockEMR.visits.map((visit) => (
            <Card key={visit.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileTextIcon className="h-5 w-5" />
                      {visit.type}
                    </CardTitle>
                    <CardDescription>
                      {visit.date} • {visit.doctor}
                    </CardDescription>
                  </div>
                  <Badge variant={visit.status === "completed" ? "default" : "secondary"}>{visit.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Diagnosis</h4>
                    <p className="text-sm">{visit.diagnosis}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Notes</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{visit.notes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          {mockEMR.prescriptions.map((prescription) => (
            <Card key={prescription.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <PillIcon className="h-5 w-5" />
                      {prescription.medication}
                    </CardTitle>
                    <CardDescription>
                      Prescribed by {prescription.prescribedBy} on {prescription.date}
                    </CardDescription>
                  </div>
                  <Badge variant={prescription.status === "active" ? "default" : "secondary"}>
                    {prescription.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Instructions</h4>
                    <p className="text-sm">{prescription.instructions}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Refills Remaining</h4>
                    <p className="text-sm">{prescription.refills}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button size="sm" variant="outline">
                    Request Refill
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="labs" className="space-y-4">
          {mockEMR.labResults.map((lab) => (
            <Card key={lab.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TestTubeIcon className="h-5 w-5" />
                      {lab.test}
                    </CardTitle>
                    <CardDescription>
                      {lab.date} • Ordered by {lab.doctor}
                    </CardDescription>
                  </div>
                  <Badge variant={lab.status === "normal" ? "default" : "destructive"}>
                    {lab.status === "normal" ? "Normal" : "Needs Attention"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(lab.results).map(([test, result]) => (
                    <div
                      key={test}
                      className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <span className="text-sm font-medium">{test}</span>
                      <span className={`text-sm ${result.includes("High") ? "text-red-600" : "text-green-600"}`}>
                        {result}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          {mockEMR.vitals.map((vital, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HeartIcon className="h-5 w-5" />
                  Vital Signs - {vital.date}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{vital.bloodPressure}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Blood Pressure</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{vital.heartRate}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Heart Rate</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{vital.temperature}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Temperature</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{vital.weight}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Weight</p>
                  </div>
                  <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg">
                    <p className="text-2xl font-bold text-indigo-600">{vital.height}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Height</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
