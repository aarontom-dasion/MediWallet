"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { WalletIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface PatientHeaderProps {
  patient: {
    walletAddress: string
    name: string
  }
}

export default function PatientHeader({ patient }: PatientHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <header className="border-b bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <WalletIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">MyMediWallet</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Patient Portal</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Wallet Address Display */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <WalletIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
                {patient.walletAddress.slice(0, 4)}...{patient.walletAddress.slice(-4)}
              </span>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <UserIcon className="h-4 w-4" />
                  <span className="hidden md:inline">{patient.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <UserIcon className="h-4 w-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOutIcon className="h-4 w-4 mr-2" />
                  Disconnect Wallet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
