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
    image: 'https://http2.mlstatic.com/D_NQ_NP_774170-MLA78523240162_082024-O.webp',
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
                src="https://i.imgur.com/VqOfz4q.png"
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
            <p className="text-center text-xl font-roboto">Yape al número: <span className="font-bold text-[#D32F2F]">990382054</span></p>
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
