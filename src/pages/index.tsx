import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

type Person = {
  email: string;
  area: string | null;
  gitHub: string | null;
  highlighted: boolean;
  imagePortraitUrl: string;
  imageWallOfLeetUrl: string | null;
  linkedIn: string | null;
  mainText: string | null;
  manager: string | null;
  name: string;
  office: string | null;
  orgUnit: string | null;
  phoneNumber: string | null;
  primaryRole: string | null;
  published: string | null;
  secondaryRole: string | null;
  stackOverflow: string | null;
  twitter: string | null;
};

//Server side rendering
export async function getServerSideProps() {
  const res = await fetch(`https://api.1337co.de/v3/employees`, {
    headers: {
      Authorization: process.env.customKey || "",
    },
  });
  const data = await res.json();
  return {
    props: { data },
  };
}

export default function Home({ data }: { data: Person[] }) {
  console.log("🚀 ~ file: index.tsx:41 ~ Home ~ data:", data);
  // Client side rendering
  // const fetcher = (url: string) =>
  //   axios
  //     .get(url, {
  //       headers: {
  //        Authorization: process.env.customKey || "",
  //       },
  //     })
  //     .then((res) => res.data);

  // const { data } = useSWR("https://api.1337co.de/v3/employees", fetcher);

  // if (!data) return <div>loading...</div>;

  // SSR = getservicesideprops

  return (
    <main>
      <h1>Fellowship of the 1337</h1>
      <ul className="flex flex-row flex-wrap">
        {data.map((person) => (
          <li
            key={person.name}
            className="m-4 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-150"
          >
            <Link
              className="flex flex-col justify-between h-full"
              href={`/person/${person.email.replace(/@.*$/, "")}`}
            >
              {person.imagePortraitUrl && (
                <Image
                  priority
                  src={person.imagePortraitUrl || "/images/profile.jpeg"}
                  height={256}
                  width={256}
                  alt={`portrait of ${person.name}`}
                  className="grow object-cover"
                />
              )}
              {person.name}

            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
