
import { cn } from "@/lib/utils";
import {
  Shield,
  Clock,
  DollarSign,
  CheckCircle,
  Users,
  ArrowRight,
} from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Fund Direct",
      description:
        "No middlemen, no brokers. We make decisions in-house and fund directly from our own capital.",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "Fast Terms",
      description:
        "Submit today, get terms tomorrow. Fast decisions mean you never lose a time-sensitive deal.",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: "Big Deals",
      description:
        "$50K to $20M+ financing capability. We handle deals others can't or won't fund.",
      icon: <DollarSign className="h-6 w-6" />,
    },
    {
      title: "Custom Fit",
      description:
        "MCA, bridge loans, hard money, and hybrid structures tailored to your deal's unique needs.",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "Trusted Partner",
      description:
        "We build lasting relationships with ISOs and repeat clients for ongoing deal flow.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Nationwide",
      description:
        "Licensed and operating across all 50 states. Local expertise, national capability.",
      icon: <ArrowRight className="h-6 w-6" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-gray-200",
        (index === 0 || index === 3) && "lg:border-l border-gray-200",
        index < 3 && "lg:border-b border-gray-200"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-gray-50 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-gray-600">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-300 group-hover/feature:bg-[#5A00E0] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-gray-900">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-600 max-w-xs relative z-10 px-10 font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
};
