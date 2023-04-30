import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export async function getStaticPaths() {
  const res = await fetch("https://api.1337co.de/v3/employees", {
    headers: {
      Authorization: process.env.customKey || "",
    },
  });
  const people = await res.json();

  const paths = people.map((person) => ({
    params: { id: person.email.replace(/@.*$/, "") },
  }));

  return { paths, fallback: false };
}

// SSG - static site generation
export async function getStaticProps({ params }) {
  const { id } = params;
  const res = await fetch(
    `https://api.1337co.de/v3/employees?email=${id}@1337.tech`,
    {
      headers: {
        Authorization: process.env.customKey || "",
      },
    }
  );
  const people = await res.json();

  return { props: { people: people[0] } };
}

export default function Person({ people }) {
  const src = `${people.imageWallOfLeetUrl}`;
  const htmlContent = people.mainText;
  return (
    <div className="bg-gray-800 h-screen p-16 text-gray-100 relative">
      <Image
        priority
        src={src || people.imagePortraitUrl || "/images/profile.jpeg"}
        fill
        alt={`portrait of ${people.name}`}
        className="object-cover brightness-50"
      />
      <div className="absolute z-10 text-white">
        <div className="text-center font-bold text-3xl">{people.name}</div>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        <Link
          className=""
          href="/"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
