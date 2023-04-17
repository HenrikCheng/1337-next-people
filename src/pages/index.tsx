import useSWR from "swr";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization:
            "api-key 14:2023-04-05:henrik.cheng@1337.tech 1818628c1a0136bfe3d4f2146c9789fe008bc3d7dfbe7d4b923c6eac5d63c024",
        },
      })
      .then((res) => res.data);

  const { data } = useSWR("https://api.1337co.de/v3/employees", fetcher);
  if (!data) return <div>loading...</div>;
  console.log("🚀 ~ file: index.tsx:52 ~ Home ~ data:", data);

  return (
    <main>
      <h1>Fellowship of the 1337</h1>
      <ul className="flex flex-row flex-wrap">
        {data.map((person: any) => (
          <li key={person.name} className="m-4">
            <a href="www.google.se">
              <Image
                priority
                src={person.imagePortraitUrl || "/images/profile.jpeg"}
                height={256}
                width={256}
                alt={`portrait of ${person.name}`}
              />
              {person.name}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
