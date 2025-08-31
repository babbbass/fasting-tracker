"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"
import Image from "next/image"

type InstallPwaPromptProps = {
  onInstall: () => void
  onDismiss: () => void
}

export function InstallPwaPrompt({
  onInstall,
  onDismiss,
}: InstallPwaPromptProps) {
  return (
    <div className='fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-md'>
      <Card
        key='install-prompt'
        className='shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-500'
      >
        <CardContent className='p-4'>
          <div className='flex items-center gap-4'>
            <Image
              src='/icons/icon-192x192.png'
              alt='App Icon'
              className='h-12 w-12'
            />

            <div className='flex-grow'>
              <h3 className='font-bold'>{`Installer l'application ?`}</h3>
              <p className='text-sm text-muted-foreground'>
                {`Ajoutez-la à votre écran d'accueil pour un accès rapide et hors ligne.`}
              </p>
            </div>

            <div className='flex gap-2'>
              <Button size='sm' onClick={onInstall}>
                <Download className='h-4 w-4' />
              </Button>
              <Button variant='ghost' size='sm' onClick={onDismiss}>
                <X className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
