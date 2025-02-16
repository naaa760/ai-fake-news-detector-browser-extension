import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Shield,
  Zap,
  Brain,
  Share2,
  CheckCircle,
  Chrome,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import img3 from "../../public/img3.png";
import { MotionDiv, MotionH1 } from "@/components/motion";
import { FlowingBackground } from "@/components/ui/flowing-background";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] bg-gradient-to-b from-[#0D0D0D] via-[#1A1410] to-[#0D0D0D]">
      <FlowingBackground />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white/30 rounded-full animate-ping" />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />

      <header className="container relative mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">TruthGuard AI</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#features" className="text-white/90 hover:text-white">
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-white/90 hover:text-white"
            >
              How it Works
            </Link>
            <Button
              variant="outline"
              className="border-white/20 bg-[#1A1410] text-white hover:bg-[#2A1F1A] hover:text-white"
            >
              Install Extension
            </Button>
          </div>
        </nav>
      </header>

      <main className="relative">
        <section className="container mx-auto px-4 py-20">
          <div className="relative">
            <div className="absolute -inset-1 bg-white/5 blur-3xl rounded-3xl" />
            <div className="relative grid items-center gap-12 lg:grid-cols-2">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left"
              >
                <Badge
                  variant="outline"
                  className="mb-4 border-white/20 bg-[#1A1410] text-white hover:scale-105 transition-transform"
                >
                  AI-Powered Fake News Detection
                </Badge>
                <MotionH1
                  className="mb-6 text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Detect Fake News in Real-Time with AI
                </MotionH1>
                <p className="mb-8 text-xl text-white/90">
                  Your intelligent companion for navigating the truth in the
                  digital age. Instantly analyze and verify news articles with
                  cutting-edge AI technology.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <MotionDiv
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="relative overflow-hidden bg-white/10 text-white hover:bg-white/20 transition-all duration-300 group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      <Chrome className="mr-2 h-5 w-5" />
                      Add to Chrome
                    </Button>
                  </MotionDiv>
                  <MotionDiv
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 bg-[#1A1410]/50 text-white hover:bg-[#2A1F1A] transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </MotionDiv>
                </div>
              </MotionDiv>
              <MotionDiv
                className="flex justify-center lg:justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-white/20 via-white/30 to-white/20 opacity-20 blur-lg"></div>
                  <MotionDiv
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src={img3}
                      alt="AI Detection Interface"
                      width={600}
                      height={400}
                      className="relative w-full max-w-[600px]"
                      priority
                    />
                  </MotionDiv>
                </div>
              </MotionDiv>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid gap-8 rounded-2xl border border-white/20 bg-[#1A1410]/30 p-8 backdrop-blur-sm md:grid-cols-3">
              <div className="text-center">
                <h3 className="mb-2 text-3xl font-bold text-white">99%</h3>
                <p className="text-white/80">Detection Accuracy</p>
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-3xl font-bold text-white">50K+</h3>
                <p className="text-white/80">Active Users</p>
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-3xl font-bold text-white">1M+</h3>
                <p className="text-white/80">Articles Analyzed</p>
              </div>
            </div>
          </MotionDiv>
        </section>

        <section id="features" className="container mx-auto px-4 py-20">
          <MotionH1
            className="mb-12 text-center text-3xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Powerful Features
          </MotionH1>
          <div className="grid gap-8 md:grid-cols-2">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flip-card"
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <Image
                    src="/img.png"
                    alt="AI Detection Feature"
                    width={500}
                    height={300}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
                <div className="flip-card-back">
                  <h3 className="text-2xl font-bold mb-4">
                    Real-Time Analysis
                  </h3>
                  <p className="text-white/90">
                    Instant verification of news articles as you browse,
                    providing immediate insights into content credibility.
                  </p>
                </div>
              </div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flip-card"
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <Image
                    src="/img1.png"
                    alt="AI Detection Feature"
                    width={500}
                    height={300}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
                <div className="flip-card-back">
                  <h3 className="text-2xl font-bold mb-4">
                    AI-Powered Detection
                  </h3>
                  <p className="text-white/90">
                    Advanced machine learning algorithms trained on millions of
                    articles to identify fake news patterns.
                  </p>
                </div>
              </div>
            </MotionDiv>
          </div>
        </section>

        <section id="how-it-works" className="container mx-auto px-4 py-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full border border-white/20 bg-[#1A1410]/30 p-4 backdrop-blur-sm">
                <Chrome className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Install Extension
              </h3>
              <p className="text-white/80">
                Add TruthGuard AI to your Chrome browser with one click.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full border border-white/20 bg-[#1A1410]/30 p-4 backdrop-blur-sm">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Browse Normally
              </h3>
              <p className="text-white/80">
                Continue browsing news sites while we analyze content in
                real-time.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full border border-white/20 bg-[#1A1410]/30 p-4 backdrop-blur-sm">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Get Insights
              </h3>
              <p className="text-white/80">
                Receive instant verification and credibility scores for
                articles.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="relative rounded-2xl border border-white/20 bg-[#1A1410]/30 p-12 text-center backdrop-blur-sm">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-white/20 via-white/30 to-white/20 opacity-10 blur-lg"></div>
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold text-white">
                Start Detecting Fake News Today
              </h2>
              <p className="mx-auto mb-8 max-w-[600px] text-white/80">
                Join thousands of users who trust TruthGuard AI to help them
                navigate the truth online.
              </p>
              <Button
                size="lg"
                className="bg-white/10 text-white hover:bg-white/20"
              >
                <Chrome className="mr-2 h-5 w-5" />
                Install TruthGuard AI
              </Button>
            </div>
          </div>
        </section>

        <section className="advice-section">
          <div className="floating-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>

          <div className="advice-container">
            <div className="advice-content">
              <div className="advice-badge group transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-2">
                  <span className="inline-block animate-pulse">💡</span>
                  <span className="relative">
                    ADVICE
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </span>
              </div>

              <h2 className="relative">
                Get guidance from the experts
                <span className="absolute -right-4 -top-4 h-8 w-8 animate-ping rounded-full bg-white/5"></span>
              </h2>

              <p className="relative z-10 backdrop-blur-sm">
                Level-up your money management with real-time insights from AI
                plus expert human guidance on topics ranging from investing to
                retirement.
              </p>

              <button className="advice-button group">
                <span className="relative z-10 flex items-center gap-2">
                  LEARN MORE ABOUT ADVICE
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
            </div>

            <div className="advice-video">
              <video
                className="rounded-lg shadow-xl"
                playsInline
                muted
                autoPlay
                loop
                src="/vid.mp4"
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-white/60 sm:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span>© 2024 TruthGuard AI. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
