import React from "react";
import { Star, Users } from "lucide-react";
import Container from "@/components/shared/container/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Donor",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      content:
        "This platform made it so easy to donate blood and know that I'm directly helping someone in need. The matching system is amazing!",
      rating: 5,
    },
    {
      name: "Dr. Imran Khan",
      role: "Hospital Coordinator",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=imran",
      content:
        "We've reduced blood shortage emergencies by 60% since using BloodLine. The real-time donor matching is a game-changer for our patients.",
      rating: 5,
    },
    {
      name: "Fatima Hassan",
      role: "Patient",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
      content:
        "My family needed blood urgently, and this platform found a compatible donor within 3 minutes. I'm forever grateful to the generous donor and this amazing service.",
      rating: 5,
    },
    {
      name: "Ahmed Malik",
      role: "Frequent Donor",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
      content:
        "The dashboard tracking my donations and impact is incredibly motivating. It feels great to see exactly how my donations are saving lives.",
      rating: 5,
    },
    {
      name: "Dr. Zara Patel",
      role: "Medical Director",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=zara",
      content:
        "The safety protocols and donor screening on this platform meet the highest medical standards. I recommend it to all my colleagues.",
      rating: 5,
    },
    {
      name: "Mirza Ali",
      role: "First-time Donor",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=mirza",
      content:
        "I was nervous about donating, but the step-by-step guide and supportive community made my first donation experience wonderful!",
      rating: 5,
    },
  ];

  return (
    <section className="mt-20 lg:mt-30">
      <Container>
        <SectionHeader
          icon={Star}
          badge="Success Stories"
          title="What Our"
          highlight="Community Says"
          description="Real stories from donors, patients, and healthcare professionals who have made a difference through BloodLine."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-slate-900 border-0 shadow-lg hover:shadow-xl transition-shadow h-full"
            >
              <CardContent className="pt-6 space-y-4 flex flex-col h-full">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed grow">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
