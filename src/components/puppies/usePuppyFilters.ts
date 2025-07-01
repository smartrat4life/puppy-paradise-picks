
import { useState, useEffect, useMemo } from 'react';
import { Puppy } from '@/services/puppyService';

export const usePuppyFilters = (puppies: Puppy[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minWeeks, setMinWeeks] = useState('');
  const [maxWeeks, setMaxWeeks] = useState('');

  // Listen for search events from header
  useEffect(() => {
    const handleHeaderSearch = (event: CustomEvent) => {
      setSearchTerm(event.detail);
    };

    window.addEventListener('headerSearch', handleHeaderSearch as EventListener);
    return () => window.removeEventListener('headerSearch', handleHeaderSearch as EventListener);
  }, []);

  // Calculate age in weeks
  const calculateAgeInWeeks = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks;
  };

  const breeds = useMemo(() => [...new Set(puppies.map(puppy => puppy.breed))], [puppies]);
  const genders = useMemo(() => [...new Set(puppies.map(puppy => puppy.gender))], [puppies]);

  const filteredPuppies = useMemo(() => {
    return puppies.filter(puppy => {
      const matchesSearch = searchTerm === '' || 
        puppy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        puppy.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        puppy.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBreed = selectedBreed === 'all' || puppy.breed === selectedBreed;
      const matchesGender = selectedGender === 'all' || puppy.gender === selectedGender;
      
      const puppyPrice = Number(puppy.price);
      const matchesMinPrice = minPrice === '' || puppyPrice >= Number(minPrice);
      const matchesMaxPrice = maxPrice === '' || puppyPrice <= Number(maxPrice);
      
      const puppyWeeks = calculateAgeInWeeks(puppy.birth_date);
      const matchesMinWeeks = minWeeks === '' || puppyWeeks >= Number(minWeeks);
      const matchesMaxWeeks = maxWeeks === '' || puppyWeeks <= Number(maxWeeks);
      
      return matchesSearch && matchesBreed && matchesGender && matchesMinPrice && matchesMaxPrice && matchesMinWeeks && matchesMaxWeeks;
    });
  }, [puppies, searchTerm, selectedBreed, selectedGender, minPrice, maxPrice, minWeeks, maxWeeks]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedBreed('all');
    setSelectedGender('all');
    setMinPrice('');
    setMaxPrice('');
    setMinWeeks('');
    setMaxWeeks('');
  };

  const hasActiveFilters = Boolean(searchTerm) || selectedBreed !== 'all' || selectedGender !== 'all' || Boolean(minPrice) || Boolean(maxPrice) || Boolean(minWeeks) || Boolean(maxWeeks);

  return {
    searchTerm,
    setSearchTerm,
    selectedBreed,
    setSelectedBreed,
    selectedGender,
    setSelectedGender,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minWeeks,
    setMinWeeks,
    maxWeeks,
    setMaxWeeks,
    breeds,
    genders,
    filteredPuppies,
    hasActiveFilters,
    clearAllFilters,
    calculateAgeInWeeks,
  };
};
