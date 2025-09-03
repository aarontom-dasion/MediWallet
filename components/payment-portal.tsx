"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCardIcon, WalletIcon, DownloadIcon, CheckCircleIcon, ClockIcon } from "lucide-react"

// Mock payment data
const mockBills = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Annual Physical Examination",
    doctor: "Dr. Smith",
    amount: 150,
    status: "pending",
    dueDate: "2024-02-15",
  },
  {
    id: 2,
    date: "2023-12-10",
    description: "Cardiology Consultation",
    doctor: "Dr. Johnson",
    amount: 250,
    status: "paid",
    paidDate: "2023-12-15",
    paymentMethod: "Solana Pay",
  },
]

const mockTransactions = [
  {
    id: 1,
    date: "2023-12-15",
    description: "Cardiology Consultation Payment",
    amount: 250,
    method: "USDC (Solana)",
    txHash: "5KJp7z2X9vQ8mR4nL6wE3tY1sA9cB7dF2gH8jK3mN5pQ6rS4tU7vW9xY1zA2bC3d",
    status: "confirmed",
  },
  {
    id: 2,
    date: "2023-11-20",
    description: "Lab Work Payment",
    amount: 85,
    method: "SOL",
    txHash: "2Bp8x1Y9wR7nM5kL4jE6tY3sA8cB9dF1gH7jK2mN4pQ5rS3tU6vW8xY0zA1bC2d",
    status: "confirmed",
  },
]

export default function PaymentPortal() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"crypto" | "card">("crypto")

  const handlePayBill = (billId: number) => {
    console.log("Paying bill:", billId, "with method:", selectedPaymentMethod)
    // Mock payment processing
  }

  const totalPending = mockBills.filter((bill) => bill.status === "pending").reduce((sum, bill) => sum + bill.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payments & Billing</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your medical bills and payment history</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Pending</p>
          <p className="text-2xl font-bold text-red-600">${totalPending}</p>
        </div>
      </div>

      <Tabs defaultValue="bills" className="space-y-6">
        <TabsList>
          <TabsTrigger value="bills">Outstanding Bills</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="bills" className="space-y-4">
          {mockBills.map((bill) => (
            <Card key={bill.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-lg ${
                        bill.status === "pending"
                          ? "bg-orange-100 dark:bg-orange-900/20"
                          : "bg-green-100 dark:bg-green-900/20"
                      }`}
                    >
                      {bill.status === "pending" ? (
                        <ClockIcon className="h-6 w-6 text-orange-600" />
                      ) : (
                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">{bill.description}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {bill.doctor} • {bill.date}
                      </p>
                      {bill.status === "pending" && <p className="text-sm text-red-600">Due: {bill.dueDate}</p>}
                      {bill.status === "paid" && (
                        <p className="text-sm text-green-600">
                          Paid: {bill.paidDate} via {bill.paymentMethod}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold">${bill.amount}</p>
                      <Badge variant={bill.status === "pending" ? "destructive" : "default"}>{bill.status}</Badge>
                    </div>
                    {bill.status === "pending" && (
                      <div className="flex flex-col gap-2">
                        <Button onClick={() => handlePayBill(bill.id)}>Pay Now</Button>
                        <Button variant="outline" size="sm">
                          Request Extension
                        </Button>
                      </div>
                    )}
                    {bill.status === "paid" && (
                      <Button variant="outline" size="sm">
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{transaction.description}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {transaction.date} • {transaction.method}
                        </p>
                        <p className="text-xs font-mono text-gray-500 dark:text-gray-400">
                          TX: {transaction.txHash.slice(0, 8)}...{transaction.txHash.slice(-8)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">${transaction.amount}</p>
                        <Badge variant="default">{transaction.status}</Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="methods" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Crypto Payment */}
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <WalletIcon className="h-5 w-5 text-blue-600" />
                  Solana Pay
                </CardTitle>
                <CardDescription>Pay with USDC, SOL, or other Solana tokens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Connected Wallet</span>
                    <span className="text-sm font-mono">7xKX...gAsU</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Network</span>
                    <span className="text-sm">Solana Mainnet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Transaction Fee</span>
                    <span className="text-sm text-green-600">~$0.01</span>
                  </div>
                </div>
                <Button className="w-full" variant="default">
                  <WalletIcon className="h-4 w-4 mr-2" />
                  Set as Primary
                </Button>
              </CardContent>
            </Card>

            {/* Traditional Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCardIcon className="h-5 w-5" />
                  Credit/Debit Card
                </CardTitle>
                <CardDescription>Traditional payment via Stripe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Saved Cards</span>
                    <span className="text-sm">None</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Processing Fee</span>
                    <span className="text-sm">2.9% + $0.30</span>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  <CreditCardIcon className="h-4 w-4 mr-2" />
                  Add Card
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Payment Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Preferences</CardTitle>
              <CardDescription>Configure your default payment settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Auto-pay Bills</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automatically pay bills when due using your preferred method
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Payment Notifications</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get notified before bills are due and after payments
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
