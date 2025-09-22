"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { parseSetlist } from "@/lib/setlist-parser"

export default function ContactPage() {
  const searchParams = useSearchParams()
  const [selectedSongs, setSelectedSongs] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    venue: "",
    message: "",
    setlist: "",
  })

  const songs = parseSetlist()
  const selectedSongDetails = songs.filter((song) => selectedSongs.includes(song.id))

  useEffect(() => {
    const setlistParam = searchParams.get("setlist")
    if (setlistParam) {
      const songIds = setlistParam.split(",")
      setSelectedSongs(songIds)
      setFormData((prev) => ({ ...prev, setlist: setlistParam }))
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form data:", formData)
    alert("Thank you for your inquiry! We'll get back to you soon.")
  }

  return (
    <div className="min-h-screen bg-charcoal-950 text-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-50 mb-4">Bring the Heat</h1>
          <p className="text-lg text-stone-400 text-pretty">
            Ready to make your event unforgettable? Let's discuss your perfect setlist.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-charcoal-800/30 border-stone-700/30">
            <CardHeader>
              <CardTitle className="text-stone-50">Get In Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder:text-stone-400"
                    required
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder:text-stone-400"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder:text-stone-400"
                  />
                  <Input
                    placeholder="Event Date"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder:text-stone-400"
                    required
                  />
                </div>
                <Input
                  placeholder="Venue"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder:text-stone-400"
                />
                <Textarea
                  placeholder="Tell us about your event and any special requests..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder:text-stone-400"
                  rows={4}
                />
                <Button
                  type="submit"
                  className="w-full bg-gold-500 text-charcoal-950 hover:bg-gold-400"
                >
                  Send Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Selected Songs */}
          <Card className="bg-charcoal-800/30 border-stone-700/30">
            <CardHeader>
              <CardTitle className="text-stone-50">Your Selected Songs</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedSongDetails.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedSongDetails.map((song) => (
                    <div key={song.id} className="flex items-center justify-between p-3 bg-charcoal-900/50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-stone-50 truncate">{song.title}</h4>
                        <p className="text-sm text-stone-400 truncate">{song.artist}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {song.genres.slice(0, 2).map((genre) => (
                            <Badge key={genre} variant="secondary" className="text-xs bg-stone-700/50 text-stone-300">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-stone-400 mb-4">No songs selected yet</p>
                  <Button
                    onClick={() => window.open("/#setlist", "_blank")}
                    variant="outline"
                    className="border-stone-700/50 text-stone-300 hover:bg-charcoal-800/50"
                  >
                    Browse Set List
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
