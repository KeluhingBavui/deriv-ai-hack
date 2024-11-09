import { HoverBorderGradient } from "./hover-border-gradient";

interface Item {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureGridProps {
  title: string;
  items: Item[];
  accentColor: "blue" | "red";
}

export function FeatureGrid({ title, items, accentColor }: FeatureGridProps) {
  const bgColor = accentColor === "blue" ? "bg-blue-50" : "bg-red-50";
  const textColor = accentColor === "blue" ? "text-blue-500" : "text-red-500";

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center">{title}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <HoverBorderGradient key={item.title} className="rounded-2xl h-full">
            <div className="p-6 space-y-4 bg-white rounded-xl h-full">
              <div className={`p-3 ${bgColor} w-fit rounded-lg ${textColor}`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </HoverBorderGradient>
        ))}
      </div>
    </div>
  );
}
