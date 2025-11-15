"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const About = () => {
  return (
    <main className="p-6">
      <section className="max-w-6xl mx-auto">
        {/* Header / Hero */}
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl bg-linear-to-b from-[#0a0a0a] via-[#111111] p-8 md:p-12 mb-8 border border-neutral-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
                Muhammad <span className="text-amber-400">Mustajab</span>
              </h1>
              <p className="mt-3 text-neutral-300 text-sm md:text-base font-medium bg-white/5 inline-block rounded-md px-3 py-1">
                Self-taught Full-Stack Web Developer — Faisalabad • Open to
                on-site & remote work
              </p>

              <p className="mt-6 text-neutral-300 text-base md:text-lg max-w-3xl leading-relaxed">
                I spend most of my time <strong>writing code</strong>, solving
                problems, and exploring how <em>small habits</em> lead to
                meaningful results. I care about building web apps that are{" "}
                <strong>fast, minimal, and human-centered</strong> — and I enjoy
                sharpening problem-solving skills through data structures and
                algorithms.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:mustajab.work@gmail.com"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  📩 Email
                </a>
                <Link
                  href="https://github.com/mustajabwork"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  💻 GitHub
                </Link>
                <Link
                  href="https://www.linkedin.com/in/muhammad-mustajab-24296b396"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  💼 LinkedIn
                </Link>
              </div>

              <div className="mt-6 text-sm text-neutral-400 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  • Born: <strong>4 July 2008</strong>
                </div>
                <div>
                  • Location: <strong>Faisalabad, Pakistan</strong>
                </div>
                <div>
                  • Currently:{" "}
                  <strong>1st year ICS (second time) — Punjab College</strong>
                </div>
                <div>
                  • Started programming: <strong>September 2021</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-end">
              <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-2xl ring-4 ring-neutral-700/40 overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] shadow-xl">
                <Image
                  src="/personal/me3.png"
                  alt="Mustajab avatar"
                  fill
                  sizes="(max-width: 768px) 150px, 224px"
                  style={{ objectFit: "cover" }}
                  className="blur-xs hover:blur-none transition-all"
                />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Core Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Skills & What I Do */}
          <aside className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-neutral-900/60 p-6 shadow-inner border border-neutral-800"
            >
              <h2 className="text-xl font-semibold mb-3 text-white">
                Skills & Tools
              </h2>
              <p className="text-sm text-neutral-400 mb-4">
                A practical full-stack skillset focused on building performant
                and accessible web experiences.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "React.js",
                  "Next.js",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "Mongoose",
                  "TailwindCSS",
                  "Framer Motion",
                  "NPM Libraries",
                  "AI Integration",
                  "Git",
                  "Vercel/Netlify",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center justify-center rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="rounded-2xl bg-gradient-to-br from-[#1c1c1c]/80 to-[#0e0e0e]/70 p-6 shadow-2xl border border-neutral-800"
            >
              <h2 className="text-xl font-semibold mb-3 text-white">
                What I Actually Do
              </h2>
              <ul className="list-disc list-inside text-neutral-300 space-y-2 text-sm">
                <li>
                  Build web applications that are{" "}
                  <strong>simple, fast, and user-focused</strong>.
                </li>
                <li>
                  Practice <strong>data structures & algorithms</strong> to
                  sharpen performance thinking.
                </li>
                <li>
                  Explore developer tooling, <strong>automation</strong>, AI
                  integrations, and better coding workflows.
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white/5 rounded-lg text-sm font-medium hover:bg-white/10 transition"
                >
                  LeetCode
                </a>
                <a
                  href="https://github.com/mustajabwork"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white/5 rounded-lg text-sm font-medium hover:bg-white/10 transition"
                >
                  Projects on GitHub
                </a>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white/5 rounded-lg text-sm font-medium hover:bg-white/10 transition"
                >
                  Live on Vercel / Netlify
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="rounded-2xl bg-neutral-900/50 p-6 border border-neutral-800"
            >
              <h2 className="text-xl font-semibold mb-3 text-white">
                Where You Can Find My Work
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-300">
                <div>
                  <div className="font-medium text-white">GitHub</div>
                  <a
                    href="https://github.com/mustajabwork"
                    target="_blank"
                    className="text-amber-400 underline"
                  >
                    github.com/mustajabwork
                  </a>
                </div>
                <div>
                  <div className="font-medium text-white">LinkedIn</div>
                  <a
                    href="https://www.linkedin.com/in/muhammad-mustajab-24296b396"
                    target="_blank"
                    className="text-amber-400 underline"
                  >
                    linkedin.com/in/muhammad-mustajab-24296b396
                  </a>
                </div>
                <div>
                  <div className="font-medium text-white">Typing</div>
                  <div>
                    TypeRacer — <span className="font-semibold">100+ WPM</span>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-white">Social</div>
                  <div>X (Twitter) — casual tech updates</div>
                </div>
              </div>
            </motion.div>

            {/* Background / Story */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.14 }}
              className="rounded-2xl bg-linear-to-br from-[#141414]/70 to-[#0e0e0e]/60 p-6 border border-neutral-800"
            >
              <h2 className="text-xl font-semibold mb-3 text-white">
                Background
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                I started programming in <strong>September 2021</strong>. I
                spent the first 12 years of my life in Sangla Hill before moving
                to Faisalabad. I come from a family of doctors — but I
                discovered my passion for technology and building things. One of
                my favorite hobbies was raising hens; at one point, I had nearly
                40.
              </p>

              <div className="mt-4 text-sm text-neutral-400 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <strong>Full name:</strong> Muhammad Mustajab
                </div>
                <div>
                  <strong>Religion:</strong> Islam
                </div>
                <div>
                  <strong>Siblings:</strong> Four elder siblings (one brother
                  passed away — RIP)
                </div>
                <div>
                  <strong>Education:</strong> 1st year ICS (second time) —
                  Punjab College
                </div>
              </div>
            </motion.section>
          </aside>

          {/* Right column: Contact / CTA / Quick Info */}
          <aside className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl p-6 bg-neutral-900/60 border border-neutral-800 backdrop-blur-xl shadow-xl relative top-0 lg:sticky lg:top-12"
            >
              <h3 className="text-lg font-semibold mb-2 text-white">
                Contact & Quick Links
              </h3>
              <p className="text-sm text-neutral-400 mb-4">
                Open to on-site and remote work. Quick links to connect or
                explore my projects.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="mailto:mustajab.work@gmail.com"
                  target="_blank"
                  className="w-full text-center px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-500 transition"
                >
                  Email Me
                </a>
                <Link
                  href="https://github.com/mustajabwork"
                  target="_blank"
                  className="w-full text-center px-4 py-2 rounded-lg border border-neutral-700 hover:bg-white/5 transition"
                >
                  View GitHub
                </Link>
                <Link
                  href="https://www.linkedin.com/in/muhammad-mustajab-24296b396"
                  target="_blank"
                  className="w-full text-center px-4 py-2 rounded-lg border border-neutral-700 hover:bg-white/5 transition"
                >
                  View LinkedIn
                </Link>
              </div>

              <div className="mt-4 text-xs text-neutral-500">
                <div>
                  Availability: <strong>Open to work — on-site & remote</strong>
                </div>
                <div className="mt-2">
                  Preferred roles: Full-Stack Developer, Frontend Engineer, Web
                  App Developer
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="rounded-2xl p-6 bg-linear-to-tr from-[#141414]/80 to-[#0e0e0e]/70 border border-neutral-800"
            >
              <h3 className="text-lg font-semibold mb-2 text-white">
                Stats & Fun Facts
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-amber-400">100+</div>
                  <div className="text-xs text-neutral-300">
                    WPM (TypeRacer)
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-amber-400">
                    Sept 2021
                  </div>
                  <div className="text-xs text-neutral-300">Started coding</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-amber-400">~40</div>
                  <div className="text-xs text-neutral-300">
                    Hens(once owned)
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-amber-400">
                    Faisalabad
                  </div>
                  <div className="text-xs text-neutral-300">Home</div>
                </div>
              </div>
            </motion.div>
          </aside>
        </div>

        {/* Footer CTA */}
        <footer className="mt-12 p-6 rounded-2xl bg-linear-to-l from-[#141414]/70 to-[#0e0e0e]/60 border border-neutral-800 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h4 className="text-lg font-semibold text-white">
              Want to collaborate or chat about a project?
            </h4>
            <p className="text-sm text-neutral-400 mt-2">
              I’m always open to connecting with people who build, write, or
              think about technology.
            </p>

            <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
              <a
                href="mailto:mustajab.work@gmail.com"
                target="_blank"
                className="px-5 py-2 rounded-full bg-amber-400 text-black font-semibold hover:bg-amber-500 transition"
              >
                Email — mustajab.work@gmail.com
              </a>
              <Link
                href="https://mustajab-portfolio-v1.vercel.app/"
                target="_blank"
                className="px-5 py-2 rounded-full border border-neutral-700 hover:bg-white/5 transition"
              >
                View Projects
              </Link>
            </div>

            <p className="mt-4 text-xs text-neutral-500">
              © {new Date().getFullYear()} Muhammad Mustajab — Full-Stack Web
              Developer
            </p>
          </motion.div>
        </footer>
      </section>
    </main>
  );
};

export default About;
