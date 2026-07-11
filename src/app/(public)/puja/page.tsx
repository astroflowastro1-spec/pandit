import PujaBanner from "@/components/puja/PujaBanner";
import UpcomingPujas from "@/components/puja/UpcomingPujas";

export default function PujaPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <PujaBanner />
      <UpcomingPujas />
    </div>
  );
}
