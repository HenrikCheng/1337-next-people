import { useRouter } from "next/router";

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
  console.log("🚀 ~ file: [id].js:21 ~ getStaticProps ~ id:", id)
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
  return (
    <div className="bg-gray-800 h-screen p-16 text-gray-100">
      <div className="text-center font-bold text-3xl">{people.name}</div>
      <div className="text-justify my08 text-gray-200">{people.name}</div>
      <div className="text-gray-400">{people.name}</div>
    </div>
  );
}
