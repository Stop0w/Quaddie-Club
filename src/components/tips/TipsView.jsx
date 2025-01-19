import { useState } from 'react'
import useStore from '../../store/useStore'

export default function TipsView() {
  const { activeCompetition, races, selectHorse, selectedRaces } = useStore()
  const [useSamePicks, setUseSamePicks] = useState(false)

  const handleHorseSelection = (raceId, horseNumber) => {
    if (!activeCompetition) return
    
    selectHorse(activeCompetition.id, raceId, horseNumber)
    
    if (useSamePicks) {
      // Apply same pick to other competitions with the same race
      const competitionsWithRace = competitions.filter(comp => 
        comp.id !== activeCompetition.id && 
        races[comp.id]?.some(race => race.id === raceId)
      )
      
      competitionsWithRace.forEach(comp => {
        selectHorse(comp.id, raceId, horseNumber)
      })
    }
  }

  if (!activeCompetition) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Please select a competition to view tips
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Tips for {activeCompetition.name}
          </h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-primary-600"
              checked={useSamePicks}
              onChange={(e) => setUseSamePicks(e.target.checked)}
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">
              Use Same Picks
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-6">
        {races[activeCompetition.id]?.map((race) => (
          <div 
            key={race.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {race.name}
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {race.horses.map((horse) => (
                <button
                  key={horse.number}
                  onClick={() => handleHorseSelection(race.id, horse.number)}
                  className={`p-4 rounded-md border ${
                    selectedRaces[activeCompetition.id]?.[race.id] === horse.number
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {horse.number}. {horse.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p>Weight: {horse.weight}</p>
                    <p>Jockey: {horse.jockey}</p>
                    <p>Price: ${horse.price.toFixed(2)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
