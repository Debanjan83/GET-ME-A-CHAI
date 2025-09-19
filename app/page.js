import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="flex flex-col gap-6 justify-center items-center text-white h-[60vh] px-8 md:px-0 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold flex gap-3 justify-center items-center md:mt-14">
          Get Me A Chai
          <span>
            <img className="invertImg" src="tea.gif" width={88} alt="chai logo" />
          </span>
        </h1>
        <p className="max-w-2xl text-gray-300">
          A crowdfunding platform for creators. Get funded by your fans and
          followers.
        </p>
        <p className="max-w-2xl text-gray-300">
          A place where your fans can buy you a chai. Unleash the power of your
          fans and get your project funded.
        </p>
        <div className="flex gap-3 mt-4 flex-wrap justify-center">
          <Link href="/login">
            <button className="text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-3 cursor-pointer transition">
              Start Here
            </button>
          </Link>
          <Link href="/about">
            <button className="text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-3 cursor-pointer transition">
              Read More
            </button>
          </Link>
        </div>
      </section>

      <div className="bg-white h-[1px] opacity-20"></div>

      <section className="text-white container mx-auto py-20 px-6 md:px-0">
        <h2 className="text-3xl md:text-4xl text-center mb-16 font-bold">
          Your Fans Can Buy You a Chai
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="item space-y-4 flex flex-col justify-center items-center text-center">
            <img
              className="bg-slate-700 rounded-full p-4 shadow-md"
              width={88}
              src="/man.gif"
              alt="fans help"
            />
            <p className="font-bold text-lg">Your fans want to help</p>
            <p className="text-gray-300 text-sm">
              Your fans are always here to support your journey.
            </p>
          </div>
          <div className="item space-y-4 flex flex-col justify-center items-center text-center">
            <img
              className="bg-slate-700 rounded-full p-4 shadow-md"
              width={88}
              src="/coin.gif"
              alt="fans donate"
            />
            <p className="font-bold text-lg">Funding made simple</p>
            <p className="text-gray-300 text-sm">
              Receive chai (donations) from your community with ease.
            </p>
          </div>
          <div className="item space-y-4 flex flex-col justify-center items-center text-center">
            <img
              className="bg-slate-700 rounded-full p-4 shadow-md"
              width={88}
              src="/group.gif"
              alt="community"
            />
            <p className="font-bold text-lg">Build your community</p>
            <p className="text-gray-300 text-sm">
              Strengthen bonds with the people who believe in you.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-white h-[1px] opacity-20"></div>

      <section className="text-white container mx-auto py-20 flex flex-col justify-center items-center px-6">
        <h2 className="text-3xl md:text-4xl text-center mb-12 font-bold">
          Learn More About Us
        </h2>
        <div className="max-w-3xl space-y-6 text-center">
          <p className="text-gray-300 text-lg leading-relaxed">
            <span className="font-semibold text-white">Get Me A Chai</span> is a
            crowdfunding platform built for creators, dreamers, and innovators.
            Whether you&apos;re an artist, developer, writer, or educator, you can
            connect with your fans and receive their support directly.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            We believe small contributions can make a big difference. That&apos;s why
            we created a simple way for fans to “buy you a chai” — a token of
            appreciation that helps you keep doing what you love.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Our mission is to empower communities, support creativity, and turn
            passion into impact. Join us and start your journey today!
          </p>
          <Link href="/about">
            <button className="text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-3 cursor-pointer transition">
              Discover More
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
