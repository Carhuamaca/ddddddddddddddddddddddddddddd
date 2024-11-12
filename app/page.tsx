'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent } from "@/components/ui/card.tsx"
import { ShoppingCart, Star, Menu, Phone, Check, Camera } from "lucide-react"
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
    image: '/placeholder.svg?height=400&width=400',
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
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const paymentSectionRef = useRef(null)

  const captureAndSend = async (productId) => {
    if (paymentSectionRef.current) {
      const canvas = await html2canvas(paymentSectionRef.current)
      const image = canvas.toDataURL("image/png")
      const product = products.find(p => p.id === productId)
      const message = encodeURIComponent(`Hola, quiero comprar el ${product.name}. Adjunto captura del método de pago.`)
      window.open(`https://${product.whatsappLink}`, '_blank')
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

  const toggleMusic = () => {
    if (audioRef.current.paused) {
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#D32F2F]">
      <header className="sticky top-0 z-40 bg-[#D32F2F] shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="relative w-32 h-12">
              <Image
                src="/placeholder.svg?height=48&width=128"
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
                src="/placeholder.svg?height=100&width=100"
                alt="Yape"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <p className="text-center text-xl font-bold text-[#D32F2F] mb-4 font-roboto">
              Yape: +51 922 208 408
            </p>
            <div className="text-center text-[#333333] font-roboto">
              <p className="mb-2">1. Realiza el pago al número indicado</p>
              <p className="mb-2">2. Toma captura de esta sección</p>
              <p>3. Envía la captura por WhatsApp al comprar</p>
            </div>
          </div>
        </section>

        <section id="contacto" className="text-center">
          <h2 className="text-3xl font-lobster mb-6 text-[#D32F2F] fade-in">Contáctanos</h2>
          <p className="text-xl mb-4 text-[#333333] font-roboto">¿Tienes alguna pregunta? ¡Escríbenos por WhatsApp!</p>
          <a
            href="https://wa.link/bbcaud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-[#388E3C] hover:bg-[#2E7D32] rounded-full text-white font-bold transition-colors font-roboto"
          >
            <Phone className="mr-2" />
            Contactar por WhatsApp
          </a>
        </section>
      </main>

      <footer className="bg-[#D32F2F] py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-white font-roboto">
          <p>© 2024 El Rincón de Marita – Hecho con ❤️ y espíritu navideño</p>
        </div>
      </footer>

      <button
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 bg-[#388E3C] hover:bg-[#2E7D32] text-white p-3 rounded-full shadow-lg z-50"
      >
        {isPlaying ? '🔇' : '🔊'}
      </button>

      <audio ref={audioRef} loop>
        <source src="/christmas-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}