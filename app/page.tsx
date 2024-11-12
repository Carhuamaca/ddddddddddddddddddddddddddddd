'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, Check } from "lucide-react"
import html2canvas from 'html2canvas'

gsap.registerPlugin(ScrollTrigger)

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilChristmas())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilChristmas())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  function getTimeUntilChristmas() {
    const christmas = new Date(new Date().getFullYear(), 11, 25)
    if (new Date() > christmas) {
      christmas.setFullYear(christmas.getFullYear() + 1)
    }
    const difference = +christmas - +new Date()
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  return (
    <div className="text-center text-white bg-[#D32F2F] p-4 rounded-lg shadow-lg mb-8">
      <h3 className="text-2xl mb-4 font-lobster">🎄 Cuenta regresiva para Navidad 🎅</h3>
      <div className="flex justify-center space-x-4">
        <div className="bg-white text-[#D32F2F] p-2 rounded-lg">
          <span className="text-2xl font-bold">{timeLeft.days}</span>
          <p>Días</p>
        </div>
        <div className="bg-white text-[#D32F2F] p-2 rounded-lg">
          <span className="text-2xl font-bold">{timeLeft.hours}</span>
          <p>Horas</p>
        </div>
        <div className="bg-white text-[#D32F2F] p-2 rounded-lg">
          <span className="text-2xl font-bold">{timeLeft.minutes}</span>
          <p>Minutos</p>
        </div>
        <div className="bg-white text-[#D32F2F] p-2 rounded-lg">
          <span className="text-2xl font-bold">{timeLeft.seconds}</span>
          <p>Segundos</p>
        </div>
      </div>
    </div>
  )
}

const products = [
  {
    id: 1,
    name: 'Gorro sin adornos',
    price: 6,
    image: 'data:image/jpeg;base64,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',
    whatsappLink: 'wa.link/et77j7',
    features: ['Tela Plush A1', 'Piel de Cordero Sintética Premium', 'Ultra Suave']
  },
  {
    id: 2,
    name: 'Gorro con adornos',
    price: 8,
    image: '/placeholder.svg?height=400&width=400',
    whatsappLink: 'wa.link/bbcaud',
    features: ['Tela Plush A1', 'Piel de Cordero Sintética Premium', 'Adornos Navideños', 'Ultra Suave']
  },
]

export default function Home() {
  const paymentSectionRef = useRef(null)

  const captureAndSend = async (productId: number) => {
    if (paymentSectionRef.current) {
      const canvas = await html2canvas(paymentSectionRef.current)
      canvas.toDataURL("image/png")
      const product = products.find(p => p.id === productId)
      
      if (product) {
        window.open(`https://${product.whatsappLink}`, '_blank')
      } else {
        console.error("Producto no encontrado")
      }
    }
  }

  useEffect(() => {
    gsap.from('.fade-in', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.fade-in',
        start: 'top bottom',
        toggleActions: 'play none none reverse'
      }
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#D32F2F]">
      <header className="sticky top-0 z-40 bg-[#D32F2F] shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="relative w-32 h-12">
              <Image
                src="<blockquote class="imgur-embed-pub" lang="en" data-id="a/wfDSBhH"><a href="//imgur.com/wfDSBhH"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>"
                alt="El Rincón de Marita Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#productos" className="text-white hover:text-[#388E3C] transition-colors font-roboto">Productos</a>
              <a href="#pagos" className="text-white hover:text-[#388E3C] transition-colors font-roboto">Pagos</a>
              <a href="#contacto" className="text-white hover:text-[#388E3C] transition-colors font-roboto">Contacto</a>
            </nav>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-lobster text-center mb-8 text-[#D32F2F]">El Rincón de Marita</h1>
        <CountdownTimer />

        <section id="productos" className="mb-12">
          <h2 className="text-4xl font-lobster text-center mb-8 text-[#D32F2F] fade-in">
            🎄 Nuestros Gorros Navideños Premium 🎄
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="bg-white shadow-xl overflow-hidden group fade-in">
                <CardContent className="p-6">
                  <div className="mb-4 relative overflow-hidden rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-lobster mb-2 text-[#D32F2F]">{product.name}</h3>
                  <div className="mb-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-[#388E3C] mb-1">
                        <Check className="h-4 w-4 mr-2" />
                        <span className="font-roboto">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-3xl font-bold mb-4 text-[#D32F2F] font-roboto">S/ {product.price.toFixed(2)}</p>
                  <Button
                    onClick={() => captureAndSend(product.id)}
                    className="w-full bg-[#388E3C] hover:bg-[#2E7D32] text-white font-bold py-3 px-4 rounded-lg text-center transition-colors duration-300 font-roboto"
                  >
                    Comprar Ahora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="pagos" className="mb-12 bg-[#F5F5F5] p-6 rounded-lg" ref={paymentSectionRef}>
          <h2 className="text-3xl font-lobster text-center mb-8 text-[#D32F2F] fade-in">
            💳 Métodos de Pago
          </h2>
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Image
                src="data:image/png;base64,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"
                alt="Yape"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <p className="text-center text-xl font-roboto">Yape al número: <span className="font-bold text-[#D32F2F]">922208408</span></p>
          </div>
        </section>

        <section id="contacto" className="text-center py-8">
          <h2 className="text-3xl font-lobster mb-4 text-[#D32F2F] fade-in">📞 Contáctanos</h2>
          <p className="text-xl font-roboto mb-6">Para más información puedes llamarnos al:</p>
          <a href="tel:+51922208408" className="text-2xl font-bold text-[#388E3C] hover:underline">+51 922 208 408</a>
        </section>
      </main>
    </div>
  )
}
