import {
  AlertTriangle,
  Bell,
  Clock,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Users,
  HeartHandshake,
  Hospital,
  Stethoscope,
  Heart,
  Building,
  Activity,
  Shield,
  Plus,
} from "lucide-react";

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const features = [
  {
    icon: <HeartPulse className="w-6 h-6 text-white" />,
    title: "Emergency Blood Matching",
    description:
      "Urgent blood requests are prioritized and instantly matched with eligible nearby donors, helping hospitals respond faster during critical situations.",
    gradient: "from-red-500 to-rose-600",
    stat: "Avg. match time < 5 min",
    cta: "See emergency flow",
    colSpan: "lg:col-span-2",
  },
  {
    icon: <Clock className="w-6 h-6 text-white" />,
    title: "Real-Time Donor Availability",
    description:
      "Donor status updates automatically based on medically approved donation intervals, ensuring only eligible donors are contacted.",
    gradient: "from-blue-500 to-indigo-500",
    stat: "Eligibility tracked live",
    cta: "Check eligibility rules",
    colSpan: "lg:col-span-1",
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: "Blood Group Network",
    description:
      "Easily connect with compatible donors across all major blood groups, including rare types, for accurate and safe transfusions.",
    gradient: "from-violet-500 to-purple-500",
    stat: "All major blood groups",
    cta: "Explore blood groups",
    colSpan: "lg:col-span-1",
  },
  {
    icon: <MapPin className="w-6 h-6 text-white" />,
    title: "Smart Location Search",
    description:
      "Find donors near hospitals or specific areas using intelligent radius and location-based filtering to reduce response time.",
    gradient: "from-emerald-500 to-green-500",
    stat: "Hospital-focused search",
    cta: "View search logic",
    colSpan: "lg:col-span-2",
  },
  {
    icon: <Bell className="w-6 h-6 text-white" />,
    title: "Targeted Notifications",
    description:
      "Donors receive alerts only for compatible blood types and nearby requests, preventing alert fatigue while ensuring fast action.",
    gradient: "from-orange-500 to-amber-500",
    stat: "Instant & relevant alerts",
    cta: "See notification system",
    colSpan: "lg:col-span-2",
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-white" />,
    title: "Critical Shortage Alerts",
    description:
      "Get notified when specific blood groups are running low in your area and help prevent shortages before emergencies occur.",
    gradient: "from-pink-500 to-rose-500",
    stat: "Early warning system",
    cta: "View shortage insights",
    colSpan: "lg:col-span-1",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    title: "Donation Safety & Privacy",
    description:
      "We follow medically approved safety guidelines and protect personal data, sharing donor information only when absolutely necessary.",
    gradient: "from-teal-500 to-cyan-500",
    stat: "Safety-first platform",
    cta: "Read safety policy",
    colSpan: "lg:col-span-3",
  },
];

export const trustCards = [
  {
    icon: ShieldCheck,
    count: 100,
    suffix: " %",
    label: "Verified & Secure",
    subtext: "All donors are screened",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    icon: Clock,
    count: 24,
    suffix: " / 7",
    label: "Rapid Response",
    subtext: "Connect within seconds",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Users,
    count: 5000,
    suffix: " +",
    label: "Active Heroes",
    subtext: "Ready to donate now",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    icon: HeartHandshake,
    count: 1200,
    suffix: " +",
    label: "Lives Impacted",
    subtext: "Successful donations",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
  },
];

export const partners = [
  {
    icon: <Hospital className="w-6 h-6 text-white" />,
    name: "Dhaka Medical College",
    type: "Teaching Hospital",
    color: "from-red-500 to-rose-600",
  },
  {
    icon: <Stethoscope className="w-6 h-6 text-white" />,
    name: "Square Hospital",
    type: "Multi-Specialty",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: <Heart className="w-6 h-6 text-white" />,
    name: "National Heart Foundation",
    type: "Cardiac Care",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: <Building className="w-6 h-6 text-white" />,
    name: "Apollo Hospitals",
    type: "International Chain",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: <Activity className="w-6 h-6 text-white" />,
    name: "United Hospital",
    type: "Critical Care",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    name: "Bangladesh Red Crescent",
    type: "Emergency Response",
    color: "from-red-600 to-orange-600",
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    name: "Ibn Sina Hospital",
    type: "Network Hospital",
    color: "from-amber-500 to-yellow-600",
  },
  {
    icon: <Plus className="w-6 h-6 text-white" />,
    name: "Labaid Hospital",
    type: "Specialized Care",
    color: "from-cyan-500 to-teal-600",
  },
];
