"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDownToLine, X } from "lucide-react"
import Image from "next/image"

export function InstallPwaPromptIOS({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className='fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-md'>
      <Card
        key='install-prompt-ios'
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
              <h3 className='font-bold'>{`Installer l'application`}</h3>
              <p className='text-sm text-muted-foreground'>
                {`Cliquez sur l'icôn`}e{" "}
                <ArrowDownToLine className='inline h-4 w-4 mx-1' />
                {`puis "Ajouter à l'écran d'accueil".`}
              </p>
            </div>
            <Button variant='ghost' size='sm' onClick={onDismiss}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
