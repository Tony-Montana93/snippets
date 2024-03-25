import { notFound } from "next/navigation";
import { db } from "@/db";
import Link from "next/link";
import * as actions from '@/actions';

interface SnippetShowPageProps {
    params: {
        id: string
    }
}

export default async function SnippetShowPage(props: SnippetShowPageProps){
    await new Promise((r) => setTimeout(r, 1500));

    const snippet = await db.snippets.findFirst({
        where: {id: parseInt(props.params.id)}
    });

    if (!snippet) {
        return notFound();
    }

    const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

    return <div>
            <div className="flex m-4 justify-between items-center">
                <h1 className="text-xl font-bold">
                    {snippet.title}
                </h1>
                <div className="flex gap-4">
                    <Link href={`/snippets/${snippet.id}/edit`} className="p-2 border rounded">Edit</Link>
                    <Link href={`/`} className="p-2 border rounded">Home</Link>
                    <form action={deleteSnippetAction}>
                        <button className="p-2 border rounded">Delete</button>
                    </form>
                </div>
            </div>
            <pre className="p-3 border rounded bg-gray-200 border-gray-200">
                <code>{snippet.code}</code>
            </pre>
        </div>
}

export async function generateStaticParams() {
    const snippets = await db.snippets.findMany();

    return snippets.map((snippets) => {
        return {
            id: snippets.id.toString(),
        };
    });
}