import Link from "next/link";
import { db } from "@/db";


export default async function Home() {
  const snippets = await db.snippets.findMany();

  const renderedSnippets = snippets.map((snippets) => {
    return(
      <Link 
        key={snippets.id} 
        href={`/snippets/${snippets.id}`}
        className="flex justify-between items-center p-2 border rounded"
        >
        <div>{snippets.title}</div>
        <div>View</div>
      </Link>
    )
  })

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="border p-2 rounded">New</Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
