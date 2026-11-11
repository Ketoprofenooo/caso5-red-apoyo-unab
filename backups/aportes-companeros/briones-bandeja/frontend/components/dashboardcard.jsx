import {
  FileText,
  Clock,
  Activity,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function DashboardCards({
  requests
}) {

  const total = requests.length;

  const pendientes =
    requests.filter(
      r => r.status === "Pendiente"
    ).length;

  const proceso =
    requests.filter(
      r => r.status === "En Proceso"
    ).length;

  const cerradas =
    requests.filter(
      r => r.status === "Cerrada"
    ).length;

  const urgentes =
    requests.filter(
      r => r.urgency === "Alta"
    ).length;

  const cards = [
    {
      title: "Total",
      value: total,
      icon: FileText,
      color: "bg-blue-600"
    },
    {
      title: "Pendientes",
      value: pendientes,
      icon: Clock,
      color: "bg-red-500"
    },
    {
      title: "En Proceso",
      value: proceso,
      icon: Activity,
      color: "bg-yellow-500"
    },
    {
      title: "Cerradas",
      value: cerradas,
      icon: CheckCircle,
      color: "bg-green-600"
    },
    {
      title: "Urgentes",
      value: urgentes,
      icon: AlertTriangle,
      color: "bg-red-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">

      {cards.map(card => {

        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`${card.color} text-white rounded-xl p-5 shadow-lg`}
          >

            <div className="flex justify-between items-center">

              <div>
                <p className="text-sm">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <Icon size={30} />

            </div>

          </div>
        );

      })}

    </div>
  );
}