"use client"
import { useState, useEffect } from "react"
import { InstallPwaPrompt } from "@/components/pwa/InstallPwaPrompt"
import { InstallPwaPromptIOS } from "@/components/pwa/InstallPwaPromptIOS"

export function InstallPwa() {
  const [deferredPrompt, setDeferredPrompt] = useState<null | {
    prompt: () => void
  }>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  async function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      setShowInstallPrompt(false)
    }
  }

  function handleDismiss() {
    setShowInstallPrompt(false)
  }

  useEffect(() => {
    // check Apple or not
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(isIOSDevice)
    // check app is installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches

    // Logic for navgator support `beforeinstallprompt` (Chrome, Edge...)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      // display suggestion only app not installed
      if (!isStandalone) {
        //@ts-expect-error beforeinstallprompt
        setDeferredPrompt(e)
        setShowInstallPrompt(true)
      }
    }
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      )
    }
  }, [])

  return (
    <div>
      {showInstallPrompt &&
        (isIOS ? (
          <InstallPwaPromptIOS onDismiss={handleDismiss} />
        ) : (
          <InstallPwaPrompt
            onInstall={handleInstall}
            onDismiss={handleDismiss}
          />
        ))}
    </div>
  )
}
