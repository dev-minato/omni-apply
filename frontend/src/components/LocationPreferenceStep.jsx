import React, { useState } from 'react';
import { 
  MapPin, 
  Globe, 
  Compass, 
  Check, 
  Plus, 
  X, 
  ChevronRight, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const COMMON_CITIES = [
  'Bangalore, India',
  'Hyderabad, India',
  'Pune, India',
  'Delhi NCR / Gurgaon, India',
  'Mumbai, India',
  'Remote (Worldwide / Anywhere)',
  'San Francisco / Bay Area, US',
  'Seattle, US',
  'New York, US',
  'London, UK',
  'Singapore'
];

export default function LocationPreferenceStep({ initialData, onContinue, onBack }) {
  const [preferenceMode, setPreferenceMode] = useState(initialData?.mode || 'both'); // 'specific' | 'relocate' | 'both'
  const [selectedCities, setSelectedCities] = useState(
    initialData?.cities || ['Bangalore, India', 'Remote (Worldwide / Anywhere)']
  );
  const [customCityInput, setCustomCityInput] = useState('');

  const toggleCity = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter(c => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const handleAddCustomCity = (e) => {
    e.preventDefault();
    if (!customCityInput.trim()) return;
    const clean = customCityInput.trim();
    if (!selectedCities.includes(clean)) {
      setSelectedCities([...selectedCities, clean]);
    }
    setCustomCityInput('');
  };

  const handleProceed = () => {
    onContinue({
      mode: preferenceMode,
      cities: preferenceMode === 'relocate' ? ['Open to Worldwide Relocation'] : selectedCities,
      isOpenToRelocate: preferenceMode === 'relocate' || preferenceMode === 'both'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                Step 4 of 5
              </span>
              <span className="text-xs text-zinc-400">&bull; Location Preferences</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Where Are You Looking to Work?
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Choose whether you are targeting specific cities, open to relocate, or both.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Back
              </button>
            )}
            <button
              onClick={handleProceed}
              className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs sm:text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg active:scale-95"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Core Preference Choices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          {/* Option 1: Specific Locations */}
          <div
            onClick={() => setPreferenceMode('specific')}
            className={`cursor-pointer rounded-2xl border p-6 transition-all flex flex-col justify-between ${
              preferenceMode === 'specific'
                ? 'border-white bg-zinc-900 shadow-lg ring-1 ring-white/20'
                : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 hover:bg-zinc-900/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  preferenceMode === 'specific' ? 'bg-white text-black' : 'bg-zinc-900 border border-zinc-800 text-white'
                }`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  preferenceMode === 'specific' ? 'border-white bg-white text-black' : 'border-zinc-700'
                }`}>
                  {preferenceMode === 'specific' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Specific Locations Only</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Apply exclusively to selected tech hubs and remote jobs in specified timezones.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/80 mt-4 text-[11px] font-mono text-zinc-400">
              Zero unwanted city matches
            </div>
          </div>

          {/* Option 2: Open to Relocate */}
          <div
            onClick={() => setPreferenceMode('relocate')}
            className={`cursor-pointer rounded-2xl border p-6 transition-all flex flex-col justify-between ${
              preferenceMode === 'relocate'
                ? 'border-white bg-zinc-900 shadow-lg ring-1 ring-white/20'
                : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 hover:bg-zinc-900/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  preferenceMode === 'relocate' ? 'bg-white text-black' : 'bg-zinc-900 border border-zinc-800 text-white'
                }`}>
                  <Compass className="w-5 h-5" />
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  preferenceMode === 'relocate' ? 'border-white bg-white text-black' : 'border-zinc-700'
                }`}>
                  {preferenceMode === 'relocate' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Open to Relocate</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Willing to relocate anywhere domestic or globally for top-tier opportunities.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/80 mt-4 text-[11px] font-mono text-zinc-400">
              Maximum opportunity volume
            </div>
          </div>

          {/* Option 3: Both */}
          <div
            onClick={() => setPreferenceMode('both')}
            className={`cursor-pointer rounded-2xl border p-6 transition-all flex flex-col justify-between ${
              preferenceMode === 'both'
                ? 'border-white bg-zinc-900 shadow-lg ring-1 ring-white/20'
                : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 hover:bg-zinc-900/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  preferenceMode === 'both' ? 'bg-white text-black' : 'bg-zinc-900 border border-zinc-800 text-white'
                }`}>
                  <Globe className="w-5 h-5" />
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  preferenceMode === 'both' ? 'border-white bg-white text-black' : 'border-zinc-700'
                }`}>
                  {preferenceMode === 'both' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Both (Preferred + Relocate)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Prioritize preferred cities, but also surface stellar roles offering relocation assistance.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/80 mt-4 text-[11px] font-mono text-emerald-400 font-semibold">
              ★ Recommended for maximum reach
            </div>
          </div>

        </div>

        {/* City Selection Area (shown for 'specific' or 'both') */}
        {(preferenceMode === 'specific' || preferenceMode === 'both') && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 mb-8 animate-in fade-in duration-200">
            <h3 className="text-sm font-bold text-white mb-1">
              Select or Add Your Preferred Locations
            </h3>
            <p className="text-xs text-zinc-400 mb-5">
              Click common tech hubs to add them to your priority filter.
            </p>

            {/* Selected Cities */}
            {selectedCities.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {selectedCities.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 text-white border border-zinc-700"
                  >
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    {city}
                    <button
                      onClick={() => toggleCity(city)}
                      className="text-zinc-400 hover:text-white ml-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Custom City Input */}
            <form onSubmit={handleAddCustomCity} className="flex gap-3 mb-6">
              <input
                type="text"
                value={customCityInput}
                onChange={(e) => setCustomCityInput(e.target.value)}
                placeholder="Add custom city (e.g. Austin, Berlin, Toronto, Tokyo)..."
                className="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-zinc-100 text-black font-bold text-xs hover:bg-white transition-all flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add City
              </button>
            </form>

            {/* Common Cities Chips */}
            <div className="pt-4 border-t border-zinc-900">
              <span className="text-xs font-mono text-zinc-500 block mb-2.5">
                Popular Tech Locations:
              </span>
              <div className="flex flex-wrap gap-2">
                {COMMON_CITIES.map((city) => {
                  const isPicked = selectedCities.includes(city);
                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => toggleCity(city)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
                        isPicked
                          ? 'bg-zinc-800 text-white border border-zinc-600 font-semibold'
                          : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      <span>{city}</span>
                      {isPicked ? <Check className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3 text-zinc-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Bottom CTA */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
          <p className="text-xs text-zinc-500 font-mono">
            {preferenceMode === 'relocate' 
              ? 'Marked as open to all global & relocation-sponsored positions.' 
              : `${selectedCities.length} locations active in your filter.`}
          </p>

          <button
            onClick={handleProceed}
            className="px-8 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl active:scale-95"
          >
            <span>Proceed to LinkedIn Data Import</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
