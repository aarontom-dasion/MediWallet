"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircleIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const SUPPORTED_WALLETS = [{ name: "Phantom", icon: "👻", popular: true }]

export default function PatientLogin() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const router = useRouter()
  const { select, connect, publicKey, signMessage } = useWallet()

  const handleWalletConnect = async (walletName: string) => {
    setIsConnecting(true)
    setSelectedWallet(walletName)
    try {
      select(walletName)
      await connect()
      if (!publicKey || !signMessage) throw new Error("Wallet not ready")
      const message = "Authenticate with MyMediWallet"
      const encodedMessage = new TextEncoder().encode(message)
      const signature = await signMessage(encodedMessage)
      const res = await fetch("/api/auth/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicKey: publicKey.toString(),
          message,
          signature: Array.from(signature),
        }),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        localStorage.setItem("session", data.token)
        localStorage.setItem("wallet", publicKey.toString())
        router.push("/patient/dashboard")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Connect Your Solana Wallet</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your wallet address serves as your secure, anonymous patient ID
        </p>
      </div>

      <div className="grid gap-3">
        {SUPPORTED_WALLETS.map((wallet) => (
          <Button
            key={wallet.name}
            variant="outline"
            className="h-14 justify-start gap-3 relative bg-transparent"
            onClick={() => handleWalletConnect(wallet.name)}
            disabled={isConnecting}
          >
            <span className="text-2xl">{wallet.icon}</span>
            <div className="flex-1 text-left">
              <div className="font-medium">{wallet.name}</div>
              {wallet.popular && <div className="text-xs text-blue-600 dark:text-blue-400">Popular</div>}
            </div>
            {isConnecting && selectedWallet === wallet.name && (
              <div className="absolute right-3">
                <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full" />
              </div>
            )}
          </Button>
        ))}
      </div>

      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Secure & Anonymous</p>
              <p className="text-blue-700 dark:text-blue-300">
                We never store your private keys. Your wallet signature authenticates you while keeping your identity
                pseudonymous.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
