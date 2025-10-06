import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { parse } from "date-fns";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTrip, setEditedTrip] = useState<Trip | undefined>(undefined);
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => {
      const tripData = response.data.trip;
      setTrip(tripData);

      setEventStartAndEndDates({
        from: parse(tripData.starts_at, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", new Date()),
        to: parse(tripData.ends_at, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", new Date()),
      });
    });
  }, [tripId]);

  const displayedDate =
    trip ? format(new Date(trip.starts_at), "d 'de' LLL").concat(" até ").concat(format(new Date(trip.ends_at), "d 'de' LLL")) : null;

  const handleOpenModal = () => {
    setEditedTrip(trip); 
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateTrip = useCallback(async () => {
    if (!editedTrip || !eventStartAndEndDates.from || !eventStartAndEndDates.to) return;

    try {
      await api.put(`/trips/${editedTrip.id}`, {
        destination: editedTrip.destination,
        starts_at: eventStartAndEndDates.from.toISOString(),
        ends_at: eventStartAndEndDates.to.toISOString(),
      });

      setTrip({ ...editedTrip, starts_at: eventStartAndEndDates.from.toISOString(), ends_at: eventStartAndEndDates.to.toISOString() });
      window.document.location.reload(); 
    } catch (error) {
      console.error("Erro ao atualizar viagem:", error);
    }
  }, [editedTrip, eventStartAndEndDates]);

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex item-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary" onClick={handleOpenModal}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900">
            <h3 className="text-lg font-semibold">Alterar local e data</h3>

            <div className="mt-4">
              <label className="block">Destino:</label>
              <input
                type="text"
                value={editedTrip?.destination || ''}
                onChange={(e) => setEditedTrip({ ...editedTrip!, destination: e.target.value })}
                className="mt-2 p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center w-full"
              />
            </div>

            <div className="mt-4 items-center">
              <label className="block">Selecionar datas:</label>
              <DayPicker
                mode="range"
                selected={{
                  from: eventStartAndEndDates.from,
                  to: eventStartAndEndDates.to,
                }}
                onSelect={(dates) => {
                  if (dates?.from && dates?.to) {
                    setEventStartAndEndDates({
                      from: dates.from,
                      to: dates.to,
                    });
                  }
                }}
                classNames={{
                    day: 'w-12 h-12 text-center hover:text-violet-500',
                    today: "text-violet-300 rounded-full border border-violet-300 hover:bg-violet-300 hover:text-violet-900",
                    chevron: "fill-violet-700",
                    day_button: "border-none",
                    range_start: "bg-violet-700 text-white rounded-l-full font-normal",
                    range_middle: "bg-violet-700 text-white font-normal",
                    range_end: "bg-violet-700 text-white rounded-r-full font-normal",
                }}
              />
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleUpdateTrip}>
                Atualizar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
