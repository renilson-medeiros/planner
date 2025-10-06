import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { CreateImportantLink } from "./create-important-links";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface Links {
    id: string;
    title: string;
    url: string;
}

export function ImportantLinks() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { tripId } = useParams();
    const [linksImportant, setLinksImportant] = useState<Links[]>([]);

    useEffect(() => {
        api.get(`/trips/${tripId}/links`)
            .then((response) => setLinksImportant(response.data.links))
            .catch((error) => console.error("Erro ao carregar links:", error));
    }, [tripId]);

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-zinc-100 text-xl">Links importantes</h2>

            <div className="space-y-5">
                {linksImportant.map(link => {
                    return (
                        <div key={link.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-violet-300 hover:text-violet-400 underline">
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.title}
                                    </a>
                                </span>
                            </div>
                            <Link2 className="size-5 text-zinc-400 shrink-0" />
                        </div>
                    );
                })}

            </div>

            <Button onClick={() => setIsModalOpen(true)} variant="secondary" size="full">
                <Plus className="size-5" />
                Cadastrar novo link
            </Button>

            {isModalOpen && 
                <CreateImportantLink closeCreateImportantLink={() => setIsModalOpen(false)} />
            }
        </div>
    );
}
