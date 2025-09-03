"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletIcon, UserIcon, ShieldCheckIcon, CreditCardIcon } from "lucide-react"
import PatientLogin from "@/components/patient-login"
import DoctorLogin from "@/components/doctor-login"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("patient")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                <WalletIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MyMediWallet</h1>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Secure • HIPAA Compliant • Blockchain-Powered
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Medical Records, Secured by Blockchain
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Access your health data securely with Solana wallet authentication. Patients connect with crypto wallets,
              doctors use traditional login.
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <ShieldCheckIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">HIPAA Compliant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your medical data is encrypted and stored securely with full HIPAA compliance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <WalletIcon className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Wallet Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Patients log in securely using their Solana wallet - no passwords needed.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CreditCardIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Crypto Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Pay for medical services with Solana tokens or traditional payment methods.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Login Tabs */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Access Your Portal</CardTitle>
              <CardDescription className="text-center">Choose your login method below</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="patient" className="flex items-center gap-2">
                    <WalletIcon className="h-4 w-4" />
                    Patient Portal
                  </TabsTrigger>
                  <TabsTrigger value="doctor" className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    Doctor Portal
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="patient" className="mt-6">
                  <PatientLogin />
                </TabsContent>

                <TabsContent value="doctor" className="mt-6">
                  <DoctorLogin />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
