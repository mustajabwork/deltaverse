import { Noto_Nastaliq_Urdu } from "next/font/google";
import Image from "next/image";

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});

const Home = () => {
  return (
    <main className="flex flex-col gap-8 justify-center items-center min-h-screen w-full p-6">
      <h1 className="font-extralight text-center text-neutral-200 w-1/2">
        “All my changes, all my chapters — they live here.”
      </h1>
      <h2
        className={`${notoNastaliqUrdu.className} flex flex-col gap-12 text-2xl font-bold text-center text-amber-400`}
      >
        <span>مجھے کچھ نہ کچھ تو آگے بڑھنا ہے</span>
        <span>ورنہ ہر دن ذلالت ہے۔</span>
      </h2>
    </main>
  );
};

export default Home;
