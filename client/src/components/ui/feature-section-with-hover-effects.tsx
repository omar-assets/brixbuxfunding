
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
      icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Fast Terms",
      description:
        "Submit today, get terms tomorrow. Fast decisions mean you never lose a time-sensitive deal.",
      icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Big Deals",
      description:
        "$50K to $20M+ financing capability. We handle deals others can't or won't fund.",
      icon: <DollarSign className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Custom Fit",
      description:
        "MCA, bridge loans, hard money, and hybrid structures tailored to your deal's unique needs.",
      icon: <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Trusted Partner",
      description:
        "We build lasting relationships with ISOs and repeat clients for ongoing deal flow.",
      icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      title: "Nationwide",
      description:
        "Licensed and operating across all 50 states. Local expertise, national capability.",
      icon: <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative z-10 py-4 xs:py-6 sm:py-8 md:py-8 lg:py-10 max-w-7xl mx-auto gap-3 xs:gap-4 sm:gap-4 lg:gap-0 mobile-grid-1 tablet-grid-2 tablet-lg-grid-3">
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
        "flex flex-col py-4 xs:py-5 sm:py-6 md:py-8 lg:py-10 relative group/feature border-gray-200",
        "sm:border-r lg:border-r",
        (index === 0 || index === 3) && "sm:border-l lg:border-l border-gray-200",
        index < 3 && "sm:border-b lg:border-b border-gray-200",
        // Mobile spacing with better touch targets
        "px-3 xs:px-4 sm:px-4 md:px-6 lg:px-10",
        // Mobile card styling
        "mobile-card border-0 shadow-none bg-transparent rounded-xl"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-gray-50 to-transparent pointer-events-none" />
      )}
      <div className="mb-2 xs:mb-3 sm:mb-3 lg:mb-4 relative z-10 text-gray-600">
        {icon}
      </div>
      <div className="text-sm xs:text-base sm:text-base lg:text-lg font-bold mb-2 xs:mb-3 relative z-10">
        <div className="absolute left-0 inset-y-0 h-3 xs:h-4 sm:h-4 lg:h-6 group-hover/feature:h-4 xs:group-hover/feature:h-5 sm:group-hover/feature:h-6 lg:group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-300 group-hover/feature:bg-[#5A00E0] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-gray-900 pl-3 xs:pl-4 sm:pl-4 lg:pl-6">
          {title}
        </span>
      </div>
      <p className="text-xs xs:text-sm sm:text-sm font-light leading-relaxed text-gray-600 max-w-xs xs:max-w-sm relative z-10 pl-3 xs:pl-4 sm:pl-4 lg:pl-6">
        {description}
      </p>
    </div>
  );
};
