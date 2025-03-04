
import React, { useState } from 'react';
import CheatCard from '@/components/CheatCard';
import { cheats } from '@/data/cheats';
import { Cheat } from '@/types';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Get unique games from cheats
  const games = Array.from(new Set(cheats.map(cheat => cheat.game)));
  
  // Get unique tags from cheats
  const allTags = Array.from(
    new Set(cheats.flatMap(cheat => cheat.tags))
  ).sort();
  
  // Filter cheats based on search query, selected game, and tags
  const filteredCheats = cheats.filter(cheat => {
    const matchesSearch = searchQuery.trim() === '' || 
      cheat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cheat.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGame = selectedGame === '' || cheat.game === selectedGame;
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => cheat.tags.includes(tag));
    
    return matchesSearch && matchesGame && matchesTags;
  });
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  // Handle tag selection/deselection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGame('');
    setSelectedTags([]);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Premium Game Cheats</h1>
        <p className="text-xl text-muted-foreground">
          Browse our selection of high-quality game enhancements to elevate your gaming experience
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="bg-card border rounded-lg p-4 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Filters</h2>
              {(selectedGame || selectedTags.length > 0) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-8 text-muted-foreground hover:text-foreground"
                >
                  Clear
                </Button>
              )}
            </div>
            
            {/* Game Filter */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Game</label>
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger>
                  <SelectValue placeholder="All Games" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Games</SelectItem>
                  {games.map(game => (
                    <SelectItem key={game} value={game}>
                      {game}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Tags Filter */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Features</label>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {allTags.map(tag => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`tag-${tag}`} 
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    />
                    <label 
                      htmlFor={`tag-${tag}`}
                      className="text-sm cursor-pointer"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Mobile Filter */}
          <div className="flex items-center gap-4 mb-6">
            <form onSubmit={handleSearch} className="relative flex-1">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10"
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0"
              >
                <Search size={18} />
              </Button>
            </form>
            
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden gap-2" size="icon">
                  <Filter size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold">Filters</h2>
                    {(selectedGame || selectedTags.length > 0) && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters}
                        className="h-8 text-muted-foreground hover:text-foreground"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  
                  {/* Game Filter */}
                  <div className="mb-6">
                    <label className="text-sm font-medium mb-2 block">Game</label>
                    <Select value={selectedGame} onValueChange={setSelectedGame}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Games" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Games</SelectItem>
                        {games.map(game => (
                          <SelectItem key={game} value={game}>
                            {game}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Tags Filter */}
                  <div className="mb-6">
                    <label className="text-sm font-medium mb-2 block">Features</label>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                      {allTags.map(tag => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`mobile-tag-${tag}`} 
                            checked={selectedTags.includes(tag)}
                            onCheckedChange={() => toggleTag(tag)}
                          />
                          <label 
                            htmlFor={`mobile-tag-${tag}`}
                            className="text-sm cursor-pointer"
                          >
                            {tag}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <SheetClose asChild>
                    <Button className="w-full">Apply Filters</Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Active Filters */}
          {(selectedGame || selectedTags.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedGame && (
                <div className="flex items-center gap-1 bg-secondary text-secondary-foreground py-1 px-3 rounded-full text-sm">
                  <span>{selectedGame}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 p-0" 
                    onClick={() => setSelectedGame('')}
                  >
                    <X size={12} />
                  </Button>
                </div>
              )}
              
              {selectedTags.map(tag => (
                <div 
                  key={tag} 
                  className="flex items-center gap-1 bg-secondary text-secondary-foreground py-1 px-3 rounded-full text-sm"
                >
                  <span>{tag}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 p-0" 
                    onClick={() => toggleTag(tag)}
                  >
                    <X size={12} />
                  </Button>
                </div>
              ))}
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-foreground py-1 px-3 h-auto"
              >
                Clear All
              </Button>
            </div>
          )}
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredCheats.length} {filteredCheats.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          
          {/* Products Grid */}
          {filteredCheats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCheats.map((cheat) => (
                <CheatCard key={cheat.id} cheat={cheat} />
              ))}
            </div>
          ) : (
            <div className="bg-card border rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
