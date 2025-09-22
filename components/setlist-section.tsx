"use client"

import { useState, useMemo, useEffect, useRef, useCallback } from "react"
import {
  Search,
  Heart,
  Download,
  Copy,
  ExternalLink,
  X,
  ChevronDown,
  ChevronRight,
  Music,
  Sparkles,
  List,
  LayoutGrid,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import type { Song, FilterState, Era, Tempo } from "@/lib/types"
import { parseSetlist } from "@/lib/setlist-parser"
import { cn, preserveScroll } from "@/lib/utils"

interface SetListSectionProps {
  initialSongs?: Song[]
}


const SECTION_MAPPING: Record<string, string[]> = {
  "Party Music / Top 40": ["Pop", "Top 40"],
  "80's / 90's / Rock": ["Rock"],
  "50's / 60's / Motown": ["Motown", "Soul", "Oldies"],
  Standards: ["Jazz Standards"],
  Latin: ["Latin", "Salsa", "Merengue", "Reggaeton", "Pop Latino"],
  Ballads: ["Ballad"],
  "Instrumentals / Jazz": ["Instrumental", "Jazz"],
  "Country / Blues": ["Country", "Blues"],
  "Special Dances": ["Participation"],
}

const SECTION_ORDER = [
  "Party Music / Top 40",
  "80's / 90's / Rock",
  "50's / 60's / Motown",
  "Standards",
  "Latin",
  "Ballads",
  "Instrumentals / Jazz",
  "Country / Blues",
  "Special Dances",
]

type ViewMode = "list" | "grid"

export default function SetListSection({ initialSongs }: SetListSectionProps) {
  const [songs] = useState<Song[]>(() => initialSongs || parseSetlist())
  const [favorites, setFavorites] = useState<string[]>([])
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    eras: [],
    genres: [],
    moments: [],
    sort: "popularity",
  })
  const [viewMode, setViewMode] = useState<ViewMode>(
    () => (typeof window !== "undefined" && (localStorage.getItem("setlist-view-mode") as ViewMode)) || "list",
  )

  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(() => {
    // Always start with all sections collapsed for SSR and initial render
    return new Set(SECTION_ORDER)
  })

  const [collapsedHydrated, setCollapsedHydrated] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const [stickyOffset, setStickyOffset] = useState(96) // Default fallback
  const searchActive = filters.search.trim().length > 0
  const firstMatchRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("setlist-view-mode", viewMode)
    }
  }, [viewMode])

  useEffect(() => {
    if (typeof window !== "undefined" && collapsedHydrated) {
      localStorage.setItem("setlist-collapsed-sections", JSON.stringify(Array.from(collapsedSections)))
    }
  }, [collapsedSections, collapsedHydrated])

  useEffect(() => {
    if (typeof window !== "undefined" && !collapsedHydrated) {
      const saved = localStorage.getItem("setlist-collapsed-sections")
      if (saved) {
        try {
          const savedSections = JSON.parse(saved)
          setCollapsedSections(new Set(savedSections))
        } catch {
          // If parsing fails, keep default (all collapsed)
        }
      }
      setCollapsedSections((prev) => {
        const newSet = new Set(prev)
        newSet.add("50's / 60's / Motown")
        return newSet
      })
      setCollapsedHydrated(true)
    }
  }, [collapsedHydrated])

  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      // Search filter only
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        if (!song.title.toLowerCase().includes(searchTerm) && !song.artist.toLowerCase().includes(searchTerm)) {
          return false
        }
      }

      return true
    })
  }, [songs, filters.search])

  const groupedSongs = useMemo(() => {
    const groups: Record<string, Song[]> = {}

    // Initialize all sections in the correct order
    SECTION_ORDER.forEach((section) => {
      groups[section] = []
    })

    // Group filtered songs into sections
    filteredSongs.forEach((song) => {
      let assigned = false

      // Find the appropriate section for this song
      for (const [section, genres] of Object.entries(SECTION_MAPPING)) {
        if (song.genres.some((genre) => genres.includes(genre))) {
          groups[section].push(song)
          assigned = true
          break
        }
      }

      // If no section found, add to Party Music / Top 40 as default
      if (!assigned) {
        groups["Party Music / Top 40"].push(song)
      }
    })

    // Sort songs within each section only (not globally)
    Object.keys(groups).forEach((section) => {
      groups[section].sort((a, b) => {
        switch (filters.sort) {
          case "alphabetical":
            return a.title.localeCompare(b.title)
          case "decade":
            if (!a.era && !b.era) return 0
            if (!a.era) return 1
            if (!b.era) return -1
            return a.era.localeCompare(b.era)
          case "newest":
            return b.id.localeCompare(a.id)
          case "popularity":
          default:
            return (b.popularity || 3) - (a.popularity || 3)
        }
      })
    })

    // Return only sections that have songs, in the predefined order
    const orderedGroups: Record<string, Song[]> = {}
    SECTION_ORDER.forEach((section) => {
      if (groups[section] && groups[section].length > 0) {
        orderedGroups[section] = groups[section]
      }
    })

    return orderedGroups
  }, [filteredSongs, filters.sort])

  const filteredAndSortedSongs = useMemo(() => {
    // Flatten all grouped songs for grid view and count display
    return Object.values(groupedSongs).flat()
  }, [groupedSongs])

  const toggleFavorite = (songId: string) => {
    setFavorites((prev) => (prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]))
  }

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(section)) {
        newSet.delete(section)
      } else {
        newSet.add(section)
      }
      return newSet
    })
  }


  const clearFavorites = () => {
    setFavorites([])
  }

  const copyFavorites = () => {
    const favoriteSongs = songs.filter((song) => favorites.includes(song.id))
    const text = favoriteSongs.map((song) => `${song.title} - ${song.artist}`).join("\n")
    navigator.clipboard.writeText(text)
  }

  const downloadCSV = () => {
    const favoriteSongs = songs.filter((song) => favorites.includes(song.id))
    const csv = [
      "Title,Artist,Genres,Moments,Era,Tempo",
      ...favoriteSongs.map(
        (song) =>
          `"${song.title}","${song.artist}","${song.genres.join("; ")}","${song.moments.join("; ")}","${song.era || ""}","${song.tempo || ""}"`,
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "setlist-favorites.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const startInquiry = () => {
    const setlistParam = favorites.join(",")
    window.open(`/contact?setlist=${encodeURIComponent(setlistParam)}`, "_blank")
  }

  const favoriteSongs = songs.filter((song) => favorites.includes(song.id))

  const expandAllSections = () => {
    setCollapsedSections(new Set())
  }

  const collapseAllSections = () => {
    const sectionsWithSongs = Object.keys(groupedSongs)
    setCollapsedSections(new Set(sectionsWithSongs))
  }

  const updateStickyOffset = useCallback(() => {
    if (headerRef.current) {
      const height = headerRef.current.getBoundingClientRect().height
      setStickyOffset(height)

      // Set CSS variable for dynamic offset
      document.documentElement.style.setProperty("--setlist-sticky-offset", `${height}px`)
    }
  }, [])

  useEffect(() => {
    updateStickyOffset()

    const handleResize = () => updateStickyOffset()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [updateStickyOffset])


  // Preserve scroll position during search using anchor delta approach
  useEffect(() => {
    if (filters.search.trim().length > 0) {
      preserveScroll(anchorRef)
    }
  }, [filters.search])

  return (
    <div className="bg-charcoal-950 text-stone-50">
      {/* Header */}
      <div ref={headerRef} className="border-b border-stone-800/50 bg-charcoal-950/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* Search and Controls */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500 w-4 h-4" />
                <Input
                  placeholder="Search songs or artists..."
                  value={filters.search}
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                  className="pl-10 bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder:text-stone-400 focus:border-gold-400/50 focus:ring-gold-400/20"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex border border-stone-700/50 rounded-md overflow-hidden">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "rounded-none border-0",
                      viewMode === "list"
                        ? "bg-gold-500 text-charcoal-950 hover:bg-gold-400"
                        : "text-stone-300 hover:bg-charcoal-800/50 hover:text-gold-400",
                    )}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "rounded-none border-0",
                      viewMode === "grid"
                        ? "bg-gold-500 text-charcoal-950 hover:bg-gold-400"
                        : "text-stone-300 hover:bg-charcoal-800/50 hover:text-gold-400",
                    )}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                </div>


              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Anchor element for scroll position preservation */}
        <div ref={anchorRef} aria-hidden className="h-0" />
        
        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-stone-400">
              {filteredAndSortedSongs.length} songs{" "}
              {filters.search
                ? `found${viewMode === "list" ? ` across ${Object.keys(groupedSongs).length} sections` : ""}`
                : "available"}
            </p>

            {viewMode === "list" && Object.keys(groupedSongs).length > 0 && !searchActive && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={expandAllSections}
                  className="text-stone-400 hover:text-gold-400 text-xs"
                >
                  Expand all
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={collapseAllSections}
                  className="text-stone-400 hover:text-gold-400 text-xs"
                >
                  Collapse all
                </Button>
              </div>
            )}
          </div>
        </div>

        {filteredAndSortedSongs.length === 0 ? (
          <Card className="bg-charcoal-800/30 border border-stone-700/30 text-center py-12">
            <CardContent>
              <Music className="w-12 h-12 text-stone-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-stone-50 mb-2">No songs found</h3>
              <p className="text-stone-400 mb-4">Try adjusting your search terms</p>
            </CardContent>
          </Card>
        ) : viewMode === "list" ? (
          <div className="space-y-1">
            {SECTION_ORDER.map((section, sectionIndex) => {
              const sectionSongs = groupedSongs[section]
              if (!sectionSongs || sectionSongs.length === 0) return null

              const isFirstSection = sectionIndex === 0 || section === Object.keys(groupedSongs)[0]
              const isCollapsed = searchActive ? false : collapsedSections.has(section)

              return (
                <div
                  key={section}
                  className="bg-charcoal-800/20 border border-stone-700/30 rounded-lg overflow-hidden"
                  ref={isFirstSection ? firstMatchRef : undefined}
                >
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section)}
                    disabled={searchActive}
                    className={cn(
                      "w-full px-4 py-3 bg-charcoal-800/50 border-b border-stone-700/30 flex items-center justify-between transition-colors z-30",
                      "relative",
                      searchActive ? "cursor-default" : "hover:bg-charcoal-700/50 cursor-pointer",
                    )}
                  >
                    <h3 className="font-medium text-stone-50 text-left">{section}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-stone-400">{sectionSongs.length}</span>
                      {searchActive ? (
                        <Search className="w-4 h-4 text-gold-400" />
                      ) : isCollapsed ? (
                        <ChevronRight className="w-4 h-4 text-stone-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400" />
                      )}
                    </div>
                  </button>

                  {/* Section Songs */}
                  {!isCollapsed && (
                    <div className="divide-y divide-stone-700/30">
                      {sectionSongs.map((song) => (
                        <div
                          key={song.id}
                          className="group flex items-center px-4 py-3 hover:bg-charcoal-800/30 transition-colors min-h-[44px]"
                          title={`${song.title} – ${song.artist}`}
                        >
                          <div className="flex-1 min-w-0 pr-3">
                            <div className="truncate sm:hidden text-sm leading-tight">
                              <div className="line-clamp-2 text-pretty">
                                <span className="font-medium text-stone-50">{song.title}</span>
                                <span className="text-stone-400 ml-1">– {song.artist}</span>
                              </div>
                            </div>
                            <div className="hidden sm:block">
                              <span className="font-medium text-stone-50">{song.title}</span>
                              <span className="text-stone-400 ml-2">– {song.artist}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-sm text-stone-400 hidden sm:block whitespace-nowrap">
                              {song.genres[0]}
                            </span>

                            {/* Favorite button - only visible on hover/focus */}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleFavorite(song.id)}
                              className={cn(
                                "p-1 h-6 w-6 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity flex-shrink-0",
                                favorites.includes(song.id)
                                  ? "text-gold-400 hover:text-gold-400/80 opacity-100"
                                  : "text-stone-400 hover:text-gold-400",
                              )}
                            >
                              <Heart className={cn("w-3 h-3", favorites.includes(song.id) && "fill-current")} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSortedSongs.map((song) => (
              <Card
                key={song.id}
                className="bg-charcoal-800/20 border-stone-700/30 hover:border-gold-500/50 transition-colors group"
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-stone-50 truncate text-balance">{song.title}</h3>
                      <p className="text-sm text-stone-400 truncate">{song.artist}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleFavorite(song.id)}
                      className={cn(
                        "ml-2 p-1 h-8 w-8",
                        favorites.includes(song.id)
                          ? "text-gold-400 hover:text-gold-400/80"
                          : "text-stone-400 hover:text-gold-400",
                      )}
                    >
                      <Heart className={cn("w-4 h-4", favorites.includes(song.id) && "fill-current")} />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {song.genres.slice(0, 2).map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="text-xs bg-stone-700/50 text-stone-300 hover:bg-gold-500/20"
                      >
                        {genre}
                      </Badge>
                    ))}
                    {song.era && (
                      <Badge variant="outline" className="text-xs border-stone-700/50 text-stone-400">
                        {song.era}
                      </Badge>
                    )}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gold-400 hover:text-gold-400/80 hover:bg-gold-400/10 p-0 h-auto"
                      >
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-charcoal-900 border-stone-700/50 text-stone-50">
                      <DialogHeader>
                        <DialogTitle className="text-stone-50">{song.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-1">Artist</h4>
                          <p className="text-stone-400">{song.artist}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Genres</h4>
                          <div className="flex flex-wrap gap-1">
                            {song.genres.map((genre) => (
                              <Badge key={genre} variant="secondary" className="bg-stone-700/50 text-stone-300">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Perfect for</h4>
                          <div className="flex flex-wrap gap-1">
                            {song.moments.map((moment) => (
                              <Badge key={moment} variant="outline" className="border-stone-700/50 text-stone-400">
                                {moment}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {song.era && (
                          <div>
                            <h4 className="font-medium mb-1">Era</h4>
                            <p className="text-stone-400">{song.era}</p>
                          </div>
                        )}
                        {song.tempo && (
                          <div>
                            <h4 className="font-medium mb-1">Tempo</h4>
                            <p className="text-stone-400">{song.tempo}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Favorites Drawer - Mobile */}
      <div className="md:hidden">
        {favorites.length > 0 && (
          <div className="fixed bottom-4 right-4 z-50">
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="bg-gold-500 text-charcoal-950 hover:bg-gold-400 rounded-full w-14 h-14 shadow-lg">
                  <div className="flex flex-col items-center">
                    <Heart className="w-5 h-5 fill-current" />
                    <span className="text-xs font-bold">{favorites.length}</span>
                  </div>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-charcoal-900 border-stone-700/50 text-stone-50">
                <DrawerHeader>
                  <DrawerTitle className="text-stone-50 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold-400" />
                    Your Favorites ({favorites.length})
                  </DrawerTitle>
                </DrawerHeader>
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                  {favoriteSongs.map((song) => (
                    <div key={song.id} className="flex items-center justify-between p-3 bg-charcoal-800/30 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-stone-50 truncate">{song.title}</h4>
                        <p className="text-sm text-stone-400 truncate">{song.artist}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleFavorite(song.id)}
                        className="text-gold-400 hover:text-gold-400/80 p-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-stone-700/50 space-y-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={copyFavorites}
                      variant="outline"
                      className="flex-1 border-stone-700/50 text-stone-300 hover:bg-charcoal-800/50 bg-transparent"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      onClick={downloadCSV}
                      variant="outline"
                      className="flex-1 border-stone-700/50 text-stone-300 hover:bg-charcoal-800/50 bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      CSV
                    </Button>
                  </div>
                  <Button onClick={startInquiry} className="w-full bg-gold-500 text-charcoal-950 hover:bg-gold-400">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Start Inquiry
                  </Button>
                  <Button
                    onClick={clearFavorites}
                    variant="ghost"
                    className="w-full text-stone-400 hover:text-stone-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        )}
      </div>

      {/* Favorites Panel - Desktop */}
      <div className="hidden md:block">
        {favorites.length > 0 && (
          <div className="fixed right-6 top-1/2 transform -translate-y-1/2 w-80 z-50">
            <Card className="bg-charcoal-900 border-stone-700/50 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-stone-50 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold-400" />
                    Your Favorites ({favorites.length})
                  </h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={clearFavorites}
                    className="text-stone-400 hover:text-stone-50 p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
                  {favoriteSongs.map((song) => (
                    <div key={song.id} className="flex items-center justify-between p-2 bg-charcoal-800/30 rounded text-sm">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-stone-50 truncate">{song.title}</p>
                        <p className="text-stone-400 truncate">{song.artist}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleFavorite(song.id)}
                        className={cn(
                          "ml-2 p-1 h-8 w-8",
                          favorites.includes(song.id)
                            ? "text-gold-400 hover:text-gold-400/80"
                            : "text-stone-400 hover:text-gold-400",
                        )}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={copyFavorites}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-stone-700/50 text-stone-300 hover:bg-charcoal-800/50 bg-transparent"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                    <Button
                      onClick={downloadCSV}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-stone-700/50 text-stone-300 hover:bg-charcoal-800/50 bg-transparent"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      CSV
                    </Button>
                  </div>
                  <Button
                    onClick={startInquiry}
                    size="sm"
                    className="w-full bg-gold-500 text-charcoal-950 hover:bg-gold-400"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Start Inquiry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
