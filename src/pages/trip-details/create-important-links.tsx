import { Link2, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface CreateImportantLinkProps {
    closeCreateImportantLink: () => void;
}

export function CreateImportantLink({ closeCreateImportantLink }: CreateImportantLinkProps) {
    const { tripId } = useParams();

    async function createImportantLink(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const title = data.get("title")?.toString();
        const url = data.get("url")?.toString();

        await api.post(`/trips/${tripId}/links`, {
            title,
            url,
        });

        window.document.location.reload();
    }

    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex items-start justify-between">
                        <h2 className="font-semibold text-lg">Cadastrar novo link</h2>
                        <button onClick={closeCreateImportantLink}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>

                    <p className="text-sm text-zinc-400">
                        Todos convidados podem visualizar os links importantes.
                    </p>
                </div>

                <form onSubmit={createImportantLink} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Tag className="text-zinc-400 size-5" />
                        <input
                            required
                            name="title"
                            placeholder="Titulo do link"
                            className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 flex-1">
                            <Link2 className="text-zinc-400 size-5" />
                            <input
                                required
                                name="url"
                                placeholder="URL"
                                className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
                            />
                        </div>
                    </div>

                    <Button variant="primary" size="full" type="submit">
                        Salvar link
                    </Button>
                </form>
            </div>
        </div>
    );
}
