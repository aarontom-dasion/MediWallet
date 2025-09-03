"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileTextIcon, CalendarIcon, CreditCardIcon, BellIcon, WalletIcon, PillIcon, ActivityIcon } from "lucide-react"
import PatientHeader from "@/components/patient-header"
import EMRView from "@/components/emr-view"
import AppointmentScheduler from "@/components/appointment-scheduler"
import PaymentPortal from "@/components/payment-portal"

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [patient, setPatient] = useState({
    walletAddress: "",
    name: "Patient",
    lastVisit: "2024-01-15",
    upcomingAppointments: 2,
    pendingPayments: 1,
  })

  const { publicKey } = useWallet()

  useEffect(() => {
    const wallet =
      publicKey?.toString() || (typeof window !== "undefined" ? localStorage.getItem("wallet") : null)
    if (wallet) {
      setPatient((p) => ({
        ...p,
        walletAddress: wallet,
        name: `Patient #${wallet.slice(0, 4)}...${wallet.slice(-4)}`,
      }))
    }
  }, [publicKey])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PatientHeader patient={patient} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {patient.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your health records, appointments, and payments securely.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Visit</p>
                    <p className="text-2xl font-bold">{patient.lastVisit}</p>
                  </div>
                  <ActivityIcon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming</p>
                    <p className="text-2xl font-bold">{patient.upcomingAppointments}</p>
                  </div>
                  <CalendarIcon className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Bills</p>
                    <p className="text-2xl font-bold">{patient.pendingPayments}</p>
                  </div>
                  <CreditCardIcon className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Wallet Status</p>
                    <p className="text-sm font-bold text-green-600">Connected</p>
                  </div>
                  <WalletIcon className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="emr">Medical Records</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BellIcon className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileTextIcon className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm">Lab Results Available</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Blood work from Jan 15</p>
                        </div>
                      </div>
                      <Badge variant="secondary">New</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="font-medium text-sm">Appointment Confirmed</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Feb 1, 2024 at 2:00 PM</p>
                        </div>
                      </div>
                      <Badge variant="outline">Confirmed</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCardIcon className="h-4 w-4 text-orange-600" />
                        <div>
                          <p className="font-medium text-sm">Payment Due</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Consultation fee: $150</p>
                        </div>
                      </div>
                      <Badge variant="destructive">Due</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Schedule New Appointment
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <FileTextIcon className="h-4 w-4 mr-2" />
                      Request Medical Records
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <PillIcon className="h-4 w-4 mr-2" />
                      Refill Prescription
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <CreditCardIcon className="h-4 w-4 mr-2" />
                      Pay Outstanding Bills
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="emr">
              <EMRView />
            </TabsContent>

            <TabsContent value="appointments">
              <AppointmentScheduler />
            </TabsContent>

            <TabsContent value="payments">
              <PaymentPortal />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
