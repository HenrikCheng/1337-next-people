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
      Authorization:
        "api-key 14:2023-04-05:henrik.cheng@1337.tech 1818628c1a0136bfe3d4f2146c9789fe008bc3d7dfbe7d4b923c6eac5d63c024",
    },
  });
  const data = await res.json();
  return {
    props: { data },
  };
}

export default function Home({ data }: { data: Person[] }) {
  // Client side rendering
  // const fetcher = (url: string) =>
  //   axios
  //     .get(url, {
  //       headers: {
  //         Authorization:
  //           "api-key 14:2023-04-05:henrik.cheng@1337.tech 1818628c1a0136bfe3d4f2146c9789fe008bc3d7dfbe7d4b923c6eac5d63c024",
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
          <li key={person.name} className="m-4">
            <Link href={`/person/${person.email.replace(/@.*$/, "")}`}>
              {person.imagePortraitUrl && (
                <Image
                  priority
                  src={person.imagePortraitUrl || "/images/profile.jpeg"}
                  height={256}
                  width={256}
                  alt={`portrait of ${person.name}`}
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
