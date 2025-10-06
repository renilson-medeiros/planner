import { Calendar, Clock, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface CreateActivityModalProps {
    closereateActivityModal: () => void;
}

export function CreateActivityModal({
    closereateActivityModal
}: CreateActivityModalProps) {
    const { tripId } = useParams();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    async function createActivity(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const title = data.get('title')?.toString();
        const occurs_at = `${date} ${time}`;

        await api.post(`/trips/${tripId}/activities`, {
            title,
            occurs_at
        });

        window.document.location.reload();
    }

    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex items-start justify-between">
                        <h2 className="font-semibold text-lg">Cadastrar atividade</h2>
                        <button onClick={closereateActivityModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>

                    <p className="text-sm text-zinc-400">
                        Todos convidados podem visualizar as atividades.
                    </p>
                </div>

                <form onSubmit={createActivity} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Tag className="text-zinc-400 size-5" />
                        <input
                            required
                            name="title"
                            placeholder="Qual a atividade?"
                            className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 flex-auto">
                            <Calendar className="text-zinc-400 size-5" />
                            <input
                                required
                                type="date"  
                                name="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="text-zinc-400 bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
                            />
                        </div>

                        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 flex-1">
                            <Clock className="text-zinc-400 size-5" />
                            <input
                                required
                                type="time"
                                name="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="text-zinc-400 bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
                            />
                        </div>
                    </div>

                    <Button variant="primary" size="full">
                        Salvar atividade
                    </Button>
                </form>
            </div>
        </div>
    );
}
