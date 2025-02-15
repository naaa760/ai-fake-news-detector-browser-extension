import Image from "next/image";
import Link from "next/link";

// Add these types at the top of the file
interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

// Add the testimonials data
const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    role: "Journalist",
    content: "This extension has transformed how I verify news sources.",
    avatar: "/avatars/john.jpg",
  },
  {
    name: "Jane Smith",
    role: "Educator",
    content: "An essential tool for teaching digital literacy.",
    avatar: "/avatars/jane.jpg",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy-900 text-white py-20">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-6">
              Detect fake news while you browse
            </h1>
            <p className="text-xl mb-8">
              With AI-powered analysis, identify misleading content instantly
              and make informed decisions about the information you consume.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md flex items-center gap-2"
              >
                <Image
                  src="/firefox-logo.svg"
                  alt="Firefox"
                  width={24}
                  height={24}
                />
                Add to Firefox
              </Link>
              <Link
                href="#"
                className="border border-white hover:bg-white/10 px-6 py-3 rounded-md"
              >
                Watch the demo
              </Link>
            </div>
          </div>
          <div className="relative w-[600px] h-[400px]">
            <Image
              src="/hero-illustration.svg"
              alt="AI Detection Illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            How it protects you from misinformation
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <FeatureCard
              title="Real-time Analysis"
              description="Our AI analyzes articles and social media posts as you browse, giving you instant feedback on content reliability."
              icon="/analysis-icon.svg"
            />
            <FeatureCard
              title="Source Verification"
              description="We check the credibility of sources and cross-reference information with trusted fact-checking databases."
              icon="/verify-icon.svg"
            />
            <FeatureCard
              title="Smart Alerts"
              description="Get gentle notifications when you encounter potentially misleading content, with detailed explanations."
              icon="/alert-icon.svg"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Trusted by fact-conscious readers
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Browse with confidence and clarity
          </h2>
          <p className="text-xl mb-8">
            Join thousands of users who make informed decisions with our
            AI-powered fact-checking tool.
          </p>
          <Link
            href="#"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-md inline-block"
          >
            Add to Firefox
          </Link>
        </div>
      </section>
    </main>
  );
}

// Component for feature cards
const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
    <div className="w-12 h-12 mb-4">
      <Image src={icon} alt={title} width={48} height={48} />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Component for testimonial cards
const TestimonialCard = ({ name, role, content, avatar }: Testimonial) => (
  <div className="p-6 rounded-lg bg-white shadow-md">
    <div className="flex items-center gap-4 mb-4">
      <Image
        src={avatar}
        alt={name}
        width={48}
        height={48}
        className="rounded-full"
      />
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-gray-600">{role}</p>
      </div>
    </div>
    <p className="text-gray-700">{content}</p>
  </div>
);
