import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import  { format } from 'date-fns'
import "react-day-picker/style.css";

interface DestinationAndDateStepProps {
    isGuestInputOpen: boolean
    eventStartAndEndDates: DateRange | undefined
    openGuestsInput: () => void
    closeGuestsInput: () => void
    setDestination: (desttination: string) => void
    setEventStartAndEndDates: (date: DateRange | undefined) => void
}

export function DestinationAndDateStep({
    isGuestInputOpen,
    openGuestsInput,
    closeGuestsInput,
    setDestination,
    setEventStartAndEndDates,
    eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to 
  ? format(eventStartAndEndDates.from, "d 'de' LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d 'de' LLL"))
  : null
 
    return (
        <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input 
                disabled={isGuestInputOpen} 
                type="text"
                placeholder="Para onde você vai?" 
                className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
                onChange={event => setDestination(event.target.value)}
              />
            </div>

            <button onClick={openDatePicker} disabled={isGuestInputOpen}  className="flex items-center gap-2 w-60">
              <Calendar className="size-5 text-zinc-400" />
              <span className="text-lg text-zinc-400 w-40 text-left flex-1">
                {displayedDate || 'Quando?'}
              </span>
            </button>

            {isDatePickerOpen && (
              <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
                <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

                  <div className="space-y-2">
                      <div className="flex items-start justify-between">
                          <h2 className="font-semibold text-lg">Selecione a data</h2>
                          <button onClick={closeDatePicker}>
                              <X className="size-5 text-zinc-400" />
                          </button>
                      </div>
                  </div>

                  <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates}
                   classNames={{
                    day: 'w-11 h-11 hover:text-violet-500',
                    today: "text-violet-300 rounded-full border border-violet-300 hover:bg-violet-300 hover:text-violet-900",
                    chevron: "fill-violet-700",
                    day_button: "border-none",
                    range_start: "bg-violet-700 text-white rounded-l-full font-normal",
                    range_middle: "bg-violet-700 text-white font-normal",
                    range_end: "bg-violet-700 text-white rounded-r-full font-normal",
                  }}
                   />

              </div>
            </div>
            )}

            <div className="w-px h-6 bg-zinc-800" />

            {isGuestInputOpen ? (
              <Button onClick={closeGuestsInput} variant="secondary">
                Alterar local/data
                <Settings2 className="size-5" />
              </Button>
            ) : (
              <Button onClick={openGuestsInput} variant="primary">
                Continuar
                <ArrowRight className="size-5" />
              </Button>
            )}
        </div>
    )
}